const puppeteer = require('puppeteer')
let scrape = async () => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await browser.close()
	return 'Success!'
}

scrape().then((value) => {
	console.log(value) // Success!
})