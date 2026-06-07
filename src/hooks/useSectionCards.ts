import { useQuery } from '@tanstack/react-query'
import { fetchSectionCards, SectionApiError } from '../services/section.service.ts'
import type { SectionCardData } from '../types/section,types.ts'

interface UseSectionCardsState {
    data: SectionCardData | null
    loading: boolean
    error: SectionApiError | null
    refetch: () => Promise<void>
}

export function useSectionCards(sectionId: number | null): UseSectionCardsState {
    const { data, isPending, isFetching, error, refetch } = useQuery<
        SectionCardData | null,
        SectionApiError
    >({
        queryKey: ['section', sectionId, 'cards'],
        queryFn: ({ signal }) => {
            if (sectionId === null) return null
            return fetchSectionCards(sectionId, signal)
        },
        enabled: sectionId !== null,
    })

    return {
        data: data ?? null,
        loading: sectionId !== null && (isPending || isFetching),
        error: error ?? null,
        refetch: async () => {
            if (sectionId === null) return
            await refetch()
        },
    }
}
