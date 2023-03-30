import * as core from '@actions/core'
import {generateJWT} from './util'
import {createUpload, tryUpdateExtension} from './request'

async function run(): Promise<void> {
  try {
    const guid = core.getInput('guid', {required: true})
    const xpiPath = core.getInput('xpi', {required: true})
    const key = core.getInput('api_key', {required: true})
    const secret = core.getInput('api_secret', {required: true})
    const src = core.getInput('src')

    const token = generateJWT(key, secret)
    const uploadDetails = await createUpload(xpiPath, token)

    const timeout = setTimeout(async () => {
      if (await tryUpdateExtension(guid, uploadDetails.uuid, token, src)) {
        clearTimeout(timeout)
      }
    }, 5000)
  } catch (error) {
    if (error instanceof Error) {
      core.debug(error.message)
      //core.setFailed(error.message)
    }
  }
}

run()
