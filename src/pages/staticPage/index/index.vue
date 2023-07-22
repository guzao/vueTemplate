<script setup lang="ts">
import { useStationList } from './useStationList'
import NavBar from './components/NavBar.vue'
import StationList from './components/StationList.vue'

const { getData } = useStationList()

getData()

</script>

<template>

    <NavBar />

    <StationList />

</template>