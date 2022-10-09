<template>
    <div class="dropzone">
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