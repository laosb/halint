let info = [];

const fileParsers = {
  'plain'(fileContent) {
    return fileContent.split('\n').map((line, arrIndex) => ({
      line,
      lineNum: arrIndex + 1,
    }));
  },
};

export default function wright(fileContent, fileType, presets) {
  //TODO: Better mechanism for presets/options.
  if (!fileType) {
    fileType = 'plain';
  }
  const lines = fileParsers[fileType](fileContent);
  return lint(lines);
}
