<template>
    <li   class="list-group-item d-flex justify-content-between">
                <p class="upload-item">
                <component :is="IconFileType"></component>
                <span> {{ item.file.name}}</span>
                </p>
                <div class="upload-controls">x</div>

            </li>

</template>

<script>
 import {useIconFileType} from '../../../composable/icon-file-type.js'
export default {

    props: {
        item: Object,
        required: true

    },
    setup(props){

      return {
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