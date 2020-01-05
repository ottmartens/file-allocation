const parseTimelineString = (timelineString, setError) => {
  try {
    setError('');

    const processStrings = timelineString.split(';');
    return processStrings.map((item, index) => {
      if (!item.match(/^[A-Z],(-|[0-9]+)$/)) {
        throw new Error(`Invalid pattern!`);
      }
      const processData = item.split(',');

      const letter = processData[0];
      const size = processData[1];

      return {
        letter,
        size: size === '-' ? -1 : Number(size),
        index
      };
    });
  } catch (err) {
    setError(err.message);
    return [];
  }
};

export default parseTimelineString;
