import axios from 'axios'

axios.defaults.timeout = 0 // 请求超时时间
axios.defaults.withCredentials = true // 请求携带cookie
axios.defaults.baseURL = import.meta.env.VITE_API_HOST
axios.interceptors.request.use(
  request => {
    console.log("jklljg-=-=-=-");
    console.log(request);
    if(request.url.indexOf("34306")>-1){
      request.baseURL=""
    }
   return request;
  }
)
axios.interceptors.response.use(
  response => {
    const code = response.data?.code
    if (response.status === 200 && code === 0) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    return Promise.reject(error.response || 'Network Error')
  }
)

/**
 * 封装get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function get(url: string, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function post(url: string, params = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.data)
    })
  })
}

export { get, post }
