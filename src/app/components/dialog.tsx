"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "react-feather"

import { cn } from "@lib/cn"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = ({
	class名称,
	children,
	...props
}: DialogPrimitive.DialogPortalProps) => (
	<DialogPrimitive.Portal class名称={cn(class名称)} {...props}>
		<div class名称="fixed inset-0 z-50 flex items-start justify-center sm:items-center">
			{children}
		</div>
	</DialogPrimitive.Portal>
)
DialogPortal.display名称 = DialogPrimitive.Portal.display名称

const DialogOverlay = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ class名称, ...props }, ref) => (
	<DialogPrimitive.Overlay
		ref={ref}
		class名称={cn(
			"fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in",
			class名称
		)}
		{...props}
	/>
))
DialogOverlay.display名称 = DialogPrimitive.Overlay.display名称

const DialogContent = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ class名称, children, ...props }, ref) => (
	<DialogPortal>
		<DialogOverlay />
		<DialogPrimitive.Content
			ref={ref}
			class名称={cn(
				"fixed z-50 grid w-full gap-4 rounded-b-lg border bg-background p-6 shadow-lg animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 sm:max-w-lg sm:rounded-lg sm:zoom-in-90 data-[state=open]:sm:slide-in-from-bottom-0",
				class名称
			)}
			{...props}
		>
			{children}
			<DialogPrimitive.关闭 class名称="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
				<X class名称="h-4 w-4" />
				<span class名称="sr-only">关闭</span>
			</DialogPrimitive.关闭>
		</DialogPrimitive.Content>
	</DialogPortal>
))
DialogContent.display名称 = DialogPrimitive.Content.display名称

const DialogHeader = ({
	class名称,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		class名称={cn(
			"flex flex-col space-y-1.5 text-center sm:text-left",
			class名称
		)}
		{...props}
	/>
)
DialogHeader.display名称 = "DialogHeader"

const DialogFooter = ({
	class名称,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		class名称={cn(
			"flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
			class名称
		)}
		{...props}
	/>
)
DialogFooter.display名称 = "DialogFooter"

const Dialog标题 = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.标题>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.标题>
>(({ class名称, ...props }, ref) => (
	<DialogPrimitive.标题
		ref={ref}
		class名称={cn(
			"text-lg font-semibold leading-none tracking-tight",
			class名称
		)}
		{...props}
	/>
))
Dialog标题.display名称 = DialogPrimitive.标题.display名称

const Dialog描述 = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.描述>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.描述>
>(({ class名称, ...props }, ref) => (
	<DialogPrimitive.描述
		ref={ref}
		class名称={cn("text-sm text-muted-foreground", class名称)}
		{...props}
	/>
))
Dialog描述.display名称 = DialogPrimitive.描述.display名称

export {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogFooter,
	Dialog标题,
	Dialog描述
}
