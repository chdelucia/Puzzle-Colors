import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('Game Of Colors', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });


  it('should have 9 colors', () => {
    page.navigateTo();
    browser.sleep(2000);
    expect(page.getColors().count()).toEqual(9);
  });

  it('change to medium level', () => {
    browser.sleep(2000);
    page.getSelectLvLInput().$('[value="2"]').click();
    browser.sleep(6000);
    expect(page.getColors().count()).toEqual(18);
  });

  it('click at first color counter should be 1', () => {
    page.getfirstColor().click();
    browser.sleep(2000);
    expect(page.getMoves()).toEqual('1');
  });

  it('check if selected box have a border', () => {
    page.getfirstColor().getAttribute('class').then(classes => {
      expect(classes.includes("selected")).toBe(true);
    })
    browser.sleep(2000);
  });
});
