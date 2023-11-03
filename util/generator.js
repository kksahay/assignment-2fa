import base32 from "thirty-two";
import jsSHA from "jssha";

export const generateSecretKey = () => {
  const buffer = Math.random().toString(36);
  return base32.encode(buffer).toString().substring(0, 16);
}

export const generateTOTP = (secretKey) => {
  const time = Math.floor((Date.now() / 1000) / 30);
  base32.decode(secretKey).toString();
  const hmacSha = new jsSHA('SHA-1', 'BYTES');
  hmacSha.setHMACKey(base32.decode(secretKey).toString(), 'BYTES');
  const factorByte = factor2ByteText(time);
  hmacSha.update(factorByte);
  const hmac_result = hmacSha.getHMAC('BYTES');
  return parseInt(truncat(hmac_result));
}

function factor2ByteText(movingFactor) {
  const text = new Array(8);
  for (let i = text.length - 1; i >= 0; i--) {
    text[i] = String.fromCharCode(movingFactor & 0xFF);
    movingFactor >>= 8;
  }
  return text.join('');
}
function truncat(hmac_result) {
  const offset = hmac_result[19].charCodeAt() & 0xf;
  const bin_code = (hmac_result[offset].charCodeAt() & 0x7f) << 24
    | (hmac_result[offset + 1].charCodeAt() & 0xff) << 16
    | (hmac_result[offset + 2].charCodeAt() & 0xff) << 8
    | (hmac_result[offset + 3].charCodeAt() & 0xff);
  let otp = (bin_code % 10 ** 6).toString();
  while (otp.length < 6) {
    otp = '0' + otp;
  }
  return otp;
}