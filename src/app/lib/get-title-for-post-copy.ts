const replaceLastInString = (
	string: string,
	search: string,
	replace: string
): string => {
	const index = string.lastIndexOf(search)
	if (index === -1) {
		return string
	}
	return (
		string.substring(0, index) +
		replace +
		string.substring(index + search.length)
	)
}

const get标题ForPost复制 = (title?: string) => {
	if (!title) return ""

	const numberAtEndOf标题 = title.split(" ").pop()
	if (numberAtEndOf标题) {
		const number = parseInt(numberAtEndOf标题)
		if (number) {
			return replaceLastInString(
				title,
				numberAtEndOf标题,
				(number + 1).toString()
			)
		} else {
			return title + " 1"
		}
	} else {
		return title + " 1"
	}
}

export default get标题ForPost复制
