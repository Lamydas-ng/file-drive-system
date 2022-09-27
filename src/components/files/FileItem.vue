<template>
     <div class="col-md-3" >
            <div class="card mb-4">
                <img class="file-thumb" :src="file.url" v-if="file.url" />
                <div class="card-body text-center py-5" v-else>
                    <icon-type-common height="4em" width="4em"  />
                </div>
                <div class="card-footer">
                <div class="d-flex align-items-center">
                    <icon-type-common />
                    <span class="file-name">{{ file.name}}</span>
                </div>
                </div>
            </div>
            </div>
</template>
<script>
export default {
    props:{
        file:{
            type: Object,
            require: true
        }
    }
}
</script>