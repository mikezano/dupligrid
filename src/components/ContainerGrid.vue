<template>
	<div class="main-grids-container-flex">
		<div class="main-grids-container">
			<Grid
				orientation="normal"
				:gridSize="gridSize"
				:color="color"
				:isEditable="true"
				v-on:cellClicked="cellClicked"
				ref="topLeftGrid"
			/>
			<GutterGrid
				orientation="vertical-top"
				:cellCount="gridSize"
				:color="color"
				ref="topGutter"
				:isEditable="true"
				v-on:cellClicked="topGutterClicked"
			/>
			<Grid
				orientation="flipped-horizontal"
				:gridSize="gridSize"
				:isEditable="false"
				:colorIndex="colorIndex"
				ref="topRightGrid"
			/>

			<GutterGrid
				:color="color"
				orientation="horizontal-left"
				:cellCount="gridSize"
				ref="leftGutter"
				:isEditable="true"
				v-on:cellClicked="leftGutterClicked"
			/>
			<Cell :isEditable="true" :color="color" style="background-color:lightgray"/>
			<GutterGrid
				orientation="horizontal-right"
				:cellCount="gridSize"
				ref="rightGutter"
				:isEditable="false"
			/>
			<Grid
				orientation="flipped-vertical"
				:gridSize="gridSize"
				:isEditable="false"
				:colorIndex="colorIndex"
				ref="bottomLeftGrid"
			/>
			<GutterGrid
				orientation="vertical-bottom"
				:cellCount="gridSize"
				ref="bottomGutter"
				:isEditable="false"
			/>
			<Grid
				orientation="flipped-horizontal-vertical"
				:gridSize="gridSize"
				:isEditable="false"
				:colorIndex="colorIndex"
				ref="bottomRightGrid"
			/>
		</div>
	</div>
</template>

<script>
import Grid from '@/components/Grid.vue';
import GutterGrid from '@/components/GutterGrid.vue';
import Cell from '@/components/Cell.vue';

export default {
	props: ['gridSize', 'color', 'colorIndex'],
	components: {
		Grid,
		GutterGrid,
		Cell,
	},
	methods: {
		cellClicked(index) {
			this.$refs['topRightGrid'].applyColor(index, this.color);
			this.$refs['bottomLeftGrid'].applyColor(index, this.color);
			this.$refs['bottomRightGrid'].applyColor(index, this.color);
		},
		leftGutterClicked(index) {
			this.$refs.rightGutter.applyColor(index, this.color);
		},
		topGutterClicked(index) {
			this.$refs.bottomGutter.applyColor(index, this.color);
		},
		toggleGridLines(val) {
			this.$refs.topLeftGrid.toggleGridLines(val);
			this.$refs.topRightGrid.toggleGridLines(val);
			this.$refs.bottomLeftGrid.toggleGridLines(val);
			this.$refs.bottomRightGrid.toggleGridLines(val);

			this.$refs.topGutter.toggleGridLines(val);
			this.$refs.leftGutter.toggleGridLines(val);
			this.$refs.rightGutter.toggleGridLines(val);
			this.$refs.bottomGutter.toggleGridLines(val);
		},
	},
};
</script>


<style>
.main-grids-container {
	display: grid;
	grid-template-rows: 1fr auto 1fr;
	grid-template-columns: 1fr auto 1fr;
	border: 1px solid gray;
	background-color: white;
	box-shadow: 10px 10px 20px hsla(0, 0%, 0%, 0.5);
	/*
	grid-template-rows: repeat(2, 1fr);
	grid-template-columns: repeat(2, 1fr);
	*/
}
.main-grids-container-flex {
	display: flex;
	justify-content: center;
}
</style>
