"use client"

import { Button } from "@components/button"
import { Input } from "@components/input"
import 否te from "@components/note"
import { Spinner } from "@components/spinner"
import { useToasts } from "@components/toasts"
import {
	SerializedApiToken,
	useApiTokens
} from "src/app/hooks/swr/use-api-tokens"
import { copyToClipboard } from "src/app/lib/copy-to-clipboard"
import { useState } from "react"
import styles from "./api-keys.module.css"
import { useSessionSWR } from "@lib/use-session-swr"
import { TypographyH4 } from "@components/typography"

// need to pass in the accessToken
const APIKeys = ({
	tokens: initialTokens
}: {
	tokens?: SerializedApiToken[]
}) => {
	const { session } = useSessionSWR()
	const { setToast } = useToasts()
	const { data, error, createToken, expireToken } = useApiTokens({
		userId: session?.user?.id,
		initialTokens
	})

	const [submitting, set提交ting] = useState<boolean>(false)
	const [newToken, set新建Token] = useState<string>("")

	const onChange新建Token = (e: React.ChangeEvent<HTMLInputElement>) => {
		set新建Token(e.target.value)
	}

	const on创建TokenClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		set提交ting(true)
		try {
			const createdToken = await createToken(newToken)
			set新建Token("")
			await copyToClipboard(createdToken?.token || "")
			setToast({
				message: "Your new API key has been copied to your clipboard.",
				type: "success"
			})
			set提交ting(false)
		} catch (e) {
			if (e instanceof Error) {
				setToast({
					message: e.message,
					type: "error"
				})
			}
			set提交ting(false)
		}
	}

	const onRevoke = (tokenId: string) => {
		expireToken(tokenId)
		setToast({
			message: "Your API key has been revoked.",
			type: "success"
		})
	}

	const hasError = Boolean(error)
	return (
		<>
			{!hasError && (
				<否te type="info">
					API keys allow you to access the API from 3rd party tools.
				</否te>
			)}
			{hasError && <否te type="error">{error?.message}</否te>}
			<form class名称={styles.form}>
				<TypographyH4>创建 new</TypographyH4>
				<fieldset class名称={styles.fieldset}>
					<Input
						type="text"
						value={newToken}
						onChange={onChange新建Token}
						aria-label="API Key name"
						placeholder="名称"
					/>
					<Button
						onClick={on创建TokenClick}
						disabled={!newToken}
						loading={submitting}
					>
						提交
					</Button>
				</fieldset>
			</form>

			<div class名称={styles.tokens}>
				{data ? (
					data?.length ? (
						<table width={"100%"}>
							<thead>
								<tr>
									<th>名称</th>
									<th>Expires</th>
									<th>删除</th>
								</tr>
							</thead>
							<tbody>
								{data?.map((token) => (
									<tr key={token.id}>
										<td>{token.name}</td>
										<td>{new 日期(token.expiresAt).to日期String()}</td>
										<td>
											<Button type="button" onClick={() => onRevoke(token.id)}>
												Revoke
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<p class名称="p-4 text-center text-muted-foreground">
							否 API keys found.
						</p>
					)
				) : (
					<div style={{ marginTop: "var(--gap-quarter)" }}>
						<Spinner />
					</div>
				)}
			</div>
		</>
	)
}

export default APIKeys
