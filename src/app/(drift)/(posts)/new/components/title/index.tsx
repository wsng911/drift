import { ChangeEvent, memo } from "react"

import { Input } from "@components/input"

const titlePlaceholders = [
	"How to...",
	"状态 update for ...",
	"My new project",
	"My new idea",
	"Let's talk about...",
	"What's up with ...",
	"I'm thinking about ..."
]

const placeholder = titlePlaceholders[3]

type props = {
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	title?: string
	class名称?: string
}

function 标题({ onChange, title, class名称 }: props) {
	return (
		<div class名称={class名称}>
			<Input
				placeholder={placeholder}
				value={title}
				onChange={onChange}
				label="标题"
			/>
		</div>
	)
}

export default memo(标题)
