var should = require('should'),
    wright = require('../dist/index.js').default;

describe('#plain-zh_cn', function() {
  it('中西文间空格正确', function() {
    fileContent = 'Meteor 是一个用于开发现代网页和移动应用的全栈 JavaScript 平台。';
    rules = { syntax: {}, lang: { 'space-between-han-west': true } };
    wright(fileContent, 'zh_cn', 'plain', rules).should.be.empty();
  });
  it('中西文间空格缺失', function() {
    fileContent = 'Meteor 是一个用于开发现代网页和移动应用的全栈JavaScript平台。';
    rules = { syntax: {}, lang: { 'space-between-han-west': true } };
    wright(fileContent, 'zh_cn', 'plain', rules).should.be.empty();
  });
});
