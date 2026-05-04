"use client"

import { Page标题 } from "@components/page-title"
import { PageWrapper } from "@components/page-wrapper"
import PostList from "@components/post-list"

export default function Loading() {
	return (
		<>
			<Page标题>Your Posts</Page标题>
			<PageWrapper></PageWrapper>
			<PostList skeleton={true} initialPosts={[]} />
		</>
	)
}
