<template>
	<div class="main-grids-container-flex">
		<div class="main-grids-container">
			<Grid
				orientation="normal"
				:gridSize="gridSize"
				:color="color"
				:isEditable="true"
				v-on:cellClicked="cellClicked"
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
				ref="1"
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
				ref="2"
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
				ref="3"
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
			this.$refs['1'].applyColor(index, this.color);
			this.$refs['2'].applyColor(index, this.color);
			this.$refs['3'].applyColor(index, this.color);
		},
		leftGutterClicked(index) {
			this.$refs.rightGutter.applyColor(index, this.color);
		},
		topGutterClicked(index) {
			this.$refs.bottomGutter.applyColor(index, this.color);
		},
	},
};
</script>


<style>
.main-grids-container {
	display: grid;
	grid-template-rows: 1fr auto 1fr;
	grid-template-columns: 1fr auto 1fr;
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
