const truncateString = (
  text = '',
  maxLength = 150,
  ellipsis = '\u2026'
): string => {
  if (!text || text.length <= maxLength) {
    return text;
  }

  const truncatedString = text
    .replace(/\n/gm, ' ')
    .replace(/\s+/gm, ' ')
    .trim()
    .substr(0, text.lastIndexOf(' ', maxLength));

  return `${truncatedString}${ellipsis}`.replace(/\s*[–.,:;].$/gm, ellipsis);
};
export default truncateString;
