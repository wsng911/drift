import { getMetadata } from "src/app/lib/metadata"
import 设置Group from "../../components/settings-group"
import APIKeys from "./components/sections/api-keys"
import 个人资料 from "./components/sections/profile"
import { Page标题 } from "@components/page-title"
import { PageWrapper } from "@components/page-wrapper"

export default async function 设置Page() {
	return (
		<>
			<Page标题>设置</Page标题>
			<PageWrapper>
				<设置Group title="个人资料">
					<个人资料 />
				</设置Group>
				<设置Group title="API Keys">
					<APIKeys />
				</设置Group>
			</PageWrapper>
		</>
	)
}

export const metadata = getMetadata({
	title: "设置",
	hidden: true
})
