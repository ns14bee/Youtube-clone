<template>
	<label class="form-label m-2" v-if="label" :for="uuid">{{ label }}</label>
	<input
		:type="inputType"
		v-bind="$attrs"
		:placeholder="label"
		:value="modelValue"
		class="form-control"
		:id="uuid"
		:aria-describedby="error ? `${uuid}-error` : null"
		:aria-invalid="error ? true : null"
		@input="$emit('update:modelValue', $event.target.value)"
	/>
	<p
		v-if="error"
		class="text-danger"
		:id="`${uuid}-error`"
		aria-live="assertive"
	>
		{{ error }}
	</p>
</template>

<script>
import UniqueID from "../features/UniqueID.js";
export default {
	props: {
		label: {
			type: String,
			default: "",
		},
		modelValue: {
			type: [String, Number],
			default: "",
		},
		error: {
			type: String,
			default: "",
		},
		inputType: {
			type: String,
			default: "text",
		},
	},
	setup() {
		const uuid = UniqueID().getID();
		return {
			uuid,
		};
	},
};
</script>

<style scoped></style>
