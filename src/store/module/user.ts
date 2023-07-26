import { defineStore } from 'pinia';
import { hasEror, useToken } from '@/utils'
import { userLogin, userLogout, getUserInfo, getRouters } from '@/API'

const { getToken, setToken, removetToken } = useToken()

export const useUser =  defineStore('useUser', {
    state() {
        return {

            token: getToken(),

            userInfo: {
                permissions: [],
                user: {} as UserInfoDetail,
                roles: []
            } as UserInfo,
            
            userRouters: [] as UserRouter []
        }
    },

    getters: {

        /** VUE 运行时的token */
        getRunningTimeToken(state) {
            return state.token
        },

        /** 用户权限 */
        getPermissions(state) {
            return state.userInfo.permissions
        },

        /** 用户角色 */
        getRoles(state) {
            return state.userInfo.roles
        },

        /** 用户详情 */
        getUserDetail(state) {
            return state.userInfo.user
        },

    },

    actions: {

        /** 用户登录 */
        userLogin(userInfo: UserLogin) {
            return userLogin(userInfo).then(res => {
                if (hasEror(res)) return
                const token = res.token
                this.token = token
                setToken(token)
            })
        },

        /** 获取用户数据 */
        getUserInfo () {
            return getUserInfo().then(res => {
                if (hasEror(res)) return 
                const {  code,  msg, ...userInfo } = res as any
                this.userInfo = userInfo as any
            })
        },


        /** 获取用户菜单 */
        getRouter () {
            return getRouters().then(res => {
                this.userRouters = res.data
                return Promise.resolve(res.data)
            })
        },


        /** 用户登出 */
        userlogOut() {
            return userLogout().then(res => {
                if (hasEror(res)) return
                removetToken()
                location.href = '/login';
            })
        }
    }

})
