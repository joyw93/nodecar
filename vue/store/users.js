export const state = () => ({
  me: null,
});

export const mutations = {
  //동기
  setMe(state, payload) {
    state.me = payload;
  },
  changeNickname(state, payload) {
    state.me.nickname = payload.nickname;
  },
};

export const actions = {
  //비동기
  signUp({ commit, state }, payload) {
    console.log(process.env.NODE_ENV);
    console.log(process.env);
    commit("setMe", payload);
  },
  logIn({ commit }, payload) {
    this.$axios.post("http://3.39.63.126:80/user", {
      email: payload.email,
      password: payload.password,
    });
    commit("setMe", payload);
  },
  logOut({ commit }, payload) {
    commit("setMe", null);
  },
  changeNickname({ commit }, payload) {
    commit("changeNickname", payload);
  },
};
