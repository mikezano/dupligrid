<template>
	<div id="app">
		<PenColor :penColor="color" v-on:colorChanged="colorChanged"/>
		<Tools v-on:toggleGridLines="toggleGridLines"/>
		<ContainerGrid :gridSize="gridSize" :color="color" :colorIndex="colorIndex" ref="containerGrid"/>
	</div>
</template>

<script>
import PenColor from '@/components/PenColor.vue';
import Tools from '@/components/Tools.vue';
import ContainerGrid from '@/components/ContainerGrid.vue';

export default {
	name: 'app',
	data() {
		return {
			color: '#000000',
			colorIndex: 0,
			gridSize: 20,
		};
	},
	components: {
		PenColor,
		ContainerGrid,
		Tools,
	},
	methods: {
		colorChanged(val) {
			this.color = val;
		},
		toggleGridLines(val) {
			this.$refs.containerGrid.toggleGridLines(val);
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

