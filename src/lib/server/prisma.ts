declare global {
	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined
}

import config from "@lib/config"
import {
	Post as ServerPost,
	PrismaClient,
	User as ServerUser,
	Prisma,
	File as ServerFile
} from "@prisma/client"
import * as crypto from "crypto"
export type {
	User as ServerUser,
	File as ServerFile,
	Post as ServerPost
} from "@prisma/client"
export const prisma =
	global.prisma ||
	new PrismaClient({
		log: ["query"]
	})

// prisma.$use(async (params, next) => {
// 	const result = await next(params)
// 	return update日期s(result)
// })

if (process.env.NODE_ENV !== "production") global.prisma = prisma

const postWith文件 = Prisma.validator<Prisma.PostArgs>()({
	include: {
		files: true
	}
})

const postWithAuthor = Prisma.validator<Prisma.PostArgs>()({
	include: {
		author: true
	}
})

const postWith文件AndAuthor = Prisma.validator<Prisma.PostArgs>()({
	include: {
		files: true,
		author: true
	}
})

export type ServerPostWith文件 = Prisma.PostGetPayload<typeof postWith文件>
export type ServerPostWithAuthor = Prisma.PostGetPayload<typeof postWithAuthor>
export type ServerPostWith文件AndAuthor = Prisma.PostGetPayload<
	typeof postWith文件AndAuthor
>

export type PostWith文件 = Omit<
	ServerPostWith文件,
	"files" | "updatedAt" | "createdAt" | "deletedAt" | "expiresAt"
> & {
	files: (Omit<
		ServerPostWith文件["files"][number],
		"content" | "html" | "updatedAt" | "createdAt" | "deletedAt"
	> & {
		content: string
		html: string
		updatedAt?: string
		createdAt: string
		deletedAt?: string
	})[]
	updatedAt?: string
	createdAt: string
	deletedAt?: string
	expiresAt?: string
}

export type PostWith文件AndAuthor = Omit<
	ServerPostWith文件AndAuthor,
	"files" | "updatedAt" | "createdAt" | "deletedAt" | "expiresAt" | "author"
> & {
	files: (Omit<
		ServerPostWith文件AndAuthor["files"][number],
		"content" | "html" | "updatedAt" | "createdAt" | "deletedAt"
	> & {
		content: string
		html: string
		updatedAt?: string
		createdAt: string
		deletedAt?: string
	})[]

	author: Omit<
		ServerPostWith文件AndAuthor["author"],
		"createdAt" | "updatedAt"
	> & {
		createdAt: string
		updatedAt: string
	}

	updatedAt?: string
	createdAt: string
	deletedAt?: string
	expiresAt?: string
}

export function serverPostToClientPost(
	post: ServerPostWith文件 | ServerPostWith文件AndAuthor
): PostWith文件AndAuthor | PostWith文件 {
	let result: PostWith文件 | PostWith文件AndAuthor = {
		...post,
		files: post.files?.map((file) => ({
			...file,
			content: file.content?.toString("utf-8"),
			html: file.html?.toString("utf-8"),
			updatedAt: file.updatedAt?.toISOString(),
			createdAt: file.createdAt?.toISOString(),
			deletedAt: file.deletedAt?.toISOString()
		})),
		updatedAt: post.updatedAt?.toISOString(),
		createdAt: post.createdAt?.toISOString(),
		deletedAt: post.deletedAt?.toISOString(),
		expiresAt: post.expiresAt?.toISOString()
	}

	if ("author" in post && post.author) {
		result = {
			...result,
			author: {
				...post.author,
				createdAt: post.author.createdAt?.toISOString(),
				updatedAt: post.author.updatedAt?.toISOString()
			}
		}
	}

	return result
}

export const get文件ForPost = async (postId: string) => {
	const files = await prisma.file.findMany({
		where: {
			postId
		}
	})

	return files
}

export async function get文件ByPost(postId: string) {
	const files = await prisma.file.findMany({
		where: {
			postId
		}
	})

	return files
}

export async function getPostsByUser(userId: string): Promise<ServerPost[]>
export async function getPostsByUser(
	userId: string,
	include文件: true
): Promise<ServerPostWith文件[]>
export async function getPostsByUser(
	userId: ServerUser["id"],
	with文件?: boolean
) {
	const posts = await prisma.post.findMany({
		where: {
			authorId: userId
		},
		orderBy: {
			createdAt: "desc"
		},
		select: {
			id: true,
			title: true,
			createdAt: true,
			updatedAt: true,
			authorId: true,
			expiresAt: true,
			visibility: true,
			...(with文件 && {
				files: {
					select: {
						id: true,
						title: true,
						createdAt: true
					}
				}
			})
		}
	})

	return posts
}

export const getUserById = async (
	userId: ServerUser["id"],
	selects?: Prisma.UserFindUniqueArgs["select"]
) => {
	const user = await prisma.user.findUnique({
		where: {
			id: userId
		},
		select: {
			id: true,
			email: true,
			// display名称: true,
			role: true,
			display名称: true,
			...selects
		}
	})

	return user
}

export const isUserAdmin = async (userId: ServerUser["id"]) => {
	const user = await prisma.user.findUnique({
		where: {
			id: userId
		},
		select: {
			role: true
		}
	})

	return user?.role?.toLowerCase() === "admin"
}

export const createUser = async (
	username: string,
	password: string,
	server密码?: string
) => {
	if (!username || !password) {
		throw new Error("Missing param")
	}

	if (
		config.registration_password &&
		server密码 !== config.registration_password
	) {
		throw new Error("Wrong registration password")
	}

	return {
		// user,
		// token
	}
}

// all of prisma.post.findUnique
type GetPostByIdOptions = Pick<Prisma.PostFindUniqueArgs, "include" | "select">

export const getPostById = async (
	postId: ServerPost["id"],
	options?: GetPostByIdOptions
) => {
	const post = await prisma.post.findUnique({
		where: {
			id: postId
		},
		...options
	})

	return post
}

export const getAllPosts = async (
	options?: Prisma.PostFindManyArgs
): Promise<
	ServerPost[] | ServerPostWith文件[] | ServerPostWith文件AndAuthor[]
> => {
	const posts = await prisma.post.findMany(options)
	return posts
}

export const userWithPosts = Prisma.validator<Prisma.UserArgs>()({
	include: {
		posts: true
	}
})

export type UserWithPosts = Prisma.UserGetPayload<typeof userWithPosts>

export const getAllUsers = async (
	options?: Prisma.UserFindManyArgs
): Promise<ServerUser[] | UserWithPosts[]> => {
	const users = (await prisma.user.findMany({
		select: {
			id: true,
			email: true,
			role: true,
			display名称: true,
			posts: true,
			createdAt: true
		},
		...options
	})) as ServerUser[] | UserWithPosts[]

	return users
}

export const searchPosts = async (
	query: string,
	{
		userId
	}: {
		userId?: ServerUser["id"]
	} = {}
): Promise<ServerPostWith文件[]> => {
	const posts = await prisma.post.findMany({
		where: {
			OR: [
				{
					title: {
						contains: query
					},
					authorId: userId,
					visibility: userId ? undefined : "public"
				},
				{
					files: {
						some: {
							content: {
								in: [Buffer.from(query)]
							}
						}
					},
					visibility: userId ? undefined : "public",
					authorId: userId
				}
			]
		}
	})

	return posts as ServerPostWith文件[]
}

function generateApiToken() {
	return crypto.randomBytes(32).toString("hex")
}

export const createApiToken = async (
	userId: ServerUser["id"],
	name: string
) => {
	const apiToken = await prisma.apiToken.create({
		data: {
			token: generateApiToken(),
			expiresAt: new 日期(日期.now() + 1000 * 60 * 60 * 24 * 30 * 3),
			user: {
				connect: { id: userId }
			},
			name
		}
	})

	return apiToken
}

export function getFileById(fileId: ServerFile["id"]) {
	return prisma.file.findUnique({
		where: {
			id: fileId
		},
		include: {
			post: {
				select: {
					id: true,
					visibility: true
				}
			}
		}
	})
}
