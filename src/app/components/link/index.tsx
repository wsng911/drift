import NextLink from "next/link"
import { cn } from "@lib/cn"

type LinkProps = {
	colored?: boolean
	children: React.React否de
} & React.ComponentProps<typeof NextLink>

const Link = ({ colored, class名称, children, ...props }: LinkProps) => {
	const classes = colored ? "text-blue-500 dark:text-blue-400 hover:underline" : "hover:underline"
	return (
		<NextLink {...props} class名称={cn(classes, class名称)}>
			{children}
		</NextLink>
	)
}

export default Link
