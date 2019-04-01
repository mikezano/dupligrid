<template>
	<div class="tools">
		<div class="tools__item">
			<label class="tools__label">Pen Color :</label>
			<PenColor :penColor="color" v-on:colorChanged="colorChanged" class="tools__input"/>
		</div>
		<div class="tools__item">
			<label class="tools__label">Grid on/off :</label>
			<input type="checkbox" v-model="isShowingGridLines" class="tools__input">
		</div>
		<div class="tools__item">
			<button class="tools__clear" @click="clear()">Clear</button>
		</div>
	</div>
</template>

<script>
import PenColor from '@/components/PenColor.vue';
export default {
	name: 'Tools',
	props: ['penColor'],
	data() {
		return {
			isShowingGridLines: true,
			color: this.penColor,
		};
	},
	components: {
		PenColor,
	},
	watch: {
		isShowingGridLines(val) {
			this.$emit('toggleGridLines', val);
		},
	},
	methods: {
		clear() {
			this.$root.$emit('clearCells');
		},
		colorChanged(val) {
			this.$emit('colorChanged', val);
		},
	},
};
</script>

<style>
.tools {
	display: flex;
	flex-direction: column;

	align-items: center;
	margin-bottom: 1rem;
}
.tools__item {
	display: flex;
	padding: 0.2rem;
	width: 14rem;
}
.tools__label {
	width: 12rem;
	text-align: left;
}
.tools__input {
	margin-left: auto;
}

.tools__clear {
	width: 10rem;
	margin: 1rem auto;
	border-radius: 0.2rem;
	padding: 1rem 2rem;
	border: 1px solid gray;
	font-family: 'Rubik Mono One', sans-serif;
	font-size: 1.3rem;
	color: #333;
	transition: all 0.1s ease-in;
}

.tools__clear:hover {
	transform: scale(1.01);
	box-shadow: 10px 10px 20px hsla(0, 0%, 0%, 0.5);
	cursor: pointer;
}

.tools__clear:active {
	transform: scale(0.99);
	box-shadow: 4px 4px 10px hsla(0, 0%, 0%, 0.5);
}
</style>

