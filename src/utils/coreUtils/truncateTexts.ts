export const truncateString = (
  str: string,
  length: number,
  dotsBoolean: boolean = true,
  camelCase: boolean = false
): string | undefined => {
  if (typeof str !== "string") {
    return;
  }

  if (str.length > length) {
    let result = str.slice(0, length);

    if (dotsBoolean) {
      result += "...";
    }

    if (camelCase) {
      const firstWord = result.trim().split(" ")[0];
      return (
        firstWord.charAt(0).toUpperCase() + firstWord.slice(1).toLowerCase()
      );
    }

    return result;
  } else {
    if (camelCase) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    return str;
  }
};
