<template>
  <div class="container py-3">
    <ActionBar :selected-count="selectedItems.length" />

    <div class="d-flex justify-content-between align-items-center py-2">
      <h6 class="text-muted mb-0">Files {{ selectedItems }}</h6>
      <sort-toggler @sort-change="handleSortChange($event)"/>
    </div>
    <teleport to="#search-form">
      <SearchForm v-model="q" />
    </teleport>

    <files-list :files="files" @select-change="handleSelectChange($event)"></files-list>

  </div>
</template>

<script>
import SortToggler from '../components/SortToggler.vue';
import ActionBar from "../components/ActionBar.vue";
import SearchForm from '../components/SearchForm.vue';
import fileApi from "../api/files";
import FilesList from "../components/files/FilesList.vue";
import {ref,  reactive, watchEffect, toRef } from 'vue';


const fetchFiles = async (query) => {
      try {
        const { data } = await fileApi.index(query);
        return data;
      } catch (error) {
        console.error(error);
      }
    };

export default {
  components: { ActionBar, FilesList, SortToggler,SearchForm },

  setup(){

    const files = ref([]);
    const selectedItems = ref([]);
    const query = reactive({
      _sort : 'name',
      _order : 'asc',
      q:''

    });

    const handleSortChange = (payload) => {
          query._sort = payload.column;
          query._order = payload.order;
    };

    const handleSelectChange = (items) => {
      selectedItems.value = Array.from(items);
    }

    watchEffect( async() => files.value = await fetchFiles(query) );


    return { files, handleSortChange, q: toRef(query, "q") , handleSelectChange, selectedItems };
  }



};
</script>
