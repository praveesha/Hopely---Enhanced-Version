# Hopely – DevOps CI/CD Deployment 🚀

This repository demonstrates an **end-to-end DevOps pipeline** for a Node.js (Next.js) web application, with full CI/CD automation using **Jenkins, Docker, and AWS EC2**.  
The goal of this project is to showcase production-grade deployment practices: building, testing, containerizing, and delivering an application seamlessly to the cloud.

---

## 🛠️ Tech Stack
- **Frontend/Backend**: Node.js 20 (Next.js)
- **Database**: MongoDB (external connection via `MONGODB_URI`)
- **Payment Gateway**: PayHere integration
- **CI/CD Tool**: Jenkins
- **Containerization**: Docker
- **Hosting**: AWS EC2 (Ubuntu 22.04 LTS)
- **Reverse Proxy / TLS**: Nginx + Let’s Encrypt (optional production step)

---

## ⚙️ Pipeline Overview

The Jenkins pipeline (`Jenkinsfile`) automates the following:

1. **Checkout** → Pulls the latest code from GitHub.  
2. **Install & Build** → Installs Node.js dependencies and builds the Next.js app.  
3. **Build Docker Image** → Creates a production-ready Docker image of the app.  
4. **Run Docker Container (Test)** → Spins up the image locally on Jenkins agent for a quick smoke test.  
5. **Push to DockerHub** → Pushes the image with both versioned (`:buildNumber`) and `:latest` tags.  
6. **Deploy to AWS EC2** →  
   - SSH into the EC2 host  
   - Login to DockerHub  
   - Pull the latest image  
   - Stop and remove old container  
   - Run the new container with required environment variables  

---

## ✅ Test Integrations

The pipeline includes **basic test integrations**:
- Build validation (ensures the app compiles correctly).
- Smoke test container run (verifies container can start with provided env variables).
- Exit on error to prevent broken deployments.

(Additional unit/integration testing stages can easily be plugged in.)

---

## 📅 Deployment Flow

- Jenkins is triggered on code push to `main`.  
- A new Docker image is built & tested.  
- On successful build, the image is pushed to DockerHub.  
- The EC2 server automatically pulls and runs the new version.  

Result: **Zero manual steps** between commit and deployment.

---

## 🚀 How to Reproduce

1. Clone repo & configure Jenkins with the provided `Jenkinsfile`.  
2. Add required **credentials** in Jenkins:
   - MongoDB URI, DB Name, PayHere secrets
   - DockerHub credentials
   - EC2 SSH key
3. Configure AWS EC2:
   - Install Docker
   - Expose port 80 or use Nginx as reverse proxy
4. Trigger build → see app deployed automatically.

---

## 📈 What This Project Demonstrates

- CI/CD automation with Jenkins
- Secure handling of secrets via Jenkins credentials
- Docker-based build reproducibility
- Cloud deployment on AWS
- Environment-aware configurations
- Production-ready practices (`--restart unless-stopped`, versioned images, rollback capability)

---

## 🔮 Future Improvements

- Automated test stage with unit/integration test suite
- Monitoring & logging (Prometheus/Grafana, ELK)
- Blue/Green or Rolling deployment strategy
- Infrastructure as Code (Terraform for AWS infra provisioning)
- Replace DockerHub with **AWS ECR** for tighter IAM-based security
- Secrets management with **AWS Secrets Manager / SSM**

So you have mentioned some points that would make my project stand out, right? Can you like mention those under future implementations, because I would be like scaling this up to ECS or EKS with load balancing and secret management and then IEC, and then automated testings, then monitoring. I would be doing all these things. Can you kindly mention that under future developments?

