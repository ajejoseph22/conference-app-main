const axios = require("axios");

class SpeakersService {
  constructor({ serviceRegistryUrl, serviceRegistryId }) {
    this.serviceRegistryUrl = serviceRegistryUrl;
    this.serviceRegistryId = serviceRegistryId;
    this.servicePromise = this.getService("speakers-service");
  }

  async getNames() {
    const { ip, port } = await this.servicePromise;
    var result = await this.callService({
      method: "get",
      url: `http://${ip}:${port}/names`
    });
    return result;
  }

  async getImage(path) {
    const { ip, port } = await this.servicePromise;
    const result = await this.callService({
      method: "get",
      responseType: "stream",
      url: `http://${ip}:${port}/images/${path}`
    });
    return result;
  }

  async getListShort() {
    const { ip, port } = await this.servicePromise;
    var result = await this.callService({
      method: "get",
      url: `http://${ip}:${port}/list-short`
    });
    return result;
  }

  async getList() {
    const { ip, port } = await this.servicePromise;
    var result = await this.callService({
      method: "get",
      url: `http://${ip}:${port}/list`
    });
    return result;
  }

  async getAllArtwork() {
    const { ip, port } = await this.servicePromise;
    var result = await this.callService({
      method: "get",
      url: `http://${ip}:${port}/artworks`
    });
    return result;
  }

  async getSpeaker(shortname) {
    const { ip, port } = await this.servicePromise;
    var result = await this.callService({
      method: "get",
      url: `http://${ip}:${port}/speaker/${shortname}`
    });
    return result;
  }

  async getArtworkForSpeaker(shortname) {
    const { ip, port } = await this.servicePromise;
    var result = await this.callService({
      method: "get",
      url: `http://${ip}:${port}/artwork/${shortname}`
    });
    return result;
  }

  getService = async serviceName => {
    try {
      var service = await axios.get(
        `${this.serviceRegistryUrl}/find/${serviceName}/${
          this.serviceRegistryId
        }`
      );
      return service.data.result;
    } catch (err) {
      console.log(err);
    }
  };

  callService = async params => {
    var response = await axios(params);
    return response.data;
  };
}

module.exports = SpeakersService;
