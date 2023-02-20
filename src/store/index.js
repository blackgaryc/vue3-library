import { createStore } from 'vuex'
const store = createStore({
  state() {
    return {
      count: 0,
      user: {
        nickname: '昵称',
        avatar: '',
        login: {
          status: false
        }
      }

    }
  },
  mutations: {
    increment(state) {
      state.count++
    },
    doLoginSuccess(state) {
      state.user.login.status = true
    },
    updateUserInfo(state, { nickname,avatar }){
      state.user.nickname = nickname;
      state.user.avatar = avatar;
    }
  },
  getters: {
    isLoggedIn(state) {
      return state.user.login.status;
    },
    getUserAcatar(state) {
      return state.user.avatar
    },
    getUserNickname(state) {
      return state.user.nickname
    },
    getUser(state) {
      return state.user
    }
  }
})

export default store