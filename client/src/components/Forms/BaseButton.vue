<template>
    <button 
        v-bind="$attrs"
        class="btn"
        :class="BtnClass"
    >
        <slot/>
    </button>
</template>

<script>
export default {
    $inheritAttrs:false,
    props:{
        BtnClass:{
            type: String,
            default: ''
        },
    }
}
</script>