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
      url: '/Login/chklogin',
    },

    /**
     * user info api
     * post DATA:
     * session3rd
     */
    userInfo: {
      method: 'post',
      url: '/Info',
    },

    share: {
      method: 'get',
      url: '/Fx',
    },
  },
  picture: {
    upload: {
      method: 'post',
      url: '/Upload',
    },
  },
  form: {
    submit: {
      method: 'post',
      url: '/Index/save',
    },
  },
};

export default api;
