const cheerio = require('cheerio');
const utils = require('../util');

const DateUtil = require('../util/dataForm');
const SchoolMealParser = require('./schoolMealParser');
const getDate = require('../util/getDate');

const SCHOOL_MEAL_URL = 'http://m.soongguri.com/m_req/m_menu.php';

class SchoolMealCrawler {
  constructor(classificationId){
    this.classificationId = classificationId;
  }
  // eslint-disable-next-line class-methods-use-this
  createMenu(body) {
    const $ = cheerio.load(body);
    const parserSchoolMeal = new SchoolMealParser($);

    const menus = {};
    const {menuName, mainMenus, subMenus} = parserSchoolMeal.parseMenu();

    /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */

    for (let i = 0; i < menuName.length; i++) {
      if (menuName[i] !== '조식') {
        menus[menuName[i]] = {
          mainMenu: mainMenus[i],
          subMenus: subMenus[i],
        };
      }
    }

    return menus;
  }

  // eslint-disable-next-line class-methods-use-this
  getFullUrl() {
    const NewDate = getDate();
    return `${SCHOOL_MEAL_URL}?rcd=${this.classificationId}&sdt=${DateUtil.getDateForm(NewDate, 'yyyyMMdd')}`;
  }

  async getCrawler() {
    const result = await utils.getResponse({
      url: this.getFullUrl(),
      headers: {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        "Cache-Control": "max-age=0",
        "Connection": "keep-alive",
        "Cookie": "PHPSESSID=j4394v4vao7gm69bpovnesiof3; ssucoop=1569345627; nbs_log=114.71.48.24_20190925022027",
        "Host": "m.soongguri.com",
        "Upgrade-Insecure-Requests": 1,
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
      }
    });
    console.log(result.headers);
    console.log(result.statusCode);
    return (result.statusCode === 200) ? this.createMenu(result.body) : {};
  }
}

module.exports = SchoolMealCrawler;
