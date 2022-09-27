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



export default {
  components: { ActionBar, FilesList },
  mounted() {
    this.fetchFiles();
  },
  data: () => ({
    files: [],
  }),
  methods: {
    async fetchFiles() {
      try {
        const { data } = await fileApi.index();
        this.files = data;
      } catch (error) {
        console.error(error);
      }
    }
  },
};
</script>
