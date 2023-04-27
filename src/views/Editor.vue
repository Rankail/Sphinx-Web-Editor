<script setup lang="ts">
import Toolbar from '@/components/Toolbar.vue';
import Tabs from '@/components/Tabs.vue';
import type { SPXFile } from '@/types/types';
import { onMounted, reactive, ref, type Ref } from 'vue';

let currentFile: Ref<SPXFile> = ref({name: "New", content: "", changed: false});
const files: Array<SPXFile> = reactive([currentFile.value]);

function setCurrentFile(file: SPXFile) {
    currentFile.value = file;
    updLineNumbers();
}

function closeFile(file: SPXFile) {
    if (file.changed) return;

    const idx = files.indexOf(file);
    if (currentFile.value.name === file.name && files.length > 1) {
        setCurrentFile((idx > 0) ? files[idx-1] : files[idx+1]);
    }
    if (idx !== -1) {
        files.splice(idx, 1);
    }
}

function openedFile(file: SPXFile) {
    files.push(file);
    setCurrentFile(file);
}

function openedFolder(folder: SPXFile[]) {
    files.push(...folder);
    if (folder.length > 0) {
        setCurrentFile(folder[0]);
    }
}

let editor: Ref<HTMLTextAreaElement | undefined> = ref();
let lineNumbers: Ref<HTMLTextAreaElement | undefined> = ref();
function updLineNumbers() {
    if (!lineNumbers) return;
    const lineCount = currentFile.value.content.split('\n').length;
    let numberStr = "";
    for (let i = 1; i <= lineCount; i++) {
        numberStr += i + '\n';
    }
    lineNumbers.value!.value = numberStr;
    lineNumbers.value!.cols = lineCount.toString().length;
}

function scrollLineNumbers() {
    lineNumbers.value!.scrollLeft = editor.value!.scrollLeft;
    lineNumbers.value!.scrollTop = editor.value!.scrollTop;
}

function editCode(e: InputEvent) {
    if (!currentFile) return;
    const el = e.target as HTMLTextAreaElement;
    currentFile.value!.content = el.value;
    currentFile.value!.changed = true;
    updLineNumbers();
}

onMounted(() => {
    updLineNumbers();
});

</script>

<template>
    <Toolbar @openFile="openedFile" @openFolder="openedFolder"/>

    <Tabs @changeTab="setCurrentFile" @closeTab="closeFile" :tabs="files" :current="currentFile.name"  v-show="files.length > 0" />

    <div class="flex flex-row mx-2" v-show="files.length > 0">
        <textarea wrap="off" readonly ref="lineNumbers" class="rounded-l-lg h-[80vh] bg-slate-800 m-0 outline-none resize-none text-right pr-2 scroll overflow-hidden font-mono"></textarea>
        <textarea :value="currentFile?.content" @scroll="scrollLineNumbers" @input="editCode($event as InputEvent)" wrap="off" ref="editor"
            class="h-[80vh] mx-max px-2 rounded-r-lg bg-slate-900 outline-none resize-none overflow-x-hidden grow font-mono">
        </textarea>
    </div>

</template>