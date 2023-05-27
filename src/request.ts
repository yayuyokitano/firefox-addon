import * as core from '@actions/core'
import FormData from 'form-data'
import {baseURL} from './util'
import {resolve} from 'path'
import {createReadStream} from 'fs'
import axios from 'axios'
import {InitialUploadDetails, UploadDetails} from './types.d'

export async function createUpload(
  xpiPath: string,
  token: string
): Promise<InitialUploadDetails> {
  const url = `${baseURL}/addons/upload/`
  const body = new FormData()
  const stream = createReadStream(resolve(xpiPath))

  core.debug(`Uploading ${xpiPath}, length ${stream.readableLength}`)
  body.append('upload', stream)
  body.append('channel', 'listed')

  const response = await axios.post(url, body, {
    headers: {
      ...body.getHeaders(),
      Authorization: `JWT ${token}`
    }
  })
  core.debug(`Create upload response: ${JSON.stringify(response.data)}`)
  return response.data
}

export async function tryUpdateExtension(
  guid: string,
  uuid: string,
  token: string,
  srcPath?: string
): Promise<boolean> {
  const details = await getUploadDetails(uuid, token)
  if (!details.valid) {
    return false
  }

  const url = `${baseURL}/addons/addon/${guid}/versions/`
  const body = new FormData()
  body.append('upload', uuid)
  if (srcPath) {
    const stream = createReadStream(resolve(srcPath))
    core.debug(`Uploading ${srcPath}, length ${stream.readableLength}`)
    body.append('source', stream)
  }

  core.debug(`Updating extension ${guid} with ${uuid}`)
  const response = await axios.post(url, body, {
    headers: {
      ...body.getHeaders(),
      Authorization: `JWT ${token}`
    }
  })
  core.debug(`Create version response: ${JSON.stringify(response.data)}`)
  return true
}

export async function getUploadDetails(
  uuid: string,
  token: string
): Promise<UploadDetails> {
  const url = `${baseURL}/addons/upload/${uuid}/`
  const response = await axios.get(url, {
    headers: {
      Authorization: `JWT ${token}`
    }
  })
  core.debug(
    `Get upload details probe response: ${JSON.stringify(response.data)}`
  )
  return response.data
}
