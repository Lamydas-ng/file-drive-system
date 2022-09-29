<template>
    <button class="rounded-button" @click ="toggle">
        <icon-arrow-up    v-if=" sort.order === 'asc' "/>
        <icon-arrow-down v-else/>

      </button>
</template>

<script>
    import { emit, reactive } from 'vue';

export default {
    setup(props,{ emit }){

        const sort = reactive({
            order: 'asc',
            column: 'name' 
        });

        const toggle = () => {

            sort.order = sort.order === 'asc'? 'desc':'asc';
            emit('sort-change', sort);
        }

        return { sort , toggle};

    },
    emits:['sort-change']
}
</script>