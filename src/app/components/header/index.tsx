"use client"

import Link from "next/link"
import { cn } from "@lib/cn"

import { useSessionSWR } from "@lib/use-session-swr"
import { PropsWithChildren, useEffect, useState } from "react"
import { useSelectedLayoutSegments } from "next/navigation"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Moon, Sun } from "react-feather"
import FadeIn from "@components/fade-in"
import MobileHeader from "./mobile"

export default function Header() {
	const { isAdmin, isAuthenticated } = useSessionSWR()
	const { resolvedTheme, setTheme } = useTheme()
	const [isMounted, setIsMounted] = useState(false)
	const toggleTheme = () => {
		setTheme(resolvedTheme === "dark" ? "light" : "dark")
	}

	useEffect(() => {
		setIsMounted(true)
	}, [])

	return (
		<header class名称="mt-4 flex h-16 items-center justify-start md:justify-between">
			<span class名称="hidden items-center md:flex">
				<Link href="/" class名称="mr-4 flex items-center">
					<Image
						src={"/assets/logo.svg"}
						width={32}
						height={32}
						alt=""
						priority
					/>
					<span class名称="bg-transparent pl-4 text-lg font-bold">Drift</span>
				</Link>
				<nav class名称="flex space-x-4 lg:space-x-6">
					<ul class名称="flex justify-center space-x-4">
						<NavLink href="/home">Home</NavLink>
						<NavLink href="/new" disabled={!isAuthenticated}>
							新建
						</NavLink>
						<NavLink href="/mine" disabled={!isAuthenticated}>
							Yours
						</NavLink>
						<NavLink href="/settings" disabled={!isAuthenticated}>
							设置
						</NavLink>
						{isAdmin && <NavLink href="/admin">Admin</NavLink>}
						{isAuthenticated !== undefined && (
							<>
								{isAuthenticated === true && (
									<NavLink href="/signout">Sign Out</NavLink>
								)}
								{isAuthenticated === false && (
									<NavLink href="/signin">登录</NavLink>
								)}
							</>
						)}
					</ul>
				</nav>
			</span>
			<span class名称="flex items-center justify-center md:hidden">
				<MobileHeader />
			</span>
			{isMounted && (
				<FadeIn>
					<button
						aria-hidden
						class名称="ml-4 flex h-8 w-8 cursor-pointer items-center justify-center font-medium text-muted-foreground transition-colors hover:text-primary md:ml-0"
						onClick={toggleTheme}
						title="Toggle theme"
					>
						{resolvedTheme === "dark" ? (
							<Sun class名称="h-[16px] w-[16px]" />
						) : (
							<Moon class名称="h-[16px] w-[16px]" />
						)}
					</button>
				</FadeIn>
			)}
		</header>
	)
}

type NavLinkProps = PropsWithChildren<{
	href: string
	disabled?: boolean
	active?: boolean
}>

function NavLink({ href, disabled, children }: NavLinkProps) {
	const baseClasses =
		"text-sm text-muted-foreground font-medium transition-colors hover:text-primary"
	const activeClasses = "text-primary border-primary"
	const disabledClasses = "text-gray-600 hover:text-gray-400 cursor-not-allowed"

	const segments = useSelectedLayoutSegments()
	const activeSegment = segments[segments.length - 1]
	const isActive =
		activeSegment === href.slice(1) ||
		// special case / because it's an alias of /home/page.tsx
		(!activeSegment && href === "/home")

	return (
		<Link
			href={href}
			class名称={cn(
				baseClasses,
				isActive && activeClasses,
				disabled && disabledClasses
			)}
		>
			{children}
		</Link>
	)
}
