import clsx from "clsx"
import styles from "./note.module.css"

const 否te = ({
	type = "info",
	children,
	class名称,
	...props
}: {
	type: "info" | "warning" | "error"
	children: React.React否de
} & React.ComponentProps<"div">) => (
	<div
		class名称={clsx(class名称, styles.note, styles[type], "text-sm")}
		{...props}
	>
		{children}
	</div>
)

export default 否te
