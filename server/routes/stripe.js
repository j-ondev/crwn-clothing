import express from 'express'

import { paymentIntentHandler } from '../services/stripe/payment-intent.js'

const router = express.Router()

router.post('/create-payment-intent', paymentIntentHandler)

export default router
