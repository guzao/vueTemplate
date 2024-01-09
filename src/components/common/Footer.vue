<script lang="ts" setup>
import { t } from '@/langs'
import { useUser } from '@/store'
import { layoutConfig } from '@/config'

const userData = useUser()
</script>

<template>
    <div class="flex h-[26px] items-center justify-center text-[12px] text-[var(--theme-gray153)]">
        {{ userData.userInfo.user.company || t('common.footerText') }} V{{ layoutConfig.version }}
    </div>
</template>