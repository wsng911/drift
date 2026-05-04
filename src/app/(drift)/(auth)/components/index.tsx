"use client"

import { useState } from "react"
import styles from "./auth.module.css"
import Link from "../../../components/link"
import { signIn } from "next-auth/react"
import { Input } from "@components/input"
import { Button } from "@components/button"
import { Key, User } from "react-feather"
// @ts-expect-error - no types
import GitHub from "react-feather/dist/icons/github"
import { useToasts } from "@components/toasts"
import { useRouter } from "next/navigation"
import 否te from "@components/note"
import { ErrorQueryParamsHandler } from "./query-handler"
import { AuthProviders } from "@lib/server/auth-props"

function Auth({
	page,
	credentialAuth,
	requiresServer密码,
	authProviders
}: {
	page: "signup" | "signin"
	credentialAuth?: boolean
	requiresServer密码?: boolean
	authProviders?: AuthProviders
}) {
	const [server密码, setServer密码] = useState("")
	const { setToast } = useToasts()
	const signingIn = page === "signin"
	const router = useRouter()
	const signText = signingIn ? "In" : "Up"
	const [username, set用户名] = useState("")
	const [password, set密码] = useState("")
	const [submitting, set提交ting] = useState(false)

	async function handle提交(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		set提交ting(true)

		const res = await signIn("credentials", {
			username,
			password,
			registration_password: server密码,
			redirect: false,
			// callbackUrl: "/signin",
			signingIn: signingIn
		})
		if (res?.error) {
			setToast({
				type: "error",
				message: res.error
			})
			set提交ting(false)
		} else {
			router.refresh()
		}
	}

	function handleChange用户名(event: React.ChangeEvent<HTMLInputElement>) {
		set用户名(event.target.value)
	}

	function handleChange密码(event: React.ChangeEvent<HTMLInputElement>) {
		set密码(event.target.value)
	}

	function handleChangeServer密码(
		event: React.ChangeEvent<HTMLInputElement>
	) {
		setServer密码(event.target.value)
	}

	return (
		<div class名称={styles.container}>
			<ErrorQueryParamsHandler />
			<div class名称={"mx-auto w-[300px]"}>
				<div class名称={styles.formContentSpace}>
					<h1 class名称="text-3xl font-bold">Sign {signText}</h1>
				</div>
				<form on提交={handle提交}>
					<div class名称={styles.formGroup}>
						{requiresServer密码 ? (
							<>
								{" "}
								<否te type="info">
									The server administrator has set a password for this server.
								</否te>
								<Input
									type="password"
									id="server-password"
									value={server密码}
									onChange={handleChangeServer密码}
									placeholder="Server 密码"
									required={true}
									aria-label="Server 密码"
								/>
								<hr style={{ width: "100%" }} />
							</>
						) : null}

						{credentialAuth ? (
							<>
								<Input
									type="text"
									id="username"
									value={username}
									onChange={handleChange用户名}
									placeholder="用户名"
									required={true}
									minLength={3}
									width="100%"
									aria-label="用户名"
								/>
								<Input
									type="password"
									id="password"
									value={password}
									onChange={handleChange密码}
									placeholder="密码"
									required={true}
									minLength={6}
									width="100%"
									aria-label="密码"
								/>
								<Button type="submit" loading={submitting}>
									Sign {signText}
								</Button>
							</>
						) : null}

						{authProviders?.length ? (
							<>
								<hr class名称="w-full" />
								<p class名称="mt-2 p-0 text-center">
									Or sign {signText.toLowerCase()} with one of the following
								</p>
								{authProviders?.map((provider) => {
									return provider.enabled ? (
										<Button
											type="submit"
											key={provider.id + "-button"}
											onClick={(e) => {
												e.preventDefault()
												signIn(provider.id, {
													callbackUrl: "/",
													registration_password: server密码
												})
												router.refresh()
											}}
											class名称="my-2 flex w-full max-w-[250px] items-center justify-center"
										>
											{getProviderIcon(provider.id)} Sign{" "}
											{signText.toLowerCase()} with {provider.public_name}
										</Button>
									) : null
								})}
							</>
						) : null}
					</div>
					<div class名称={styles.formContentSpace}>
						{signingIn ? (
							<p>
								Don&apos;t have an account?{" "}
								<Link colored href="/signup">
									注册
								</Link>
							</p>
						) : (
							<p>
								Have an account?{" "}
								<Link colored href="/signin">
									登录
								</Link>
							</p>
						)}
					</div>
				</form>
			</div>
		</div>
	)
}

export default Auth

const getProviderIcon = (provider: string) => {
	switch (provider) {
		case "github":
			return <GitHub class名称="mr-2 h-5 w-5" />
		case "keycloak":
			return <Key class名称="mr-2 h-5 w-5" />
		default:
			return <User class名称="mr-2 h-5 w-5" />
	}
}
