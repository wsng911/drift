// https://www.joshwcomeau.com/snippets/react-components/fade-in/
import React from "react"
import styles from "./fade.module.css"

function FadeIn({
	duration = 300,
	delay = 0,
	children,
	as,
	...delegated
}: {
	duration?: number
	delay?: number
	children: React.React否de
	as?: React.ElementType | JSX.Element
} & React.HTMLAttributes<HTMLElement>) {
	if (as !== null && typeof as === "object") {
		return React.cloneElement(as, {
			class名称: styles.fadeIn,
			style: {
				...(as.props.style || {}),
				animationDuration: duration + "ms",
				animationDelay: delay + "ms"
			}
		})
	}
	const Element = as || "div"
	return (
		<Element
			{...delegated}
			class名称={styles.fadeIn}
			style={{
				...(delegated.style || {}),
				animationDuration: duration + "ms",
				animationDelay: delay + "ms"
			}}
		>
			{children}
		</Element>
	)
}

export default FadeIn
