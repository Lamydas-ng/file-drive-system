<template>
    <div class="card shadow uploader-popup" v-if="items.length">
     <div class="card header bg-dark px-3 py-3">
       <div class="d-dflex justify-content-between align-items-center">
         <span class="text-light"> {{ uploadingStatus }} </span>
            <div class="popup-controls">
                <button class="rounded-button me-2">
                    <icon-chevron-down />
                </button>
                <button class="rounded-button">
                    <icon-times></icon-times>
                </button>
            </div>

        </div>
     </div>
     <div class="upload-items" v-show="showPopupBody">
        <ul class="list-group list-group-flush">
            <li  v-for="item in items" :key="`item-${item.id}`"  class="list-group-item d-flex justify-content-between">
                <p class="upload-item"> {{ item.file.name}}</p>
                <div class="upload-controls">x</div>
            </li>
        </ul>
     </div>
    </div>
 </template>

 <script>
 import states from '../states.js'
import { ref, watch, computed } from 'vue';

  const randomId = () => {
            return Math.random().toString(36).substring(2, 9);
        };

const uploadingItemsCount = (items) => {
    return computed(
    () => {
       return items.value.filter((item) => item.state === states.WAITING || item.state === states.UPLOADING).length;
    }
).value;
}

    const getUploadItems = (files) => {
            return Array.from(files).map(file =>
            ({
                ID: randomId,
                file,
                progress: 0,
                state: states.WAITING,
                response: null
            }));
        };


export default {
    props: {
        files: {
            type: Object,
            required: true
        }
    },
    setup(props, { emit }) {
        const items = ref([]);
        const showPopupBody = ref(true);

        const handleClose= () => {
            if(confirm("CAncel all uploads?")){
                items.value.splice(0)
            }

        };



        const uploadingStatus = computed(
            () => {
                return `Uploading ${ uploadingItemsCount(items) } items`;
            }

            )

        watch(
            () => props.files, (newFiles) => {
                items.value.unshift(...getUploadItems(newFiles));
        })

        return {
            items, uploadingStatus, showPopupBody, handleClose
        }
    }

}

 </script>

<style scoped>
.uploader-popup {
  width: 400px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
}
</style>