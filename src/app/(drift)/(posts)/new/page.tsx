import { getMetadata } from "src/app/lib/metadata"
import 新建Post from "src/app/(drift)/(posts)/new/components/new"
import { Page标题 } from "@components/page-title"
import { PageWrapper } from "@components/page-wrapper"

export default function 新建() {
	return (
		<>
			<Page标题>新建 Post</Page标题>
			<PageWrapper>
				<新建Post />
			</PageWrapper>
		</>
	)
}

export const metadata = getMetadata({
	title: "新建 post",
	hidden: true
})
