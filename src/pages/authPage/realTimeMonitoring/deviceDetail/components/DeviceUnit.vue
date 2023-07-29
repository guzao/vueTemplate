<script lang="ts" setup>
import { ref } from 'vue'

const activeName = ref('first')

</script>

<template>
    <div class="bg-[var(--theme-white-bg)] mb-[16px] p-[20px] pt-[10px]">

        <el-tabs v-model="activeName" class="demo-tabs">

            <el-tab-pane label="User" name="first">
                
                <div class="h-[96px] bg-[var(--theme-gray251-bg)] mt-[6px] mb-[16px]"></div>

                <ul class="grid grid-cols-4 gap-[32px]">
                    <li 
                    class="h-[183px] bg-[var(--theme-gray251-bg)]"
                    v-for="item in 10" :key="item">
                        <div class="h-[36px] flex justify-between items-center px-[15px] box-border" 
                        style="background: linear-gradient(270deg, rgba(14,169,68,0) 0%, rgba(14,169,68,0.05) 100%);">
                            <div class="text-[var(--theme-black51)]"> 1#簇 </div>
                        </div>
                    </li>
                </ul>

            </el-tab-pane>

        </el-tabs>

    </div>
</template>


<style lang="scss" scoped></style>