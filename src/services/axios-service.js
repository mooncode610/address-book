const axios = require('axios').default;
class AxiosService{
    postService(url = '', payload = null,tokenRequired = false, httpOptions = null ){
        return axios.post(url, payload, tokenRequired && httpOptions);
    }
    getService(url = '', tokenRequired = false, httpOptions = null) {
        return axios.get(url, tokenRequired && httpOptions);
    }
    putService(url = '', payload = null, tokenRequired = false, httpOptions = null) {
        return axios.put(url, payload, tokenRequired && httpOptions);
    }
}
module.exports = new AxiosService()