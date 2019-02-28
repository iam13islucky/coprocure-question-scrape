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
		const contractNum = rawMeta.childNodes[0].textContent.substring(1)
		const rawFileInfo = document.querySelector(
			'#tab-contract-documents > div.field--name-field-contract-documents > div.field--items > div.field--item:nth-child(2) > span.file > span.file-link > a'
		)
		const fileName = rawFileInfo.innerText
			.trim()
			.replace(/\s/g, '-')
			.toLowerCase()
		const fileUrl = rawFileInfo.href
		const vendorName = document.querySelector(
			'.vendor-contract-header__content > h1.h2'
		).innerText
		const rawContact = document.querySelector(
			'#tab-contact-information > article.vendor-contract > div.inline-user'
		)
		const contactName = rawContact.children[0].innerText
		const contactNum = rawContact.children[1].children[1].innerText.trim()
		const contactEmail = rawContact.children[2].children[1].innerText
		const obj = {
			title: title,
			expiration: expiration.toISOString(),
			contract_number: contractNum,
			files: [
				{
					[fileName]: fileUrl
				}
			],
			vendor: {
				name: vendorName,
				contacts: [
					{
						name: contactName,
						phone: contactNum,
						email: contactEmail
					}
				]
			}
		}
		return obj
	})
	await browser.close()
	return JSON.stringify(sourcewell, null, 2)
}

scrape().then((value) => {
	console.log(value) // Success!
})