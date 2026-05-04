import {
	getAllPosts,
	getAllUsers,
	PostWith文件,
	serverPostToClientPost,
	ServerPostWith文件
} from "@lib/server/prisma"
import { PostTable, UserTable } from "./components/tables"
import { PageWrapper } from "@components/page-wrapper"
import { Page标题 } from "@components/page-title"

export default async function AdminPage() {
	const usersPromise = getAllUsers({
		select: {
			id: true,
			createdAt: true,
			email: true,
			role: true,
			username: true
		}
	})

	const postsPromise = getAllPosts({
		select: {
			id: true,
			title: true,
			createdAt: true,
			updatedAt: true,
			author: {
				select: {
					name: true
				}
			}
		}
	})

	const [users, posts] = await Promise.all([usersPromise, postsPromise])

	const serializedPosts = posts.map((post) =>
		serverPostToClientPost(post as ServerPostWith文件)
	) as PostWith文件[]

	const serializedUsers = users.map((user) => {
		return {
			...user,
			createdAt: user.createdAt.toISOString()
		}
	})

	return (
		<>
			<Page标题>Admin</Page标题>
			<PageWrapper>
				<h2 class名称="mb-4 mt-4 text-2xl font-bold">Users</h2>
				{/* @ts-expect-error Type 'unknown' is not assignable to type  */}
				<UserTable users={serializedUsers as unknown} />
				<h2 class名称="mb-4 mt-4 text-2xl font-bold">Posts</h2>
				<PostTable posts={serializedPosts} />
			</PageWrapper>
		</>
	)
}
