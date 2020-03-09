import axios from 'axios'

export class Discord {
  private _endpoint: string
  private _label: string

  constructor (endpoint: string, label: string) {
    this._endpoint = endpoint
    this._label = label && ` ${label}`
  }

  send (payload) {
    return axios.post(this._endpoint, payload)
      .catch(error => {
        console.error(error.response)
        console.error(`Error sending payload to discord${this._label}:`, error, payload)
        console.log('\n\n\n')
      })
  }
}

export default Discord
