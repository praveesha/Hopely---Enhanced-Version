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
        PATH = "/usr/local/bin:$PATH"
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
                withEnv(["PATH+DOCKER=/usr/local/bin"]) {
                    sh 'docker build -t hopely-app:6 .'
                }
            }
        }

        stage('Run Docker Container (Test)') {
            steps {
                sh '''
                    docker run -d --rm \
                    -e MONGODB_URI=$MONGODB_URI \
                    -e PAYHERE_MERCHANT_SECRET=$PAYHERE_MERCHANT_SECRET \
                    -p 3000:3000 hopely-app:6
                '''
            }
        }

        stage('Push to Registry') {
            when {
                branch 'main'
            }
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials-id') {
                        docker.image("hopely-app:6").push()
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
