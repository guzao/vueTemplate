<script lang="ts" setup>
import { ref } from 'vue'
import { passerClass } from '@/utils'

import Icon from '@/components/common/Icon.vue'
import IconClass from '@/assets/styles/icons.scss'
import CradBox from '@/components/common/CradBox.vue'
import TitleAndStationNavBar from '@/components/business/TitleAndStationNavBar.vue'

const icons = ref(passerClass(IconClass))



</script>

<template>
    <TitleAndStationNavBar />

    <CradBox>

        <ul class="grid gap-4 grid-cols-12 ">
            <li v-for="(icon, index) in icons" :key="index">
                <Icon :icon="icon" />
            </li>
        </ul>

    </CradBox>
</template>

