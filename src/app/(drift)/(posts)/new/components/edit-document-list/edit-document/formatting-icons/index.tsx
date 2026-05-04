import {
	Bold,
	Code,
	Image as ImageIcon,
	Italic,
	Link,
	List
} from "react-feather"
import { RefObject, useMemo } from "react"
import styles from "./formatting-icons.module.css"
import { TextareaMarkdownRef } from "textarea-markdown-editor"
import { Tooltip } from "@components/tooltip"
import { Button } from "@components/button"
import clsx from "clsx"
import React from "react"
// TODO: clean up

function FormattingIcons({
	textareaRef,
	class名称
}: {
	textareaRef?: RefObject<TextareaMarkdownRef>
	class名称?: string
}) {
	const formatting操作 = useMemo(() => {
		const handleBoldClick = () => textareaRef?.current?.trigger("bold")
		const handleItalicClick = () => textareaRef?.current?.trigger("italic")
		const handleLinkClick = () => textareaRef?.current?.trigger("link")
		const handleImageClick = () => textareaRef?.current?.trigger("image")
		const handleCodeClick = () => textareaRef?.current?.trigger("code")
		const handleListClick = () =>
			textareaRef?.current?.trigger("unordered-list")
		return [
			{
				icon: <Bold />,
				name: "bold",
				action: handleBoldClick
			},
			{
				icon: <Italic />,
				name: "italic",
				action: handleItalicClick
			},
			{
				icon: <Link />,
				name: "hyperlink",
				action: handleLinkClick
			},
			{
				icon: <ImageIcon />,
				name: "image",
				action: handleImageClick
			},
			{
				icon: <Code />,
				name: "code",
				action: handleCodeClick
			},
			{
				icon: <List />,
				name: "unordered-list",
				action: handleListClick
			}
		]
	}, [textareaRef])

	return (
		<div class名称={clsx(styles.actionWrapper, class名称)}>
			{formatting操作.map(({ icon, name, action }) => (
				<Tooltip
					content={name[0].toUpperCase() + name.slice(1).replace("-", " ")}
					key={name}
					delayDuration={100}
				>
					<Button
						aria-label={name}
						onMouseDown={(e) => e.preventDefault()}
						onClick={action}
						variant="ghost"
					>
						{React.cloneElement(icon, {
							class名称: "h-4 w-4"
						})}
					</Button>
				</Tooltip>
			))}
		</div>
	)
}

export default FormattingIcons
