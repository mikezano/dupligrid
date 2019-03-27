<template>
	<div 
	ref="cell"
	class="cell"
	@mousedown="applyPenColor($event)"
	@mouseenter="applyPenColor($event)"></div>
</template>

<script>
export default {
	name: 'cell',
	props: ['color', 'index', 'isEditable'],
	methods: {
		applyColor(color) {

			this.$refs['cell'].style.backgroundColor = color;
		},
		applyPenColor(event){

			debugger;
			if(!(event.buttons == 1 || event.buttons ==2)) return;
			if(!this.isEditable ) return;

			this.applyColor(this.color);
			this.$emit('cellClicked', this.index);
		}
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
