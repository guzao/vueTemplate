<script setup lang="ts">
import { ref } from 'vue'

import { VueCropper } from 'vue-cropper'
import { Files, RefreshRight, RefreshLeft } from '@element-plus/icons-vue'


const cropper = ref()

const fileRef = ref<HTMLElement>()

const avatarBase64 = ref('')

const previews = ref({
    url: '',
    img: ''
})

const rotateLeft = () => cropper.value.rotateLeft();

const rotateRight = () => cropper.value.rotateRight();

const realTime = (data: any) => {
    previews.value = data
}

const getImageInfo = (e: any) => {
    let file = e.target.files[0];
    let URL = window.URL || window.webkitURL;
    avatarBase64.value = URL.createObjectURL(file);
}

</script>

<template>

    <div>
        <div class="flex h-[350px] relative">

            <vue-cropper class="flex-1" 
            ref="cropper" :canMoveBox="true" :fixedBox="!true"
            :img="avatarBase64"  :autoCrop="true" 
            :autoCropWidth="200" :autoCropHeight="200" 
            @realTime="realTime" :info="true"
            outputType="png"></vue-cropper>

            <div class="flex-1 h-[360px] relative flex items-center justify-center relative">
                <img :src="previews.url" class="w-[200px] h-[200px]" style="border-radius: 100%;" />
            </div>

        </div>
    </div>

    <div class="mt-[16px] flex justify-between">
        <div class="flex-1">
            <el-button size="default" :icon="Files" @click="fileRef?.click()">文件上传</el-button>
            <el-button size="default" :icon="RefreshRight" @click="rotateLeft"></el-button>
            <el-button size="default" :icon="RefreshLeft" @click="rotateRight"></el-button>
            <input v-show="false" ref="fileRef" type="file" accept="image/png, image/jpeg" @change="getImageInfo" />
        </div>

        <el-button size="default" type="primary" >提交</el-button>
    </div>
    
</template>