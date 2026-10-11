pipeline {
    agent { label 'spring' }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/samikshabhoir43/book-store.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build -t book-store:latest .
                '''
            }
        }

        stage('Deploy Application') {
            steps {
                sh '''
                    docker rm -f book-store-app || true

                    docker run -d \
                        --name book-store-app \
                        --network book-store-network \
                        -p 8000:80 \
                        --restart unless-stopped \
                        book-store:latest
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    sleep 3
                    docker ps
                    curl -f http://localhost:8081/
                '''
            }
        }
    }
}
