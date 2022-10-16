import fetch from 'node-fetch'
import { YANDEX_FOLDER_ID, YANDEX_TOKEN } from './config.js'

let yandexBearerToken = ''

export const getRecognitionResult = async (data) => {

	const url = 
		`https://stt.api.cloud.yandex.net/speech/v1/stt:recognize?folderId=${YANDEX_FOLDER_ID}`
	const header = {
		Authorization: `Bearer ${yandexBearerToken}`
	}
	const response = await fetch(
		url, {
			method: 'POST',
			headers: header,
			body: data})
	
	const status = response.status
	let result = ''

	switch (status) {
		case 200:
			const json = await response.json()
			result = json.result
			break
		case 401:
			await getBearerToken()
			await getRecognitionResult(data)
			break
		case 400:
			result = 'This audio message is empty or longer than 30 seconds'
			break
	}

	return result

}

const getBearerToken = async () => {

	const body = { 
		yandexPassportOauthToken: YANDEX_TOKEN
	}
	const bodyJson = JSON.stringify(body)

	const token = await fetch(
		'https://iam.api.cloud.yandex.net/iam/v1/tokens', {
			method: 'POST',
			body: bodyJson}
	)

	const tokenJson = await token.json()
	yandexBearerToken = tokenJson.iamToken
}
getBearerToken()