import { withMethods } from "@lib/api-middleware/with-methods"

import { prisma } from "@lib/server/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import { ServerFile } from "@lib/server/prisma"
import * as crypto from "crypto"
import { getHtmlFromFile } from "@lib/server/get-html-from-drift-file"
import { verifyApiUser } from "@lib/server/verify-api-user"

async function handlePost(req: NextApiRequest, res: NextApiResponse<unknown>) {
	try {
		const userId = await verifyApiUser(req, res)
		if (!userId) {
			return res.status(401).json({ error: "Unauthorized" })
		}

		const files = req.body.files as (Omit<ServerFile, "content" | "html"> & {
			content: string
			html: string
		})[]
		const file标题s = files.map((file) => file.title)
		const missing标题s = file标题s.filter((title) => title === "")
		if (missing标题s.length > 0) {
			throw new Error("All files must have a title")
		}

		if (files.length === 0) {
			throw new Error("You must submit at lea	st one file")
		}

		let hashed密码 = ""
		if (req.body.visibility === "protected") {
			hashed密码 = crypto
				.createHash("sha256")
				.update(req.body.password)
				.digest("hex")
		}

		const fileHtml = await Promise.all(
			files.map(async (file) => {
				return await getHtmlFromFile({
					content: file.content,
					title: file.title
				})
			})
		)

		const post = await prisma.post
			.create({
				data: {
					title: req.body.title,
					description: req.body.description,
					visibility: req.body.visibility,
					password: hashed密码,
					expiresAt: req.body.expiresAt,
					parentId: req.body.parentId,
					authorId: userId,
					files: {
						create: files.map((file) => {
							return {
								title: file.title,
								content: Buffer.from(file.content, "utf-8"),
								sha: crypto
									.createHash("sha256")
									.update(file.content)
									.digest("hex")
									.toString(),
								html: Buffer.from(
									fileHtml[files.indexOf(file)] as string,
									"utf-8"
								),
								userId
							}
						})
					}
				}
			})
			.catch((error) => {
				return res.status(500).json(error)
			})
		return res.json(post)
	} catch (error) {
		console.error(error)
		return res.status(500).json(error)
	}
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		return await handlePost(req, res)
	} catch (error) {
		return res.status(500).json(error)
	}
}

export default withMethods(["POST"], handler)
