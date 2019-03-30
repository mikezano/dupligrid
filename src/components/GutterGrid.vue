<template>
	<div class="gutter-cells" :class="orientation">
		<Cell
			v-for="i in cellCount"
			ref="i"
			:key="i"
			v-on:cellClicked="cellClicked"
			:color="color"
			:index="i"
			:isEditable="isEditable"
		/>
	</div>
</template>

<script>
import Cell from '@/components/Cell.vue';

export default {
	name: 'GutterGrid',
	props: ['cellCount', 'orientation', 'isEditable', 'color'],
	components: {
		Cell,
	},
	methods: {
		applyColor(index, color) {
			this.$refs['i'][index - 1].applyColor(color);
		},
		cellClicked(index) {
			this.$emit('cellClicked', index);
		},
		toggleGridLines(val) {
			this.$refs.i.forEach(element => {
				element.toggleGridLines(val);
			});
		},
	},
};
</script>

<style>
.gutter-cells {
	display: flex;
}

.gutter-cells.vertical-top,
.gutter-cells.vertical-bottom {
	flex-direction: column;
}

.gutter-cells.horizontal-left,
.gutter-cells.horizontal-right {
	flex-direction: row;
}

.gutter-cells.horizontal-left,
.gutter-cells.vertical-top {
	background-color: lightgray;
}
.gutter-cells.horizontal-right {
	transform: scaleX(-1);
}

.gutter-cells.vertical-bottom {
	transform: scaleY(-1);
}
</style>
