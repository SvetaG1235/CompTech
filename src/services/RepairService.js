import RepairRequest from '../models/RepairRequestModel.js';

class RepairService {
  async createRequest(userId, requestData) {
    return RepairRequest.create({
      ...requestData,
      userId
    });
  }

  async getUserRequests(userId) {
    return RepairRequest.findAll({ where: { userId } });
  }
}

export default new RepairService();