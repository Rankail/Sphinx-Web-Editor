<script setup lang="ts">
import type { SPXFile } from '@/types/types';

const props = defineProps({
    tabs: Array<SPXFile>,
    current: String
})

</script>

<template>
    <div class="flex flex-row w-full h-8 bg-slate-900 border-b-[1px] border-slate-600 place-items-center">
        <p @click="$emit('changeTab', tab)" v-for="tab in props.tabs" :key="tab.name" class="px-2 min-w-[4rem] h-full flex flex-row place-items-center text-sm cursor-pointer" :class="{'bg-slate-800': props.current === tab.name}">
            {{ tab.name }}<span v-show="tab.changed">*</span>
            <svg @click.stop="$emit('closeTab', tab)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 pl-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </p>
    </div>
</template>