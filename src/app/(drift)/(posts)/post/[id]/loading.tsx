import DocumentComponent from "./components/post-files/view-document"
import styles from "./layout.module.css"

export default function PostLoading() {
	return (
		<>
			<div class名称={styles.header}>
				<DocumentComponent skeleton initialTab="preview" />
			</div>
		</>
	)
}
