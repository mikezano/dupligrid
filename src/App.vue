<template>
	<div id="app">
		<h1 class="title">Dupligrid</h1>
		<Tools v-on:toggleGridLines="toggleGridLines" :penColor="color" v-on:colorChanged="colorChanged"/>
		<ContainerGrid :gridSize="gridSize" :color="color" :colorIndex="colorIndex" ref="containerGrid"/>
	</div>
</template>

<script>
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

