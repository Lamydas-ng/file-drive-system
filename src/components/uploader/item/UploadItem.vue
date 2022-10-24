<template>
    <li   class="list-group-item d-flex justify-content-between">
                <p class="upload-item">
                <component :is="iconFileType"></component>
                <span> {{ item.file.name}}</span>
                </p>
                <div class="upload-controls">{{ `${uploadItem.state} : ${uploadItem.progress}`}}</div>

            </li>

</template>

<script>
import { reactive, onMounted } from 'vue'
 import {useIconFileType} from '../../../composable/icon-file-type'
 import states from '../states'
 import filesApi from '../../../api/files'
export default {

 
  
  props: {
    item: {
      type: Object,
        required: true

    },

    },

    setup(props){

      const uploadItem = reactive(props.item) ;
      
      const createFormData = (file)=>{
        const formData = new FormData();
        formData.append("file",file);
        return formData;

      }
      
      const startUpload = async (upload) =>
      {
       
       try {

         upload.state = states.UPLOADING;  
//  console.log(upload);
           const {data} = await filesApi.create(createFormData(upload.file),{
 
           onUploadProgress: (e)=>{
             if (e.lengthComputable){
               upload.progress = Math.round((e.loaded/e.toatl)*100)
             }
           }
           
         })
        upload.state = states.COMPLETE;
        upload.response = data; 
      } catch (error) {
        upload.state = states.FAILED;
        upload.response = 0; 
       }

      }
      onMounted( startUpload(uploadItem));

      return {
        uploadItem,
        iconFileType: useIconFileType(props.item.file.type)
      }

    }
}

</script>

<style scoped>
.upload-item {
  line-height: 2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}

.upload-item,
.failed-text {
  color: #6c757d;
}

.upload-item span,
.failed-text {
  font-size: 12px;
}

.upload-item span {
  margin-left: 6px;
}

.failed {
  width: 140px;
  color: #212529;
}
</style>