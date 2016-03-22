import 'babel-register'
import test from 'ava'
import { handler as VersionAPI } from '../functions/version'

test('Version', async t => {
  let { version } = await VersionAPI()

  t.is(version, 1)
})
