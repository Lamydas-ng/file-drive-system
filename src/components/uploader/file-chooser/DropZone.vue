<template>
    <div
    class="dropzone"
    :class="{'dragged-over':  dragged}"
    @dragover.prevent="dragged=true"
    @dragleave.prevent="dragged=false"
    @drop.prevent="handleDrop"

    >
        <slot></slot>
    </div>
</template>
<style scoped>
    .dropzone{
        min-height: 80vh;
        border: 2px solid #fff;
        background: #fff;
        padding: 0.3em;
    }
    .dragged-over{
        background: #e8f0fe;
        border: #4285f4;
    }
</style>
<script>

import { ref } from "vue";
export default {
    setup(props,{ emit}) {
        const dragged = ref(false);

        const handleDrop = (event) => {
            dragged.value = false;
            emit("files-dropped", e.dataTransfer.files);
        }

        return {
            dragged,
            handleDrop
        }
    },
    emits:['files-dropped']

}
</script>