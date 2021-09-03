/**
 * @type {import("electron-builder").Configuration}
 */

module.exports = {
  productName: 'MediaChopper',
  appId: 'io.mediachopper.app',
  asar: true,
  asarUnpack: [
    '**\\*.{node,dll}',
    // '**node_modules/ffmpeg-static/*'
  ],
  files: ['dist', 'node_modules', 'package.json'],
  afterSign: '.erb/scripts/notarize.js',
  mac: {
    type: 'distribution',
    hardenedRuntime: true,
    entitlements: 'assets/entitlements.mac.plist',
    entitlementsInherit: 'assets/entitlements.mac.plist',
    gatekeeperAssess: false,
    extraResources: [
      'node_modules/ffprobe-static/bin/darwin/${arch}/ffprobe',
      'node_modules/ffmpeg-static/ffmpeg',
    ],
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
    extraResources: [ 
      'node_modules/ffprobe-static/bin/win32/${arch}/ffprobe.exe',
      'node_modules/ffmpeg-static/ffmpeg.exe',
    ],
  },
  linux: {
    target: ['AppImage'],
    category: 'Development',
    extraResources: [ 
      'node_modules/ffprobe-static/bin/linux/${arch}/ffprobe',//TODO test
      'node_modules/ffmpeg-static/ffmpeg',
    ],
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
    repo: 'mc-releases',
  },
};
