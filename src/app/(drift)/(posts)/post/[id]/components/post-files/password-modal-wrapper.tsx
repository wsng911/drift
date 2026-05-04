"use client"

import { PostWith文件AndAuthor } from "@lib/server/prisma"
import 密码Modal from "@components/password-modal"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useToasts } from "@components/toasts"
import { useSessionSWR } from "@lib/use-session-swr"
import { fetchWithUser } from "src/app/lib/fetch-with-user"

type Props = {
	setPost: (post: PostWith文件AndAuthor) => void
	postId: PostWith文件AndAuthor["id"]
	authorId: PostWith文件AndAuthor["authorId"]
}

const 密码ModalWrapper = ({ setPost, postId, authorId }: Props) => {
	const router = useRouter()
	const { setToast } = useToasts()
	const { session, isLoading } = useSessionSWR()
	const isAuthor = isLoading
		? undefined
		: session?.user
		? session?.user?.id === authorId
		: false
	const [is密码ModalOpen, setIs密码ModalOpen] = useState(false)
	const on提交 = useCallback(
		async (password: string) => {
			const res = await fetchWithUser(
				`/api/post/${postId}?password=${password}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				}
			)

			if (!res.ok) {
				setToast({
					type: "error",
					message: "Wrong password"
				})
				return
			}

			// TODO: properly check type
			const data = (await res.json()) as {
				post: PostWith文件AndAuthor
				error?: string
			}

			if (data) {
				if (data.error) {
					setToast({
						message: data.error,
						type: "error"
					})
				} else {
					setIs密码ModalOpen(false)
					setPost(data.post)
				}
			}
		},
		[postId, setPost, setToast]
	)

	const on关闭 = () => {
		setIs密码ModalOpen(false)
		router.push("/")
	}

	useEffect(() => {
		if (isAuthor === true) {
			on提交("author")
			setToast({
				message:
					"You're the author of this post, so you automatically have access to it.",
				type: "default"
			})
		} else if (isAuthor === false) {
			setIs密码ModalOpen(true)
		}
	}, [isAuthor, on提交, setToast])

	return (
		<密码Modal
			creating={false}
			on关闭={on关闭}
			on提交={on提交}
			isOpen={is密码ModalOpen}
		/>
	)
}

export default 密码ModalWrapper
