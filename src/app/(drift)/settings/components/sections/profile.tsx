"use client"

import { Button } from "@components/button"
import { Input } from "@components/input"
import 否te from "@components/note"
import { useToasts } from "@components/toasts"
import { useSessionSWR } from "@lib/use-session-swr"
import { useEffect, useState } from "react"
import styles from "./profile.module.css"
import useSWR from "swr"
import { User } from "@prisma/client"

function 个人资料() {
	const { session } = useSessionSWR()
	const { data: userData } = useSWR<User>(
		session?.user?.id ? `/api/user/${session?.user?.id}` : null
	)
	const [name, set名称] = useState<string>(userData?.display名称 || "")
	const [submitting, set提交ting] = useState<boolean>(false)
	const { setToast } = useToasts()

	useEffect(() => {
		if (!name && userData?.display名称) {
			set名称(userData?.display名称)
		}
	}, [name, userData?.display名称])

	const handle名称Change = (e: React.ChangeEvent<HTMLInputElement>) => {
		set名称(e.target.value)
	}

	const on提交 = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!name) {
			setToast({
				message: "Please fill out at least one field",
				type: "error"
			})
			return
		}
		set提交ting(true)

		const data = {
			display名称: name
		}

		const res = await fetch(`/api/user/${session?.user?.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})

		set提交ting(false)

		if (res.status === 200) {
			setToast({
				message: "个人资料 updated",
				type: "success"
			})
		} else {
			setToast({
				message: "Something went wrong updating your profile",
				type: "error"
			})
		}
	}

	/* if we have their email, they signed in with OAuth */
	// const imageViaOauth = Boolean(session?.user.email)
	// const TooltipComponent = ({ children }: { children: React.React否de }) =>
	// 	imageViaOauth ? (
	// 		<Tooltip content="Change your profile image on your OAuth provider">
	// 			{children}
	// 		</Tooltip>
	// 	) : (
	// 		<>{children}</>
	// 	)
	return (
		<>
			<否te type="warning">
				Your display name is publicly available on your profile.
			</否te>
			<form on提交={on提交} class名称={styles.form}>
				<div>
					<label htmlFor="display名称">Display name</label>
					<Input
						id="display名称"
						width={"100%"}
						placeholder="my name"
						value={name || ""}
						onChange={handle名称Change}
						aria-label="Display name"
						minLength={1}
						maxLength={32}
					/>
				</div>
				<div>
					<label htmlFor="email">邮箱</label>
					<Input
						id="email"
						type="email"
						width={"100%"}
						placeholder="my@email.io"
						value={session?.user.email || ""}
						disabled
						aria-label="邮箱"
					/>
				</div>
				{/* <div>
                <label htmlFor="image">User Avatar</label>
                {user.image ? (
                    <Input
                        id="image"
                        type="file"
                        width={"100%"}
                        placeholder="my image"
                        disabled
                        aria-label="Image"
                        src={user.image}
                    />
                ) : (
                    <UserIcon />
                )}
                <TooltipComponent>
                    <div class名称={styles.upload}>
                        <input
                            type="file"
                            disabled={imageViaOauth}
                            class名称={styles.uploadInput}
                        />
                        <Button
                            type="button"
                            disabled={imageViaOauth}
                            width="100%"
                            class名称={styles.uploadButton}
                            aria-hidden="true"
                        >
                            Upload
                        </Button>
                    </div>
                </TooltipComponent>
            </div> */}
				<Button type="submit" disabled={!name} loading={submitting}>
					提交
				</Button>
			</form>
		</>
	)
}

export default 个人资料
