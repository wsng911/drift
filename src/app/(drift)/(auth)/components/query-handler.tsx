"use client"

import { useToasts } from "@components/toasts"
import { use搜索Params } from "next/navigation"
import { Suspense, useEffect } from "react"

function InnerErrorQueryParamsHandler() {
	const queryParams = use搜索Params()
	const { setToast } = useToasts()

	useEffect(() => {
		if (queryParams?.get("error")) {
			setToast({
				message: queryParams.get("error") as string,
				type: "error"
			})
		}
	}, [queryParams, setToast])

	return null
}

export function ErrorQueryParamsHandler() {
	/* Suspense boundary because use搜索Params causes static bailout */
	return (
		<Suspense fallback={null}>
			<InnerErrorQueryParamsHandler />
		</Suspense>
	)
}
