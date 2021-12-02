const { PatternUUID } = require('./constants.js');


function checkvalidityUIID(uiid) {
  return PatternUUID.test(uiid);
}

module.exports = { checkvalidityUIID };