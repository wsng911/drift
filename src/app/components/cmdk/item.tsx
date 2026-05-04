import { CommandItem } from "@components/cmdk/cmdk"

export default function Item({
	children,
	shortcut,
	onSelect,
	icon
}: {
	children: React.React否de
	shortcut?: string
	onSelect: (value: string) => void
	icon: React.React否de
}): JSX.Element {
	return (
		<CommandItem onSelect={onSelect}>
			{icon}
			{children}
			{shortcut ? (
				<div cmdk-shortcuts="">
					{shortcut.split(" ").map((key) => {
						return <kbd key={key}>{key}</kbd>
					})}
				</div>
			) : null}
		</CommandItem>
	)
}
