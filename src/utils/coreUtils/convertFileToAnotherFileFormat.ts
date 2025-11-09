export const base64ToFile = (
  base64String: string,
  filename: string = "image.jpg"
): File => {
  const base64Data = base64String.split(",")[1];

  const byteCharacters = atob(base64Data);

  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);

  const mimeType = base64String.match(/data:(.*);base64,/)?.[1] || "image/jpeg";

  return new File([byteArray], filename, { type: mimeType });
};

export const dataURItoBlob = (dataURI: string): Blob => {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
};
