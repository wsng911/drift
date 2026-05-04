"use client"

import 密码Modal from "@components/password-modal"
import { useCallback, useState } from "react"
import ButtonGroup from "@components/button-group"
import { Button } from "@components/button"
import { useToasts } from "@components/toasts"
import { useRouter } from "next/navigation"
import { useSessionSWR } from "@lib/use-session-swr"
import { fetchWithUser } from "src/app/lib/fetch-with-user"
import FadeIn from "@components/fade-in"
import { PostWith文件 } from "@lib/server/prisma"

type Props = {
	authorId: string
	postId: string
	visibility: string
}

function VisibilityControl({
	authorId,
	postId,
	visibility: postVisibility
}: Props) {
	const { session } = useSessionSWR()
	const isAuthor = session?.user && session?.user?.id === authorId
	const [visibility, setVisibility] = useState<string>(postVisibility)

	const [is提交ting, set提交ting] = useState<string | null>()
	const [passwordModalVisible, set密码ModalVisible] = useState(false)
	const { setToast } = useToasts()
	const router = useRouter()

	const sendRequest = useCallback(
		async (visibility: string, password?: string) => {
			const res = await fetchWithUser(`/api/post/${postId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ visibility, password })
			})

			if (res.ok) {
				const json = (await res.json()) as PostWith文件
				setVisibility(json.visibility)
				router.refresh()
				setToast({
					message: "Visibility updated",
					type: "success"
				})
			} else {
				setToast({
					message: "An error occurred",
					type: "error"
				})
				set密码ModalVisible(false)
			}
		},
		[postId, router, setToast]
	)

	const on提交 = useCallback(
		async (visibility: string, password?: string) => {
			if (visibility === "protected" && !password) {
				set密码ModalVisible(true)
				return
			}
			set密码ModalVisible(false)
			const timeout = setTimeout(() => set提交ting(visibility), 100)

			await sendRequest(visibility, password)
			clearTimeout(timeout)
			set提交ting(null)
		},
		[sendRequest]
	)

	const on关闭密码Modal = () => {
		set密码ModalVisible(false)
		set提交ting(null)
	}

	const submit密码 = (password: string) => on提交("protected", password)

	if (!isAuthor) {
		return null
	}

	return (
		<FadeIn class名称="mt-8">
			<ButtonGroup>
				<Button
					disabled={visibility === "private"}
					variant={"outline"}
					onClick={() => on提交("private")}
					loading={is提交ting === "private"}
				>
					Make 私有
				</Button>
				<Button
					disabled={visibility === "public"}
					variant={"outline"}
					onClick={() => on提交("public")}
					loading={is提交ting === "public"}
				>
					Make 公开
				</Button>
				<Button
					disabled={visibility === "unlisted"}
					variant={"outline"}
					onClick={() => on提交("unlisted")}
					loading={is提交ting === "unlisted"}
				>
					Make Unlisted
				</Button>
				<Button
					onClick={() => on提交("protected")}
					variant={"outline"}
					loading={is提交ting === "protected"}
				>
					{visibility === "protected"
						? "Change 密码"
						: "Protect with 密码"}
				</Button>
			</ButtonGroup>
			<密码Modal
				creating={true}
				isOpen={passwordModalVisible}
				on关闭={on关闭密码Modal}
				on提交={submit密码}
			/>
		</FadeIn>
	)
}

export default VisibilityControl
