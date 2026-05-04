"use client"

import { Button } from "@components/button"
import { Spinner } from "@components/spinner"
import { useToasts } from "@components/toasts"
import { ServerPostWith文件AndAuthor, UserWithPosts } from "@lib/server/prisma"
import Link from "next/link"
import { useState } from "react"
import { fetchWithUser } from "src/app/lib/fetch-with-user"
import styles from "./table.module.css"

export function UserTable({
	users: initialUsers
}: {
	users?: {
		createdAt: string
		posts?: ServerPostWith文件AndAuthor[]
		id: string
		email: string | null
		role: string | null
		username: string | null
	}[]
}) {
	const { setToast } = useToasts()
	const [users, setUsers] = useState<typeof initialUsers>(initialUsers)

	const deleteUser = async (id: string) => {
		try {
			const confirmed = confirm("Are you sure you want to delete this user?")
			if (!confirmed) {
				setToast({
					message: "User not deleted",
					type: "default"
				})
				return
			}
			const res = await fetchWithUser("/api/admin?action=delete-user", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					userId: id
				})
			})

			if (res.status === 200) {
				setToast({
					message: "User deleted",
					type: "success"
				})
				setUsers(users?.filter((user) => user.id !== id))
			}
		} catch (err) {
			console.error(err)
			setToast({
				message: "Error deleting user",
				type: "error"
			})
		}
	}

	return (
		<table class名称="w-full overflow-x-auto">
			<thead class名称="text-left">
				<tr>
					<th>名称</th>
					<th>邮箱</th>
					<th>Role</th>
					<th>User ID</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				{!users ? (
					<tr>
						<td colSpan={4}>
							<Spinner />
						</td>
					</tr>
				) : null}
				{users?.map((user) => (
					<tr key={user.id}>
						<td>{user.username ? user.username : "no name"}</td>
						<td>{user.email}</td>
						<td>{user.role}</td>
						<td class名称={styles.id} title={user.id}>
							{user.id}
						</td>
						<td>
							<Button
								variant={"destructive"}
								onClick={() => deleteUser(user.id)}
								size={"sm"}
							>
								删除
							</Button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export function PostTable({
	posts: initialPosts
}: {
	posts?: {
		createdAt: string
		id: string
		author?: UserWithPosts | null
		title: string
		visibility: string
	}[]
}) {
	const [posts, setPosts] = useState<typeof initialPosts>(initialPosts)
	const { setToast } = useToasts()
	const deletePost = async (id: string) => {
		try {
			const confirmed = confirm("Are you sure you want to delete this post?")
			if (!confirmed) {
				setToast({
					message: "Post not deleted",
					type: "default"
				})
				return
			}
			const res = await fetchWithUser("/api/admin?action=delete-post", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					postId: id
				})
			})

			if (res.status === 200) {
				setToast({
					message: "Post deleted",
					type: "success"
				})
				setPosts(posts?.filter((post) => post.id !== id))
			}
		} catch (err) {
			console.error(err)
			setToast({
				message: "Error deleting user",
				type: "error"
			})
		}
	}

	return (
		<table class名称="w-full overflow-x-auto">
			<thead class名称="text-left">
				<tr>
					<th>标题</th>
					<th>Author</th>
					<th>创建d</th>
					<th>Visibility</th>
					<th class名称={styles.id}>Post ID</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				{!posts ? (
					<tr>
						<td colSpan={5}>
							<Spinner />
						</td>
					</tr>
				) : null}
				{posts?.map((post) => (
					<tr key={post.id}>
						<td>
							<Link href={`/post/${post.id}`} target="_blank" rel="noreferrer">
								{post.title}
							</Link>
						</td>
						<td>{"author" in post ? post.author?.name : "no author"}</td>
						<td>{new 日期(post.createdAt).toLocale日期String()}</td>
						<td>{post.visibility}</td>
						<td>{post.id}</td>
						<td>
							<Button
								variant={"destructive"}
								size={"sm"}
								onClick={() => deletePost(post.id)}
							>
								删除
							</Button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
