import { useMutation, useQueryClient } from '@tanstack/react-query'
import { patchUserMe, UserApiError } from '../services/user.service.ts'
import type { PatchUserData, PatchUserRequest } from '../types/user.types.ts'

export function useUpdateUserMe() {
  const queryClient = useQueryClient()

  return useMutation<PatchUserData | null, UserApiError, PatchUserRequest>({
    mutationFn: (payload) => patchUserMe(payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['user', 'me'] }),
        queryClient.invalidateQueries({ queryKey: ['home'] }),
      ])
    },
  })
}
