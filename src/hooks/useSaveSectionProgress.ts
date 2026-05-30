import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
    saveSectionProgress,
    generateIdempotencyKey,
    SectionApiError,
} from '../services/section.service.ts'
import type { SaveProgressData, SaveProgressRequest } from '../types/section,types.ts'

interface SaveProgressVariables {
    sectionId: number
    payload: SaveProgressRequest
    idempotencyKey?: string
}

export function useSaveSectionProgress() {
    const queryClient = useQueryClient()

    return useMutation<SaveProgressData | null, SectionApiError, SaveProgressVariables>({
        mutationFn: ({ sectionId, payload, idempotencyKey }) =>
            saveSectionProgress(sectionId, payload, idempotencyKey ?? generateIdempotencyKey()),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['home'] }),
                queryClient.invalidateQueries({ queryKey: ['learning'] }),
                queryClient.invalidateQueries({ queryKey: ['section'] }),
            ])
        },
    })
}
