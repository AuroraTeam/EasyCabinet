# Настройка

Все настройки выполняются в файле [.env](https://github.com/AuroraTeam/EasyCabinet/blob/master/packages/frontend/.env)

- `VITE_API_URL` - Адрес `backend` сервера

# Запуск сборки сайта

Запустите сборку и в директории `./dist` будут лежать всё что вы должны распространять через любой веб сервер.

```
pnpm run build
```

Если вам нужно посмотреть правки в дизайне можете запустить мини веб сервер

```
pnpm run dev
```

# Настройка веб сервера

Мы рекомендуем использовать Nginx для размещения сайта в сети интернет.\
Для корректной работы Nginx предоставляем пример [конфигурации](https://github.com/AuroraTeam/EasyCabinet/blob/master/packages/frontend/nginx.conf)
