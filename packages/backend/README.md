# Установка баз данных

Для работы вам нужно на сервер установить такие программы как:

- [MySQL](https://www.mysql.com/)

## Настройка MySQL 

Нужно создать базу данных:
```sql
CREATE DATABASE `НАЗВАНИЕ_БАЗЫ`;
```

# Настройка

Переименуйте файл [.env.example](https://github.com/AuroraTeam/EasyCabinet/blob/master/packages/backend/.env.example) в `.env`.  

В этом файле будут храниться ваши настройки:

- `DEV` - Настройки под разработку в коде
- `HOST` - IP который слушает сервер
- `PORT` - Порт на котором работает сервер
- `FRONTEND_URL` - Адрес `frontend` части
- `BACKEND_URL` - Внешний адрес `backend` части
- `COOKIE_DOMAIN` - На какой домен будут созданы куки
- `COOKIE_EXPIRES_IN` - Через сколько куки станут не действительные
- `DB_HOST` - IP MySQL сервера
- `DB_PORT` - Порт MySQL сервера
- `DB_NAME` - База данных MySQL сервера
- `DB_USER` - Имя пользователя MySQL сервера
- `DB_PASS` - Пароль от пользователя MySQL сервера

# Запуск 

Собираем проект и запускаем сервер.
```
npm run build

npm run start:prod
```

Для разработки можно запустить сервер в соответственном режиме.

```
npm run start:debug
```
