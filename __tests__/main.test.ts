import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {expect, test} from '@jest/globals'

// shows how the runner will run a javascript action with env / stdout protocol
test('this test is a stub and will not run in github, but test manually with credentials please', () => {
  return
  process.env['INPUT_GUID'] = ''
  process.env['INPUT_API_KEY'] = ''
  process.env['INPUT_API_SECRET'] = ''
  process.env['INPUT_XPI'] = ''
  process.env['INPUT_SRC'] = ''
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  console.log(cp.execFileSync(np, [ip], options).toString())
})
