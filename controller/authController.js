import { userModel } from "../model/user.model.js";
import bcrypt from 'bcrypt';
import { generateSecretKey } from "../util/generator.js";
import { validateTOTP } from "../util/validator.js";

export const registerController = async (req, res) => {
    try {
        const { email } = req.body;
        //check for existing email
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists");
        }
        const secretKey = generateSecretKey();
        return res.status(200).send({
            secretKey
        })
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //verify credential: Step 1
        const user = await userModel.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new Error("Invalid password");
        }
        //Get secret from db
        return res.status(200).send({
            secretKey: user.secretKey
        })
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

export const validateController = async (req, res) => {
    try {
        const { name, email, password, secretKey, otp, newUser } = req.body;
        const validate = validateTOTP(otp, secretKey);
        if(validate && newUser) {
            const hashedPassword = await bcrypt.hash(password, 10);
            //Insert in DB
            await new userModel({
                name,
                email,
                password: hashedPassword,
                secretKey,
            }).save();

            return res.status(200).send({
                message: "User Registered Successfully"
            });
        }
        if(validate) {
            return res.status(200).send({
                message: "User Validated Successfully"
            });
        } else {
            throw new Error("Invalid Code");
        }
        
    } catch (error) {
        return res.status(400).send(error.message);
    }
}