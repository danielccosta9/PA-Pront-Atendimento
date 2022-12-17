pipeline
{
    agent any
    stages
    {
        stage('Build Image')
        {
            steps
            {
                script
                {
                    dockerapp = docker.build("pront-atendimrnto/imagename:${env.BUILD_ID}", "-f Dockerfile .")
                }
            }
        }
    }
}