<template>
  <div class="container py-3">
    <ActionBar :selected-count="selectedItems.length" @remove="handleRemove" @rename="showModal=true" />

    <div class="d-flex justify-content-between align-items-center py-2">
      <h6 class="text-muted mb-0">Files</h6>
      <sort-toggler @sort-change="handleSortChange($event)"/>
    </div>
    <teleport to="#search-form">
      <SearchForm v-model="q" />
    </teleport>

    <DropZone @files-dropped="chosenFiles=$event">
    <files-list :files="files" @select-change="handleSelectChange($event)"></files-list>
    </DropZone>

    <app-toast :show="toast.show" :message="toast.message" position="bottom-left" type="success" @hide="toast.show=false"></app-toast>

    <app-modal
      title="Rename"
       :show="showModal && selectedItems.length === 1"
       @hide="showModal=false"
       >
       <file-rename-form
       @close="showModal=false"
       :file="selectedItems[0]"
       @file-updated="handleFileUpdate($event)"
       />
    </app-modal>
      <UploaderPopup :file="choosenFiles"  />
  </div>
</template>

<script>
import SortToggler from '../components/SortToggler.vue';
import ActionBar from "../components/ActionBar.vue";
import SearchForm from '../components/SearchForm.vue';
import filesApi from "../api/files";
import FilesList from "../components/files/FilesList.vue";
import FileRenameForm from "../components/files/FileRenameForm.vue";
import {ref,  reactive, watchEffect, toRef } from 'vue';

import Toast from '../components/toast/Toast.vue';
import DropZone from '../components/uploader/file-chooser/DropZone.vue';
import UploaderPopup from '../components/uploader/popup/UploaderPopup.vue';


const fetchFiles = async (query) => {
      try {
        const { data } = await filesApi.index(query);
        return data;
      } catch (error) {
        console.error(error);
      }
};



const removeItem = async (item, files) => {

      try {
          const response = await filesApi.delete(item.id);
          if (response.status === 200 || response.status === 204) {
            const index = files.value.findIndex(file => file.id === item.id);
            files.value.splice(index, 1);

          }
      } catch (error) {
          console.error(error);
      }

};


export default {
  components: { ActionBar, FilesList, SortToggler, SearchForm, Toast, FileRenameForm, DropZone, UploaderPopup },

  setup(){

    const files = ref([]);
    const selectedItems = ref([]);
    const showModal = ref(false);
    const query = reactive({
      _sort : 'name',
      _order : 'asc',
      q:''

    });

      const toast = reactive({
        show: false,
        message: ""
      });
    const handleSortChange = (payload) => {
          query._sort = payload.column;
          query._order = payload.order;
    };

    const handleSelectChange = (items) => {
      selectedItems.value = Array.from(items);
    }

    const handleRemove = () => {
      if(confirm("Are you sure?"))
      selectedItems.value.forEach((item) => removeItem(item, files));
      selectedItems.value.splice(0);
      toast.show = true;
      toast.message = "Selected Item(s)successfully deleted";
    }

    const handleFileUpdate = (file) => {
      const oldFile = selectedItems.value[0];
      const index = files.value.findIndex(item => item.id === file.id);
      files.value.splice(index, 1, file);
      toast.show = true;
      toast.message = `File ${oldFile.name} renamed to ${file.name}`;

     };

    watchEffect( async() => files.value = await fetchFiles(query) );

    return {
      files,
      handleSortChange,
      q: toRef(query, "q"),
      handleSelectChange,
      selectedItems,
      handleRemove,
      toast,
      showModal,
      handleFileUpdate
    };
  }



};
</script>
