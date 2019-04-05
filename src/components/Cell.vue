<template>
	<div
		ref="cell"
		class="cell"
		:class="{editable: isEditable}"
		@mousedown="applyPenColor($event)"
		@mouseenter="applyPenColor($event)"
		@mouseup="removePreviewPenColor($event)"
	></div>
</template>

<script>
export default {
	name: 'cell',
	props: ['color', 'index', 'isEditable'],
	data() {
		return {
			currentColor: '',
		};
	},
	methods: {
		applyColor(color) {
			this.$refs.cell.style.backgroundColor = color;
			this.currentColor = color;
		},
		applyPenColor(event) {
			if (!this.isEditable) return;

			//one of the mouse buttons is held while entering cell
			if (event.buttons == 1 || event.buttons == 2) {
				//TODO, break into two calls....one for index, one for color
				this.$emit('cellClicked', this.index, this.currentColor);

				this.applyColor(this.color);
			} else {
				this.applyPreviewPenColor();
			}
		},
		applyPreviewPenColor() {
			this.$refs.cell.style.backgroundColor = this.color;
			this.$refs.cell.addEventListener(
				'mouseout',
				this.removePreviewPenColor,
			);
		},
		removePreviewPenColor() {
			this.$refs.cell.style.backgroundColor = this.currentColor;
			this.$refs.cell.removeEventListener(
				'mouseout',
				this.removePreviewPenColor,
			);
		},
		toggleGridLines(val) {
			this.$refs.cell.style.borderColor = val ? 'gray' : 'transparent';
		},
		clearCell() {
			if (!this.$refs.cell || !this.$refs.cell.style) return;

			this.$refs.cell.style.backgroundColor = 'transparent';
			this.currentColor = '';
			this.$refs.cell.removeEventListener(
				'mouseout',
				this.removePreviewPenColor,
			);
		},
	},
	mounted() {
		this.$root.$on('clearCells', this.clearCell);
	},
};
</script>

<style>
.cell {
	width: 10px;
	height: 10px;
	border: 1px solid gray;
	transition: transform 0.1s ease-in-out;
	user-select: none; /* fixes issue where sometimes you're dragging a cell */
}

.cell:hover {
	border: 1px solid black;
	cursor: pointer;
}
</style>
