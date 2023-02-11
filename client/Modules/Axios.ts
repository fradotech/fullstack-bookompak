import axios from 'axios';

const host = 'http://localhost:3000/api/v1'

export const axiosAction = {
  get: async (endpoint: string, params?: any): Promise<any> => {
    try {
      const { data } = await axios.get(`${host}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('_accessToken')}`
        },
        params
      })

      return data
    } catch (error) {
      alert(error)
      return error
    }
  },

  post: async (endpoint: string, dataPost?: any, isCatch?: boolean): Promise<any> => {
    try {
      const { data } = await axios.post(`${host}${endpoint}`, dataPost, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('_accessToken')}`
        }
      })

      return data
    } catch (error) {
      isCatch && alert(error)
      return error
    }
  }
}