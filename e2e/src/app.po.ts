import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl + 'home') as Promise<unknown>;
  }
   getPreviousButton(): ElementFinder{
     return element(by.css('app-root app-home .pagination .btn-default')) as ElementFinder;
   }
   getNextButton(): ElementFinder{
    return element(by.css('app-root app-home .pagination .btn-primary')) as ElementFinder;
  }
  getPokemonTiles(): ElementArrayFinder{
    const tiles = element.all((by.css('app-root app-home  .box .content'))) as ElementArrayFinder;
    return tiles;
  }
  getHeaderNav(): ElementArrayFinder{
    const list = element.all((by.css('app-root app-header .header nav ul li'))) as ElementArrayFinder;
    return list;
  }
  getFormFields(): ElementArrayFinder {
    return  element.all((by.css('app-root app-create-product .field'))) as ElementArrayFinder;

  }
  getFormButton(): ElementArrayFinder {
    return  element.all((by.css('app-create-product  .formButton'))) as ElementArrayFinder;

  }
}
