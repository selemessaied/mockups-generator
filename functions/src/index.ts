import * as functions from 'firebase-functions';
import * as puppeteer from 'puppeteer';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const getScreen = functions.https.onRequest(
  async (request, response) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
      width: 390,
      height: 844
    });
    await page.goto('https://www.google.com/');
    await page.screenshot({ path: './screenshot.png' });

    await browser.close();
    response.send('Hello from Firebase!');
  }
);

export const getScreenShot = functions.https.onCall(async (data, context) => {
  let images = { iphone: '', ipad: '', imac: '', macbook: '' };
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  if (data.iphone) {
    const page = await browser.newPage();
    await page.goto(data.url, { waitUntil: 'networkidle0' });
    await page.setViewport({
      width: 390,
      height: 768
    });
    const buffer = await page.screenshot({
      encoding: 'base64',
      type: 'png'
    });
    images.iphone = 'data:image/png;base64,' + buffer.toString('base64');
  }
  if (data.macbook) {
    const page = await browser.newPage();
    await page.goto(data.url, { waitUntil: 'networkidle0' });
    await page.setViewport({
      width: 1728,
      height: 1117
    });
    const buffer = await page.screenshot({
      encoding: 'base64',
      type: 'png'
    });
    images.macbook = 'data:image/png;base64,' + buffer.toString('base64');
  }
  if (data.ipad) {
    const page = await browser.newPage();
    await page.goto(data.url, { waitUntil: 'networkidle0' });
    await page.setViewport({
      width: 1366,
      height: 1024
    });
    const buffer = await page.screenshot({
      encoding: 'base64',
      type: 'png'
    });
    images.ipad = 'data:image/png;base64,' + buffer.toString('base64');
  }
  if (data.imac) {
    const page = await browser.newPage();
    await page.goto(data.url, { waitUntil: 'networkidle0' });
    await page.setViewport({
      width: 1920,
      height: 1080
    });
    const buffer = await page.screenshot({
      encoding: 'base64',
      type: 'png'
    });
    images.imac = 'data:image/png;base64,' + buffer.toString('base64');
  }

  await browser.close();
  return {
    images
  };
});
