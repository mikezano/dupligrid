<template>
	<div class="gutter-cells" :class="orientation">
		<Cell  
			v-for="i in cellCount"
			:key="i"
			/>
	</div>
</template>

<script>
import Cell from '@/components/Cell.vue';

export default {
	name: 'GutterGrid',
	props: ['cellCount', 'orientation'],
	components:{
		Cell,
	}
}
</script>

<style>
.gutter-cells{
	display:flex;
}

.gutter-cells.vertical{
	flex-direction:column;
}

.gutter-cells.horizontal{
	flex-direction:row;
}
</style>
