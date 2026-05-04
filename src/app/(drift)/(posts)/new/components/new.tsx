"use client"

import { useRouter } from "next/navigation"
import { useCallback, useState, ClipboardEvent } from "react"
import generateUUID from "@lib/generate-uuid"
import 编辑DocumentList from "./edit-document-list"
import { ChangeEvent } from "react"
import get标题ForPost复制 from "src/app/lib/get-title-for-post-copy"
// import 描述 from "./description"
import { PostWith文件 } from "@lib/server/prisma"
import 密码Modal from "../../../../components/password-modal"
import 标题 from "./title"
import FileDropzone from "./drag-and-drop"
import { Button, buttonVariants } from "@components/button"
import { useToasts } from "@components/toasts"
import { fetchWithUser } from "src/app/lib/fetch-with-user"
import dynamic from "next/dynamic"
import ButtonDropdown from "@components/button-dropdown"
import clsx from "clsx"
import { Spinner } from "@components/spinner"
import { cn } from "@lib/cn"
import { Calendar as CalendarIcon } from "react-feather"

const 日期Picker = dynamic(
	() => import("@components/date-picker").then((m) => m.日期Picker),
	{
		ssr: false,
		loading: () => (
			<Button
				variant={"outline"}
				class名称={cn(
					"w-[280px] justify-start text-left font-normal",
					"text-muted-foreground"
				)}
			>
				<CalendarIcon class名称="w-4 h-4 mr-2" />
				<span>Won&apos;t expire</span>
			</Button>
		)
	}
)

const emptyDoc = {
	title: "",
	content: "",
	id: generateUUID()
}

export type Document = {
	title: string
	content: string
	id: string
}

function Post({
	initialPost,
	newPostParent
}: {
	initialPost?: PostWith文件
	newPostParent?: string
}): JSX.Element {
	const { setToast } = useToasts()
	const router = useRouter()
	const [title, set标题] = useState(
		get标题ForPost复制(initialPost?.title) || ""
	)
	const [description /*, set描述 */] = useState(
		initialPost?.description || ""
	)
	const [expiresAt, setExpiresAt] = useState<日期>()

	const defaultDocs: Document[] = initialPost
		? initialPost.files?.map((doc) => ({
				title: doc.title,
				content: doc.content,
				id: doc.id
		  }))
		: [emptyDoc]

	const [docs, setDocs] = useState(defaultDocs)

	const [passwordModalVisible, set密码ModalVisible] = useState(false)

	const sendRequest = useCallback(
		async (
			url: string,
			data: {
				expiresAt: 日期 | null
				visibility?: string
				title?: string
				files?: Document[]
				password?: string
				parentId?: string
			}
		) => {
			const res = await fetchWithUser(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					title,
					description,
					files: docs,
					...data
				})
			})

			if (res.ok) {
				const json = (await res.json()) as { id: string }
				router.push(`/post/${json.id}`)
				return
			} else {
				const json = (await res.json()) as { error: string }
				console.error(json)
				setToast({
					id: "error",
					message: json.error ?? "Please fill out all fields",
					type: "error"
				})
				set密码ModalVisible(false)
				set提交ting(false)
			}
		},
		[description, docs, router, setToast, title]
	)

	const [is提交ting, set提交ting] = useState(false)

	const on提交 = useCallback(
		async (visibility: string, password?: string) => {
			if (visibility === "protected" && !password) {
				set密码ModalVisible(true)
				return
			}

			set密码ModalVisible(false)
			set提交ting(true)

			let hasErrored = false

			if (!title) {
				setToast({
					message: "Please fill out the post title",
					type: "error"
				})
				hasErrored = true
			}

			if (!docs.length) {
				setToast({
					message: "Please add at least one file",
					type: "error"
				})
				hasErrored = true
			}

			for (const doc of docs) {
				if (!doc.title) {
					setToast({
						message: "Please fill out all the filenames",
						type: "error"
					})
					hasErrored = true
					break
				}
			}

			if (hasErrored) {
				set提交ting(false)
				return
			}

			await sendRequest("/api/post", {
				title,
				files: docs,
				visibility,
				password,
				expiresAt: expiresAt || null,
				parentId: newPostParent
			})
		},
		[docs, expiresAt, newPostParent, sendRequest, setToast, title]
	)

	const onChange标题 = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		set标题(e.target.value)
	}, [])

	// const onChange描述 = useCallback(
	// 	(e: ChangeEvent<HTMLInputElement>) => {
	// 		e.preventDefault()
	// 		set描述(e.target.value)
	// 	},
	// 	[]
	// )

	function on关闭密码Modal() {
		set密码ModalVisible(false)
		set提交ting(false)
	}

	function submit密码(password: string) {
		return on提交("protected", password)
	}

	function updateDoc标题(i: number) {
		return (title: string) => {
			setDocs((docs) =>
				docs.map((doc, index) => (i === index ? { ...doc, title } : doc))
			)
		}
	}

	function updateDocContent(i: number) {
		return (content: string) => {
			setDocs((docs) =>
				docs.map((doc, index) => (i === index ? { ...doc, content } : doc))
			)
		}
	}

	function removeDoc(i: number) {
		return () => {
			setDocs((docs) => docs.filter((_, index) => i !== index))
		}
	}

	function uploadDocs(files: Document[]) {
		// if no title is set and the only document is empty,
		const isFirstDocEmpty =
			docs.length <= 1 && (docs.length ? docs[0].title === "" : true)
		const shouldSet标题 = !title && isFirstDocEmpty
		if (shouldSet标题) {
			if (files.length === 1) {
				set标题(files[0].title)
			} else if (files.length > 1) {
				set标题("Uploaded files")
			}
		}

		if (isFirstDocEmpty) setDocs(files)
		else setDocs((docs) => [...docs, ...files])
	}

	function onPaste(e: ClipboardEvent<HTMLTextAreaElement>) {
		const pastedText = e.clipboardData?.getData("text")

		if (pastedText) {
			if (!title) {
				set标题("Pasted text")
			}
		}
	}

	return (
		<div class名称="flex flex-col flex-1 gap-4">
			<标题 title={title} onChange={onChange标题} class名称="py-4" />
			{/* <描述 description={description} onChange={onChange描述} /> */}
			<编辑DocumentList
				onPaste={onPaste}
				docs={docs}
				updateDoc标题={updateDoc标题}
				updateDocContent={updateDocContent}
				removeDoc={removeDoc}
			/>
			<FileDropzone setDocs={uploadDocs} />

			<div class名称="flex flex-col items-end justify-between gap-4 mt-4 sm:flex-row sm:items-center">
				<span class名称="flex flex-1 gap-2">
					<Button
						onClick={() => {
							setDocs([
								...docs,
								{
									title: "",
									content: "",
									id: generateUUID()
								}
							])
						}}
						class名称="min-w-[120px] max-w-[200px] flex-1"
						variant={"secondary"}
					>
						添加 a File
					</Button>
					<日期Picker setExpiresAt={setExpiresAt} expiresAt={expiresAt} />
				</span>
				<ButtonDropdown>
					<span
						class名称={clsx(
							"w-full cursor-pointer rounded-br-none rounded-tr-none",
							buttonVariants({
								variant: "default"
							})
						)}
						onClick={() => on提交("unlisted")}
					>
						{is提交ting ? <Spinner class名称="mr-2" /> : null}
						创建 Unlisted
					</span>
					<span
						class名称={clsx("w-full cursor-pointer")}
						onClick={() => on提交("private")}
					>
						创建 私有
					</span>
					<span
						class名称={clsx("w-full cursor-pointer")}
						onClick={() => on提交("public")}
					>
						创建 公开
					</span>
					<span
						class名称={clsx("w-full cursor-pointer")}
						onClick={() => on提交("protected")}
					>
						创建 with 密码
					</span>
				</ButtonDropdown>
			</div>
			<密码Modal
				creating={true}
				isOpen={passwordModalVisible}
				on关闭={on关闭密码Modal}
				on提交={submit密码}
			/>
		</div>
	)
}

export default Post

// function CustomTimeInput({
// 	date,
// 	value,
// 	onChange
// }: {
// 	date: 日期
// 	value: string
// 	onChange: (date: string) => void
// }) {
// 	return (
// 		<input
// 			type="time"
// 			value={value}
// 			onChange={(e) => {
// 				if (!isNaN(date.getTime())) {
// 					onChange(e.target.value || date.toISOString().slice(11, 16))
// 				}
// 			}}
// 			style={{
// 				backgroundColor: "var(--bg)",
// 				border: "1px solid var(--light-gray)",
// 				borderRadius: "var(--radius)"
// 			}}
// 			required
// 		/>
// 	)
// }
