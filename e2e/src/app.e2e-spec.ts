import { AppPage } from './app.po';
import { browser, ElementFinder } from 'protractor';
import { fakeAsync, tick } from '@angular/core/testing';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
    browser.waitForAngular();
  });
  describe('Header Test' , () => {
  beforeEach(() => {
    browser.executeScript('window.localStorage.clear();');
  });
  it('should not show product list tab', () => {
     page.getHeaderNav().then(item => {
       expect(item.length).toBe(3);
     });
  });
});

  describe('Home Page Test', () => {
  it('should get disabled previous button', () => {
    page.getPreviousButton().isEnabled().then(dt => {
        expect(dt).toBe(false);
    });
  });

  it('should get enable next button', () => {
    page.getNextButton().isEnabled().then(dt => {
        expect(dt).toBe(true);
    });
  });

  it('should get pokemon tiles', () => {
    page.getPokemonTiles().then(item => {
          expect(item.length).toBe(30);
      });
  });
});

});
