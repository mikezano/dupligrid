<template>
	<div>
		<label>Gridlines on/off</label>
		<input type="checkbox" v-model="isShowingGridLines">
		<button @click="clear">Clear</button>
	</div>
</template>

<script>
export default {
	name: 'Tools',
	data() {
		return {
			isShowingGridLines: true,
		};
	},
	watch: {
		isShowingGridLines(val) {
			this.$emit('toggleGridLines', val);
		},
	},
};
</script>
