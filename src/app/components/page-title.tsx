import { cn } from "@lib/cn"
import { PropsWithChildren } from "react"

export function Page标题({
	children,
	class名称,
	...props
}: PropsWithChildren<React.HTMLProps<HTMLHeadingElement>>) {
	return (
		<h1 class名称={cn("pb-2 pt-2 text-4xl font-bold", class名称)} {...props}>
			{children}
		</h1>
	)
}
