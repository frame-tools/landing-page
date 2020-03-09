import { NowRequest, NowResponse } from '@now/node'

import Discord from './_discord_sender'
import moment from 'moment'
import { verify } from './_recaptcha_verify'

export default async function(req: NowRequest, res: NowResponse) {
  try {
    if (!req.body.Name) {
      throw new Error('Name missing')
    }

    if (!req.body.Email) {
      throw new Error('Email missing')
    }

    const token = req.body.captcha
    const response = await verify(process.env.RECAPTCHA_SECRET, token)
    const { data: { success, score, "error-codes": errors } } = response

    if (!success) {
      throw new Error(`Recaptcha error: ${errors.toString()}`)
    }

    if (score < 0.5) {
      throw new Error(`Recaptcha error: Probably a bot (score ${score.toString()})`)
    }

    const discord = new Discord(process.env.LEADCAPTURE_DISCORD_ENDPOINT, 'Lead Capture')

    await discord.send({
      embeds: [
        {
          title: `Novo lead: (Frame Tools Landing page)`,
          description: Object.entries(req.body).filter(([key]) => key !== 'captcha').map(([field, value]) => `- **${field}**: ${value}`).join('\n'),
          timestamp: moment().toISOString()
        }
      ]
    })

    res.status(200).json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    res.status(400).json({ success: false, error })
  }
}