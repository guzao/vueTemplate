<script lang="ts" setup>
import { useUser, useAppData } from '@/store'
import { useRouter, useRoute } from 'vue-router'

const appData = useAppData()
const userInfo = useUser()
const route = useRoute()
const router = useRouter()

const handleSlect = (command: 'personCenter' | 'logout') => {
    switch (command) {
        case 'personCenter':
            const query = route.query
            router.push({ path: '/config/personCenter', query: { ...query, stationCode: appData.currentParkSerial } })
            break;
        case 'logout':
            userInfo.userlogOut()
            break;
        default:
            break;
    }
}
</script>

<template>
    <el-dropdown trigger="click"  @command="handleSlect">
        <el-button text>
            <div class="flex items-center">
                <el-avatar :size="30" class="mr-1" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />  {{ userInfo.userInfo.user.userName }}
            </div>
        </el-button>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="personCenter"> 个人中心 </el-dropdown-item>
                <el-dropdown-item command="logout"> 退出登录 </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<style lang="scss" scoped></style>