# Установка баз данных

Для работы вам нужно на сервер установить такие программы как:

- [KeyDB](https://docs.keydb.dev)
- [MinIO](https://min.io/)
- [MySQL](https://www.mysql.com/)

К сожалению на Windows не получится запустить `KeyDB` так что рекомендуем использовать для ваc Docker

## Настройка KeyDB 

Его не нужно настраивать достаточно просто установить.

## Настройка MinIO

Заходим на админ панель по адресу `http://localhost:9001` и авторизуемся под аккаунтом по умолчанию (логин `admin`, пароль `password`).  
Переходим во вкладку `Buckets` и создаём хранилище. `Access Policy` у хранилище должно быть `Custom` с такими настройками:
```json
   {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": [
                    ""
                ]
            },
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::ИМЯ_ХРАНИЛИЩА/*"
            ]
        }
    ]
}
```

## Настройка MySQL 

Нужно создать базу данных:
```sql
CREATE DATABASE `НАЗВАНИЕ_БАЗЫ`
```

# Настройка

Переименуйте файл [.env.example](https://github.com/AuroraTeam/EasyCabinet/blob/master/packages/backend/.env.example) в `.env`.  

В этом файле будут храниться ваши настройки:

- `DEV` - Настройки под разработку в коде
- `HOST` - IP который слушает сервер
- `PORT` - Порт на котором работает сервер
- `FRONTEND_URL` - Адрес `frontend` части
- `COOKIE_DOMAIN` - На кокой домен будут созданы куки
- `COOKIE_EXPIRES_IN` - Через сколько куки станут не действительные
- `DB_HOST` - IP MySQL сервера
- `DB_PORT` - Порт MySQL сервера
- `DB_NAME` - База данных MySQL сервера
- `DB_USER` - Имя пользователя MySQL сервера
- `DB_PASS` - Пароль от пользователя MySQL сервера
- `REDIS_URL` - Redis ссылка до KeyDB сервера
- `S3_ACCESS_KEY_ID` - Имя пользователя Minio сервера
- `S3_SECRET_ACCESS_KEY` - Пароль от пользователя Minio сервера
- `S3_ENDPOINT` - Адрес до Minio сервера (внутренний)
- `S3_REGION` - Имя сервера Minio (можно оставить без изменения)
- `S3_BUCKET` - Название хранилища в Minio сервера
- `S3_PUBLIC_URL` - Адрес до Minio сервера (внешний)

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
