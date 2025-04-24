const CrudRepository = require("./crud-repositories");
const { user } = require("../models");
const { where } = require("sequelize");
class UserRepository extends CrudRepository {
  constructor() {
    super(user);
  }

  async findOneUser(email) {
    console.log("EMail",email);
    
    const result = await user.findOne({
      where: {
        email:email,
      }
    });
    console.log('user',result);
    return result;
  }
}

module.exports = UserRepository;
