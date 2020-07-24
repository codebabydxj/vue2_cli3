export default function (str) {
  const { CryptoJS } = window;
  if (!CryptoJS) return '';
  const keyHex = CryptoJS.enc.Utf8.parse('__jDlog__');
  const encrypted = CryptoJS.DES.encrypt(str, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString();
}
