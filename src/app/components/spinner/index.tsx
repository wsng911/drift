import { cn } from "@lib/cn"
import styles from "./spinner.module.css"

export const Spinner = ({ class名称 }: { class名称?: string }) => (
	<div class名称={cn(styles.spinner, class名称)} />
)
