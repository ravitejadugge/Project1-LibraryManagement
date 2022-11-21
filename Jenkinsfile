pipeline {
agent any
stages {
stage ('Compile Stage') {
steps {
withMaven(maven : 'apache-maven-3.8.6') {
sh 'mvn clean compile'
}
}
}

stage ('Install Stage') {
steps {
withMaven(maven : 'apache-maven-3.8.6') {
bat'mvn install'
}
}
}
}
}
