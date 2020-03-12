const state = {
  state: {
    fileName: '',
    menuVisible: false
  }
}
const mutations = {
  SET_FILENAME: (state, fileName) => {
    state.fileName = fileName
  },
  SET_MENUVISIBLE: (state, menuVisible) => {
    state.menuVisible = menuVisible
  }
}
export default {
  state,
  mutations
}
