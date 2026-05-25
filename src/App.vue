<template>
	<div id="app">
		<h1 class="title" @keyup.ctrl.z="show">Dupligrid</h1>
		<Tools v-on:toggleGridLines="toggleGridLines" :penColor="color" v-on:colorChanged="colorChanged"
			@clear="clearCells" />
		<ContainerGrid :gridSize="gridSize" :color="color" ref="containerGrid" />
	</div>
</template>

<script setup lang="ts">
import ContainerGrid from '@/components/ContainerGrid.vue';
import Tools from '@/components/Tools.vue';
import { onMounted, ref } from 'vue';

type ContainerGridInstance = InstanceType<typeof ContainerGrid>;

const color = ref('#000000');
const gridSize = ref(20);
const containerGrid = ref<ContainerGridInstance | null>(null);

function colorChanged(val: string): void {
	color.value = val;
}

function clearCells(): void {
	containerGrid.value?.clear();
}

function toggleGridLines(val: boolean): void {
	containerGrid.value?.toggleGridLines(val);
}

function show(): void {
	alert('j');
}

function undo(event: KeyboardEvent): void {
	if (!(event.ctrlKey && event.key === 'z')) return;
	containerGrid.value?.undo();
}

onMounted(() => {
	document.addEventListener('keyup', undo);
});
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Rubik+Mono+One');

#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: white;
	padding-top: 40px;
	background: linear-gradient(#444, #666);
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	font-family: 'Rubik Mono One', sans-serif;
}

.title {
	margin: 0 0 1rem 0;
	font-size: 4rem;

	text-shadow: 10px 10px 20px black;
}
</style>
