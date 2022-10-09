<template>

     <button class="btn btn-outline-primary" @click="handleClick">
      <icon-upload /> Upload Files
    </button>
    <input type="file" ref="file" multiple style="display:none" @change="$emit('files-choosen', $event.target.files)" />
    </template>

    <script>
import { ref } from 'vue';

    export default {
    setup() {
            const file = ref(null);
            const handleClick = () => {
                file.value.click();
            };

            return { handleClick, file}
    },
        emits:["files-choosen"]
    }

    </script>