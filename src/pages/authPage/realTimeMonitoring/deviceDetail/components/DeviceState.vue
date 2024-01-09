<script lang="ts" setup>
import { t } from '@/langs'
import Icon from '@/components/common/Icon.vue';
import TitleBox from '@/components/common/TitleBox.vue'
import { PropType } from 'vue';


defineProps({
    deviceState: {
        type: Object as PropType<DeviceState>
    }
})

</script>

<template>
    <div class="bg-[var(--theme-white-bg)] mb-[16px] p-[20px] state_card">

        <TitleBox>  {{ t('common.unit') }}{{ t('common.state') }} </TitleBox>

        <ul class="grid grid-cols-9 gap-[16px] mt-[16px]">
            <li class="h-[88px] relative" v-for="item in 9" :key="item">

                <div class="text-[12px] text-[var(--theme-gray107)] mt-[10px] ml-[10px]"> {{ t('common.state') }} </div>
 
                <div class="state_card_split absolute  top-[23px] left-[10px] h-[12px] right-0 "></div>

                <div class="flex items-center h-[50px]">
                    <Icon :size="30" icon="icon_day_charge_green" class="mr-[6px]" />
                    <span> 待机 </span>
                </div>

            </li>
        </ul>

    </div>
</template>


<style lang="scss" scoped>
.state_card {
    ul {
        li {
            background: #fbfbfb;
            border: 1px solid rgba(206, 248, 221, .42);
            -webkit-backdrop-filter: blur(5.8815896234px);
            backdrop-filter: blur(5.8815896234px);
            padding-left: 10px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            position: relative;
            .state_card_split {
                background-image: url(../../../../../assets/icons/common/card_split_bg.svg );
                background-size: contain;
                background-repeat: no-repeat;
            }
        }
    }
}
</style>