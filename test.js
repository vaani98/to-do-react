require('chromedriver');
const assert = require('assert');
const {Builder, By} = require('selenium-webdriver');
describe('test suite 1', () => {
    let driver;
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    it('enters text in text input', async () =>{
        // Load the page
        await driver.get('http://localhost:3000');
        const inputPath = "/html[1]/body[1]/div[1]/div[1]/form[1]/input[1]";
        const inputElement = driver.findElement(By.xpath(inputPath));
        await inputElement.click();
        // Enter keywords and click enter
        await inputElement.sendKeys('test');
        const value = await inputElement.getAttribute("value");
        assert.equal(value, 'test');
    })

    it('adds tasks to ul', async() =>{
        let key = "test";
        const ulPath = "/html[1]/body[1]/div[1]/div[1]/div[1]/ul[1]/li[1]";
        const addPath = "/html[1]/body[1]/div[1]/div[1]/form[1]/img[1]";
        const addElement = driver.findElement(By.xpath(addPath));
        await addElement.click();
        const ulElement = driver.findElement(By.xpath(ulPath));

        const liItem = ulElement.findElement(By.xpath("/html[1]/body[1]/div[1]/div[1]/div[1]/ul[1]/li[1]"));
        let liValue = await liItem.getText();
        assert.equal(liValue, key);

        key = "wake up";
        const inputPath = "/html[1]/body[1]/div[1]/div[1]/form[1]/input[1]";
        const inputElement = driver.findElement(By.xpath(inputPath));
        await inputElement.click();
        await inputElement.sendKeys(key);
        await addElement.click();

        await inputElement

        liValue = await liItem.getText();
        assert.equal(liValue, key);
    })

    it('toggles strike', async() =>{
        const checkPath = "/html[1]/body[1]/div[1]/div[1]/div[1]/ul[1]/li[1]/input[1]";
        const checkElement = driver.findElement(By.xpath(checkPath));
        await checkElement.click();
        const liItem = driver.findElement(By.xpath("/html[1]/body[1]/div[1]/div[1]/div[1]/ul[1]/li[1]"));
        let lineValue = await liItem.getCssValue('text-decoration');
        lineValue = lineValue.split(' ')[0];
        const classes = ['', 'line-through'];
        let index = classes.indexOf(lineValue);
        const indexReq = +index;
        assert.equal(lineValue, classes[indexReq]);
    })

    it('deletes element', async() =>{
        const deletePath = "/html[1]/body[1]/div[1]/div[1]/div[1]/ul[1]/li[1]/img[1]";
        const liItem = driver.findElement(By.xpath("/html[1]/body[1]/div[1]/div[1]/div[1]/ul[1]/li[1]"));
        let liValue = await liItem.getText();
        const deleteElement = driver.findElement(By.xpath(deletePath));
        await deleteElement.click();
        assert.notEqual(liItem.getText(), liValue);
    })

    it('doesn"t add duplicate tasks', async() =>{
        let listElements = await driver.findElements(By.tagName('li'));
        const initLength = listElements.length;
        let key = "test";
        const addPath = "/html[1]/body[1]/div[1]/div[1]/form[1]/img[1]";
        const addElement = driver.findElement(By.xpath(addPath));
        const inputPath = "/html[1]/body[1]/div[1]/div[1]/form[1]/input[1]";
        const inputElement = driver.findElement(By.xpath(inputPath));
        await inputElement.click();
        await inputElement.sendKeys(key);
        await addElement.click();
        const errorTextPath = "/html[1]/body[1]/div[1]/div[1]/div[2]/div[1]/button[1]";
        const errorElement = driver.findElement(By.xpath(errorTextPath));
        errorElement.click();
        listElements = await driver.findElements(By.tagName('li'));
        const finalLength = listElements.length;
        assert.equal(initLength, finalLength);
    });

    it('doesn"t add empty tasks', async () =>{
        let listElements = await driver.findElements(By.tagName('li'));
        const initLength = listElements.length;
        let key = "";
        const addPath = "/html[1]/body[1]/div[1]/div[1]/form[1]/img[1]";
        const addElement = driver.findElement(By.xpath(addPath));
        const inputPath = "/html[1]/body[1]/div[1]/div[1]/form[1]/input[1]";
        const inputElement = driver.findElement(By.xpath(inputPath));
        await inputElement.click();
        await inputElement.sendKeys(key);
        await addElement.click();
        listElements = await driver.findElements(By.tagName('li'));
        const finalLength = listElements.length;
        assert.equal(initLength, finalLength);

    })

    // close the browser after running tests
    after(() => driver && driver.quit());
})
