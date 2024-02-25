import { userModel } from "../model";
import bycrpt from "bcryptjs"
import createError from "http-errors-lite"
import StatusCodes, { OK } from "http-status-codes"
import { assert, assertEvery } from "../../../helper/mad-assert";

const doRegister = async (data) => {
    assert(
        data.username,
        createError(
            StatusCodes.FORBIDDEN,
            'Invalid Data: [email] fields must exist'
        )
    );
    const existingUser = await userModel.findOne({ username: data.username });
    assert(!existingUser, createError(
        StatusCodes.UNAUTHORIZED,
        'already exist'
    ));
    const { password } = data;
    const hashedPassword = await bycrpt.hash(password, 10)
    // const newGoalId = `goal_${getNanoid()}`
    const user = await userModel.create({
        ...data,
        // goalId: newGoalId,
        password: hashedPassword,
        is_verified: true,
    });

    return user;
};


const findAllUsers = async()=>{
    const result = await userModel.find({ role: { $ne: 'admin' } });
     return result
}


const authService = {
    doRegister,
    findAllUsers
    // login,
}


export default authService