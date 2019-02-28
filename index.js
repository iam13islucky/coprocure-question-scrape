const puppeteer = require('puppeteer')
let scrape = async () => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto(
		'https://www.sourcewell-mn.gov/cooperative-purchasing/022217-wex'
	)
	const sourcewell = await page.evaluate(() => {
		const title = document.querySelector(
			'.vendor-contract-header__content > p.lead'
		).innerText
		const rawMeta = document.querySelector(
			'.vendor-contract-header__content > p:last-child'
		)
		const expiration = new Date(
			rawMeta.childNodes[2].textContent.match(/\d{2}\/\d{2}\/\d{4}/)[0]
		)
		const contractNum = rawMeta.childNodes[0].textContent
		const rawFileInfo = document.querySelector(
			'#tab-contract-documents > div.field--name-field-contract-documents > div.field--items > div.field--item:nth-child(2) > span.file > span.file-link > a'
		)
		const fileName = rawFileInfo.innerText
			.trim()
			.replace(/\s/g, '-')
			.toLowerCase()
		const fileUrl = rawFileInfo.href
		const obj = {
			title: title,
			expiration: expiration.toISOString(),
			contract_number: contractNum,
			files: [
				{
					[fileName]: fileUrl
				}
			]
		}
		return obj
	})
	await browser.close()
	return JSON.stringify(sourcewell)
}

scrape().then((value) => {
	console.log(value) // Success!
})