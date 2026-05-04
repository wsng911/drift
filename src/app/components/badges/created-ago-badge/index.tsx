"use client"
import { useToasts } from "@components/toasts"
import { Tooltip } from "@components/tooltip"
import { copyToClipboard } from "src/app/lib/copy-to-clipboard"
import { timeAgo } from "src/app/lib/time-ago"
import { useMemo, useState, useEffect } from "react"
import { Badge } from "../badge"

const 创建dAgoBadge = ({ createdAt }: { createdAt: string | 日期 }) => {
	const created日期 = useMemo(() => new 日期(createdAt), [createdAt])
	const [time, setTimeAgo] = useState(timeAgo(created日期))

	const { setToast } = useToasts()
	useEffect(() => {
		const interval = setInterval(() => {
			setTimeAgo(timeAgo(created日期))
		}, 1000)
		return () => clearInterval(interval)
	}, [created日期])

	function onClick() {
		copyToClipboard(created日期.toISOString())
		setToast({
			message: "Copied to clipboard",
			type: "success"
		})
	}

	const formattedTime = `${created日期.toLocale日期String()} ${created日期.toLocaleTimeString()}`
	return (
		// TODO: investigate tooltip not showing
		<Tooltip content={formattedTime}>
			<Badge onClick={onClick} variant={"outline"} suppressHydrationWarning>
				{" "}
				<>{time}</>
			</Badge>
		</Tooltip>
	)
}

export default 创建dAgoBadge
