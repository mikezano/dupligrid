<template>
	<div class="main-grid-flex" :class="orientation">
		<div class="main-grid" ref="main-grid">
			<Cell
				:color="color"
				:index="i"
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
	props: ['color', 'colorIndex', 'gridSize', 'orientation'],
	components: {
		Cell,
	},
	data() {
		return {
			gridCellCount: this.gridSize * this.gridSize,
		};
	},
	methods: {
		cellClicked(index) {
			this.$emit('cellClicked', index);
		},
	},
	watch: {
		colorIndex(val) {
			this.$refs['i'][val - 1].applyColor();
		},
	},
	mounted() {
		console.log(this.gridCellCount);
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
