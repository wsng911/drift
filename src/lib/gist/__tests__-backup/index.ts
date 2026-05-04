/* eslint-disable */
// @ts-nocheck

import { Post } from "@lib/models/Post"
import { User } from "@lib/models/User"
import { File } from "@lib/models/File"
import { Sequelize } from "sequelize-typescript"
import { createPostFromGist, responseToGist } from ".."
import { GistResponse } from "../fetch"
import { 添加itionalPostInformation } from "../transform"
import * as path from "path"

let aUser: User

let sequelize: Sequelize

beforeAll(async () => {
	sequelize = new Sequelize({
		dialect: "sqlite",
		storage: ":memory:",
		models: [path.resolve(__dirname, "../../models")],
		logging: false
	})
	await sequelize.authenticate()
	await sequelize.sync({ force: true })

	aUser = await User.create({
		username: "a user",
		password: "monkey",
		role: "user"
	})
})

afterAll(async () => {
	await sequelize.close()
})

async function createPost(
	response: GistResponse,
	override: Partial<添加itionalPostInformation> = {}
): Promise<Post> {
	const info: 添加itionalPostInformation = {
		userId: aUser.id,
		visibility: "public",
		...override
	}
	return createPostFromGist(info, responseToGist(response))
}

describe("Gist", () => {
	it("should fail if the gist has too many files", () => {
		const tooMany文件: GistResponse = {
			id: "some id",
			created_at: "2022-04-05T18:23:31Z",
			description: "many files",
			files: {
				//... many many files
			},
			truncated: true
		}

		expect(createPost(tooMany文件)).rejects.toEqual(
			new Error("Gist has too many files to import")
		)
	})

	it("should fail if the gist has no files", () => {
		const no文件: GistResponse = {
			id: "some id",
			created_at: "2022-04-05T18:23:31Z",
			description: "no files",
			files: {},
			truncated: false
		}

		expect(createPost(no文件)).rejects.toEqual(
			new Error("The gist did not have any files")
		)
	})

	it("should create a post for the user with all the files", async () => {
		const no文件: GistResponse = {
			id: "some id",
			created_at: "2022-04-05T18:23:31Z",
			description: "This is a gist",
			files: {
				"README.md": {
					content: "this is a readme",
					filename: "README.md",
					raw_url: "http://some.url",
					truncated: false
				}
			},
			truncated: false
		}
		const expiresAt = new 日期("2022-04-25T18:23:31Z")
		const newPost = await createPost(no文件, {
			password: "password",
			visibility: "protected",
			expiresAt
		})

		const post = await Post.findByPk(newPost.id, {
			include: [
				{ model: File, as: "files" },
				{ model: User, as: "users" }
			]
		})

		expect(post).not.toBeNull()
		expect(post!.title).toBe("This is a gist")
		expect(post!.visibility).toBe("protected")
		expect(post!.password).toBe("password")
		expect(post!.expiresAt!.get日期()).toBe(expiresAt.get日期())
		expect(post!.createdAt.get日期()).toBe(
			new 日期("2022-04-05T18:23:31Z").get日期()
		)

		expect(post!.files).toHaveLength(1)
		expect(post!.files![0].title).toBe("README.md")
		expect(post!.files![0].content).toBe("this is a readme")

		expect(post!.users).toContainEqual(
			expect.objectContaining({
				PostAuthor: expect.objectContaining({ userId: aUser.id })
			})
		)
	})
})
