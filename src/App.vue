<template>
	<div id="app">
		<PenColor :penColor="color" v-on:colorChanged="colorChanged"/>
		<div class="main-grids-container-flex">
			<div class="main-grids-container">
				<MainGrid
					orientation="normal"
					:gridSize="gridSize"
					:color="color"
					:isEditable="true"
					v-on:cellClicked="cellClicked"
				/>
				<MainGrid
					orientation="flipped-horizontal"
					:gridSize="gridSize"
					:isEditable="false"
					:colorIndex="colorIndex"
					ref="1"
				/>
				<MainGrid
					orientation="flipped-vertical"
					:gridSize="gridSize"
					:isEditable="false"
					:colorIndex="colorIndex"
					ref="2"
				/>
				<MainGrid
					orientation="flipped-horizontal-vertical"
					:gridSize="gridSize"
					:isEditable="false"
					:colorIndex="colorIndex"
					ref="3"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import PenColor from '@/components/PenColor.vue';
import MainGrid from '@/components/MainGrid.vue';

export default {
	name: 'app',
	data() {
		return {
			color: '#000000',
			colorIndex: 0,
			gridSize: 10,
		};
	},
	components: {
		PenColor,
		MainGrid,
	},
	methods: {
		colorChanged(val) {
			this.color = val;
		},
		cellClicked(index) {
			console.log('next index to color:', index);
			this.colorIndex = index;
			this.$refs['1'].applyColor(index, this.color);
			this.$refs['2'].applyColor(index, this.color);
			this.$refs['3'].applyColor(index, this.color);
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
.main-grids-container {
	display: grid;
	grid-template-rows: repeat(2, 1fr);
	grid-template-columns: repeat(2, 1fr);
}
.main-grids-container-flex {
	display: flex;
	justify-content: center;
}
</style>

