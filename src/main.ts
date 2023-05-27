import * as core from '@actions/core'
import {generateJWT} from './util'
import {createUpload, tryUpdateExtension} from './request'

async function run(): Promise<void> {
  try {
    const guid = core.getInput('guid', {required: true})
    const xpiPath = core.getInput('xpi_path', {required: true})
    const key = core.getInput('api_key', {required: true})
    const secret = core.getInput('api_secret', {required: true})
    const srcPath = core.getInput('src_path')

    const token = generateJWT(key, secret)
    const uploadDetails = await createUpload(xpiPath, token)

    const timeout = 10 * 60 * 1000
    const sleepTime = 5 * 1000
    const startTime = Date.now()

    const interval = setInterval(async () => {
      if (Date.now() - timeout > startTime) {
        throw new Error('Extension validation timed out')
      }
      if (await tryUpdateExtension(guid, uploadDetails.uuid, token, srcPath)) {
        clearInterval(interval)
      }
    }, sleepTime)
  } catch (error) {
    if (typeof error === 'object' && error && 'response' in error) {
      core.debug('Failed Request')
      if (
        typeof error.response === 'object' &&
        error.response &&
        'status' in error.response
      ) {
        core.debug(`Fail status: ${error.response.status}`)
      }

      if (
        typeof error.response === 'object' &&
        error.response &&
        'data' in error.response
      ) {
        core.debug(`Fail data: ${JSON.stringify(error.response.data)}`)
      }
    }

    if (error instanceof Error) {
      core.setFailed(error.message)
    } else {
      core.setFailed(
        'Unknown error. Try to rerun the job and check debug, there may be more information.'
      )
    }
  }
}

run()
