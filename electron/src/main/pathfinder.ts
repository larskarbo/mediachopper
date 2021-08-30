import os from 'os';

let platform = os.platform();
//patch for compatibilit with electron-builder, for smart built process.
// if (platform == 'darwin') {
//   platform = 'mac';
// } else
// if (platform == 'win32') {
//   platform = 'win';
// }
//adding browser, for use case when module is bundled using browserify. and added to html using src.
if (
  platform !== 'linux' &&
  platform !== 'darwin' &&
  platform !== 'win32'
) {
  console.error('Unsupported platform.', platform);
  process.exit(1);
}

const arch = os.arch();
if (platform === 'darwin' && arch !== 'x64' && arch !== 'arm64') {
  console.error('Unsupported architecture.');
  process.exit(1);
}

export const ffprobePathNodeModulesPath = `node_modules/ffprobe-static/bin/${platform}/${arch}/ffprobe${platform == "win32" ? ".exe" : ""}`