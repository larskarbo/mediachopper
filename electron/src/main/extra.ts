import { app, ipcMain, shell } from 'electron';
import ffmpeg from 'fluent-ffmpeg';
import { mkdtemp } from 'fs-extra';
import { tmpdir } from 'os';
import path from 'path';
import { promisify } from 'util';
import { StartRenderProps } from '../renderer/components/utils/types';
import { ffprobePathNodeModulesPath } from './pathfinder';

export const initExtra = () => {
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, '')
    : path.join(__dirname, '../../');

  const ffmpegPath = path.join(
    RESOURCES_PATH,
    'node_modules/ffmpeg-static/ffmpeg'
  );
  const ffprobePath = path.join(
    RESOURCES_PATH,
    ffprobePathNodeModulesPath
  );
  
  // process.env.FFPROBE_PATH = ffprobePath;
  
  // process.env.FFMPEG_PATH = ffmpegPath;
  

  // ffmpeg.setFfprobePath(ffprobePath.replace("/app.asar", ""));
  // ffmpeg.setFfmpegPath(ffmpegPath.replace("/app.asar", ""));
  ffmpeg.setFfprobePath(ffprobePath);
  ffmpeg.setFfmpegPath(ffmpegPath);

  ipcMain.on('videometa', async (event, file) => {
    

    const videoInfo = await promisify<string, ffmpeg.FfprobeData>(
      ffmpeg.ffprobe
    )(file.path).catch((err) => {
      event.sender.send('error', {
        err,
      });
    });

    event.sender.send('videometa', {
      ffprobe: videoInfo,
      path: file.path,
      extension: path.extname(file.path),
    });
    // await mkdirp(path.join(__dirname, "../temp"));
    // fs.writeFileSync(
    //   path.join(__dirname, "../temp/file.wav"),
    //   Buffer.from(ab),
    //   { flag: "w" }
    // );
  });
  ipcMain.on(
    'startrender',
    async (event, { segments, video, baseName }: StartRenderProps) => {
      const directory = await mkdtemp(
        path.join(tmpdir(), 'mediachopper-export-')
      );
      let i = 0;
      const extension = path.extname(video.path);
      for (const segment of segments) {
        await new Promise((resolve) => {
          // fs.copyFileSync(p, "out/" + slugify(names[i]) + ".avi")
          const name = segment.text
            ? segment.text
            : `${baseName}${i.toString().padStart(4, '0')}`;
          const fileName = `${name}${extension}`;
          event.sender.send('renderProgress', {
            currentIndex: i,
            totalNumber: segments.length,
            currentFile: fileName,
          });
          ffmpeg(video.path)
            .videoCodec('copy')
            .audioCodec('copy')
            .setStartTime(segment.fromTime) //Can be in "HH:MM:SS" format also
            .setDuration(segment.duration) //Can be in "HH:MM:SS" format also
            .on('start', function (commandLine) {
              
            })
            .on('error', function (err) {
              
            })
            .on('end', function (err) {
              if (!err) {
                
                resolve('horse');
              }
            })
            .saveToFile(path.join(directory, fileName));
          i++;
        });
      }
      event.sender.send('renderDone');
      shell.openPath(directory);
    }
  );
};
