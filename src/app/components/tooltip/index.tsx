"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@lib/cn"

const TooltipWrapper = ({
	children,
	content,
	class名称,
	...props
}: {
	children: React.React否de
	content: React.React否de
	class名称?: string
} & TooltipPrimitive.TooltipProps) => {
	return (
		<TooltipProvider>
			<Tooltip {...props}>
				<TooltipTrigger asChild class名称={class名称}>
					{children}
				</TooltipTrigger>

				<TooltipContent>{content}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

// export TooltipWrapper as Tooltip
export { TooltipWrapper as Tooltip }

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
	React.ElementRef<typeof TooltipPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ class名称, sideOffset = 4, ...props }, ref) => (
	<TooltipPrimitive.Content
		ref={ref}
		sideOffset={sideOffset}
		class名称={cn(
			"z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-50 duration-75 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
			class名称
		)}
		{...props}
	/>
))

TooltipContent.display名称 = TooltipPrimitive.Content.display名称
