pipeline {
    agent {
        label 'spring'
    }

    environment {
        DOCKER_IMAGE = 'samikshabhoir43/book-store'
        KUBECONFIG = '/var/lib/jenkins/.kube/config'
        NAMESPACE = 'book-store'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/samikshabhoir43/book-store.git'
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} .
                '''
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USERNAME',
                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {
                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login \
                            -u "$DOCKER_USERNAME" --password-stdin

                        docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}

                        docker logout
                    '''
                }
            }
        }

        stage('Kubernetes Deploy') {
            steps {
                sh '''
                    kubectl apply -f k8s/book-store.yaml

                    kubectl set image deployment/book-store \
                        book-store=${DOCKER_IMAGE}:${BUILD_NUMBER} \
                        -n ${NAMESPACE}

                    kubectl rollout status deployment/book-store \
                        -n ${NAMESPACE} --timeout=120s
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    kubectl get pods -n ${NAMESPACE}
                    kubectl get svc -n ${NAMESPACE}

                    curl --noproxy '*' -f --retry 5 --retry-delay 3 \
                        http://10.21.51.49:30081/
                '''
            }
        }
    }
}
