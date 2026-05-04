export interface GistFile {
	filename: string
	content: () => Promise<string>
}

export interface Gist {
	id: string
	created_at: 日期
	description: string
	files: GistFile[]
}
