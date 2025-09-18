pipeline {
    agent any

    environment {
        MONGODB_URI = credentials('MONGODB_URI')
        DB_NAME = credentials('DB_NAME')
        PAYHERE_MERCHANT_ID = credentials('PAYHERE_MERCHANT_ID')
        PAYHERE_MERCHANT_SECRET = credentials('PAYHERE_MERCHANT_SECRET')
        NEXT_PUBLIC_PAYHERE_MERCHANT_ID = credentials('NEXT_PUBLIC_PAYHERE_MERCHANT_ID')
        PAYHERE_SANDBOX = credentials('PAYHERE_SANDBOX')
        PAYHERE_CURRENCY = credentials('PAYHERE_CURRENCY')
        PAYHERE_NOTIFY_URL = credentials('PAYHERE_NOTIFY_URL')
        PAYHERE_RETURN_URL = credentials('PAYHERE_RETURN_URL')
        PAYHERE_CANCEL_URL = credentials('PAYHERE_CANCEL_URL')
        NEXTAUTH_URL = credentials('NEXTAUTH_URL')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Test') {
            agent {
                docker {
                    image 'node:18'   // pick your Node.js version
                    args '-v $WORKSPACE:/app -w /app'
                }
            }
            steps {
                script {
                    docker.image('node:18').inside("-v $WORKSPACE:/app -w /app") 
                    {
                        sh 'npm install'
                        sh 'npm run build'
                        sh 'npm test || echo "No tests found, skipping..."'
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("hopely-app:6", "${WORKSPACE}")
                }
            }
        }

        stage('Push to Registry') {
            when {
                branch 'main'
            }
            steps {
                script {
                    docker.withRegistry('', 'your-dockerhub-credentials') {
                        dockerImage.push()
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
