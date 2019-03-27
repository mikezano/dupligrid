<template>
	<div ref="cell" class="cell" @click="applyColor()"></div>
</template>

<script>
export default {
	name: 'cell',
	props: ['color', 'index'],
	methods: {
		applyColor() {
			this.$refs['cell'].style.backgroundColor = this.color;
			this.$emit('cellClicked', this.index);
		},
	},
	mounted() {
		//console.log(this.$refs['cell'].style);
		//console.log(this.color);
	},
};
</script>

<style>
.cell {
	width: 20px;
	height: 20px;
	border: 1px dotted gray;
}
</style>
