<template>
  <div class="container py-3">
    <ActionBar />

    <div class="d-flex justify-content-between align-items-center py-2">
      <h6 class="text-muted mb-0">Files</h6>
      <button class="rounded-button">
        <icon-arrow-up />
      </button>
    </div>
    <files-list :files="files"></files-list>
  </div>
</template>

<script>

import ActionBar from "../components/ActionBar.vue";
import fileApi from "../api/files";
import FilesList from "../components/files/FilesList.vue";
import {ref, onMounted } from 'vue';


const fetchFiles = async () => {
      try {
        const { data } = await fileApi.index();
        return data;
      } catch (error) {
        console.error(error);
      }
    };

export default {
  components: { ActionBar, FilesList },

  setup(){
    const files =  ref([]);
    onMounted( async() => files.value = await fetchFiles() );



    return { files };
  }

  
  
};
</script>
