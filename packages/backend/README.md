# Установка баз данных

Для работы вам нужно на сервер установить такие программы как:

- [MySQL](https://www.mysql.com/)

### Настройка MySQL

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

### Настройка хранилищ

Если вы хотите использовать более быстрый способ хранения кеша то установите [Redis](https://docs.keydb.dev/docs/download/) и заполните переменной `REDIS_URL`.

Так же для удобства вы может использовать внешние хранилище для файлов по типу S3.\
Для этого можно использовать [MinIO](https://min.io/download#/linux) или любые облочные сервисы совместимы с S3 и заполните переменные:

- `STORAGE_FORMAT` - Нужно изменить на `s3`
- `S3_ACCESS_KEY_ID` - Логин от S3
- `S3_SECRET_ACCESS_KEY`- Пароль от S3
- `S3_ENDPOINT`- URL до S3
- `S3_REGION` - Регион S3 (может быть "not-used" если не используется)
- `S3_BUCKET` - Сам bucket в S3
- `S3_PUBLIC_URL` - Публичный URL до S3

# Запуск

Собираем проект и запускаем сервер.

```sh
pnpx prisma generate # Генерация типов для клиента призмы
pnpx prisma migrate deploy # Создание таблиц в базе данных

pnpm run build
pnpm run start:prod
```

Для разработки можно запустить сервер в соответственном режиме.

```sh
pnpx prisma migrate dev # Создания типов для prisma

pnpm run start:dev
```
