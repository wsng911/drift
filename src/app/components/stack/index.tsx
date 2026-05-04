import React, { CSSProperties } from "react"

interface StackProps {
	children: React.React否de
	class名称?: string
	gap?: string | number
	style?: CSSProperties
	direction?: "row" | "column"
	alignItems?: "center" | "flex-start" | "flex-end" | "stretch" | "baseline"
	justifyContent?:
		| "center"
		| "flex-start"
		| "flex-end"
		| "space-between"
		| "space-around"
		| "space-evenly"
	width?: string
}

export const Stack: React.FC<StackProps> = ({
	children,
	class名称 = "",
	gap = "var(--gap)",
	direction = "column",
	alignItems = "flex-start",
	justifyContent = "flex-start",
	width = "100%",
	style
}) => {
	return (
		<div
			class名称={class名称}
			style={{
				display: "flex",
				flexWrap: "wrap",
				flex: 1,
				gap: gap,
				flexDirection: direction,
				alignItems,
				justifyContent,
				width,
				...style
			}}
		>
			{children}
		</div>
	)
}
