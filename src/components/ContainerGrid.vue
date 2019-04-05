<template>
	<div class="main-grids-container-flex">
		<div class="main-grids-container">
			<Grid
				orientation="normal"
				:gridSize="gridSize"
				:color="color"
				:isEditable="true"
				v-on:cellClicked="cellClicked"
				name="topLeftGrid"
				ref="topLeftGrid"
				@mousedown.native="startTracking($event)"
			/>
			<GutterGrid
				orientation="vertical-top"
				:cellCount="gridSize"
				:color="color"
				name="topGutter"
				ref="topGutter"
				:isEditable="true"
				v-on:cellClicked="topGutterClicked"
				@mousedown.native="startTracking($event)"
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
				name="leftGutter"
				ref="leftGutter"
				:isEditable="true"
				v-on:cellClicked="leftGutterClicked"
				@mousedown.native="startTracking($event)"
			/>
			<Cell
				:isEditable="true"
				:color="color"
				name="singleCell"
				ref="singleCell"
				@mousedown.native="startTracking($event)"
			/>
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
	data() {
		return {
			editableRegions: [],
			lastEdits: [],
			allEdits: [],
			isTracking: false,
		};
	},
	components: {
		Grid,
		GutterGrid,
		Cell,
	},
	methods: {
		cellClicked(index, previousColor, name) {
			//color here , is the cells previous color before clicking
			//should be its own method? looks weird to have 'color' here
			this.lastEdits.push({ index, color: previousColor, name });

			this.$refs.topRightGrid.applyColor(index, this.color);
			this.$refs.bottomLeftGrid.applyColor(index, this.color);
			this.$refs.bottomRightGrid.applyColor(index, this.color);
		},
		leftGutterClicked(index, previousColor, name) {
			this.lastEdits.push({ index, color: previousColor, name });
			this.$refs.rightGutter.applyColor(index, this.color);
		},
		topGutterClicked(index, previousColor, name) {
			this.lastEdits.push({ index, color: previousColor, name });
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
		clearCell() {
			this.$refs.singleCell.$el.style.backgroundColor = 'lightgray';
			this.allEdits = [];
		},
		startTracking() {
			this.editableRegions.forEach(region => {
				region.$el.addEventListener(
					'mouseup',
					this.stopTrackingOnMouseUp,
				);
				region.$el.addEventListener(
					'mouseout',
					this.stopTrackingOnMouseOut,
				);
			});
		},
		stopTrackingOnMouseUp(event) {
			this.removeTrackingEventListeners();
		},
		stopTrackingOnMouseOut(event) {
			if (event.toElement.classList.contains('editable')) return;
			this.removeTrackingEventListeners();
		},
		removeTrackingEventListeners() {
			this.allEdits.push(this.lastEdits);
			console.log(this.allEdits);
			this.lastEdits = [];

			this.editableRegions.forEach(region => {
				region.$el.removeEventListener(
					'mouseup',
					this.stopTrackingOnMouseUp,
				);
				region.$el.removeEventListener(
					'mouseout',
					this.stopTrackingOnMouseOut,
				);
			});
		},
		updateRegion(edit) {
			this.$refs[edit.name].applyColor(edit.index, edit.color);

			switch (edit.name) {
				case 'topLeftGrid':
					this.$refs.topRightGrid.applyColor(edit.index, edit.color);
					this.$refs.bottomLeftGrid.applyColor(
						edit.index,
						edit.color,
					);
					this.$refs.bottomRightGrid.applyColor(
						edit.index,
						edit.color,
					);
					break;
				case 'topGutter':
					this.$refs.bottomGutter.applyColor(edit.index, edit.color);
					break;
				case 'leftGutter':
					this.$refs.rightGutter.applyColor(edit.index, edit.color);
					break;
			}
		},
		undo() {
			if (this.allEdits.length < 1) return;

			let edits = this.allEdits.pop();

			edits.forEach(edit => {
				this.updateRegion(edit);
			});
		},
	},
	mounted() {
		this.clearCell();
		this.$root.$on('clearCells', this.clearCell);

		this.editableRegions.push(this.$refs.topLeftGrid);
		this.editableRegions.push(this.$refs.topGutter);
		this.editableRegions.push(this.$refs.leftGutter);
		this.editableRegions.push(this.$refs.singleCell);
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
