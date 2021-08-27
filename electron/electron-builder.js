/**
 * @type {import("electron-builder").Configuration}
 */

const config = {
  productName: 'MediaChopper',
  appId: 'no.larskarbo.mediachopper',
  asar: true,
  asarUnpack: '**\\*.{node,dll}',
  files: ['dist', 'node_modules', 'package.json'],
  afterSign: '.erb/scripts/notarize.js',
  mac: {
    type: 'distribution',
    hardenedRuntime: true,
    entitlements: 'assets/entitlements.mac.plist',
    entitlementsInherit: 'assets/entitlements.mac.plist',
    gatekeeperAssess: false,
  },
  dmg: {
    contents: [
      {
        x: 130,
        y: 220,
      },
      {
        x: 410,
        y: 220,
        type: 'link',
        path: '/Applications',
      },
    ],
  },
  win: {
    target: ['nsis'],
  },
  linux: {
    target: ['AppImage'],
    category: 'Development',
  },
  directories: {
    app: 'build/app',
    buildResources: 'assets',
    output: 'build/release',
  },
  extraResources: ['./assets/**'],
  publish: {
    provider: 'github',
    publishAutoUpdate: true,
    owner: 'larskarbo',
    repo: 'mediachopper',
  },
};
module.exports = config;
