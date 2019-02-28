const puppeteer = require('puppeteer')
let scrape = async () => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto(
		'https://www.sourcewell-mn.gov/cooperative-purchasing/022217-wex'
	)
	const sourcewell = await page.evaluate(() => {
		return document.querySelector(
			'.vendor-contract-header__content > p.lead'
		).innerText
	})
	await browser.close()
	return sourcewell
}

scrape().then((value) => {
	console.log(value) // Success!
})