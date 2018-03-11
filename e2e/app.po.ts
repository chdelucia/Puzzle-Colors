import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  wait(time:number){
    browser.manage().timeouts().implicitlyWait(time);
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getColors(){
    return element.all(by.className('color-box'));
  }

  getfirstColor(){
    return element(by.css('.color-box:first-child'));
  }
  getMoves(){
    return element(by.id('move-counter')).getText();
  }

  getSelectLvLInput() {
    return element(by.css('select'));
  }

}
