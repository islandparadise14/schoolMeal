function getDateForm(date, format = 'yyyy-MM-dd') {
    const yyyy = date.getFullYear();
    let MM = date.getMonth() + 1;
    let dd = date.getDate();
    let hh = date.getHours();
    let mm = date.getMinutes();
  
    if (MM < 10) MM = `0${MM}`;
    if (dd < 10) dd = `0${dd}`;
    if (hh < 10) hh = `0${hh}`;
    if (mm < 10) mm = `0${mm}`;
  
    if (format === 'yyyyMMdd') { return `${yyyy}${MM}${dd}`; }
    if (format === 'yyyy.MM.dd hh:mm') { return `${yyyy}.${MM}.${dd} ${hh}:${mm}`; }
  
    return `${yyyy}-${MM}-${dd}`;
  }
  
  module.exports = {getDateForm};
  