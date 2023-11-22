import { credential } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { Firestore } from "firebase-admin/firestore";

initializeApp({credential: credential.applicationDefault()});


const firestore = new Firestore(); 



const videoCollectionId = 'videos';


export interface Video {
    id?: string,
    uid?: string,
    filename?: string,
    status?: 'processing' | 'processed',
    title?: string,
    description?: string,
}


/**
 * @param videoId to find video that is located in firestore
 * @return the video doc from firestore
 * will be used to check if the video is new(processing or processed) in isVideoNew  
 */
async function getVideo(videoId: string) {
    const snapshot = await firestore.collection(videoCollectionId).doc(videoId).get();
    return (snapshot.data() as Video) ?? {}; 
}


export function setVideo(videoId: string, video: Video) {
    return firestore.collection(videoCollectionId).doc(videoId).set(video, { merge: true});
}

/**
 * 
 * @param videoId to check if the video in firesore is already processed or processing 
 * @returns true if the video is not in the firestore already 
 */
export async function isVideoNew(videoId: string) {
    const video = await getVideo(videoId)
    return video?.status === undefined;
}
