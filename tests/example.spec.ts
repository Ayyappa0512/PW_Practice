import { test, expect } from '@playwright/test';

test.skip('has title', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("playwright-test-admin Demo Application");
});

test.skip('get started link', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  await page.goto('http://localhost:4200/pages/iot-dashboard');

  // Click the get started link.
  //by class
  await page.locator('.sidebar-toggle').click();

  await page.locator('.sidebar-toggle').click();

  //by id
  await page.locator('#email').click();

  //by attribute
  await page.locator('button[class="className"]').click();

  //By partial text match
  await page.locator(':text("using")');
  //By exact text match
  await page.locator(':text-is("Using the Grid")');

  //User facing locator like visible text 

  //label tag
  await page.getByLabel('Email').nth(2).click();
  await page.getByRole('textbox', {name:"Email"}).first().click();
  await page.getByRole('textbox', {name:"Emai2"}).click();
  await page.getByText('Visible text').isVisible();
  await page.getByTestId('by data-test-id');
  await page.getByAltText('by alt text');
  await page.getByPlaceholder('by place holder');
  await page.getByTitle('by title attrib ute');

  //locating child elements
  //css selector for child element using > or space 
  //for following sibling using "+"
  await page.locator("h1 div .email");
  //we can chain the locators
  await page.locator("parent").locator("child").locator("grand child");

  // locating parent elements
  await page.locator("h1", {hasText: 'text in column 1' }).click();
  // filter
  await page.locator("h1").filter({hasText: 'text in column 1' }).click();

  //using the xpath
  await page.locator("Using the Grid").locator('..').getByRole('textbox', {name:"Email"}).fill("ayyappa.com");

  //reusing locator by using parent or root located by creating a variable like var const 

  //assertions expect and toHaveValue and toHaveValues
  await expect(page.locator("h1")).toHaveValue('expected value');

  // Expects page to have a heading with the name of Installation.
  var isFormButtonVisible = await page.getByText("Forms").isVisible();
  console.log(isFormButtonVisible);
});

test.skip('Locator test', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole("link", {name:"Forms"}).click();
  await page.getByText("Form Layouts").click();
  const heading = await page.getByText("Inline form");
  await expect(heading).toBeVisible({visible:true});
  const cardParent = page.locator("nb-card", {hasText:"Inline form"});
  cardParent.click();
  await cardParent.getByRole("textbox", {name: "User Id"}).fill("Nivash");
  await cardParent.getByRole("textbox", {name:"Email"}).fill("Nivash");
  await cardParent.getByRole("textbox", {name:"Email"}).clear();
  await cardParent.locator("input[placeholder='Email']").fill("ayyappa@mail.com");
  await cardParent.locator("nb-checkbox").click();
  await cardParent.getByRole("button", {name:"Submit"}).click();
  const heading2 = page.locator("nb-card", {hasText:"Basic form"});
  await expect(heading2).toBeVisible({visible:true});
  await heading2.getByPlaceholder("Password").fill("Welcome@123");
  await heading2.getByPlaceholder("Email").fill("Eknath");
  await heading2.locator("nb-checkbox").click();
  await heading2.getByRole("button", {name:"Submit"}).click();


})

test.skip("extracting values", async ({page}) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole("link", {name:"Forms"}).click();
  await page.getByText("Form Layouts").click();
  const basicForm = await page.locator('nb-card').filter({hasText:"Basic form"})
  const buttonText  = await basicForm.locator('button').textContent();
  expect(buttonText).toEqual('Submit');

  //all text values
  const allRadioBtnlabels = await page.locator('nb-radio').allTextContents();
  console.log(allRadioBtnlabels);
  expect(allRadioBtnlabels).toContain("Option 1")

  //input values
  const emailField = basicForm.getByRole('textbox', {name:"Email"});
  await emailField.fill('testing@test.com');
  const emailValue = await emailField.inputValue();
  console.log(emailValue);
  expect(emailValue).toContain('testing@test.com');

  //to get attribute value
  const placeholderValue = await emailField.getAttribute("placeholder");
  console.log(placeholderValue);
  expect(placeholderValue).toContain('Email');
})

test("Assertions ", async ({page}) => {

  // General Assetion
  const value = 5;
  expect(value).toEqual(5);

  await page.goto('http://localhost:4200/');
  await page.getByRole("link", {name:"Forms"}).click();
  await page.getByText("Form Layouts").click();

  const basicForm = await page.locator('nb-card').filter({hasText:"Basic form"})
  const basicFormButton  = await basicForm.locator('button');

  expect(await basicFormButton.textContent()).toEqual("Submit");

  //locator assertion
  await expect(basicFormButton).toHaveText("Submit");

  //soft assertion
  await expect.soft(basicFormButton).toHaveText('Submit');
  await basicFormButton.click();

})