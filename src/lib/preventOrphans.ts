const preventOrphans = (text: string): string =>
  (text || '').replace(/\s*\n\n\s*/gm, '\n\n').replace(/ ([^ ]*)$/gm, '\xa0$1');

export default preventOrphans;
