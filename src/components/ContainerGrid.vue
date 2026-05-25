<template>
	<div class="main-grids-container-flex">
		<div class="main-grids-container">
			<Grid orientation="normal" :gridSize="gridSize" :color="color" :isEditable="true"
				v-on:cellClicked="cellClicked" name="topLeftGrid" ref="topLeftGrid"
				@mousedown="startTracking()" />
			<GutterGrid orientation="vertical-top" :cellCount="gridSize" :color="color" name="topGutter" ref="topGutter"
				:isEditable="true" v-on:cellClicked="topGutterClicked" @mousedown="startTracking()" />
			<Grid orientation="flipped-horizontal" :gridSize="gridSize" :isEditable="false" ref="topRightGrid" />

			<GutterGrid :color="color" orientation="horizontal-left" :cellCount="gridSize" name="leftGutter"
				ref="leftGutter" :isEditable="true" v-on:cellClicked="leftGutterClicked"
				@mousedown="startTracking()" />
			<Cell :isEditable="true" :color="color" name="singleCell" ref="singleCell"
				@mousedown="startTracking()" />
			<GutterGrid orientation="horizontal-right" :cellCount="gridSize" ref="rightGutter" :isEditable="false" />
			<Grid orientation="flipped-vertical" :gridSize="gridSize" :isEditable="false" ref="bottomLeftGrid" />
			<GutterGrid orientation="vertical-bottom" :cellCount="gridSize" ref="bottomGutter" :isEditable="false" />
			<Grid orientation="flipped-horizontal-vertical" :gridSize="gridSize" :isEditable="false"
				ref="bottomRightGrid" />
		</div>
	</div>
</template>

<script setup lang="ts">
import Cell from '@/components/Cell.vue';
import Grid from '@/components/Grid.vue';
import GutterGrid from '@/components/GutterGrid.vue';
import type { ComponentPublicInstance, Ref } from 'vue';
import { onMounted, ref } from 'vue';

interface Props {
	gridSize: number;
	color?: string;
}

const props = withDefaults(defineProps<Props>(), {
	color: '',
});

interface GridLike {
	applyColor: (index: number, color: string) => void;
	clearCells: () => void;
	toggleGridLines: (val: boolean) => void;
}

interface Edit {
	index: number;
	color: string;
	name: string;
}

type GridRef = Ref<GridLike | null>;

// Template refs
const topLeftGrid: GridRef = ref(null);
const topRightGrid: GridRef = ref(null);
const bottomLeftGrid: GridRef = ref(null);
const bottomRightGrid: GridRef = ref(null);
const topGutter: GridRef = ref(null);
const leftGutter: GridRef = ref(null);
const rightGutter: GridRef = ref(null);
const bottomGutter: GridRef = ref(null);
const singleCell = ref<InstanceType<typeof Cell> | null>(null);

// Used for dynamic ref lookup in updateRegion
const gridRefMap = { topLeftGrid, topRightGrid, bottomLeftGrid, bottomRightGrid, topGutter, leftGutter, rightGutter, bottomGutter } as Record<string, GridRef>;

let editableRegions: ComponentPublicInstance[] = [];
let lastEdits: Edit[] = [];
let allEdits: Edit[][] = [];

function cellClicked(index: number, previousColor: string, name: string): void {
	lastEdits.push({ index, color: previousColor, name });

	topRightGrid.value?.applyColor(index, props.color);
	bottomLeftGrid.value?.applyColor(index, props.color);
	bottomRightGrid.value?.applyColor(index, props.color);
}

function leftGutterClicked(index: number, previousColor: string, name: string): void {
	lastEdits.push({ index, color: previousColor, name });
	rightGutter.value?.applyColor(index, props.color);
}

function topGutterClicked(index: number, previousColor: string, name: string): void {
	lastEdits.push({ index, color: previousColor, name });
	bottomGutter.value?.applyColor(index, props.color);
}

function toggleGridLines(val: boolean): void {
	topLeftGrid.value?.toggleGridLines(val);
	topRightGrid.value?.toggleGridLines(val);
	bottomLeftGrid.value?.toggleGridLines(val);
	bottomRightGrid.value?.toggleGridLines(val);

	topGutter.value?.toggleGridLines(val);
	leftGutter.value?.toggleGridLines(val);
	rightGutter.value?.toggleGridLines(val);
	bottomGutter.value?.toggleGridLines(val);
}

function clear(): void {
	[topLeftGrid, topRightGrid, bottomLeftGrid, bottomRightGrid].forEach(r => r.value?.clearCells());
	[topGutter, leftGutter, rightGutter, bottomGutter].forEach(r => r.value?.clearCells());
	singleCell.value?.applyColor('lightgray');
	allEdits = [];
}

function clearCell(): void {
	singleCell.value?.applyColor('lightgray');
	allEdits = [];
}

function stopTrackingOnMouseUp(): void {
	removeTrackingEventListeners();
}

function stopTrackingOnMouseOut(event: MouseEvent): void {
	if (event.relatedTarget && (event.relatedTarget as Element).classList.contains('editable')) return;
	removeTrackingEventListeners();
}

function removeTrackingEventListeners(): void {
	allEdits.push(lastEdits);
	console.log(allEdits);
	lastEdits = [];

	editableRegions.forEach(region => {
		region.$el.removeEventListener('mouseup', stopTrackingOnMouseUp);
		region.$el.removeEventListener('mouseout', stopTrackingOnMouseOut);
	});
}

function startTracking(): void {
	editableRegions.forEach(region => {
		region.$el.addEventListener('mouseup', stopTrackingOnMouseUp);
		region.$el.addEventListener('mouseout', stopTrackingOnMouseOut);
	});
}

function updateRegion(edit: Edit): void {
	gridRefMap[edit.name].value?.applyColor(edit.index, edit.color);

	switch (edit.name) {
		case 'topLeftGrid':
			topRightGrid.value?.applyColor(edit.index, edit.color);
			bottomLeftGrid.value?.applyColor(edit.index, edit.color);
			bottomRightGrid.value?.applyColor(edit.index, edit.color);
			break;
		case 'topGutter':
			bottomGutter.value?.applyColor(edit.index, edit.color);
			break;
		case 'leftGutter':
			rightGutter.value?.applyColor(edit.index, edit.color);
			break;
	}
}

function undo(): void {
	if (allEdits.length < 1) return;

	const edits = allEdits.pop()!;
	edits.forEach(edit => updateRegion(edit));
}

onMounted(() => {
	clearCell();
	editableRegions = [topLeftGrid.value!, topGutter.value!, leftGutter.value!, singleCell.value!] as unknown as ComponentPublicInstance[];
});

defineExpose({ clear, toggleGridLines, undo });
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
