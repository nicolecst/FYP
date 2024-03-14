<script setup>
import { defineEmits, ref } from 'vue'

const emit = defineEmits(['change'])
const files = ref([])

const fileChange = (e) => {
    if (e.target.files.length == 0) {
        files.value = [];
        emit('change', files.value);
        return
    }

    Array.from(e.target.files).forEach((f) => {
        const reader = new FileReader(f)
        reader.addEventListener("load", (event) => {
            files.value.push(event.target.result)
            emit('change', files.value);
        }, false );
        reader.readAsDataURL(f);
    })
}
</script>

<template>
    <input type="file" @change="fileChange" v-bind="$attrs" />
</template>