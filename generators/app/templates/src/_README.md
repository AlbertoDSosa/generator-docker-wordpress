# <%= appname %>

<%= appDescription %>

## Requeriments

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Local Deploy

```bash
$ docker-compose build
$ docker-compose up -d
```

Go to the browser Go to the browser and type the address [localhost:<%= wordpressPort %>](localhost:<%= wordpressPort %>). You can also access PHPMyAdmin by typing [localhost:<%= phpMyAdminPort %>](localhost:<%= phpMyAdminPort %>).

## Debugger

- [Visual Studio Code](https://code.visualstudio.com/docs/languages/php)

```json
{
    "name": "Listen for XDebug",
    "type": "php",
    "request": "launch",
    "pathMappings": {
        "/var/www/html": "${workspaceRoot}/<%= folderName %>"
    },
    "port": 9000
},
```


