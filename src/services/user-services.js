const { UserRepository } = require("../repository");
const bcrypt = require("bcryptjs");
const userRepository = new UserRepository();
async function createUser(data) {
  try {
    const result = await userRepository.create(data);
    return result;
  } catch (error) {
    console.log("Error in CreateUser Service", error.message);
    throw error;
  }
}

async function loginUser(email) {
  /// first we check email is register or not
  try {
    const user = await userRepository.findOneUser(email);
    console.log("loginuser", user);
    return user;
  } catch (error) {
    console.log("Error in userLogin Service", error.message);
    throw error;
  }
}

async function getUserId(id) {
  try {
    const user = await userRepository.get(id);
    return user;
  } catch (error) {
    console.log("Error inside get user", error.message);
    throw error;
  }
}

module.exports = {
  createUser,
  loginUser,
  getUserId,
};
