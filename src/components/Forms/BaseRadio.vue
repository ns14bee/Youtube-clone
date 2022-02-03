<template>
    <input 
        type="radio" 
        :checked="modelValue === value"
        :value="value" 
        @change="$emit('update:modelValue',value)"
        v-bind="$attrs"
        class="form-check-input"
        :id="uuid"
        :aria-describedby="error? `${uuid}-error`: null"
        :aria-invalid="error? true : null"
    />
    <label class="form-check-label ps-1" v-if="label" :for="uuid">{{label}}</label>
    <p 
        v-if="error"
        class="text-danger"
        :id="`${uuid}-error`"
        aria-live="assertive"
    >
        {{error}}
    </p>
</template>

<script>
import UniqueID from '../features/UniqueID.js'
export default {
    props:{
        label:{
            type: String,
            default: ''
        },
        modelValue:{
            type: [String, Number],
            default: ''
        },
        value:{
            type: [String,Number],
            required: true
        },
        error:{
            type: String,
            default:''
        }
    },
    setup(){
        const uuid = UniqueID().getID();
        return {
            uuid
        }
    }
}
</script>