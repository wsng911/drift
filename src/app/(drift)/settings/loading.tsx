import { Page标题 } from "@components/page-title"
import { PageWrapper } from "@components/page-wrapper"
import 设置Group from "@components/settings-group"

export default function 设置Loading() {
	return (
		<>
			<Page标题>设置</Page标题>
			<PageWrapper>
				<设置Group skeleton />
				<设置Group skeleton />
			</PageWrapper>
		</>
	)
}
