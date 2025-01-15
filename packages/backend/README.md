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

- `HOST` - IP который слушает сервер
- `PORT` - Порт на котором работает сервер
- `FRONTEND_URL` - Адрес `frontend` части
- `BACKEND_URL` - Внешний адрес `backend` части
- `PROJECT_NAME` - Название проекта в письмах
- `COOKIE_DOMAIN` - На какой домен будут созданы куки
- `COOKIE_EXPIRES_IN` - Через сколько куки станут не действительные
- `DATABASE_URL` - Адрес подключения к базе данных. Формат: `mysql://user:pass@host:port/database`
- `USE_SENDMAIL` - Использовать sendmail вместо nodemailer
- `SMTP_HOST` - Адрес SMTP сервера
- `SMTP_PORT` - Порт SMTP сервера
- `SMTP_SECURE` - Использовать SSL для SMTP сервера
- `SMTP_USER` - Пользователь SMTP сервера
- `SMTP_PASS` - Пароль от пользователя SMTP сервера

# Запуск 

Собираем проект и запускаем сервер.
```
npx prisma migrate deploy # Создание таблиц в базе данных

npm run build

npm run start:prod
```

Для разработки можно запустить сервер в соответственном режиме.

```
npm run prisma migrate dev # Создания типов для prisma

npm run start:debug
```
