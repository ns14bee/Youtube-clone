<template>
    <label class="form-label m-2" v-if="label" :for="uuid">{{label}}</label>
    <select 
        :value="modelValue"
        class="form-select"
        :id="uuid"
        :aria-describedby="error? `${uuid}-error`: null"
        :aria-invalid="error? true : null"
        v-bind="{
            ...$attrs,
            onChange: ($event) => {$emit('update:modelValue',$event.target.value)}
            }"
    >
        <option v-for="(item,index) in options" :key="index" :value="item" :selected="item === modelValue">{{item}}
        </option>
    </select>
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
        options: {
            type: Array,
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