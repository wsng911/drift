import VisibilityBadge from "../badges/visibility-badge"
import FadeIn from "@components/fade-in"
import ExpirationBadge from "@components/badges/expiration-badge"
import 创建dAgoBadge from "@components/badges/created-ago-badge"
import { useRouter } from "next/navigation"
import styles from "./list-item.module.css"
import Link from "@components/link"
import type { PostWith文件 } from "@lib/server/prisma"
import { Badge } from "@components/badges/badge"
import {
	Card,
	CardContent,
	Card描述,
	CardHeader,
	Card标题
} from "@components/card"
import {
	ArrowUpCircle,
	Code,
	Database,
	编辑,
	FileText,
	MoreVertical,
	Terminal,
	Trash
} from "react-feather"
import { codeFileExtensions } from "@lib/constants"
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@components/dropdown-menu"
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu"

// TODO: isOwner should default to false so this can be used generically
const ListItem = ({
	post,
	isOwner,
	deletePost,
	hide操作
}: {
	post: PostWith文件
	isOwner?: boolean
	deletePost: () => void
	hide操作?: boolean
}) => {
	const router = useRouter()

	const editA复制 = () => {
		router.push(`/new/from/${post.id}`)
	}

	const viewParentClick = () => {
		router.push(`/post/${post.parentId}`)
	}

	const getIconFromFilename = (filename: string) => {
		const extension = filename.split(".").pop()
		switch (extension) {
			case "sql":
				return <Database />
			case "sh":
			case "fish":
			case "bash":
			case "zsh":
			case ".zshrc":
			case ".bashrc":
			case ".bash_profile":
				return <Terminal />
			default:
				if (codeFileExtensions.includes(extension || "")) {
					return <Code />
				} else {
					return <FileText />
				}
		}
	}

	return (
		<FadeIn key={post.id} as="li">
			<Card class名称="overflow-y-scroll h-42">
				<CardHeader>
					<Card标题 class名称="flex items-center justify-between gap-2">
						<span class名称={styles.titleText}>
							<h4 style={{ display: "inline-block", margin: 0 }}>
								<Link
									colored
									style={{ marginRight: "var(--gap)" }}
									href={`/post/${post.id}`}
								>
									{post.title}
								</Link>
							</h4>
							<div class名称={styles.badges}>
								<VisibilityBadge visibility={post.visibility} />
								<Badge variant={"outline"}>
									{post.files?.length === 1
										? "1 file"
										: `${post.files?.length || 0} files`}
								</Badge>
								<创建dAgoBadge createdAt={post.createdAt} />
								<ExpirationBadge postExpiration日期={post.expiresAt} />
							</div>
						</span>
						{!hide操作 ? (
							<span class名称="flex gap-2">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<MoreVertical class名称="cursor-pointer" />
									</DropdownMenuTrigger>
									<DropdownMenuContent class名称="mt-2 border rounded-md shadow-sm border-border bg-background">
										<DropdownMenuItem
											onSelect={() => {
												editA复制()
											}}
											class名称="cursor-pointer bg-background"
										>
											<编辑 class名称="w-4 h-4 mr-2" /> 编辑 a copy
										</DropdownMenuItem>
										{isOwner && (
											<DropdownMenuItem
												onSelect={() => {
													deletePost()
												}}
												class名称="cursor-pointer bg-background"
											>
												<Trash class名称="w-4 h-4 mr-2" />
												删除
											</DropdownMenuItem>
										)}
										{post.parentId && (
											<DropdownMenuItem
												onSelect={() => {
													viewParentClick()
												}}
											>
												<ArrowUpCircle class名称="w-4 h-4 mr-2" />
												View parent
											</DropdownMenuItem>
										)}
									</DropdownMenuContent>
								</DropdownMenu>
							</span>
						) : null}
					</Card标题>
					{post.description && (
						<Card描述>
							<p class名称={styles.oneline}>{post.description}</p>
						</Card描述>
					)}
				</CardHeader>
				<CardContent>
					<ul class名称={styles.files}>
						{post?.files?.map(
							(file: Pick<PostWith文件, "files">["files"][0]) => {
								return (
									<li key={file.id} class名称="text-black">
										<Link
											colored
											href={`/post/${post.id}#${file.title}`}
											class名称="flex items-center gap-2 font-mono text-sm text-foreground"
										>
											{getIconFromFilename(file.title)}
											{file.title || "Untitled file"}
										</Link>
									</li>
								)
							}
						)}
					</ul>
				</CardContent>
			</Card>
		</FadeIn>
	)
}

export default ListItem
