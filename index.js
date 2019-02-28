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
		const obj = {
			title: title
		}
		return obj
	})
	await browser.close()
	return JSON.stringify(sourcewell)
}

scrape().then((value) => {
	console.log(value) // Success!
})