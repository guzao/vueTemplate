
<script lang="ts" setup>
import { useAppData } from '@/store'

import TitleAndStationNavBar from '@/components/business/TitleAndStationNavBar.vue';

const appdate = useAppData()
</script>


<template>
    <div class="w-full overflow-hidden ">

        <TitleAndStationNavBar />

    </div>
</template>