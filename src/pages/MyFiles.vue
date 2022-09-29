<template>
  <div class="container py-3">
    <ActionBar />

    <div class="d-flex justify-content-between align-items-center py-2">
      <h6 class="text-muted mb-0">Files</h6>
      <sort-toggler @sort-change="handleSortChange($event)"/>
    </div>
    <files-list :files="files"></files-list>
  </div>
</template>

<script>
import SortToggler from '../components/SortToggler.vue';
import ActionBar from "../components/ActionBar.vue";
import fileApi from "../api/files";
import FilesList from "../components/files/FilesList.vue";
import {ref, onMounted, reactive, watchEffect } from 'vue';


const fetchFiles = async (query) => {
      try {
        const { data } = await fileApi.index(query);
        return data;
      } catch (error) {
        console.error(error);
      }
    };

export default {
  components: { ActionBar, FilesList, SortToggler },

  setup(){
    const files =  ref([]);
    const query = reactive({
      _sort : 'name',
      _order : 'asc'

    });

    const handleSortChange = (payload) => {
          query._sort = payload.column;
          query._order = payload.order;
    };

    watchEffect( async() => files.value = await fetchFiles(query) );



    return { files, handleSortChange };
  }

  
  
};
</script>
