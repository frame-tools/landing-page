import axios from 'axios'
import { stringify } from 'query-string'

type RecaptchaResponseErrorCode = 'missing-input-secret' | 'invalid-input-secret' | 'missing-input-response' | 'invalid-input-response' | 'bad-request' | 'timeout-or-duplicate'

interface RecaptchaResponse {
  'success': boolean,
  'challenge_ts': string,
  'hostname': string,
  'error-codes'?: RecaptchaResponseErrorCode[],
  'score'?: number,
  'action'?: string
}

export async function verify (secret: string, response: string, remoteip?: string) {
  return axios.post<RecaptchaResponse>(`https://www.google.com/recaptcha/api/siteverify?${stringify({ secret, response, remoteip })}`)
}

export class Recaptcha {
  private _secret: string

  constructor (secret: string) {
    this._secret = secret
  }

  verify (response: string, remoteip?: string) {
    return verify(this._secret, response, remoteip)
  }
}

export default Recaptcha
