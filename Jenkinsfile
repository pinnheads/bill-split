pipeline {
    agent any

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '5'))
    }

    parameters {
        choice(
            name: 'DEPLOY_ENV',
            choices: ['production', 'dev'],
            description: 'Environment to deploy'
        )
        booleanParam(
            name: 'RUN_TESTS',
            defaultValue: true,
            description: 'Run test suite?'
        )
    }

    environment {
        APP_NAME = 'bill-split'
        VERSION = "1.0.${env.BUILD_NUMBER}"
        CLOUDFLARE_API_TOKEN = credentials('CLOUDFLARE_API_TOKEN')
        CLOUDFLARE_ACCOUNT_ID = credentials('CLOUDFLARE_ACCOUNT_ID')
        CLOUDFLARE_PROJECT_NAME = 'jenkins-bill-split'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo "Checking out ${env.APP_NAME} v${env.VERSION}"
            }
        }
        stage('Install') {
            steps {
                script {
                    docker.image('node:20-alpine').inside {
                        sh 'npm ci'
                    }
                }
            }
        }
        stage('Quality Checks') {
            when {
                expression { return params.RUN_TESTS }
            }
            parallel {
                stage('Unit Tests') {
                    steps {
                        script {
                            docker.image('node:20-alpine').inside {
                                sh 'npm test --if-present'
                            }
                        }
                    }
                }
                stage('Security Scan') {
                    steps {
                        echo 'Running npm security audit...'
                        script {
                            docker.image('node:20-alpine').inside {
                                sh 'npm audit --audit-level=high'
                            }
                        }
                    }
                }
                stage('Code Quality') {
                    steps {
                        echo 'Checking code quality...'
                        script {
                            docker.image('node:20-alpine').inside {
                                sh 'npm run lint --if-present'
                            }
                        }
                    }
                }
            }
        }
        stage('Build & Deploy') {
            steps {
                echo "Deploying ${env.APP_NAME} v${env.VERSION} to ${params.DEPLOY_ENV}..."
                script {
                    docker.image('node:20-alpine').inside("-e CLOUDFLARE_API_TOKEN=${env.CLOUDFLARE_API_TOKEN} -e CLOUDFLARE_ACCOUNT_ID=${env.CLOUDFLARE_ACCOUNT_ID}") {
                        sh "npm run build --if-present && npx wrangler pages deploy ./dist --project-name=$CLOUDFLARE_PROJECT_NAME"
                    }
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
