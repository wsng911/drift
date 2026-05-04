import { PropsWithChildren } from "react"
import { cn } from "@lib/cn"

type ClassProp = { class名称?: string }

export function TypographyH1({
	children,
	class名称
}: PropsWithChildren<ClassProp>) {
	return (
		<h1
			class名称={cn(
				"scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
				class名称
			)}
		>
			{children}
		</h1>
	)
}

export function TypographyH2({
	children,
	class名称
}: PropsWithChildren<ClassProp>) {
	return (
		<h2
			class名称={cn(
				"scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
				class名称
			)}
		>
			{children}
		</h2>
	)
}

export function TypographyH3({
	children,
	class名称
}: PropsWithChildren<ClassProp>) {
	return (
		<h3
			class名称={cn(
				"scroll-m-20 text-2xl font-semibold tracking-tight",
				class名称
			)}
		>
			{children}
		</h3>
	)
}

export function TypographyH4({
	children,
	class名称
}: PropsWithChildren<ClassProp>) {
	return (
		<h4
			class名称={cn(
				"scroll-m-20 text-xl font-semibold tracking-tight",
				class名称
			)}
		>
			{children}
		</h4>
	)
}

export function TypographyP({
	children,
	class名称
}: PropsWithChildren<ClassProp>) {
	return (
		<p class名称={cn("leading-7 [&:not(:first-child)]:mt-6", class名称)}>
			{children}
		</p>
	)
}

export function TypographyBlockquote({
	children,
	class名称
}: PropsWithChildren<ClassProp>) {
	return (
		<blockquote class名称={cn("mt-6 border-l-2 pl-6 italic", class名称)}>
			{children}
		</blockquote>
	)
}

export function TypographyTable({
	children,
	class名称
}: PropsWithChildren<ClassProp>) {
	return (
		<div class名称={cn("my-6 w-full overflow-y-auto", class名称)}>
			<table class名称="w-full">{children}</table>
		</div>
	)
}

export function TableHead({
	children,
	class名称
}: PropsWithChildren<ClassProp>) {
	return (
		<thead class名称={class名称}>
			<tr class名称="m-0 border-t p-0 even:bg-muted">{children}</tr>
		</thead>
	)
}

export function TableBody({
	children,
	class名称
}: PropsWithChildren<ClassProp>) {
	return <tbody class名称={class名称}>{children}</tbody>
}

export function TableHeader({
	children,
	class名称
}: PropsWithChildren<ClassProp>) {
	return (
		<th
			class名称={cn(
				"border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
				class名称
			)}
		>
			{children}
		</th>
	)
}

export function TableRow({
	children,
	class名称
}: PropsWithChildren<ClassProp>) {
	return (
		<tr class名称={cn("m-0 border-t p-0 even:bg-muted", class名称)}>
			{children}
		</tr>
	)
}

export function TableCell({
	children,
	class名称
}: PropsWithChildren<ClassProp>) {
	return (
		<td
			class名称={cn(
				"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
				class名称
			)}
		>
			{children}
		</td>
	)
}

export function TypographyList({
	children,
	class名称
}: PropsWithChildren<ClassProp>) {
	return (
		<ul class名称={cn("my-6 ml-6 list-disc [&>li]:mt-2", class名称)}>
			{children}
		</ul>
	)
}

export function TypographyInlineCode({
	children,
	class名称
}: PropsWithChildren<ClassProp>) {
	return (
		<code
			class名称={cn(
				"relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
				class名称
			)}
		>
			{children}
		</code>
	)
}

export function TypographyLead({
	children,
	class名称
}: PropsWithChildren<ClassProp>) {
	return (
		<p class名称={cn("text-xl text-muted-foreground", class名称)}>{children}</p>
	)
}

export function TypographyLarge({
	children,
	class名称
}: PropsWithChildren<ClassProp>) {
	return (
		<div class名称={cn("text-lg font-semibold", class名称)}>{children}</div>
	)
}

export function TypographySmall({
	children,
	class名称
}: PropsWithChildren<ClassProp>) {
	return (
		<small class名称={cn("text-sm font-medium leading-none", class名称)}>
			{children}
		</small>
	)
}

export function TypographyMuted({
	children,
	class名称
}: PropsWithChildren<ClassProp>) {
	return (
		<p class名称={cn("text-sm text-muted-foreground", class名称)}>{children}</p>
	)
}
