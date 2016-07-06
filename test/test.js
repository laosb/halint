var should = require('should'),
    wright = require('../dist/index.js').default;

describe('#zh_cn', function() {
  it('space-between-han-west 1', function() {
    fileContent = 'Meteor，一个用于开发现代网页和移动应用的全栈 JavaScript 平台。';
    rules = { syntax: {}, lang: { 'space-between-han-west': true } };
    wright(fileContent, 'zh_cn', 'plain', rules).should.be.empty();
  });
  it('space-between-han-west 2', function() {
    fileContent = 'Meteor，一个用于开发现代网页和移动应用的全栈JavaScript平台。';
    rules = { syntax: {}, lang: { 'space-between-han-west': true } };
    wright(fileContent, 'zh_cn', 'plain', rules).should.deepEqual({
      lang: [ {
          info: '在 JavaScript 周围缺少空格',
          lineNum: 1,
          rule: 'space-between-han-west'
        } ],
      syntax: [],
    });
  });
  it('space-between-han-west 3', function() {
    fileContent = 'Meteor，一个用于开发现代网页和移动应用的全栈 JavaScript平台。';
    rules = { syntax: {}, lang: { 'space-between-han-west': true } };
    wright(fileContent, 'zh_cn', 'plain', rules).should.deepEqual({
      lang: [ {
          info: '在 JavaScript 周围缺少空格',
          lineNum: 1,
          rule: 'space-between-han-west'
        } ],
      syntax: [],
    });
  });
  it('space-between-han-west 4', function() {
    fileContent = 'Meteor，一个用于开发现代网页和移动应用的全栈JavaScript 平台。';
    rules = { syntax: {}, lang: { 'space-between-han-west': true } };
    wright(fileContent, 'zh_cn', 'plain', rules).should.deepEqual({
      lang: [ {
          info: '在 JavaScript 周围缺少空格',
          lineNum: 1,
          rule: 'space-between-han-west'
        } ],
      syntax: [],
    });
  });
  it('space-between-han-west 5', function() {
    fileContent = 'Meteor，一个用于开发现代网页和移动应用的全栈 JavaScript 平台。abc';
    rules = { syntax: {}, lang: { 'space-between-han-west': true } };
    wright(fileContent, 'zh_cn', 'plain', rules).should.deepEqual({
      lang: [ {
          info: '在 abc 周围缺少空格',
          lineNum: 1,
          rule: 'space-between-han-west'
        } ],
      syntax: [],
    });
  });

  it('avoid-curly-quotes 1', function() {
    fileContent = '「代码格式检查」是自动检查常规错误或编码风格错误的过程。';
    rules = { syntax: {}, lang: { 'avoid-curly-quotes': true } };
    wright(fileContent, 'zh_cn', 'plain', rules).should.be.empty();
  });
  it('avoid-curly-quotes 2', function() {
    fileContent = '“代码格式检查”是自动检查常规错误或编码风格错误的过程。';
    rules = { syntax: {}, lang: { 'avoid-curly-quotes': true } };
    wright(fileContent, 'zh_cn', 'plain', rules).should.deepEqual({
      lang: [
        { info: '避免使用弯引号（“”及‘’）。', lineNum: 1, rule: 'avoid-curly-quotes' }
      ],
      syntax: []
    });
  });
});
