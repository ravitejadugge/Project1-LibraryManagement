pipeline {
agent any 
  stages {
  stage ("run backend") {
    steps { 
    echo 'building the appication backend'
      withMaven(){
      sh 'mvn clean install'
      }
    }
  }
  
  stage ("test") {
    steps { 
    echo 'testing the appication'
    }
  }
  
   stage ("dep") {
    steps { 
    echo 'deploying the appication'
    }
  }
  
  
  }
 }
