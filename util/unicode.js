function decoding(html) {
    if (typeof html === 'string') {
      html = html.replace(/&#x([0-9a-f]{1,6});/ig, (entity, code) => {
        code = parseInt(code, 16);
  
        if (code < 0x80) return entity;
  
        return String.fromCodePoint(code);
      });
    }
  
    return html;
  }
  
  module.exports = {decoding};
  