pipeline {
  agent {
    node {
      label 'base'
    }

  }
  stages {
    // 第一步：拉代码
    stage('clone code') {
      agent none
      steps {
        container('base') {
          git(url: "${REPO}", changelog: true, poll: false, credentialsId: "${GIT_CREDENTIAL_ID}", branch: 'master')
        }

      }
    }
	// 第二步：构建镜像并推送
    stage('build & push') {
      steps {
        container('base') {
          sh 'docker build -f Dockerfile -t $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$GIT_COMMIT .'
          withCredentials([usernamePassword(credentialsId : "${DOCKER_REGISTRY_CREDENTIAL_ID}" ,passwordVariable : 'DOCKER_PASSWORD' ,usernameVariable : 'DOCKER_USERNAME' ,)]) {
            sh 'echo "$DOCKER_PASSWORD" | docker login $REGISTRY -u "$DOCKER_USERNAME" --password-stdin'
            sh 'docker push  $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$GIT_COMMIT'
          }

        }

      }
    }
	// 第三步：把本次镜像打个 latest 标签推到镜像仓库
    stage('push latest') {
      steps {
        container('base') {
          sh 'docker tag  $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$GIT_COMMIT $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:latest '
          sh 'docker push  $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:latest '
        }

      }
    }
	// 第四步：部署
    stage('deploy to production') {
      agent none
      steps {
        container('base') {
          withCredentials([kubeconfigContent(credentialsId : 'kubeconfig' ,variable : 'KUBECONFIG_CONFIG' ,)]) {
            sh 'mkdir -p ~/.kube/'
            sh 'echo "$KUBECONFIG_CONFIG" > ~/.kube/config'
            sh '''envsubst < deployments/deploy.yaml | kubectl apply -f -'''
          }

        }

      }
    }

  }
  // 一般改这里就够了
  environment {
    // 最好用 ssh 协议，https 协议的仓库容易拉不下来
    REPO = 'https://hub.fgit.cf/09473ZH/bullet-resume.git'
    // ssh 协议拉代码一定要配私钥
    GIT_CREDENTIAL_ID = 'zh-github-ssh'
    KUBECONFIG_CREDENTIAL_ID = 'kubeconfig'
    REGISTRY = 'ccr.ccs.tencentyun.com'
    DOCKER_REGISTRY_CREDENTIAL_ID = 'txcloud-docker-registry'
    DOCKERHUB_NAMESPACE = 'zhouhang'
    APP_NAME = 'bullet-resume'
  }
  parameters {
    string(name: 'TAG_NAME', defaultValue: '', description: '')
  }
}
