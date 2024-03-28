import store from 'store2'

const httpServices = {
  session: {
    add: (token) => store.set('token', token),
    remove: () => store.remove('token'),
    get: () => store.get('token')
  }
}

// const interceptors = {
//   request: (request) => {
//     const token = session.get()
//     if (token) {
//       request.headers.set('Authorization', `Bearer ${token}`)
//     }
//     return request
//   },
//   response: (response) => {
//     return response.ok ? response : Promise.reject(response)
//   }
// }

export default httpServices
