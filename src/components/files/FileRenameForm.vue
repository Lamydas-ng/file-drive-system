<template>
    <form  @submit.prevent="handleSubmit">
        <input v-highlight  type="text" class="form-control" v-model="name" />
        <div class="d-flex dflex-row-reverse mt-3">
            <button class="btn btn-primary" type="submit" >
                Ok
            </button>
            <button class="btn btn-outline-secondary me-2" @click.prevent="$emit('close')">
                Cancel
            </button>
        </div>
    </form>
</template>

<script>

import filesApi from "../../api/files.js";
import { nextTick} from 'vue'

export default {

    emits: ['close', 'file-updated'],
    props: {
        file: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            name: this.file.name
        }
    },
    methods: {
        async handleSubmit() {
            try {
                const { data } = await filesApi.update({ ...this.file, name: this.name }, this.file.id);
                this.$emit("close");
                this.$emit("file-updated", data);

            } catch (error) {
                console.error(error);
            }
        }
    },
    directives: {
        highlight: {
            mounted(el) {
                nextTick(() => {
                    const selectionEnd = el.value.split(".").slice(0, -1).join(".").length;
                    el.setSelectionRange(0, selectionEnd);
                });
                el.focus();
            }
        },

    }

}

</script>