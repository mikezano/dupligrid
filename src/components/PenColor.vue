<template>
	<input type="color" v-model="color">
</template>

<script>
export default {
	props: ['penColor'],
	data() {
		return {
			color: this.penColor,
		};
	},
	watch: {
		color(val) {
			this.$emit('colorChanged', val);
		},
	},
};
</script>

