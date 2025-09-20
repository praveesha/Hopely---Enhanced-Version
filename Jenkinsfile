pipeline {
    agent any

    environment {
        // App secrets
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
        DOCKER_IMAGE = "hopely-app:6"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install & Build') {
            steps {
                withEnv(["PATH+NODE=${tool 'NodeJS-20'}/bin"]) {
                    dir("$WORKSPACE") {
                        sh 'node -v'
                        sh 'npm -v'
                        sh 'rm -rf node_modules package-lock.json'
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                docker build -t ${DOCKER_IMAGE} .
                """
            }
        }

        stage('Run Docker Container (Test)') {
            steps {
                sh """
                docker run --rm -d \
                    -e MONGODB_URI=${MONGODB_URI} \
                    -e DB_NAME=${DB_NAME} \
                    -e PAYHERE_MERCHANT_ID=${PAYHERE_MERCHANT_ID} \
                    -e PAYHERE_MERCHANT_SECRET=${PAYHERE_MERCHANT_SECRET} \
                    -e NEXT_PUBLIC_PAYHERE_MERCHANT_ID=${NEXT_PUBLIC_PAYHERE_MERCHANT_ID} \
                    -e PAYHERE_SANDBOX=${PAYHERE_SANDBOX} \
                    -e PAYHERE_CURRENCY=${PAYHERE_CURRENCY} \
                    -e PAYHERE_NOTIFY_URL=${PAYHERE_NOTIFY_URL} \
                    -e PAYHERE_RETURN_URL=${PAYHERE_RETURN_URL} \
                    -e PAYHERE_CANCEL_URL=${PAYHERE_CANCEL_URL} \
                    -e NEXTAUTH_URL=${NEXTAUTH_URL} \
                    -p 3000:3000 ${DOCKER_IMAGE}
                """
            }
        }

        stage('Push to Registry') {
            when {
                branch 'main'
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'DOCKERHUB', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                    sh """
                    /usr/local/bin/docker login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_PASSWORD
                    /usr/local/bin/docker push ${DOCKER_IMAGE}
                    """
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
