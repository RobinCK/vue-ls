module.exports = {
  'Counter test' : function (browser) {
    browser
      .url("http://localhost:9000/examples/counter/index.html")
      .assert.containsText("#count", "0", "Start value: 0")
      .click('#increment')
      .assert.containsText("#count", "1", "Value after increment: 0 -> 1")
      .click('#increment')
      .assert.containsText("#count", "2", "Value after increment: 1 -> 2")
      .click('#decrement')
      .assert.containsText("#count", "1", "Value after decrement: 2 -> 1")
      .end();
  }
};
