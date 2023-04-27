<script setup lang="ts">
import type { SPXFile } from '@/types/types';
import { ref, type Ref } from 'vue';


const emit = defineEmits(['openFile', 'openFolder']);

const inputOpenFile: Ref<HTMLInputElement | null>  = ref(null);
const inputOpenFolder: Ref<HTMLInputElement | null>  = ref(null);

function openFile() {
    const files = inputOpenFile.value?.files;
    console.log(files);
    const reader = new FileReader();
    if (files?.length != 1) {
        console.error("Expected 1 file.");
        return;
    }
    const file = files[0];
    reader.readAsText(file, 'UTF-8');

    reader.onload = (event) => {
        emit('openFile', {name: file.name, content: event.target?.result?.toString() ?? "", changed: false});
    }
}

let waitForFiles = 0;
let queuedFiles: SPXFile[] = [];

function openFolderPart(file: SPXFile) {
    waitForFiles--;
    queuedFiles.push(file);
    if (waitForFiles > 0) return;
    emit('openFolder', queuedFiles);
    queuedFiles = [];
}

function openFolder() {
    console.log(inputOpenFolder.value?.files);
    const files = inputOpenFolder.value?.files;
    if (!files) return;

    waitForFiles = files.length;

    [...files].forEach(file => {
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        console.log(file.webkitRelativePath);

        reader.onload = e => {
            if (!e.target) return;
            openFolderPart({name: file.name, content: e.target?.result?.toString() ?? "", changed: false});
        }
    });
}

</script>

<template>
     <nav class="w-full h-8 flex flex-row justify-between items-center bg-slate-700">
        <ul class="tool-left flex flex-row items-stretch h-full px-3">
            <li class="tool">
                <p>File</p>
                <div class="tool-dropdown">
                    <p @click="inputOpenFile?.click()">Open File</p>
                    <input type="file" accept=".spx, .cerb" @change="openFile" class="hidden" ref="inputOpenFile">
                    <p @click="inputOpenFolder?.click()">Open Folder</p>
                    <input type="file" webkitdirectory directory multiple @change="openFolder" class="hidden" ref="inputOpenFolder">
                    <p>Open Project</p>
                </div>
            </li>
            <li class="tool">
                <p>Edit</p>
                <div class="tool-dropdown">
                    <p>Find</p>
                    <p>Replace</p>
                </div>
            </li>
            <li class="tool">
                <p>Run</p>
                <div class="tool-dropdown">
                    <p>Run File</p>
                    <p>Run Project</p>
                </div>
            </li>
        </ul>
        <ul class="nav-right flex flex-row items-stretch h-full px-3">
            
        </ul>
    </nav>
</template>