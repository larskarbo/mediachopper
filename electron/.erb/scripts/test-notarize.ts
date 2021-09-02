require('dotenv').config();
import { notarize, NotarizeOptions } from 'electron-notarize';
notarize({
  appBundleId: 'io.mediachopper.app',
  appPath:
    '/Users/lars/dev/mediachopper/electron/build/release/mac/MediaChopper.app',
  appleId: process.env.APPLE_ID,
  appleIdPassword: process.env.APPLE_ID_PASS,
  
}).then((asdf2) => {
  console.log({asdf2})
}).catch((err) => {
  console.log({err})
})
