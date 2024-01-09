<script lang="ts" setup>
import { t } from '@/langs'
import { computed } from 'vue'
import { isFalse } from '@/utils'
import { ElMessageBox } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { useSmartOpsBroadcastChannel } from '@/hooks'
import { useUser, useAppData, useSystemConfig } from '@/store'
import { User, Setting, Promotion } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const userInfo = useUser()
const appData = useAppData()
const systemConfig = useSystemConfig()
const smartOpsBroadcastChannel = useSmartOpsBroadcastChannel()

const avatar = computed(() => {
    const { avatar } = userInfo.userInfo.user
    return isFalse(avatar) ? 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' : `${import.meta.env.VITE_APP_SERVER_URL}${avatar}`
})

const handleSlect = (command: CommandType) => {
    const query = route.query
    switch (command) {
        case 'personCenter':
            router.push({ path: '/config/personCenter', query: { ...query, stationCode: appData.currentParkSerial } })
            break;
        case 'systemConfig':
            systemConfig.configModelState = true
            break;
        case 'logout':
            handleLogOut()
            break;
        default:
            break;
    }
}


const handleLogOut = async () => {
    try {
        await ElMessageBox.confirm(t('components.confirmLogout'), t("tipsInfo.tips"), {
            type: 'warning',
            confirmButtonText: t('common.confirm'),
            cancelButtonText: t('common.close')
        })
        userInfo.userlogOut()
        smartOpsBroadcastChannel.onPostMessage('userlogOut', {})
    } catch (error) {
        console.log('error');
    }
}

</script>

<template>
    <el-dropdown trigger="click" @command="handleSlect">
        <el-button text>
            <div class="flex items-center">
                <el-avatar :size="30" class="mr-1" :src="avatar" />
                {{ userInfo.userInfo.user.userName }}
            </div>
        </el-button>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="personCenter">
                    <el-icon :size="26">
                        <User />
                    </el-icon>
                    {{ t('components.userCenter') }}
                </el-dropdown-item>
                <el-dropdown-item command="systemConfig">
                    <el-icon :size="26">
                        <Setting />
                    </el-icon>
                    {{ t('components.sysytemConfig') }}
                </el-dropdown-item>
                <el-dropdown-item command="logout">
                    <el-icon :size="26">
                        <Promotion />
                    </el-icon>
                    {{ t('components.logout') }}
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
