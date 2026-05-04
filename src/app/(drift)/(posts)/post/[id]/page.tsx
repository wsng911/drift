import VisibilityControl from "@components/badges/visibility-control"
import { getMetadata } from "src/app/lib/metadata"
import {
	PostWith文件AndAuthor,
	serverPostToClientPost,
	ServerPostWith文件AndAuthor
} from "@lib/server/prisma"
import Post文件 from "./components/post-files"
import { getPost } from "./get-post"

export default async function PostPage({
	params
}: {
	params: {
		id: string
	}
}) {
	const post = (await getPost(params.id)) as ServerPostWith文件AndAuthor
	const clientPost = serverPostToClientPost(post) as PostWith文件AndAuthor

	return (
		<>
			<Post文件 post={clientPost} />
			<div class名称="mx-auto mb-4 mt-4">
				<VisibilityControl
					authorId={post.authorId}
					postId={post.id}
					visibility={post.visibility}
				/>
			</div>
		</>
	)
}

export const generateMetadata = async ({
	params
}: {
	params: {
		id: string
	}
}) => {
	const post = (await getPost(params.id)) as ServerPostWith文件AndAuthor

	return getMetadata({
		title: post.title,
		description: post.description || undefined,
		hidden: post.visibility === "public",
		overrides: {
			openGraph: {
				title: post.title,
				description: post.description || undefined,
				type: "website",
				site名称: "Drift"
				// TODO: og images
			}
		}
	})
}
