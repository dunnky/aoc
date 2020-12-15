import { resolve } from 'path'
import { config } from 'dotenv'
const { parsed } = config({ path: resolve('.env') })
export const env = parsed || {}
