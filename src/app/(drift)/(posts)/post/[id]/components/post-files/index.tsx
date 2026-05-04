"use client"

import DocumentComponent from "./view-document"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import 密码ModalWrapper from "./password-modal-wrapper"
import { PostWith文件AndAuthor } from "@lib/server/prisma"

type Props = {
	post: PostWith文件AndAuthor
	isProtected?: boolean
	isAuthor?: boolean
}

const Post文件 = ({ post: initialPost }: Props) => {
	const [post, setPost] = useState<PostWith文件AndAuthor>(initialPost)
	const router = useRouter()

	if (post?.expiresAt) {
		if (new 日期(post.expiresAt) < new 日期()) {
			router.push("/expired")
		}
	}

	useEffect(() => {
		let interval: 否deJS.Timer | null = null
		if (post?.expiresAt) {
			interval = setInterval(() => {
				const expiration日期 = new 日期(post.expiresAt ? post.expiresAt : "")
				if (expiration日期 < new 日期()) {
					router.push("/expired")
					if (interval) clearInterval(interval)
				}
			}, 4000)
		}
		return () => {
			if (interval) clearInterval(interval)
		}
	}, [post?.expiresAt, router])

	const isProtected = post?.visibility === "protected"
	const hasFetched = post?.files !== undefined
	if (isProtected && !hasFetched) {
		return (
			<密码ModalWrapper
				authorId={post.authorId}
				setPost={setPost}
				postId={post.id}
			/>
		)
	}

	return (
		<main
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "var(--gap-double)"
			}}
		>
			{post?.files?.map((file) => (
				<DocumentComponent
					skeleton={false}
					key={post.id}
					initialTab={"preview"}
					file={file}
					post={post}
				/>
			))}
		</main>
	)
}

export default Post文件
