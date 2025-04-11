import MasterRequest from '../models/MasterRequest.js';
import User from '../models/User.js';

class MasterService {
  async createRequest(userId, requestData) {
    return MasterRequest.create({
      ...requestData,
      clientId: userId
    });
  }

  async getMasterRequests(masterId) {
    return MasterRequest.findAll({
      where: { masterId },
      include: [
        { model: User, as: 'Client' }
      ]
    });
  }
}

export default new MasterService();