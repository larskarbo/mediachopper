const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    startRender(props) {
      console.log('startRender: ', props);
      ipcRenderer.send('startrender', props);
    },
    videoMeta(props) {
      console.log('videoMeta: ', props);
      ipcRenderer.send('videometa', props);
    },
    on(channel, func) {
      const validChannels = [
        'videometa',
        'error',
        'renderProgress',
        'renderDone',
      ];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = [
        'videometa',
        'error',
        'renderProgress',
        'renderDone',
      ];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
});
