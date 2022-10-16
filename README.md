# JamissOn:
Bot for recognizing audiomessages in Telegram based on the Yandex SpeechKit


### Settings:
```bash
npm install // at first start
```
config.js:
```javascript
export const TG_BOT_TOKEN = ''
export const YANDEX_FOLDER_ID = ''
export const YANDEX_TOKEN = ''
```
TG_BOT_TOKEN = https://core.telegram.org/bots/features#botfather
YC_FOLDER_ID = https://cloud.yandex.com/en/docs/resource-manager/operations/folder/get-id
YANDEX_TOKEN = https://cloud.yandex.ru/docs/iam/operations/iam-token/create


### Start:
```bash
node jamisson.js
```


### Start as server application:
```bash
sudo npm install forever -g
npm start
```
To stop:
```bash
npm forever stopall
```

### Example:
http://t.me/JamissOnTgBot