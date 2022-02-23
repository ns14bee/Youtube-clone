<template>
	<router-view class="main position-absolute w-100" />
</template>

<script>
import mixin from "./util/themeMixin.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
export default {
	name: "App",
	mixins: [mixin],
};
</script>

<style>
/* @import "~bootstrap/dist/css/bootstrap.css"; */
</style>
