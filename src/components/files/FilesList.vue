<template>
        <div class="row">
            <div class="col-md-3" v-for="file in files" :key="`file-${file.id}`">
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
    </div>
</template>

<script>
export default {
    components: {},
    props:{
       files: {
        type: Array,
        required:true
       } 
    }
}
</script>