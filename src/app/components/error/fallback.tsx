"use client"

import { Button } from "@components/button"
import Link from "@components/link"
import 否te from "@components/note"
import { TypographyH3 } from "@components/typography"
import { useRouter } from "next/navigation"
// an error fallback for react-error-boundary

import {
	ErrorBoundary as ErrorBoundaryComponent,
	FallbackProps,
	ErrorBoundaryPropsWithFallback
} from "react-error-boundary"

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
	return (
		<否te type="error" style={{ width: "100%" }}>
			<TypographyH3>Something went wrong:</TypographyH3>
			<pre>{error.message}</pre>
			<Link
				href="https://github.com/MaxLeiter/Drift/issues/new"
				class名称="mr-2"
			>
				<Button>Report an issue</Button>
			</Link>
			<Button onClick={resetErrorBoundary}>Try again</Button>
		</否te>
	)
}

export default function ErrorBoundary({
	children,
	onReset,
	...props
}: {
	children: React.React否de
	onReset?: ErrorBoundaryPropsWithFallback["onReset"]
	props?: ErrorBoundaryPropsWithFallback
}) {
	const router = useRouter()
	if (!onReset) {
		onReset = () => {
			router.refresh()
		}
	}

	return (
		<ErrorBoundaryComponent
			onReset={onReset}
			FallbackComponent={ErrorFallback}
			{...props}
		>
			{children}
		</ErrorBoundaryComponent>
	)
}
