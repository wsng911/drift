import { Input } from "@components/input"
import 否te from "@components/note"
import { MouseEventHandler, useState } from "react"
import styles from "./modal.module.css"
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialog描述,
	AlertDialog标题,
	AlertDialogAction,
	AlertDialog取消,
	AlertDialogFooter
} from "@components/alert-dialog"

type Props = {
	creating: boolean
	isOpen: boolean
	on关闭: () => void
	on提交: (password: string) => void
}

const 密码Modal = ({
	isOpen,
	on关闭,
	on提交: on提交AfterVerify,
	creating
}: Props) => {
	const [password, set密码] = useState<string>("")
	const [confirm密码, set确认密码] = useState<string>("")
	const [error, setError] = useState<string>()

	const on提交: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault()
		if (!password || (creating && !confirm密码)) {
			setError("Please enter a password")
			return
		}

		if (password !== confirm密码 && creating) {
			setError("密码s do not match")
			return
		}

		on提交AfterVerify(password)
	}

	return (
		<>
			{
				<AlertDialog
					open={isOpen}
					onOpenChange={(open) => {
						if (!open) on关闭()
					}}
				>
					{/* <AlertDialogOverlay class名称={styles.overlay} /> */}
					<AlertDialogContent onEscapeKeyDown={on关闭}>
						<AlertDialogHeader>
							<AlertDialog标题>
								{creating ? "添加 a password" : "Enter password"}
							</AlertDialog标题>
							<AlertDialog描述>
								{creating
									? "Enter a password to protect your post"
									: "Enter the password to access the post"}
							</AlertDialog描述>
						</AlertDialogHeader>
						<fieldset class名称={styles.fieldset}>
							{!error && creating && (
								<否te type="warning">
									This doesn&apos;t protect your post from the server
									administrator.
								</否te>
							)}
							{error && <否te type="error">{error}</否te>}
							<Input
								width={"100%"}
								label="密码"
								type="password"
								placeholder="密码"
								value={password}
								onChange={(e) => set密码(e.currentTarget.value)}
							/>
							{creating && (
								<Input
									width={"100%"}
									label="确认"
									type="password"
									placeholder="确认 密码"
									value={confirm密码}
									onChange={(e) => set确认密码(e.currentTarget.value)}
								/>
							)}
						</fieldset>
						<AlertDialogFooter>
							<AlertDialog取消 onClick={on关闭}>取消</AlertDialog取消>
							<AlertDialogAction onClick={on提交}>提交</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			}
		</>
	)
}

export default 密码Modal
