const unicode = require('../util/unicode');

class SchoolMealParser {
  constructor(cheerio) {
    this.cheerio = cheerio;
  }

  parseMenu() {
    const menuName = this.parseMenuNames();
    const {mainMenus, subMenus} = this.parseMenuList();

    return {menuName, mainMenus, subMenus};
  }

  parseMenuNames() {
    const {cheerio} = this;
    const menuNames = [];

    cheerio('.menu_nm').each((i, elements) => {
      menuNames.push(
        cheerio(elements).text(),
      );
    });

    return menuNames;
  }

  parseMenuList() {
    const {cheerio} = this;

    const mainMenus = [];
    const subMenus = [];

    cheerio('.menu_list').each((i, elements) => {
      let isMain = false;
      if (this.decodeHtml(elements) !== '') {
        mainMenus.push(
          this.decodeHtml(elements).replace(/\n/g, ''),
        );
        isMain = true;
      }

      const subMenu = [];
      let isFirst = false;
      cheerio(elements).children('div').each((i, elements) => {
        if (cheerio(elements).text() !== '') {
          if (!isMain) {
            mainMenus.push(
              cheerio(elements).text().replace(/\n/g, ''),
            );
            isMain = true;
            return;
          }
          if (!isFirst) {
            isFirst = true;
            return;
          }
          subMenu.push(
            cheerio(elements).text(),
          );
        }
      });

      subMenus.push(subMenu);
    });

    return {mainMenus, subMenus};
  }

  decodeHtml(html) {
    const {cheerio} = this;

    const decodedHtml = unicode.decoding(
      cheerio(html).html(),
    );

    return decodedHtml.substring(0, decodedHtml.indexOf('<'));
  }
}

module.exports = SchoolMealParser;
