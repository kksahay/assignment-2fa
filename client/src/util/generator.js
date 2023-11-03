export const generateURI = (email, secretKey) => {
  return `otpauth://totp/Xuriti:${email}?secret=${secretKey}&algorithm=SHA1&digits=6&period=30`
}

