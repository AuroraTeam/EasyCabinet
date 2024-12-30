<p align="center"><img src="./packages/frontend/public/logo.png" width="200px" height="200px"></p>
<h1 align="center">EasyCabinet</h1>

Данный проект предоставляет собой базовый личный кабинет для проектов использующий [AuroraLuncher](https://github.com/AuroraTeam/AuroraLauncher)

## Установка

### Автоматическая установка

Скачиваем репозиторий с помощью команды:
```
git clone https://github.com/AuroraTeam/EasyCabinet.git
```

После собираем Docker образ и запускаем его с помощью команды:
```
docker-compose up -d
```

После этого можно получить доступ к личному кабинету на адресе `http://localhost:8080`

Для изменения адреса сервера используйте файл [`.env`](https://github.com/AuroraTeam/EasyCabinet/blob/master/.env) в корне проекта.

### Ручная установка

Первым делом установите нужные зависимости.

```
npm i
```

Далее пройдите отдельно настройку и установку [frontend](https://github.com/AuroraTeam/EasyCabinet/tree/master/packages/frontend) и [backend](https://github.com/AuroraTeam/EasyCabinet/tree/master/packages/backend).

## Привязка к лаунчеру

Для привязки нужно только изменить конфигурацию LaunchServer на:

```hjson
auth:
{
    type: json
    authUrl: http://ДОМЕН_BACKEND_СЕРВЕРА/aurora/auth
    joinUrl: http://ДОМЕН_BACKEND_СЕРВЕРА/aurora/join
    hasJoinedUrl: http://ДОМЕН_BACKEND_СЕРВЕРА/aurora/hasJoined
    profileUrl: http://ДОМЕН_BACKEND_СЕРВЕРА/aurora/profile
    profilesUrl: http://ДОМЕН_BACKEND_СЕРВЕРА/aurora/profiles
},
injector:
{
    skinDomains: [
        "ДОМЕН_BACKEND_СЕРВЕРА"
    ]
}
```
Для автоматической установки конфигурация LaunchServer немного отличается:
```hjson
auth:
{
    type: json
    authUrl: http://localhost:8080/api/aurora/auth
    joinUrl: http://localhost:8080/api/aurora/join
    hasJoinedUrl: http://localhost:8080/api/aurora/hasJoined
    profileUrl: http://localhost:8080/api/aurora/profile
    profilesUrl: http://localhost:8080/api/aurora/profiles
},
injector:
{
    skinDomains: [
        "localhost"
    ]
}
```