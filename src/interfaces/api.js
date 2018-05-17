// apis
const api = {
  user: {
    /**
     * login api
     * post DATA:
     * code
     * rawData
     * signature
     * encryptedData
     * iv
     */
    login: {
      method: 'post',
      url: '/Login/index',
    },
  },
};

export default api;
