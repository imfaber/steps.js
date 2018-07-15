function ansiWordBound(c) {
  return (
    (' ' === c) ||
    ('\n' === c) ||
    ('\r' === c) ||
    ('\t' === c)
  )
}

/**
 *
 * @param text {string} - The text
 * @param wordsPerMinute {number} - The number of words per minute (200)
 * @returns {{text: string, minutes: number, time: number, words: number}}
 */
export default function readingTime(text, wordsPerMinute) {
  let words = 0, start = 0, end = text.length - 1, i;

  // use default values if necessary
  wordsPerMinute = wordsPerMinute || 200;

  // fetch bounds
  while (ansiWordBound(text[start])) start++
  while (ansiWordBound(text[end])) end--

  // calculate the number of words
  for (i = start; i <= end;) {
    for (; i <= end && !ansiWordBound(text[i]); i++) ;
    words++
    for (; i <= end && ansiWordBound(text[i]); i++) ;
  }

  // reading time stats
  const minutes = words / wordsPerMinute;
  const time = minutes * 60 * 1000;
  const displayed = Math.ceil(minutes.toFixed(2));

  return {
    text: displayed + ' min read',
    minutes: minutes,
    time: time,
    words: words
  }
}
