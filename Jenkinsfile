pipeline { 
     agent any stage 
     { 
        stage("Build") { 
            steps { 
                sh "sudo yarn install" 
                sh "sudo yarn build" 
            } 
        } 
        stage("Deploy") { 
            steps { 
                sh "sudo rm -rf /var/www/ jenkins-react-app" 
                sh "sudo cp -r ${WORKSPACE}/build/ /var/www/jenkins-react-app/" 
            } 
        } 
    } 
}
