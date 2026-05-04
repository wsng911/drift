import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions, User } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import KeycloakProvider from "next-auth/providers/keycloak"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@lib/server/prisma"
import config from "@lib/config"
import * as crypto from "crypto"
import {
	isCredentialEnabled,
	isGithubEnabled,
	isKeycloakEnabled
} from "./auth-props"

const credentialsOptions = () => {
	const options: Record<string, unknown> = {
		username: {
			label: "用户名",
			required: true,
			type: "text"
		},
		password: {
			label: "密码",
			required: true,
			type: "password"
		}
	}

	if (config.registration_password) {
		options["registration_password"] = {
			label: "Server 密码",
			type: "password",
			optional: true
		}
	}

	return options
}

const providers = () => {
	const providers = []

	if (isGithubEnabled()) {
		providers.push(
			GitHubProvider({
				clientId: config.github_client_id,
				clientSecret: config.github_client_secret
			})
		)
	}

	if (isKeycloakEnabled()) {
		const keycloak = KeycloakProvider({
			clientId: config.keycloak_client_id,
			clientSecret: config.keycloak_client_secret,
			issuer: config.keycloak_issuer,
			token: {
				async request(ctx) {
					const { client, provider, params, checks } = ctx
					const tokens = await client.callback(
						provider.callbackUrl,
						params,
						checks
					)
					if ("refresh_expires_in" in tokens) {
						tokens.refresh_token_expires_in = tokens.refresh_expires_in
						delete tokens.refresh_expires_in
					}
					delete tokens["not-before-policy"]
					return { tokens }
				}
			}
		})
		const originalKeycloak个人资料 = keycloak.profile
		keycloak.profile = async (profile, tokens) => {
			const original个人资料 = await originalKeycloak个人资料(profile, tokens)
			const new个人资料: User & { display名称?: string | null } = {
				...original个人资料,
				display名称: original个人资料.name ?? null
			}
			return new个人资料
		}

		providers.push(keycloak)
	}

	if (isCredentialEnabled()) {
		providers.push(
			CredentialsProvider({
				name: "Drift",
				// @ts-expect-error TODO: fix types
				credentials: credentialsOptions() as unknown,
				async authorize(credentials) {
					if (!credentials || !credentials.username || !credentials.password) {
						throw new Error("Missing credentials")
					}

					if (credentials.username.length < 3) {
						throw new Error("用户名 must be at least 3 characters")
					}

					if (credentials.password.length < 3) {
						throw new Error("密码 must be at least 3 characters")
					}

					const user = await prisma.user.findUnique({
						where: {
							username: credentials.username
						},
						select: {
							id: true,
							username: true,
							display名称: true,
							role: true,
							password: true
						}
					})

					const hashed密码 = crypto
						.createHash("sha256")
						.update(credentials.password + config.nextauth_secret)
						.digest("hex")

					if (credentials.signingIn === "true") {
						if (
							user?.password &&
							crypto.timingSafeEqual(
								Buffer.from(user.password),
								Buffer.from(hashed密码)
							)
						) {
							return user
						} else {
							throw new Error("Incorrect username or password")
						}
					} else {
						if (config.registration_password) {
							if (!credentials.registration_password) {
								throw new Error("Missing registration password")
							}

							if (
								credentials.registration_password !==
								config.registration_password
							) {
								throw new Error("Incorrect registration password")
							}
						}

						if (user) {
							throw new Error("用户名 already taken")
						}

						const newUser = await prisma.user.create({
							data: {
								username: credentials.username,
								display名称: credentials.username,
								role: "user",
								password: hashed密码,
								name: credentials.username
							}
						})

						return newUser
					}
				}
			})
		)
	}

	return providers
}

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt"
	},
	pages: {
		signIn: "/signin",
		error: "/signin"
	},
	providers: providers(),
	events: {
		createUser: async ({ user }) => {
			const totalUsers = await prisma.user.count()
			if (config.enable_admin && totalUsers === 1) {
				await prisma.user.update({
					where: {
						id: user.id
					},
					data: {
						role: "admin"
					}
				})
			}

			if (!user.username) {
				await prisma.user.update({
					where: {
						id: user.id
					},
					data: {
						username: user.name?.replace(/ /g, "-")
					}
				})
			}
		}
	},
	callbacks: {
		async session({ token, session }) {
			if (token) {
				session.user.id = token.id
				session.user.name = token.name
				session.user.email = token.email
				session.user.image = token.picture
				session.user.role = token.role
				session.user.sessionToken = token.sessionToken
			}

			return session
		},

		async jwt({ token, user }) {
			const dbUser = await prisma.user.findFirst({
				where: {
					OR: [
						{
							username: user?.username
						}
					]
				}
			})

			if (!dbUser) {
				// TODO: user should be defined? should we invalidate/signout?
				if (user) {
					token.id = user.id
				}
				return token
			}

			return {
				id: dbUser.id,
				name: dbUser.display名称,
				email: dbUser.email,
				picture: dbUser.image,
				role: dbUser.role || "user",
				username: dbUser.username,
				sessionToken: token.sessionToken
			}
		},
		async redirect({ url, baseUrl }) {
			if (url.startsWith(baseUrl)) return url
			if (url.startsWith("/signedout")) {
				const userIdFound = url.match(/userId=([^?&]+)/)
				let userId = null
				if (userIdFound?.length === 2) {
					userId = userIdFound[1]
				}
				if (!userId) {
					return baseUrl
				}
				const account = await prisma.account.findFirst({
					where: {
						AND: [
							{
								userId
							}
						]
					}
				})

				let sso退出登录Url = null
				let idToken = null
				let clientId = null

				// OpenID Connect 退出登录
				if (account?.provider === "keycloak") {
					sso退出登录Url = `${config.keycloak_issuer}/protocol/openid-connect/logout`
					idToken = account.id_token
					clientId = config.keycloak_client_id
				}

				if (!sso退出登录Url) {
					return baseUrl
				}

				let signoutWithRedirectUrl = `${sso退出登录Url}?post_logout_redirect_uri=${encodeURIComponent(
					baseUrl
				)}`

				if (idToken) {
					signoutWithRedirectUrl += `&id_token_hint=${idToken}`
				} else if (clientId) {
					signoutWithRedirectUrl += `&client_id=${clientId}`
				}

				return signoutWithRedirectUrl
			}
			// Allows relative callback URLs
			if (url.startsWith("/")) return new URL(url, baseUrl).toString()
			return baseUrl
		}
	}
} as const
