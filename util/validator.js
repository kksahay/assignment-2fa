import { generateTOTP } from "./generator.js";

export const validateTOTP = (userEnteredTOTP, secretKey) => {
    const expectedTOTP = generateTOTP(secretKey);
    return parseInt(userEnteredTOTP) === expectedTOTP;
}
