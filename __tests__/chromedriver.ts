import { Builder, Capabilities, until, By, Key } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';

(async () => {
  const timeout = 30000;
  const chromeOptions = new Options();
  chromeOptions.addArguments('--use-fake-ui-for-media-stream');
  chromeOptions.addArguments('--use-fake-device-for-media-stream');

  const driver = new Builder()
    .withCapabilities(Capabilities.chrome())
    .setChromeOptions(chromeOptions)
    .build();

  try {
    await driver.get('https://google.com');
    await driver.wait(until.titleContains('Google'), timeout);
    console.log(await driver.getTitle());

    const searchBox = await driver.findElement(By.name('q'));
    await searchBox.sendKeys('ChromeDriver', Key.RETURN);
    await driver.wait(until.titleContains('ChromeDriver'), timeout);
    console.log(await driver.getTitle());
  } finally {
    driver.quit();
  }
})();
