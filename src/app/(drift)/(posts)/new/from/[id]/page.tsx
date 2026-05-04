import 新建Post from "../../components/new"
import { notFound, redirect } from "next/navigation"
import {
	getPostById,
	serverPostToClientPost,
	ServerPostWith文件
} from "@lib/server/prisma"
import { getSession } from "@lib/server/session"

async function 新建FromExisting({
	params
}: {
	params: {
		id: string
	}
}) {
	const session = await getSession()
	if (!session?.user) {
		return redirect("/signin")
	}

	const { id } = params

	if (!id) {
		return notFound()
	}

	const post = (await getPostById(id, {
		select: {
			authorId: true,
			title: true,
			description: true,
			id: true,
			files: {
				select: {
					title: true,
					content: true,
					id: true
				}
			}
		}
	})) as ServerPostWith文件

	const clientPost = post ? serverPostToClientPost(post) : undefined

	return <新建Post initialPost={clientPost} newPostParent={id} />
}

export default 新建FromExisting
