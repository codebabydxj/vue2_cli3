import CryptoJS from 'crypto-js';

export default function (str) {
  if (!CryptoJS) return '';
  const keyHex = CryptoJS.enc.Utf8.parse('__jDlog__085169431');
  const encrypted = CryptoJS.DES.encrypt(str, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString();
}
