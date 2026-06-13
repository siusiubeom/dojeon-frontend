import { useQuery } from '@tanstack/react-query'
import { fetchUserMe, UserApiError } from '../services/user.service.ts'
import type { UserMeData } from '../types/user.types.ts'

interface UseUserMeState {
  data: UserMeData | null
  loading: boolean
  error: UserApiError | null
  refetch: () => Promise<void>
}

export function useUserMe(): UseUserMeState {
  const { data, isPending, error, refetch } = useQuery<UserMeData | null, UserApiError>({
    queryKey: ['user', 'me'],
    queryFn: ({ signal }) => fetchUserMe(signal),
  })

  return {
    data: data ?? null,
    loading: isPending,
    error: error ?? null,
    refetch: async () => {
      await refetch()
    },
  }
}
