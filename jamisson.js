import { Telegraf } from 'telegraf'
import fetch from 'node-fetch'
import { TG_BOT_TOKEN } from './config.js'
import { getRecognitionResult } from './yandex.js'

const bot = new Telegraf(TG_BOT_TOKEN)

const BotApiUrl     = `http://api.telegram.org/bot${TG_BOT_TOKEN}`
const FileBotApiUrl = `http://api.telegram.org/file/bot${TG_BOT_TOKEN}`


bot.on('voice', async (ctx) => {

	const replyMessageId = ctx.update.message.message_id
	const chatId		 = ctx.update.message.chat.id
	const fileId		 = ctx.update.message.voice.file_id
	const extra = {
		disable_web_page_preview: true,
		reply_to_message_id: replyMessageId
	}

	const fileInfo = await fetch(`${BotApiUrl}/getFile?file_id=${fileId}`)
	const fileInfoJson = await fileInfo.json()
	const filePath = fileInfoJson.result.file_path

	const downloadedData = await fetch(`${FileBotApiUrl}/${filePath}`)
	const data = await downloadedData.blob()

	const message = await getRecognitionResult(data)

	bot.telegram.sendMessage(chatId, message, extra)

})

bot.start((ctx) => {
	ctx.reply('Send me audio message. It should not be more than 30 seconds')
})

bot.launch()