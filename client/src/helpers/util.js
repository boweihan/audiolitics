class Util {
  static getWPM = (duration, transcription) => {
    const words = transcription.split(' ').length;
    const minutes = duration / 60;
    return `${Math.round(words / minutes)} WPM`;
  };
}

export default Util;
