<template>
	<div id="app">
		<PenColor :penColor="color" v-on:colorChanged="colorChanged"/>
		<Cell :color="color"/>
		<MainGrid :color="color"/>
	</div>
</template>

<script>
import PenColor from '@/components/PenColor.vue';
import Cell from '@/components/Cell.vue';
import MainGrid from '@/components/MainGrid.vue';

export default {
	name: 'app',
	data() {
		return {
			color: '#071cf5',
		};
	},
	components: {
		PenColor,
		Cell,
		MainGrid,
	},
	methods: {
		colorChanged(val) {
			this.color = val;
		},
	},
};
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
