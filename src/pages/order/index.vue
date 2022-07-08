<script setup lang='ts' name=''>
import {getCurrentInstance} from 'vue'
uni.createMapContext("map1",getCurrentInstance())
</script>
<template>
<map id="map1"></map>
</template>
<style>

</style>