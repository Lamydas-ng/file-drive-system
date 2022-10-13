<template>
    <div class="card shadow uploader-popup">
     <div class="card header bg-dark px-3 py-3">
       <div class="d-dflex justify-content-between align-items-center">
         <span class="text-light"> Uploading </span>
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
     <div class="upload-items">
        <ul class="list-group list-group-flush">
            <li  v-for="item in 5" class="list-group-item d-flex justify-content-between">
                <p class="upload-item"> File {{ item}}</p>
                <div class="upload-controls">x</div>
            </li>
        </ul>
     </div>
    </div>
 </template>

 <script>
export default {

    props: {
        files: {
            type: Object,
            required: true
        }
    }

}

 </script>

 <style >

    .uploader-popup{
        width: 400px;
        position: fixed;
        bottom: 20px;
        right:20px;
        z-index:999;
    }
 </style>