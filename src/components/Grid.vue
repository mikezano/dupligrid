<template>
	<div class="main-grid-flex" :class="orientation">
		<div class="main-grid" ref="main-grid">
			<Cell
				:color="color"
				:index="i"
				:isEditable="isEditable"
				v-on:cellClicked="cellClicked"
				ref="i"
				v-for="i in gridCellCount"
				:key="i"
			/>
		</div>
	</div>
</template>

<script>
import Cell from '@/components/Cell.vue';

export default {
	props: ['color', 'gridSize', 'orientation', 'isEditable', 'name'],
	components: {
		Cell,
	},
	data() {
		return {
			gridCellCount: this.gridSize * this.gridSize,
		};
	},
	methods: {
		cellClicked(index, previousColor) {
			this.$emit('cellClicked', index, previousColor, this.name);
		},
		applyColor(index, color) {
			this.$refs['i'][index - 1].applyColor(color);
		},
		toggleGridLines(val) {
			this.$refs.i.forEach(element => {
				element.toggleGridLines(val);
			});
		},
	},
	mounted() {
		let grid = this.$refs['main-grid'];
		grid.style.gridTemplateColumns = `repeat(${this.gridSize}, 1fr`;
		grid.style.gridTemplateRows = `repeat(${this.gridSize}, 1fr`;
	},
};
</script>

<style>
.main-grid {
	display: grid;
}

.main-grid-flex {
	display: flex;
	justify-content: center;
	margin: 0;
}

.normal {
	background-color: lightgray;
}
.flipped-horizontal {
	transform: scaleX(-1);
}

.flipped-vertical {
	transform: scaleY(-1);
}

.flipped-horizontal-vertical {
	transform: scaleX(-1) scaleY(-1);
}
</style>
