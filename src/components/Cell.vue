<template>
	<div ref="cell" class="cell" :class="{ editable: isEditable }" @mousedown="applyPenColor($event)"
		@mouseenter="applyPenColor($event)" @mouseup="removePreviewPenColor"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
	color?: string;
	index?: number;
	isEditable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	color: '',
	index: 0,
	isEditable: false,
});
const emit = defineEmits<{
	cellClicked: [index: number, previousColor: string];
}>();

const cell = ref<HTMLDivElement | null>(null);
const currentColor = ref('');

function applyColor(color: string): void {
	cell.value!.style.backgroundColor = color;
	currentColor.value = color;
}

function applyPenColor(event: MouseEvent): void {
	if (!props.isEditable) return;

	if (event.buttons == 1 || event.buttons == 2) {
		emit('cellClicked', props.index, currentColor.value);
		applyColor(props.color);
	} else {
		applyPreviewPenColor();
	}
}

function applyPreviewPenColor(): void {
	cell.value!.style.backgroundColor = props.color;
	cell.value!.addEventListener('mouseout', removePreviewPenColor);
}

function removePreviewPenColor(): void {
	cell.value!.style.backgroundColor = currentColor.value;
	cell.value!.removeEventListener('mouseout', removePreviewPenColor);
}

function toggleGridLines(val: boolean): void {
	cell.value!.style.borderColor = val ? 'gray' : 'transparent';
}

function clearCell(): void {
	if (!cell.value) return;

	cell.value.style.backgroundColor = 'transparent';
	currentColor.value = '';
	cell.value.removeEventListener('mouseout', removePreviewPenColor);
}

defineExpose({ applyColor, toggleGridLines, clearCell });
</script>

<style>
.cell {
	width: 10px;
	height: 10px;
	border: 1px solid gray;
	transition: transform 0.1s ease-in-out;
	user-select: none;
	/* fixes issue where sometimes you're dragging a cell */
}

.cell:hover {
	border: 1px solid black;
	cursor: pointer;
}
</style>
