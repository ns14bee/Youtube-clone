<template>
	<div class="d-flex">
		<div class="b"></div>
		<div class="c">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut ipsa
			dolorem ullam commodi harum! Nemo harum hic, impedit fugiat voluptas
			nobis laborum unde eligendi iste, quidem voluptates. Sed, eveniet
			quos?
		</div>
	</div>
</template>
<script>
// import HomeBody from "./Home-Body.vue";
export default {
	components: {
		// HomeBody,
	},
};
</script>
<style scoped>
.b {
	display: block;
	width: 240px;
	height: 700px;
	border: 1px solid black;
	background-color: red;
}
.c {
	display: block;
	height: fit-content;
	width: fit-content;
	background-color: yellow;
}
</style>
