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
			orientation="vertical"
			:cellCount="gridSize"
		/>
		<Grid
			orientation="flipped-horizontal"
			:gridSize="gridSize"
			:isEditable="false"
			:colorIndex="colorIndex"
			ref="1"
		/>

		<GutterGrid
			orientation="horizontal"
			:cellCount="gridSize"
		/>
		<div class='center-cell'></div>
		<GutterGrid
			orientation="horizontal"
			:cellCount="gridSize"
		/>

		<Grid
			orientation="flipped-vertical"
			:gridSize="gridSize"
			:isEditable="false"
			:colorIndex="colorIndex"
			ref="2"
		/>
		<GutterGrid
			orientation="vertical"
			:cellCount="gridSize"
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
	props:['gridSize'],
	components:{
		Grid,
		GutterGrid,
		Cell,
	},
	methods:{
		cellClicked(index) {
			console.log('next index to color:', index);
			this.$refs['1'].applyColor(index, this.color);
			this.$refs['2'].applyColor(index, this.color);
			this.$refs['3'].applyColor(index, this.color);
		},
	}
}
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
