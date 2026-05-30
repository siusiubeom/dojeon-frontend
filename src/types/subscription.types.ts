import type { ApiResponse } from './user.types'

export interface SubscriptionPlan {
  planId: string
  title: string
  priceText: string
  subText: string | null
  hasTrial: boolean
  billingCycleMonths: number
}

export interface SubscriptionPlansData {
  benefits: string[]
  plans: SubscriptionPlan[]
}

export type SubscriptionPlansResponse = ApiResponse<SubscriptionPlansData>
