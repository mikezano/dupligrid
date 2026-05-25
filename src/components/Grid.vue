<template>
	<div class="main-grid-flex" :class="orientation">
		<div class="main-grid" ref="mainGrid">
			<Cell :color="color" :index="i" :isEditable="isEditable" v-on:cellClicked="cellClicked"
				:ref="el => { if (el) cellRefs[i - 1] = el as CellInstance }" v-for="i in gridCellCount" :key="i" />
		</div>
	</div>
</template>

<script setup lang="ts">
import Cell from '@/components/Cell.vue';
import { onBeforeUpdate, onMounted, ref } from 'vue';

interface Props {
	gridSize: number;
	color?: string;
	orientation?: string;
	isEditable?: boolean;
	name?: string;
}

const props = withDefaults(defineProps<Props>(), {
	color: '',
	orientation: 'normal',
	isEditable: false,
	name: '',
});
const emit = defineEmits<{
	cellClicked: [index: number, previousColor: string, name: string];
}>();

type CellInstance = InstanceType<typeof Cell>;

const gridCellCount = props.gridSize * props.gridSize;
const cellRefs = ref<CellInstance[]>([]);
const mainGrid = ref<HTMLDivElement | null>(null);

onBeforeUpdate(() => {
	cellRefs.value = [];
});

function cellClicked(index: number, previousColor: string): void {
	emit('cellClicked', index, previousColor, props.name);
}

function applyColor(index: number, color: string): void {
	cellRefs.value[index - 1].applyColor(color);
}

function clearCells(): void {
	cellRefs.value.forEach(cell => cell.clearCell());
}

function toggleGridLines(val: boolean): void {
	cellRefs.value.forEach(element => {
		element.toggleGridLines(val);
	});
}

onMounted(() => {
	mainGrid.value!.style.gridTemplateColumns = `repeat(${props.gridSize}, 1fr)`;
	mainGrid.value!.style.gridTemplateRows = `repeat(${props.gridSize}, 1fr)`;
});

defineExpose({ applyColor, clearCells, toggleGridLines });
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
