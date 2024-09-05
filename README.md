<img align="center" src="https://img001.prntscr.com/file/img001/PbHClSLAQVqljvSu1D71Bw.png">

# Тестовый бот для хранения ссылок

## Описание
Бот создан на NestJS при использовании telegraf, работает в мессенджере Telegram.
Для базы данных была выбрана ScyllaDB.

## Функционал
Бот умеет следующие действия:
<li>Добавлять ссылки в свою БД и получать коды для получения оных</li>
<li>Удалять свои ссылки</li>
<li>Получать свои ссылки в виде таблицы с пагинацией</li>
<li>Получать ссылку от любого пользователя с помощью кодов</li>
<li>Спрашивать о функционале</li>

## Установка
1) Клонируем репозиторий
2) Создаем .env файл и заполняем значениями, в следующем виде:
```
BOT_TOKEN=АПИ КЛЮЧ ОТ ТЕЛЕГРАМА
DB_USER=cassandra
DB_PASS=cassandra
DB_KS=telegram
DB_CP=localhost
```
3) Либо собираем компоуз
```
docker compose up -d
```
4) Либо сами скачиваем модули и запускаем
```
npm install && npm run start:dev
```
5) Пользуемся функционалом бота

## Иллюстрации
### Начало
<img src="https://img001.prntscr.com/file/img001/HZiklqmPSkO6J5P2qEkpyA.png">

### Создание
<img src="https://img001.prntscr.com/file/img001/Gi7EcffWSXGwHPXUY-FZjQ.png">

### Таблица
<img src="https://img001.prntscr.com/file/img001/jMGrH-ulQEuPeq6q41wrvg.png">
<img src="https://img001.prntscr.com/file/img001/jLFiOHOYS4GL1RsIF84_dA.png">
<img src="https://img001.prntscr.com/file/img001/CyjoSstETFWfYX-3brcFmg.png">

### Получение
<img src="https://img001.prntscr.com/file/img001/-qk4twkMT7qFfXxo4Alvxw.png">

### Удаление
<img src="https://img001.prntscr.com/file/img001/2-s9JhMJQVK3bp-2z1rS2g.png">

### Помощь
<img src="https://img001.prntscr.com/file/img001/GwI2Xm5ERRarGyHxnDjrNw.png">
