"use client"

import styles from "./post-list.module.css"
import ListItem from "./list-item"
import { ChangeEvent, useCallback, useState } from "react"
import type { PostWith文件 } from "@lib/server/prisma"
import { Input } from "@components/input"
import { useToasts } from "@components/toasts"
import { ListItemSkeleton } from "./list-item-skeleton"
import Link from "@components/link"
import debounce from "lodash.debounce"
import { fetchWithUser } from "src/app/lib/fetch-with-user"
import { Stack } from "@components/stack"

type Props = {
	initialPosts: PostWith文件[]
	morePosts?: boolean
	hide搜索?: boolean
	hide操作?: boolean
	isOwner?: boolean
	skeleton?: boolean
	searchValue?: string
	userId?: string
}

const PostList = ({
	initialPosts,
	hide搜索,
	hide操作,
	isOwner,
	skeleton,
	userId
}: Props) => {
	const [searchValue, set搜索Value] = useState("")
	const [searching, set搜索ing] = useState(false)
	const [posts, setPosts] = useState<PostWith文件[]>(initialPosts)

	const { setToast } = useToasts()

	const showSkeleton = skeleton || searching

	// eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: address this
	const on搜索 = useCallback(
		debounce((query: string) => {
			if (!query) {
				setPosts(initialPosts)
				set搜索ing(false)
				return
			}

			set搜索ing(true)
			async function fetchPosts() {
				const res = await fetchWithUser(
					`/api/post/search?q=${encodeURIComponent(query)}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json"
						}
					}
				)
				const json = (await res.json()) as PostWith文件[]
				setPosts(json)
				set搜索ing(false)
			}
			fetchPosts()
		}, 300),
		[userId]
	)

	const on搜索Change = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			set搜索Value(e.target.value)
			on搜索(e.target.value)
		},
		[on搜索]
	)

	const deletePost = useCallback(
		(postId: string) => async () => {
			const res = await fetchWithUser(`/api/post/${postId}`, {
				method: "DELETE"
			})

			if (!res?.ok) {
				setToast({
					message: "Failed to delete post",
					type: "error"
				})
				return
			} else {
				setPosts((posts) => posts?.filter((post) => post.id !== postId))
				setToast({
					message: "Post deleted",
					type: "success"
				})
			}
		},
		[setPosts, setToast]
	)

	return (
		<Stack class名称={styles.container} alignItems="center">
			{!hide搜索 && (
				<div class名称={styles.searchContainer}>
					<Input
						placeholder="搜索..."
						onChange={on搜索Change}
						disabled={!posts || posts.length === 0}
						style={{ maxWidth: 300 }}
						aria-label="搜索"
						value={searchValue}
					/>
				</div>
			)}
			{!posts && <p style={{ color: "var(--warning)" }}>Failed to load.</p>}
			{showSkeleton && (
				<ul>
					<ListItemSkeleton />
					<ListItemSkeleton />
				</ul>
			)}
			{!showSkeleton && posts && posts.length > 0 ? (
				<ul>
					{posts.map((post) => {
						return (
							<ListItem
								deletePost={deletePost(post.id)}
								post={post}
								key={post.id}
								hide操作={hide操作}
								isOwner={isOwner}
							/>
						)
					})}
				</ul>
			) : null}
			{!showSkeleton && posts && posts.length === 0 && <否PostsFound />}
		</Stack>
	)
}

export default PostList

export function 否PostsFound() {
	return (
		<p>
			否 posts found. 创建 one{" "}
			<Link colored href="/new">
				here
			</Link>
			.
		</p>
	)
}
