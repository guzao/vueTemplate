<script lang="ts" setup>
    import BaseHeader from "@/components/common/BaseHeader.vue";
    import I18nSelect from "@/components/common/I18nSelect.vue";
    import UserDropdown from "@/components/common/UserDropdown.vue";
</script>

<template>


    <BaseHeader>

        <div class="flex justify-between  items-center h-full">

            <div></div>

            <div class="flex items-center h-full">

                <I18nSelect class="mr-[10px]" />
                
                <UserDropdown />

            </div>

        </div>
        
    </BaseHeader>


</template>

