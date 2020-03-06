import moment from 'moment'

function Discord (endpoint, label) {
  this.$endpoint = endpoint
  this.$label = label && ` ${label}`

  this.send = function (payload) {
    if (process.env.VERBOSE === 'true') {
      console.log(`Sending payload to discord${this.$label}:`, '\n\n', payload, '\n\n')
    }

    return axios.post(this.$endpoint, payload)
      .then(() => {
        if (process.env.VERBOSE === 'true') {
          console.log('success!')
        }
      })
      .catch(error => {
        if (process.env.VERBOSE === 'true') {
          console.error(error.response)
        } else {
          console.error(`Error sending payload to discord${this.$label}:`, error, payload)
        }
      })
      .then(() => {
        if (process.env.VERBOSE === 'true') {
          console.log('\n\n\n')
        }
      })
  }
}

export default async function(req, res) {
  const discord = new Discord(process.env.LEADCAPTURE_DISCORD_ENDPOINT, 'Lead Capture')

  try {
    await discord.send({
      embeds: [
        {
          title: `Novo lead: (Frame Tools Landing page)`,
          description: Object.entries(req.body).map(([field, value]) => `- **${field}**: ${value}`).join('\n'),
          timestamp: moment().toISOString()
        }
      ]
    })
    res.status(200).send('Message sent successfully.')
  } catch (error) {
    console.log('ERROR', error)
    res.status(400).send('Message not sent.')
  }
}