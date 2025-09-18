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
        stage('Build Docker Image') {
            steps {
                    sh "docker build -t hopely-app:${env.BUILD_NUMBER} ."
            }
        }
        stage('Test') {
            steps {
                sh 'npm install'
                sh 'npm run build'
                sh 'npm run test' // If you have tests
            }
        }
        stage('Push to Registry') {
            when {
                branch 'main'
            }
            steps {
                withDockerRegistry([credentialsId: 'your-dockerhub-credentials', url: '']) {
                    script {
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