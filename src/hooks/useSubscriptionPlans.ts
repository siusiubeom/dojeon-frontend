import { useQuery } from '@tanstack/react-query'
import {
  fetchSubscriptionPlans,
  SubscriptionApiError,
} from '../services/subscription.service'
import type { SubscriptionPlansData } from '../types/subscription.types'

export function useSubscriptionPlans() {
  return useQuery<SubscriptionPlansData | null, SubscriptionApiError>({
    queryKey: ['subscription', 'plans'],
    // GET /subscription/plan
    queryFn: ({ signal }) => fetchSubscriptionPlans(signal),
  })
}
