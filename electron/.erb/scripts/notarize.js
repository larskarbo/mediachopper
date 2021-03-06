const { notarize } = require('electron-notarize');
require('dotenv').config();

exports.default = async function notarizeMacos(context) {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== 'darwin') {
    return;
  }

  // if (!process.env.CI) {
  //   console.warn('Skipping notarizing step. Packaging is not running in CI');
  //   return;
  // }

  if (!('APPLE_ID' in process.env && 'APPLE_ID_PASS' in process.env)) {
    console.warn(
      'Skipping notarizing step. APPLE_ID and APPLE_ID_PASS env variables must be set'
    );
    return;
  }

  const appName = context.packager.appInfo.productFilename;

  const notarizeProps = {
    appBundleId: 'io.mediachopper.app',
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_ID_PASS,
  };
  console.log('notarizeProps: ', notarizeProps);

  await notarize(notarizeProps);
};
