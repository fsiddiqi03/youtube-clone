# 📺 YouTube Clone 
This project is a custom-built YouTube clone that goes beyond the frontend, incorporating a complete backend video processing pipeline powered by Docker, Google Cloud Platform (GCP), and JavaScript. It simulates the core functionality of YouTube: video uploads, asynchronous processing, and video playback — all handled with modern cloud-native infrastructure.

## What I Built

#### Frontend (React): 
- A clean UI for users to upload and watch videos.
#### API Service (Node.js): 
- Handles video metadata, retrieval, and upload routing.
#### Video Processing Service (Node.js + FFmpeg):
- Runs inside a Docker container.
- Listens for Pub/Sub messages to pick up new videos.
- Transcodes them into playable formats and stores the output in GCP Cloud Storage.


## Pub/Sub Architecture:
- When a user uploads a video, a Pub/Sub message is triggered.
- The message includes video metadata and file references.
- The processing service picks it up asynchronously for encoding.

## Cloud Deployment:
- Services are deployed on Cloud Run for scalability.
- Videos are stored and served using Google Cloud Storage.

## What I Learned

#### Cloud Architecture:
- Learned how to design loosely coupled, event-driven systems using Pub/Sub.
- Understood how to use Cloud Run to deploy containerized microservices.

#### Scalable Video Processing:
- Gained experience with FFmpeg to programmatically transcode videos.
- Designed a non-blocking, scalable queue system to offload processing tasks.

#### DevOps & Infrastructure:
- Used Docker to containerize services and run them locally and on GCP.
- Managed service-to-service authentication and IAM roles on GCP.

#### Full-Stack API Design:
- Created RESTful APIs with file upload handling and error reporting.
- Integrated frontend-to-backend flows with React and Express cleanly.
