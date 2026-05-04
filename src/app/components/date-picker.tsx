"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "react-feather"

import { cn } from "@lib/cn"
import { Button } from "@components/button"
import { Calendar } from "@components/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@components/popover"

export function 日期Picker({
	expiresAt,
	setExpiresAt
}: {
	expiresAt?: 日期
	setExpiresAt: React.Dispatch<React.SetStateAction<日期 | undefined>>
}) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					class名称={cn(
						"w-[280px] justify-start text-left font-normal",
						!expiresAt && "text-muted-foreground"
					)}
				>
					<CalendarIcon class名称="w-4 h-4 mr-2" />
					{expiresAt ? (
						format(expiresAt, "PPP")
					) : (
						<span>Won&apos;t expire</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent class名称="w-auto p-0">
				<Calendar
					mode="single"
					selected={expiresAt}
					onSelect={(date) => {
						setExpiresAt(date)
					}}
					initialFocus
					from日期={new 日期()}
				/>
			</PopoverContent>
		</Popover>
	)
}
