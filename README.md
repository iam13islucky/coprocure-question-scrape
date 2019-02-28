# coprocure-question-scrape
My response to CoProcure's Interview Question
## Running this project
### Local
Clone the repo and install the puppeteer dependency:
```bash
git clone https://github.com/iam13islucky/coprocure-question-scrape.git
npm install
```
Then, run index.js
```bash
node index.js
```
### In the browser
To run this project without going through the local installation process, you can run my code on the Puppeteer Sandbox here: https://puppeteersandbox.com/B1msOmt8
## Process and Choices
I chose puppeteer because I have experience using it to scrape a SPA site periodically to check for updates in the past. It's probably overengineering for a project as simple as this, being that it is a heavy dependency, but it meant I could get this done is less than an hour.
## Further questions
>The sourcewell site contains several similar pages.

>How would you retrieve all the information on this site?

Using puppeteer to scrape the rest of the pages would be pretty simple, and that makes this solution slightly easier to adapt towards that end.

>Is there more information on each page that might be relevant to people who want to use this contract?

Absolutely! There are many more files that would likely need to included, and further contact information might be available for other pages. Probably the biggest thing I noticed not being included was what Products and Services the contract involves, which seems redundant in this case due to it being in the title, but that isn't a guarantee.