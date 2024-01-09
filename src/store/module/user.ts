import { defineStore } from 'pinia'
import { useDicts } from './useDict'
import { userLogin, userLogout, getUserInfo, getRouters } from '@/API'
import { hasError, useToken, useSystemRunningConfig, useRequestCatch, useIsCollapse } from '@/utils'

const { getToken, setToken, removetToken } = useToken()

const { removeIsCollapse } = useIsCollapse()
const { removeRequestCatch } = useRequestCatch()
const { removeSystemRunningConfig } = useSystemRunningConfig()

export const useUser = defineStore('useUser', {

    state() {
        return {

            token: getToken(),

            USER_POWER_BY_SMRTOPS: import.meta.env.VITE_USER_POWER_BY_SMARTOPS ,

            userInfo: {
                permissions: [],
                user: {} as UserInfoDetail,
                roles: []
            } as UserInfo,

            userRouters: [] as UserRouter[],

            /** 视图模式菜单 */
            viewModel: [] as any[]
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

        setViewModel(viewModel: any[]) {
            this.viewModel = viewModel
        },

        /** 用户登录 */
        userLogin(userInfo: UserLogin) {
            return userLogin(userInfo).then(res => {
                if (hasError(res)) return
                const token = res.token
                this.token = token
                setToken(token)
            })
        },

        /** 获取用户数据 */
        getUserInfo() {
            return getUserInfo().then(res => {
                if (hasError(res)) return
                const { code, msg, ...userInfo } = res as any
                this.userInfo = userInfo as any
                // 提前获取部分字典项
                const dicts = useDicts()
                dicts.parkTypeDict.dictLabel
                dicts.parkReleaseStatusDict.dictLabel
            })
        },


        /** 获取用户菜单 */
        getRouter() {
            return getRouters().then(res => {
                this.userRouters = res.data
                return Promise.resolve(res.data)
            })
        },


        /** 用户登出 */
        userlogOut() {
            return userLogout().then(res => {
                if (hasError(res)) return
                removetToken()
                removeIsCollapse()
                removeRequestCatch()
                removeSystemRunningConfig()
                location.reload()
            })
        }
    }

})
