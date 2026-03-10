pipeline {
    agent any

    environment {
        APP_NAME = 'bill-split'
        VERSION = "1.0.${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out ${env.APP_NAME} v${env.VERSION}"
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                echo 'Installing Node dependencies...'
                sh 'node --version'
                sh 'npm --version'
            }
        }
        stage('Build') {
            steps {
                echo "Building ${env.APP_NAME} v${env.VERSION}..."
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test --if-present'
            }
        }
    }

    post {
        success {
            echo "${env.APP_NAME} v${env.VERSION} pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed at build ${env.BUILD_NUMBER} — check logs"
        }
        always {
            echo 'Pipeline finished.'
        }
    }
}
