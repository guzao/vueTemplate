<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { useUser, useAppData, useSystemConfig } from '@/store'
import { User, Setting, Promotion } from '@element-plus/icons-vue'

const route = useRoute()
const userInfo = useUser()
const router = useRouter()
const appData = useAppData()
const systemConfig = useSystemConfig()


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
        await ElMessageBox.confirm('确定注销并退出系统吗?', '系统提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        })
        userInfo.userlogOut()
    } catch (error) {
        console.log('error');
    }
}

</script>

<template>
    <el-dropdown trigger="click" @command="handleSlect">
        <el-button text>
            <div class="flex items-center">
                <el-avatar :size="30" class="mr-1"
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" /> {{
                        userInfo.userInfo.user.userName }}
            </div>
        </el-button>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="personCenter">
                    <el-icon :size="26">
                        <User />
                    </el-icon>
                    个人中心
                </el-dropdown-item>
                <el-dropdown-item command="systemConfig">
                    <el-icon :size="26">
                        <Setting />
                    </el-icon>
                    系统配置
                </el-dropdown-item>
                <el-dropdown-item command="logout">
                    <el-icon :size="26">
                        <Promotion />
                    </el-icon>
                    退出登录
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
