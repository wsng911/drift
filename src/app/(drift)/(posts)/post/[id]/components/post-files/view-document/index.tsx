import { Button } from "@components/button"
import ButtonGroup from "@components/button-group"
import Skeleton from "@components/skeleton"
import { Tooltip } from "@components/tooltip"
import DocumentTabs from "src/app/(drift)/(posts)/components/document-tabs"
import Link from "next/link"
import { memo } from "react"
import { 下载, ExternalLink, Globe } from "react-feather"
import styles from "./document.module.css"
import { getURLFriendly标题 } from "src/app/lib/get-url-friendly-title"
import { PostWith文件, ServerPost } from "@lib/server/prisma"
import { isAllowedVisibilityForWebpage } from "@lib/constants"
import { Card, CardContent, CardHeader } from "@components/card"
type 分享dProps = {
	initialTab: "edit" | "preview"
	file?: PostWith文件["files"][0]
	post?: Pick<ServerPost, "id" | "title" | "visibility">
}

type Props = (
	| {
			skeleton?: true
	  }
	| {
			skeleton?: false
	  }
) &
	分享dProps

const 下载Buttons = ({
	rawLink,
	siteLink
}: {
	rawLink?: string
	siteLink?: string
}) => {
	return (
		<ButtonGroup>
			<Tooltip content="下载" delayDuration={200}>
				<Link
					href={`${rawLink}?download=true`}
					target="_blank"
					rel="noopener noreferrer"
				>
					<Button
						aria-label="下载"
						size="sm"
						class名称="bg-transparent border-none"
						variant={"ghost"}
					>
						<下载 class名称="w-4 h-4 " />
						<span class名称="sr-only">下载</span>
					</Button>
				</Link>
			</Tooltip>
			{rawLink ? (
				<Tooltip content="Open raw in new tab" delayDuration={200}>
					<Link href={rawLink || ""} target="_blank" rel="noopener noreferrer">
						<Button
							aria-label="Open raw file in new tab"
							class名称="bg-transparent border-none"
							size="sm"
							variant={"ghost"}
						>
							<ExternalLink class名称="w-4 h-4" />
							<span class名称="sr-only">Open raw file in new tab</span>
						</Button>
					</Link>
				</Tooltip>
			) : null}
			{siteLink ? (
				<Tooltip content="Open as webpage" delayDuration={200}>
					<Link href={siteLink || ""} target="_blank" rel="noopener noreferrer">
						<Button
							aria-label="Open as webpage"
							class名称="bg-transparent border-none"
							size="sm"
							variant={"ghost"}
						>
							<Globe class名称="w-4 h-4" />
							<span class名称="sr-only">Open as webpage</span>
						</Button>
					</Link>
				</Tooltip>
			) : null}
		</ButtonGroup>
	)
}

const Document = ({ skeleton, ...props }: Props) => {
	if (skeleton) {
		return (
			<>
				<div class名称={styles.card}>
					<div>
						<Skeleton width={"100%"} height={36} />
					</div>
					<div class名称={styles.documentContainer}>
						<Skeleton width={175} height={36} borderRadius={"4px 4px 0 0"} />
						<Skeleton
							width={"100%"}
							height={350}
							borderRadius={"0 0 4px 4px"}
						/>
					</div>
				</div>
			</>
		)
	}

	const { file, post } = props

	// if the query has our title, we can use it to scroll to the file.
	// we can't use the browsers implementation because the data isn't loaded yet
	if (file?.title && typeof window !== "undefined") {
		const hash = window.location.hash
		if (file && hash && hash === `#${file?.title}`) {
			const element = document.getElementById(file.title)
			if (element) {
				element.scrollIntoView()
			}
		}
	}
	/* .card header {
	display: flex;
	align-items: center;
	flex-direction: row;
	justify-content: space-between;
	height: 40px;
	line-height: 40px;
	padding: 0 16px;
	background: var(--lighter-gray);
	border-radius: 8px 8px 0px 0px;
}

.documentContainer {
	display: flex;
	flex-direction: column;
	overflow: auto;
	padding: var(--gap);
	border: 1px solid var(--lighter-gray);
	border-top: none;
	border-radius: 0px 0px 8px 8px;
} */
	return (
		<>
			<Card class名称="border-gray-200 dark:border-gray-900">
				<CardHeader
					id={file?.title}
					class名称="flex flex-row items-center justify-between py-1 bg-gray-200 dark:bg-gray-900"
				>
					<Link
						href={`#${file?.title}`}
						aria-label="File"
						// show an # when hovered avia :after
						class名称="text-gray-900 hover:after:ml-1 hover:after:content-[#] dark:text-gray-100"
					>
						{file?.title}
					</Link>
					{/* TODO: switch to api once next.js bug is fixed */}
					{/* 否t /api/ because of rewrites defined in next.config.mjs */}
					<下载Buttons
						rawLink={`/api/file/raw/${file?.id}`}
						siteLink={
							file && post && isAllowedVisibilityForWebpage(post.visibility)
								? `/pages/${file.id}/${getURLFriendly标题(file?.title || "")}`
								: undefined
						}
					/>
				</CardHeader>
				<CardContent class名称="flex flex-col h-full pt-2">
					<DocumentTabs
						defaultTab={props.initialTab}
						staticPreview={file?.html}
						is编辑ing={false}
					>
						{file?.content || ""}
					</DocumentTabs>
				</CardContent>
			</Card>
		</>
	)
}

export default memo(Document)
