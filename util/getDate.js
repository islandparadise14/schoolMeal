function getDate() {
    const NewDate = new Date();
    NewDate.setTime(NewDate.getTime() + (NewDate.getTimezoneOffset() * 60000) + (9 * 3600000));
    return NewDate;
  }
  
  module.exports = getDate;
  