import Stripe from 'stripe'
import { getEnv } from '../../utils/config.js'

const stripe = new Stripe(getEnv('STRIPE_SECRET_KEY'))

export const paymentIntentHandler = async (req, res) => {
  try {
    const { amount } = req.body

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    })

    return res.status(200).json({ paymentIntent })
  } catch (error) {
    console.log({ error })

    return res.status(400).json({ error })
  }
}
