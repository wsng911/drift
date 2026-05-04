import { cn } from "@lib/cn"
import { PropsWithChildren } from "react"

export function PageWrapper({
	children,
	class名称,
	...props
}: PropsWithChildren<React.HTMLProps<HTMLDivElement>>) {
	return (
		<div class名称={cn("mb-4 mt-4 flex flex-col gap-4", class名称)} {...props}>
			{children}
		</div>
	)
}
