<template>
    <li   class="list-group-item d-flex justify-content-between">
                <p :class="UploadItemClasses">
                <component :is="iconFileType"></component>
                <span class="failed-text"  v-show="isCancelled" >Upload Cancelled</span>
                {{ uploadItem.file.name}}
                </p>
                
                <upload-control :item="item" @cancel="handleCancel" @retry="handleRetry" @locate="handleLocate"></upload-control>
            </li>

</template>

<script>
import { reactive, onMounted, computed, watch, inject } from 'vue'
 import {useIconFileType} from '../../../composable/icon-file-type'
 import states from '../states'
 import filesApi from '../../../api/files'
import UploadControl from './UploadControl.vue'
import axios from 'axios'


const startUpload = async (upload, source) =>
  {
   
   try {

     upload.state = states.UPLOADING;  

       const {data} = await filesApi.create(createFormData(upload.file),{

       onUploadProgress: (e)=>{
        if (e.lengthComputable) {
          upload.progress = Math.round((e.loaded / e.total) * 100);
         }
       },

       cancelToken: source.token

     })
    upload.state = states.COMPLETE;
    upload.response = data; 
  } catch (error) {

    if(axios.isCancel){
      upload.state = states.CANCELLED;

    }else{
      upload.state = states.FAILED;
      
    }
    
    upload.response = 0; 
   
  }

  };

  const createFormData = (file)=>{
    const formData = new FormData();
    formData.append("file",file);
    return formData;

  };


export default {
  components: { UploadControl },

 
  
  props: {
    item: {
      type: Object,
        required: true

    },
    
  },
  emits:['change'],

    setup(props, { emit }){

      const uploadItem = reactive(props.item) ;
      let source = axios.CancelToken.source();

      const handleCancel= ()=>{
        source.cancel();
      }

      const setSelectedItem= inject("setSelectedItem");

      const handleLocate = ()=>{
        setSelectedItem([uploadItem.response]);
      }


      const UploadItemClasses = computed(()=>{
        return {
          "upload-item":true,
          "failed":isCancelled.value
        }


      });


      const handleRetry = ()=>{
        source = axios.CancelToken.source();
        startUpload(uploadItem,source);
      

      }
      const isCancelled = computed(()=> uploadItem.state ===states.CANCELLED)
      
      watch(()=>[uploadItem.state,uploadItem.progress],()=>{

        emit('change',uploadItem);

      });
      onMounted(startUpload(uploadItem,source));

      return {
        uploadItem,
        iconFileType: useIconFileType(props.item.file.type),
        handleCancel,
        handleRetry,
        handleLocate,
        isCancelled,
        UploadItemClasses
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