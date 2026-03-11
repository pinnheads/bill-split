pipeline {
    agent any

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '5'))
    }

    environment {
        APP_NAME = 'bill-split'
        VERSION = "1.0.${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo "Checking out ${env.APP_NAME} v${env.VERSION}"
            }
        }
        stage('Install & Build') {
            steps {
                script {
                    docker.image('node:20-alpine').inside {
                        sh 'node --version'
                        sh 'npm install'
                        sh 'npm run build --if-present'
                    }
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    docker.image('node:20-alpine').inside {
                        sh 'npm test --if-present'
                    }
                }
            }
        }
        stage('Use Secret') {
          steps {
              withCredentials([string(credentialsId: 'api-key', variable: 'API_KEY')]) {
                  sh 'echo "API Key is: $API_KEY"'
                  sh 'echo "Calling API with secret..."'
              }
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
            cleanWs()
            echo 'Workspace cleaned up.'
        }
    }
}
