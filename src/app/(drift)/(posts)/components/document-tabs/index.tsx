"use client"

import FormattingIcons from "src/app/(drift)/(posts)/new/components/edit-document-list/edit-document/formatting-icons"
import {
	ChangeEvent,
	ClipboardEvent,
	ComponentProps,
	useRef,
	useState
} from "react"
import TextareaMarkdown, { TextareaMarkdownRef } from "textarea-markdown-editor"
import Preview, { StaticPreview } from "../preview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/tabs"
import { Textarea } from "@components/textarea"

type Props = ComponentProps<typeof Tabs> & {
	is编辑ing: boolean
	defaultTab: "preview" | "edit"
	handleOnContentChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
	onPaste?: (e: ClipboardEvent<HTMLTextAreaElement>) => void
	title?: string
	staticPreview?: string
	children: string
}

export default function DocumentTabs({
	is编辑ing,
	defaultTab,
	handleOnContentChange,
	onPaste,
	title,
	staticPreview: preview,
	children: rawContent,
	...props
}: Props) {
	const code编辑orRef = useRef<TextareaMarkdownRef>(null)
	const [activeTab, setActiveTab] = useState<"preview" | "edit">(defaultTab)
	const handleTabChange = (newTab: string) => {
		if (newTab === "preview") {
			code编辑orRef.current?.focus()
		}
		setActiveTab(newTab as "preview" | "edit")
	}

	return (
		<Tabs {...props} onValueChange={handleTabChange} defaultValue={defaultTab}>
			<TabsList class名称="flex flex-col items-start justify-start sm:flex-row sm:items-center sm:justify-between">
				<div>
					<TabsTrigger value="edit">{is编辑ing ? "编辑" : "Raw"}</TabsTrigger>
					<TabsTrigger value="preview">
						{is编辑ing ? "Preview" : "Rendered"}
					</TabsTrigger>
				</div>
				{is编辑ing && (
					<FormattingIcons
						textareaRef={code编辑orRef}
						class名称={`ml-auto ${
							activeTab === "preview" ? "hidden" : "hidden sm:block"
						}`}
					/>
				)}
			</TabsList>
			<TabsContent value="edit">
				<div
					style={{
						marginTop: 6,
						display: "flex",
						flexDirection: "column"
					}}
				>
					<FormattingIcons
						textareaRef={code编辑orRef}
						class名称={`ml-auto ${
							activeTab === "preview"
								? "hidden"
								: "block text-muted-foreground sm:hidden"
						}`}
					/>
					<TextareaMarkdown.Wrapper ref={code编辑orRef}>
						<Textarea
							readOnly={!is编辑ing}
							onPaste={onPaste ? onPaste : undefined}
							ref={code编辑orRef}
							placeholder=""
							value={rawContent}
							onChange={handleOnContentChange}
							// TODO: Textarea should grow to fill parent if height == 100%
							style={{ flex: 1, minHeight: 350 }}
							// class名称={styles.textarea}
						/>
					</TextareaMarkdown.Wrapper>
				</div>
			</TabsContent>
			<TabsContent value="preview">
				{is编辑ing ? (
					<Preview height={"100%"} title={title}>
						{rawContent}
					</Preview>
				) : (
					<StaticPreview height={"100%"}>{preview || ""}</StaticPreview>
				)}
			</TabsContent>
		</Tabs>
	)
}
