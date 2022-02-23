<template>
    <component 
        v-for="item in options"
        :key="item.value"
        :is="vertical ? 'div' : 'span'"
        :class="{
            horizontal: !vertical
        }"
    >
            <BaseRadio 
            :label="item.label"
            :value="item.value"
            :name="name"
            :modelValue="modelValue"
            @update:modelValue="$emit('update:modelValue',$event)"
            />
    </component>
</template>

<script>
export default {
    props:{
        options: {
            type: Array,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        modelValue: {
            type: [String, Number],
            required: true
        },
        vertical: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
.horizontal{
    margin-right: 15px;
}
</style>