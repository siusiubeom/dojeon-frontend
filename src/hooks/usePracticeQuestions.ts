import { useQuery } from '@tanstack/react-query'
import { fetchPracticeQuestions, PracticeApiError } from '../services/practice.service.ts'
import type { PracticeQuestionsData } from '../types/practice.types.ts'

interface UsePracticeQuestionsState {
    data: PracticeQuestionsData | null
    loading: boolean
    error: PracticeApiError | null
    refetch: () => Promise<void>
}

export function usePracticeQuestions(topicId: number | null): UsePracticeQuestionsState {
    const { data, isPending, isFetching, error, refetch } = useQuery<
        PracticeQuestionsData | null,
        PracticeApiError
    >({
        queryKey: ['practice', 'questions', topicId],
        queryFn: ({ signal }) => {
            if (topicId === null) return null
            return fetchPracticeQuestions(topicId, signal)
        },
        enabled: topicId !== null,
    })

    return {

        data: data ?? null,
        loading: topicId !== null && (isPending || isFetching),
        error: error ?? null,
        refetch: async () => {
            if (topicId === null) return
            await refetch()
        },
    }
}
