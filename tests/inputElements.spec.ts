import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByRole("link", {name:"Forms"}).click();
    await page.getByText("Form Layouts").click();
});

test.skip("Input Element", (async ({page}) => {

    // locate the email input under using the grid
    // enter the text using fill
    // clear the input
    // enter the text using the press sequence 
    // use generic assertions to validate input text
    // use locator assertions to validate input text 

    const emailLocator = await page.locator("nb-card",  {hasText: "Using the Grid"}).getByRole("textbox", {name:"Email"});
    console.log(await emailLocator.getAttribute("placeholder"));
    await emailLocator.fill("ayyappa@gmail.com");
    await emailLocator.clear();
    await emailLocator.pressSequentially("ayyappa@gmail.com", {delay:500});

    //assertions -general
    const inputValue = await emailLocator.inputValue();
    expect(inputValue).toEqual("ayyappa@gmail.com");

    //locator assertion
    await expect(emailLocator).toHaveValue("ayyappa@gmail.com");
}));

test.skip("Radio Element", (async ({page}) => {

    // locate the email input under using the grid

    const radioBtnLocator = await page.locator("nb-card",  {hasText: "Using the Grid"}).getByRole("radio", {name:"Option 1"});
    let radioStatus = await radioBtnLocator.isChecked()
    expect(radioStatus).toBeFalsy();
    console.log(radioStatus);
    await expect(radioBtnLocator).toBeChecked({checked:false});
    await radioBtnLocator.check({force:true})
    await expect(radioBtnLocator).toBeChecked({checked:true});
    radioStatus = await radioBtnLocator.isChecked()
    expect(radioStatus).toBeTruthy();
}));

test.skip("Check boxes", (async ({page}) => {

    //naviagate to toastr page
    await page.getByText("Modal & Overlays").click();
    await page.getByText("Toastr").click();

    const checkbox1 = page.getByRole("checkbox", {name:"Hide on click"});
    await checkbox1.click({force:true});
    console.log(await checkbox1.isChecked());

    //using the check method
    await checkbox1.check({force:true});
    console.log(await checkbox1.isChecked());

    //using the uncheck method
    await checkbox1.uncheck({force:true});
    console.log(await checkbox1.isChecked());

}));


test.skip("Date Picker", (async ({page}) =>{

    // await page.getByText("Forms").click();
    await page.getByText("Datepicker").click();

    const datePicer = await page.getByPlaceholder("Form Picker");
    datePicer.click();

    const date  = "1";
    await page.locator("[class='day-cell ng-star-inserted']").getByText(date, {exact:true}).click();
    console.log(await datePicer.inputValue());

}))

test("slider", (async ({page})=>{

    await page.getByText("IoT Dashboard").click();
    //update attribute 
    // const tmepSlider = await page.locator("[tabtitle='Temperature'] ngx-temperature-dragger circle");
    // await tmepSlider.evaluate(node => {
    //     node.setAttribute("cx", "268.5465712183182");
    //     node.setAttribute("cy","152.9732191699161");
    // })

    //2nd approach 
    const tempBox = await page.locator("[tabtitle='Temperature'] ngx-temperature-dragger");
    await tempBox.scrollIntoViewIfNeeded()
    const box = await tempBox.boundingBox()
    const x = box.x + box.width/2
    const y = box.y + box.height/2
    await page.mouse.move(x, y)
    await page.mouse. down ()
    await page.mouse.move(x +100, y) 
    await page.mouse.move(x+100, y+100)
    await page.mouse.up()
    await expect(tempBox).toContainText("30");

}))