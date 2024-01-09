<script lang="ts" setup>
import { ref } from 'vue'
import { passerClass } from '@/utils'
import Ionc from '@/components/common/Icon.vue'
import IconClass from '@/assets/styles/icons.scss'
import CradBox from '@/components/common/CradBox.vue'
import SubTitle from '@/components/common/SubTitle.vue'

const icons = ref(passerClass(IconClass))
</script>

<template>
    <SubTitle />

    <CradBox>
        <div class="grid gap-4 grid-cols-12">
            <Ionc :icon="icon" :size="28" v-for="(icon, index) in icons" :key="index" />
        </div>
    </CradBox>
</template>

