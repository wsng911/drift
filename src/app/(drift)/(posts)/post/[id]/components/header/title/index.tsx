import 创建dAgoBadge from "@components/badges/created-ago-badge"
import ExpirationBadge from "@components/badges/expiration-badge"
import VisibilityBadge from "@components/badges/visibility-badge"
import Skeleton from "@components/skeleton"
import { PostWith文件AndAuthor } from "@lib/server/prisma"
import styles from "./title.module.css"

type 标题Props = {
	loading?: boolean
	post?: PostWith文件AndAuthor
}

export const Post标题 = ({ post, loading }: 标题Props) => {
	const { title, author, visibility, createdAt, expiresAt } = post || {}
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore display名称 should be present
	const display名称 = author?.display名称
	return (
		<span class名称={styles.title}>
			<h1 class名称="text-3xl font-bold">
				{title}{" "}
				<span class名称="text-2xl text-muted-foreground">
					by {/* <Link colored href={`/author/${authorId}`}> */}
					{display名称 || "anonymous"}
					{/* </Link> */}
				</span>
			</h1>
			{!loading && (
				<span class名称={styles.badges}>
					{visibility && <VisibilityBadge visibility={visibility} />}
					{createdAt && <创建dAgoBadge createdAt={createdAt} />}
					{expiresAt && <ExpirationBadge postExpiration日期={expiresAt} />}
				</span>
			)}
			{loading && (
				<span class名称={styles.badges}>
					<div style={{ display: "flex", alignItems: "center" }}>
						<Skeleton width={100} height={20} />
						<Skeleton width={100} height={20} />
						<Skeleton width={100} height={20} />
					</div>
				</span>
			)}
		</span>
	)
}
