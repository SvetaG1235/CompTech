import bcrypt from 'bcrypt';
import User from '../models/UserModel.js';

class AuthService {
  async register(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return User.create({
      ...userData,
      password: hashedPassword
    });
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;
    
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }

  async findUserById(id) {
    return User.findByPk(id);
  }
}

export default new AuthService();
