pipeline {
    agent any

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '5'))
    }

    parameters {
        choice(
            name: 'DEPLOY_ENV',
            choices: ['staging', 'production', 'dev'],
            description: 'Environment to deploy to'
        )
        booleanParam(
            name: 'RUN_TESTS',
            defaultValue: true,
            description: 'Run test suite?'
        )
        string(
            name: 'CUSTOM_VERSION',
            defaultValue: '',
            description: 'Override version (leave empty for auto)'
        )
    }

    environment {
        APP_NAME = 'bill-split'
        VERSION = "${params.CUSTOM_VERSION ?: "1.0.${env.BUILD_NUMBER}"}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo "Checking out ${env.APP_NAME} v${env.VERSION}"
                echo "Deploying to: ${params.DEPLOY_ENV}"
            }
        }
        stage('Install & Build') {
            steps {
                script {
                    docker.image('node:20-alpine').inside {
                        sh 'npm install'
                        sh 'npm run build --if-present'
                    }
                }
            }
        }
        stage('Test') {
            when {
                expression { return params.RUN_TESTS }
            }
            steps {
                script {
                    docker.image('node:20-alpine').inside {
                        sh 'npm test --if-present'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                echo "Deploying ${env.APP_NAME} v${env.VERSION} to ${params.DEPLOY_ENV}..."
                withCredentials([string(credentialsId: 'api-key', variable: 'API_KEY')]) {
                    sh 'echo "Deploying with credentials to ${DEPLOY_ENV}..."'
                }
            }
        }
    }

    post {
        success {
            echo "${env.APP_NAME} v${env.VERSION} deployed to ${params.DEPLOY_ENV} successfully!"
        }
        failure {
            echo "Pipeline failed at build ${env.BUILD_NUMBER}"
        }
        always {
            cleanWs()
        }
    }
}
