<script lang="ts" setup>

import TitleBox from '@/components/common/TitleBox.vue';
</script>

<template>
    <div class="bottom_bg income_chart h-[27vh] px-[21px] min-h-[250px] ">

        <TitleBox class="my-[10px]"> 经济收益趋势图 </TitleBox>

    </div>
</template>

<style lang="scss" scoped>
.bottom_bg.income_chart {
    background-image: url(../../../.././assets/image/overview/parklOverview_bottom_bg.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
</style>