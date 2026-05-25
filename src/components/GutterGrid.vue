<template>
	<div class="gutter-cells" :class="orientation">
		<Cell v-for="i in cellCount" :ref="el => { if (el) cellRefs[i - 1] = el as CellInstance }" :key="i"
			v-on:cellClicked="cellClicked" :color="color" :index="i" :isEditable="isEditable" />
	</div>
</template>

<script setup lang="ts">
import Cell from '@/components/Cell.vue';
import { onBeforeUpdate, ref } from 'vue';

interface Props {
	cellCount: number;
	orientation?: string;
	isEditable?: boolean;
	color?: string;
	name?: string;
}

const props = withDefaults(defineProps<Props>(), {
	orientation: 'vertical-top',
	isEditable: false,
	color: '',
	name: '',
});
const emit = defineEmits<{
	cellClicked: [index: number, previousColor: string, name: string];
}>();

type CellInstance = InstanceType<typeof Cell>;

const cellRefs = ref<CellInstance[]>([]);

onBeforeUpdate(() => {
	cellRefs.value = [];
});

function applyColor(index: number, color: string): void {
	cellRefs.value[index - 1].applyColor(color);
}

function clearCells(): void {
	cellRefs.value.forEach(cell => cell.clearCell());
}

function cellClicked(index: number, previousColor: string): void {
	emit('cellClicked', index, previousColor, props.name);
}

function toggleGridLines(val: boolean): void {
	cellRefs.value.forEach(element => {
		element.toggleGridLines(val);
	});
}

defineExpose({ applyColor, clearCells, toggleGridLines });
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
