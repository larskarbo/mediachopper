/**
 * @type {import("electron-builder").Configuration}
 */

const config = {
  appId: "no.larskarbo.mediachopper",
  productName: "MediaChopper",
  copyright: "Copyright © 2021 Lars Karbo",
  directories: {
    output: "dist",
    buildResources: "resources",
  },
  files: [
    "**/*",
    "!**/node_modules/*/{CHANGELOG.md,README.md,README,readme.md,readme}",
    "!**/node_modules/*/{test,__tests__,tests,powered-test,example,examples}",
    "!**/node_modules/*.d.ts",
    "!**/node_modules/.bin",
    "!**/*.{iml,o,hprof,orig,pyc,pyo,rbc,swp,csproj,sln,xproj}",
    "!.editorconfig",
    "!**/._*",
    "!**/{.DS_Store,.git,.hg,.svn,CVS,RCS,SCCS,.gitignore,.gitattributes}",
    "!**/{__pycache__,thumbs.db,.flowconfig,.idea,.vs,.nyc_output}",
    "!**/{appveyor.yml,.travis.yml,circle.yml}",
    "!**/{npm-debug.log,yarn.lock,.yarn-integrity,.yarn-metadata.json}",
    "!**node_modules/ffprobe-static/bin/*",
  ],
  mac: {
    files: ["node_modules/ffprobe-static/bin/darwin/${arch}/ffprobe"],
  },
  publish: {
    provider: "github",
    publishAutoUpdate: true,
    owner: "larskarbo",
    repo: "mediachopper",
  },
};

module.exports = config;
