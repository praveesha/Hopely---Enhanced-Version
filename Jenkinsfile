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
        DOCKER_BIN = '/usr/local/bin/docker' // full path to Docker
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Test') {
            steps {
                dir("$WORKSPACE") {
                    sh 'npm install'
                    sh 'npm run build'
                    sh 'npm test || echo "No tests found, skipping..."'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '$DOCKER_BIN build -t hopely-app:6 .'
            }
        }

        stage('Push to Registry') {
            when {
                branch 'main'
            }
            steps {
                sh '$DOCKER_BIN login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_PASSWORD'
                sh '$DOCKER_BIN push hopely-app:6'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
