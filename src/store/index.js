import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        openModal: false,
        languages: [
            {
                id: "tr",
                text: "Türkçe"
            },
            {
                id: "en",
                text: "English"
            }
        ],
        userInfo: '',
        mobileMenuIsOpen: false
    },
    getters: {
        getOpenModal(state) {
            return state.openModal
        },
        getLangueages(state) {
            return state.languages
        },
        getUserInfo(state) {
            return state.userInfo
        },
        getMobileMenuStatus(state) {
            return state.mobileMenuIsOpen
        }
    },
    mutations: {
        updateModalStatus(state, data) {
            state.openModal = data
        },
        updateUserInfo(state, obj) {
            state.userInfo = obj
        },
        updateMobileMenuStatus(state, boolean) {
            state.mobileMenuIsOpen = boolean
        }
    }
})
