import { createStore } from 'vuex'
const store = createStore({
  state() {
    return {
      count: 0,
      user: {
        nickname:'昵称',
        avatar: '头像url',
        login:{
          status:false
        }
      }

    }
  },
  mutations: {
    increment(state) {
      state.count++
    },
    doLoginSuccess(state) {
      state.user.login.status=true
    }
  },
  getters:{
    isLoggedIn(state){
      return state.user.login.status;
    }
  }
})

export default store