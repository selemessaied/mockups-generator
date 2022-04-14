import * as functions from 'firebase-functions';
import * as puppeteer from 'puppeteer';

export const getScreenShot = functions.https.onCall(async (data, context) => {
  interface ScreenShotData {
    width: number;
    height: number;
    device: 'iphone' | 'ipad' | 'macbook' | 'imac';
  }

  const puppeteerSC = async (screenShotData: ScreenShotData) => {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(60000);
    await page.setViewport({
      width: screenShotData.width,
      height: screenShotData.height
    });
    await page.goto(data.url, { waitUntil: 'networkidle0' });
    await page.waitForTimeout(5000);
    const buffer = await page.screenshot({
      encoding: 'base64',
      type: 'png'
    });
    images[screenShotData.device] =
      'data:image/png;base64,' + buffer.toString('base64');
  };

  let images = { iphone: '', ipad: '', imac: '', macbook: '' };

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  if (data.iphone) {
    await puppeteerSC({ width: 390, height: 768, device: 'iphone' });
  }
  if (data.macbook) {
    await puppeteerSC({ width: 1728, height: 1117, device: 'macbook' });
  }
  if (data.ipad) {
    await puppeteerSC({ width: 1024, height: 1366, device: 'ipad' });
  }
  if (data.imac) {
    await puppeteerSC({ width: 1920, height: 1080, device: 'imac' });
  }

  await browser.close();
  return {
    images
  };
});
