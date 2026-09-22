pipeline {

    agent any

    environment {
        IMAGE_NAME = "YOUR_DOCKERHUB_USERNAME/eks-microservices-demo"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Test') {
            steps {
                dir('app') {
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build \
                    -t ${IMAGE_NAME}:${IMAGE_TAG} \
                    ./app
                '''
            }
        }

        stage('Push Docker Image') {
            steps {
                echo "Docker image would be pushed to Docker Hub here"
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                    kubectl apply -f k8s/deployment.yaml
                    kubectl apply -f k8s/service.yaml
                '''
            }
        }

        stage('Canary Deployment') {
            steps {
                sh '''
                    kubectl apply -f k8s/canary-deployment.yaml
                '''
            }
        }

        stage('Deployment Validation') {
            steps {
                sh '''
                    kubectl rollout status deployment/microservice-app
                '''
            }
        }
    }

    post {
        failure {
            echo 'Deployment failed. Rollback can be performed.'
        }

        success {
            echo 'Deployment completed successfully.'
        }
    }
}
