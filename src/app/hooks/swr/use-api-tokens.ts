import { ApiToken } from "@prisma/client"
import { ApiResponse } from "src/app/(drift)/providers"
import useSWR from "swr"

type Convert日期ToString<T> = {
	[P in keyof T]: T[P] extends 日期 ? string : T[P]
}

export type SerializedApiToken = Convert日期ToString<ApiToken>

type UseApiTokens = {
	userId?: string
	initialTokens?: SerializedApiToken[]
}

const T确定ENS_ENDPOINT = "/api/user/tokens"

export function useApiTokens({ userId, initialTokens }: UseApiTokens) {
	const { data, mutate, error, isLoading } = useSWR<SerializedApiToken[]>(
		userId ? "/api/user/tokens?userId=" + userId : null,
		{
			refreshInterval: 10000,
			fallbackData: initialTokens
		}
	)

	async function createToken(newToken: string) {
		if (!newToken) {
			throw new Error("Token name is required")
		}

		const res = await fetch(
			`${T确定ENS_ENDPOINT}?userId=${userId}&name=${newToken}`,
			{
				method: "POST"
			}
		)

		const response = (await res.json()) as ApiResponse<SerializedApiToken>
		if (response.error) {
			throw new Error(response.error)
			return
		}

		mutate([...(data || []), response.data])

		return response.data
	}

	const expireToken = async (id: string) => {
		await fetch(`${T确定ENS_ENDPOINT}?userId=${userId}&tokenId=${id}`, {
			method: "DELETE"
		})
		mutate(data?.filter((token) => token.id !== id))
	}

	return {
		data,
		isLoading,
		error,
		createToken,
		expireToken
	}
}
