import { BookApp1Page } from './app.po';

describe('book-app1 App', () => {
  let page: BookApp1Page;

  beforeEach(() => {
    page = new BookApp1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
