import Stripe from 'stripe'

// Safe initialization - won't break if env var is missing
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || ''

export const stripe = stripeSecretKey 
  ? new Stripe(stripeSecretKey, {
      apiVersion: '2025-10-29.clover',
    })
  : null as any

