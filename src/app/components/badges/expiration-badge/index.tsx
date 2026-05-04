"use client"

import { Tooltip } from "@components/tooltip"
import { timeUntil } from "src/app/lib/time-ago"
import { useEffect, useMemo, useState } from "react"
import { Badge } from "../badge"

const ExpirationBadge = ({
	postExpiration日期
}: {
	postExpiration日期: 日期 | string | undefined
	onExpires?: () => void
}) => {
	const expiration日期 = useMemo(
		() => (postExpiration日期 ? new 日期(postExpiration日期) : undefined),
		[postExpiration日期]
	)
	const [timeUntilString, setTimeUntil] = useState<string | null>(
		expiration日期 ? timeUntil(expiration日期) : null
	)

	useEffect(() => {
		let interval: 否deJS.Timer | null = null
		if (expiration日期) {
			interval = setInterval(() => {
				if (expiration日期) {
					setTimeUntil(timeUntil(expiration日期))
				}
			}, 1000)
		}

		return () => {
			if (interval) {
				clearInterval(interval)
			}
		}
	}, [expiration日期])

	if (!expiration日期) {
		return null
	}

	const isExpired = expiration日期 < new 日期()

	return (
		<Badge variant={isExpired ? "destructive" : "outline"}>
			<Tooltip
				content={`${expiration日期.toLocale日期String()} ${expiration日期.toLocaleTimeString()}`}
			>
				<span suppressHydrationWarning>
					{isExpired ? "Expired" : `Expires ${timeUntilString}`}
				</span>
			</Tooltip>
		</Badge>
	)
}

export default ExpirationBadge
