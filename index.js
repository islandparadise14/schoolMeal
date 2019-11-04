const cheerio = require('cheerio');
const axios = require('axios');

const DISTINCTION = '^*&!@$';

const test = async () => {
    const mealApi = await axios.get('http://soongguri.com/menu/m_menujson.php',{params: {fkey: '1'}});
    const keys = Object.keys(mealApi.data.학생식당);

    const lists = cheerio(mealApi.data.학생식당.중식1.replace(/<\/div>/gi,DISTINCTION+'</div>')).text().replace(/\n/g, '').split(DISTINCTION);
    const menuList = [];
    for(var i in lists) {
        if(lists[i]!=='')
            menuList.push(lists[i]);
    }
    console.log(menuList);
}

test();