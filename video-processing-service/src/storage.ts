import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import Ffmpeg from 'fluent-ffmpeg';

// all of the google cloud storage interaction
// keep track of local fiile interactions 

// declare cloud storage instance
const storage = new Storage();

// raw videos, where people upload their videos 
const rawVideoBucketName = "test-raw-videos";
// where the processed videos get put
const processedVideoBucketName = "test-raw-processed-videos";

// raw videos will be put in the local path
const localRawVideoPath = "./raw-videos";
// processed videos will be placed in this path
const localProcessedVideoPath = "./processed-videos";


export function setupDirectories() {
    ensureDirectoryExistence(localRawVideoPath);
    ensureDirectoryExistence(localProcessedVideoPath);
}


/**
 * @param rawVideoName - The name of the file to convert from {@link localRawVideoPath}.
 * @param processedVideoName - The name of the file to convert to {@link localProcessedVideoPath}.
 * @returns A promise that resolves when the video has been converted.
 */
export function convertVideo(rawVideoName: string, processedVideoName: string) {
    return new Promise<void>((resolve, reject) => {
      Ffmpeg(`${localRawVideoPath}/${rawVideoName}`)
        .outputOptions("-vf", "scale=-1:360") // 360p
        .on("end", function () {
          console.log("Processing finished successfully");
          resolve();
        })
        .on("error", function (err: any) {
          console.log("An error occurred: " + err.message);
          reject(err);
        })
        .save(`${localProcessedVideoPath}/${processedVideoName}`);
    });
  }
  
  
  /**
   * @param fileName - The name of the file to download from the 
   * {@link rawVideoBucketName} bucket into the {@link localRawVideoPath} folder.
   * @returns A promise that resolves when the file has been downloaded.
   */
  export async function downloadRawVideo(fileName: string) {
    await storage.bucket(rawVideoBucketName)
      .file(fileName)
      .download({
        destination: `${localRawVideoPath}/${fileName}`,
      });
  
    console.log(
      `gs://${rawVideoBucketName}/${fileName} downloaded to ${localRawVideoPath}/${fileName}.`
    );
  }
  
  
  /**
   * @param fileName - The name of the file to upload from the 
   * {@link localProcessedVideoPath} folder into the {@link processedVideoBucketName}.
   * @returns A promise that resolves when the file has been uploaded.
   */
  export async function uploadProcessedVideo(fileName: string) {
    const bucket = storage.bucket(processedVideoBucketName);
  
    // Upload video to the bucket
    await storage.bucket(processedVideoBucketName)
      .upload(`${localProcessedVideoPath}/${fileName}`, {
        destination: fileName,
      });
    console.log(
      `${localProcessedVideoPath}/${fileName} uploaded to gs://${processedVideoBucketName}/${fileName}.`
    );
  
    // the files in the unprocessed buckets are all private, when pushing to the processed bucket you need to make it public
    await bucket.file(fileName).makePublic();
  }
  
  
  /**
   * @param fileName - The name of the file to delete from the
   * {@link localRawVideoPath} folder.
   * @returns A promise that resolves when the file has been deleted.
   * 
   */
  export function deleteRawVideo(fileName: string) {
    return deleteFile(`${localRawVideoPath}/${fileName}`);
  }
  
  
  /**
  * @param fileName - The name of the file to delete from the
  * {@link localProcessedVideoPath} folder.
  * @returns A promise that resolves when the file has been deleted.
  * 
  */
  export function deleteProcessedVideo(fileName: string) {
    return deleteFile(`${localProcessedVideoPath}/${fileName}`);
  }
  
  
  /**
   * @param filePath - The path of the file to delete.
   * @returns A promise that resolves when the file has been deleted.
   */
  function deleteFile(filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Failed to delete file at ${filePath}`, err);
            reject(err);
          } else {
            console.log(`File deleted at ${filePath}`);
            resolve();
          }
        });
      } else {
        console.log(`File not found at ${filePath}, skipping delete.`);
        resolve();
      }
    });
  }
  
  
  /**
   * Ensures a directory exists, creating it if necessary.
   * @param {string} dirPath - The directory path to check.
   */
  function ensureDirectoryExistence(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true }); // recursive: true enables creating nested directories
      console.log(`Directory created at ${dirPath}`);
    }
  }