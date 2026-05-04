import { Input } from "@components/input"
import { ChangeEvent } from "react"

import styles from "../post.module.css"
import clsx from "clsx"

type props = {
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	description: string
}

function 描述({ onChange, description }: props) {
	return (
		<div class名称={clsx(styles.description, "pb-4")}>
			<Input
				value={description || ""}
				onChange={onChange}
				label="描述"
				maxLength={256}
				width="100%"
				placeholder="An optional description"
			/>
		</div>
	)
}

export default 描述
