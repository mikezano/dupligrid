<template>
	<div
		ref="cell"
		class="cell"
		@mousedown="applyPenColor($event)"
		@mouseenter="applyPenColor($event)"
	></div>
</template>

<script>
export default {
	name: 'cell',
	props: ['color', 'index', 'isEditable'],
	methods: {
		applyColor(color) {
			this.$refs['cell'].style.backgroundColor = color;
			//var before = window.getComputedStyle(this.$refs.cell, ':before');
		},
		applyPenColor(event) {
			if (!(event.buttons == 1 || event.buttons == 2)) return;
			if (!this.isEditable) return;

			this.applyColor(this.color);
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
	width: 10px;
	height: 10px;
	overflow:hidden;
	border-radius:50%;
	border:1px solid gray;
	position:relative;
}

</style>
