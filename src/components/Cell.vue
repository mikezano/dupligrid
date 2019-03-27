<template>
	<div ref="cell" class="cell" @click="applyColor()"></div>
</template>

<script>
export default {
	name: 'cell',
	props: ['color'],
	methods: {
		applyColor() {
			this.$refs['cell'].style.backgroundColor = this.color;
		},
	},
	mounted() {
		console.log(this.$refs['cell'].style);
		console.log(this.color);
	},
};
</script>

<style>
.cell {
	width: 200px;
	height: 200px;
	border: 1px solid black;
}
</style>
