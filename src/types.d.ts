interface BaseUploadDetails {
  uuid: string
  channel: 'listed' | 'unlisted'
  processed: boolean
  submitted: boolean
  url: string
  valid: boolean
  version: string
}

export interface InitialUploadDetails extends BaseUploadDetails {
  validation: null
}

export interface UploadDetails extends BaseUploadDetails {
  validation: {
    errors: number
    warnings: number
    notices: number
    success: boolean
    compatibility_summary: {
      errors: number
      warnings: number
      notices: number
    }
    metadata: {
      listed: boolean
      identified_files: unknown
      id: string
      manifestVersion: number
      name: string
      type: number
      version: string
      experimentApiPaths: unknown
      totalScannedFileSize: number
      emptyFiles: unknown[]
      jsLibs: unknown
      unknownMinifiedFiles: string[]
    }
    messages: {
      message: string
      description: string
      file: string
      uid: string
      type: string
      id: string[]
      tier: number
    }[]
    message_tree: unknown
    ending_tier: number
  }
}
