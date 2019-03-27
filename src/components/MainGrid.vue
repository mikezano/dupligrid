<template>
	<div class="main-grid-flex">
		<div class="main-grid">
			<Cell :color="color"/>
			<Cell :color="color"/>
			<Cell :color="color"/>
			<Cell :color="color"/>
		</div>
	</div>
</template>

<script>
import Cell from '@/components/Cell.vue';

export default {
	props: ['color'],
	data() {
		return {};
	},
	components: {
		Cell,
	},
};
</script>

<style>
.main-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(2, 1fr);
}

.main-grid-flex {
	display: flex;
	justify-content: center;
}
</style>
