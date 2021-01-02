# docker-wordpress-test

Simple local Wordpress development environment

## Requeriments

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Local Deploy

```bash
$ docker-compose build
$ docker-compose up -d
```

Go to the browser Go to the browser and type the address [localhost:8000](localhost:8000). You can also access PHPMyAdmin by typing [localhost:8080](localhost:8080).

## Debugger

- [Visual Studio Code](https://code.visualstudio.com/docs/languages/php)

```json
{
    "name": "Listen for XDebug",
    "type": "php",
    "request": "launch",
    "pathMappings": {
        "/var/www/html": "${workspaceRoot}/wordpress"
    },
    "port": 9000
},
```


