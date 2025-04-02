/*
 * Example Selenium/WebDriver tests that demonstrate how to use the Sandbox App to run an app with different configurations
 * and how to simulate and test the MessageBus communication.
 */

import 'chromedriver';
import {Builder, By, until, Key} from 'selenium-webdriver';
import type {ThenableWebDriver} from 'selenium-webdriver';

const SANDBOX_BASE_URL = 'http://localhost:5050/portal/web/sandbox';
const APP_NAME = 'Example React App';

describe('Example React App', () => {

    let driver: ThenableWebDriver;

    beforeEach(async () => {
        driver = new Builder()
            .forBrowser('chrome')
            .build();
    });

    afterEach(() => {
        driver?.quit();
    });

    const loginAndWaitForApp = async () => {
        await driver.findElement(By.name('_username')).sendKeys('john');
        await driver.findElement(By.name('_password')).sendKeys('john');
        await driver.findElement(By.id('login-form-submit')).click();

        await driver.wait(until.elementLocated(By.id('mashroom-sandbox-publish-message-topic')));
    };

    it('processes the config parameter name correctly', async () => {
        const name = 'Maximilian';

        const appConfigParamValue = btoa(JSON.stringify({ name }));
        const url = `${SANDBOX_BASE_URL}?sbAutoTest=1&sbAppName=${APP_NAME}&sbAppConfig=${appConfigParamValue}`;
        await driver.get(url);

        await loginAndWaitForApp();

        const app = await driver.findElement(By.className('portal-app-mashroom-sandbox-app'));
        const helloWorld  = await app.findElement(By.xpath('//strong')).getText();

        expect(helloWorld).toBe(`Hello ${name}!`);
    });

    it('publishes the correct message', async () => {
        const url = `${SANDBOX_BASE_URL}?sbAutoTest=1&sbAppName=${APP_NAME}`;
        await driver.get(url);

        await loginAndWaitForApp();

        // Publish message
        await driver.findElement(By.id('example-app-publish-some-message-link')).click();

        const topic = await driver.findElement(By.id('mashroom-sandbox-app-published-by-app-1-topic')).getText();
        const messageStr = await driver.findElement(By.id('mashroom-sandbox-app-published-by-app-1-message')).getText();
        const message = JSON.parse(messageStr);

        expect(topic).toBe('to-all');
        expect(message).toEqual({
            foo: 'bar'
        });
    });

    it('processes a subscribed message correctly', async () => {
        const url = `${SANDBOX_BASE_URL}?sbAutoTest=1&sbAppName=${APP_NAME}`;
        await driver.get(url);

        await loginAndWaitForApp();
        await setTimeout((resolve) => setTimeout(resolve, 2000));

        await driver.findElement(By.id('mashroom-sandbox-publish-message-topic')).sendKeys('dummy-topic');
        console.info(await driver.findElement(By.id('mashroom-sandbox-publish-message-message')));
        // await driver.findElement(By.id('mashroom-sandbox-publish-message-message')).clear(); // Doesn't work?
        await driver.findElement(By.id('mashroom-sandbox-publish-message-message')).sendKeys(Key.BACK_SPACE, Key.BACK_SPACE, Key.BACK_SPACE,  Key.BACK_SPACE);
        await driver.findElement(By.id('mashroom-sandbox-publish-message-message')).sendKeys('{ "test": "Test 1" }');
        await driver.findElement(By.id('mashroom-sandbox-publish-message')).click();

        await driver.wait(until.elementLocated(By.id('example-app-received-data')));

        const receivedMessageStr = await driver.findElement(By.id('example-app-received-data')).getText();
        const receivedMessage = JSON.parse(receivedMessageStr);
        expect(receivedMessage).toEqual({
            test: 'Test 1'
        });
    });

});
