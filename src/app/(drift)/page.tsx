import { Card, CardContent } from "@components/card"
import { getWelcomeContent } from "src/pages/api/welcome"
import {
	getAllPosts,
	serverPostToClientPost,
	ServerPostWith文件AndAuthor
} from "@lib/server/prisma"
import PostList, { 否PostsFound } from "@components/post-list"
import { cache, Suspense } from "react"
import ErrorBoundary from "@components/error/fallback"
import DocumentTabs from "src/app/(drift)/(posts)/components/document-tabs"
import { PageWrapper } from "@components/page-wrapper"
export const revalidate = 300

const getWelcomeData = cache(async () => {
	const welcomeContent = await getWelcomeContent()
	return welcomeContent
})

export default async function Page() {
	return (
		<PageWrapper>
			{/* @ts-expect-error because of async RSC */}
			<WelcomePost />
			<h2 class名称="mt-4 text-2xl font-bold">Recent 公开 Posts</h2>
			<ErrorBoundary>
				<Suspense
					fallback={
						<PostList skeleton hide操作 hide搜索 initialPosts={[]} />
					}
				>
					{/* @ts-expect-error because of async RSC */}
					<公开PostList />
				</Suspense>
			</ErrorBoundary>
		</PageWrapper>
	)
}

async function WelcomePost() {
	const { content, rendered, title } = await getWelcomeData()
	return (
		<Card class名称="w-full">
			<CardContent>
				<DocumentTabs
					defaultTab="preview"
					is编辑ing={false}
					staticPreview={rendered as string}
					title={title}
				>
					{content}
				</DocumentTabs>
			</CardContent>
		</Card>
	)
}

async function 公开PostList() {
	const posts = (await getAllPosts({
		select: {
			id: true,
			title: true,
			createdAt: true,
			author: {
				select: {
					display名称: true
				}
			},
			visibility: true,
			expiresAt: true,
			files: {
				select: {
					id: true,
					title: true
				}
			},
			authorId: true
		},
		where: {
			visibility: "public"
		},
		orderBy: {
			createdAt: "desc"
		}
	})) as unknown as ServerPostWith文件AndAuthor[]

	if (posts.length === 0) {
		return <否PostsFound />
	}

	const clientPosts = posts.map((post) => serverPostToClientPost(post))

	return <PostList initialPosts={clientPosts} hide操作 hide搜索 />
}
