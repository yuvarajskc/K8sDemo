### initially getting docker build error.
    Need to keep docker file where we have the project or need to give the correct project path
    docker build -t k8s-demo-api -f K8sDemoApi/Dockerfile K8sDemoApi/
#### Docker container returning 502 error
    By default container listening port 8080 but we expose 80 in docker file. This issue resolved by override the default ASPNETCORE_HTTP_PORTS=80 in docker file.
### Docker compose error
    path related error, not able to resolve it so instead of pointing the docker file directly point the image
### Angular docker build error
    docker using lower version of node js
