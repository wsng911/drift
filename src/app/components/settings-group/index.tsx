import { Card, CardContent, CardHeader, Card标题 } from "@components/card"
import styles from "./settings-group.module.css"

type Props =
	| {
			skeleton: true
			title?: string
			children?: React.React否de
	  }
	| {
			skeleton?: false
			title: string
			children: React.React否de
	  }

const 设置Group = ({ title, children, skeleton }: Props) => {
	if (skeleton) {
		return (
			<Card
				style={{
					height: 365
				}}
			/>
		)
	}

	return (
		<Card>
			<CardHeader>
				<Card标题>{title}</Card标题>
			</CardHeader>
			<hr class名称="pb-4" />
			<CardContent>
				<div class名称={styles.content}>{children}</div>
			</CardContent>
		</Card>
	)
}

export default 设置Group
