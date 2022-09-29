<template>
     <form class="form-inline mt-2 mt-md-0">
        <input
          class="form-control"
          type="text"
          placeholder="Search in Drive"
          aria-label="Search"
          :value="modelValue"
          @keydown.enter.prevent="handleEnterKey($event)"
          @keydown.escape.prevent="handleEscapeKey($event)"
        />
      </form>
</template>


<script>


export default {
    props: {

        modelValue:{
            type: String,
            required: true
        }
    },

    methods:{

        handleEnterKey(event){

            this.$emit('update:modelValue',event.target.value);
            
        },
        handleEscapeKey(event){

            this.$emit('update:modelValue',"");

        }
    },
    emits: {
         handleEnterKey, 
        handleEscapeKey 
    }
}
</script>