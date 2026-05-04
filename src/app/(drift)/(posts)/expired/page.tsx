import 否te from "@components/note"
import { getMetadata } from "src/app/lib/metadata"

export default function ExpiredPage() {
	return (
		<否te type="error">
			<strong>Error:</strong> The Drift you&apos;re trying to view has expired.
		</否te>
	)
}

export const metadata = getMetadata({
	title: "Post expired",
	hidden: true
})
