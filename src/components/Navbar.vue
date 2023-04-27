<script lang="ts" setup>
</script>

<template>
    <nav class="w-full h-14 flex flex-row justify-between items-center bg-slate-700">
        <ul class="nav-left flex flex-row items-stretch h-full px-3">
            <li class="nav-link">
                <RouterLink :to="{ name: 'Home' }">Sphinx</RouterLink>
            </li>
            <li class="nav-link">
                <RouterLink :to="{ name: 'Docs' }">Docs</RouterLink>
            </li>
            <li class="nav-link">
                <RouterLink :to="{ name: 'Editor' }">Editor</RouterLink>
            </li>
        </ul>
        <ul class="nav-right flex flex-row items-stretch h-full px-3">
            
        </ul>
    </nav>
</template>