<template>
	<input type="color" v-model="color">
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
	penColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
	penColor: '#000000',
});
const emit = defineEmits<{
	colorChanged: [val: string];
}>();

const color = ref(props.penColor);

watch(color, (val: string) => {
	emit('colorChanged', val);
});
</script>
