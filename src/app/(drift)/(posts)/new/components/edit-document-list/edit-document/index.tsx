import { ChangeEvent, ClipboardEvent, useCallback } from "react"
import styles from "./document.module.css"
import { Button } from "@components/button"
import { Input } from "@components/input"
import DocumentTabs from "src/app/(drift)/(posts)/components/document-tabs"
import { Trash } from "react-feather"
import { Card, CardContent, CardHeader } from "@components/card"

type Props = {
	title?: string
	content?: string
	set标题?: (title: string) => void
	handleOnContentChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
	defaultTab?: "edit" | "preview"
	remove?: () => void
	onPaste?: (e: ClipboardEvent<HTMLTextAreaElement>) => void
}

function Document({
	onPaste,
	remove,
	title,
	content = "",
	set标题,
	defaultTab = "edit",
	handleOnContentChange
}: Props) {
	const on标题Change = useCallback(
		(event: ChangeEvent<HTMLInputElement>) =>
			set标题 ? set标题(event.target.value) : null,
		[set标题]
	)

	const removeFile = useCallback(
		(remove?: () => void) => {
			if (remove) {
				if (content && content.trim().length > 0) {
					const confirmed = window.confirm(
						"Are you sure you want to remove this file?"
					)
					if (confirmed) {
						remove()
					}
				} else {
					remove()
				}
			}
		},
		[content]
	)

	return (
		<Card class名称="min-h-[512px]">
			<CardHeader>
				<div class名称={styles.file名称Container}>
					<Input
						placeholder="MyFile.md"
						value={title}
						onChange={on标题Change}
						label="Filename"
						width={"100%"}
						id={title}
						style={{
							borderTopRightRadius: remove ? 0 : "var(--radius)",
							borderBottomRightRadius: remove ? 0 : "var(--radius)"
						}}
					/>
					{remove && (
						// no left border
						<Button
							onClick={() => removeFile(remove)}
							variant="outline"
							class名称="border-color-[var(--border)] rounded-l-none border-l-0"
						>
							<Trash height={18} />
						</Button>
					)}
				</div>
			</CardHeader>
			<CardContent>
				<DocumentTabs
					is编辑ing={true}
					defaultTab={defaultTab}
					handleOnContentChange={handleOnContentChange}
					// TODO: solve types
					// @ts-expect-error Type 'HTMLDivElement' is missing the following properties from type 'HTMLTextAreaElement': autocomplete, cols, defaultValue, dir名称, and 26 more
					onPaste={onPaste}
					title={title}
				>
					{content}
				</DocumentTabs>
			</CardContent>
		</Card>
	)
}

export default Document
