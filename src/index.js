import 'babel-polyfill';

import _ from 'underscore';

// TODO: Move fileParsers and fileLinters to separted files.
const fileParsers = {
  // About parsers:
  // Parsers should just parse anything not in plain text to plain text, with no other markups
  // or parts meaningless in human language. for example, link URLs and code blocks. But parsers
  // need to use origin line numbers for each line in source file, for example, you skipped the
  // code block from line 2 to 6, the line number of the paragraph after the block should still
  // be 7, not 2.
  // TODO: A better mechanism for loading external parsers as modules.
  plain(fileContent) {
    return {
      lines: fileContent.split('\n').map((line, arrIndex) => ({
        line,
        lineNum: arrIndex + 1,
      })),
      syntaxAlerts: [],
      // Plain text parsing should have no syntax alerts as we even don't have syntax rules.
    };
  },
};

const fileLinters = {
  'zh_cn'(lines, langRules) {
    const alerts = [];

    lines.forEach(({ line, lineNum }) => {
      const west = line.match(/[A-Za-z0-9\-]+/ig);
      let westSpaced = line.match(/[ ^“‘「『，。：；（][A-Za-z0-9\-]+[ ”’』」，。：；）$]/ig);

      if (westSpaced !== null) {
        // So we need to remove spaces or commas, then compare two arrays.
        westSpaced = westSpaced.map(word => word.match(/[A-Za-z0-9\-]+/ig)[0]);
      } else {
        // Set it to a empty array as we need .length below.
        westSpaced = [];
      }

      if (langRules['space-between-han-west']) {
        if (west.length !== westSpaced.length) {
          const unspaced = _.difference(west, westSpaced);
          alerts.push({
            lineNum,
            info: `在 ${unspaced} 周围缺少空格`,
            rule: 'space-between-han-west',
          });
        }
      }
      if (langRules['avoid-curly-quotes']) {
        if (line.match(/[“‘’”]/ig)) {
          alerts.push({
            lineNum,
            info: '避免使用弯引号（“”及‘’）。',
            rule: 'avoid-curly-quotes',
          });
        }
      }
    });
    return alerts;
  },
};

export default function wright(fileContent, fileLang = 'zh_cn', fileType = 'plain', rules) {
  // TODO: Better mechanism for rules in preset.
  // `rules` is an object contains all rules in it. Presets are not handled by this function.
  // There is no default rules in this program, so be sure to have it yourself! wright doesn't
  // handle rules itself, they are just passed to parsers and linters.

  const { syntax: syntaxRules, lang: langRules } = rules;

  const { lines, syntaxAlerts } = fileParsers[fileType](fileContent, syntaxRules);
  const langAlerts = fileLinters[fileLang](lines, langRules);

  // Two kinds of alerts there:
  // language alerts: alerts of errors/warnings of (human) language itself by linters.
  // syntax alerts: alerts of errors/warnings of the syntax according to file type by parsers.
  // Both kinds of alerts can have rules defined.

  if (syntaxAlerts.length !== 0 || langAlerts.length !== 0) {
    return { syntax: syntaxAlerts, lang: langAlerts };
  }
  return {};
}
