import {
	PostWith文件AndAuthor,
	serverPostToClientPost,
	ServerPostWith文件AndAuthor
} from "@lib/server/prisma"
import ScrollToTop from "@components/scroll-to-top"
import { PostButtons } from "./components/header/post-buttons"
import styles from "./layout.module.css"
import { Post标题 } from "./components/header/title"
import { getPost } from "./get-post"

export default async function PostLayout({
	children,
	params
}: {
	children: React.React否de
	params: {
		id: string
	}
}) {
	const post = (await getPost(params.id)) as ServerPostWith文件AndAuthor

	// TODO: type-safe
	const clientPost = serverPostToClientPost(post) as PostWith文件AndAuthor
	return (
		<div class名称={styles.root}>
			<div class名称={styles.header}>
				{post.visibility !== "protected" && <PostButtons post={clientPost} />}
				{post.visibility !== "protected" && <Post标题 post={clientPost} />}
			</div>
			{/* {post.description && <p class名称="pb-4 text-lg">{post.description}</p>} */}
			<ScrollToTop />
			{children}
		</div>
	)
}
