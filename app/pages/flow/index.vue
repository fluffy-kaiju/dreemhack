<!-- Flowchart.vue -->
<script setup>
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { MiniMap } from '@vue-flow/minimap'



const nodes = ref([
	{
		id: '1',
		label: 'node 1',
		position: { x: 100, y: 100 },
	},
	{
		id: '2',
		label: 'node 2',
		position: { x: 100, y: 200 },
	},
])

const edges = ref([
	{
		id: 'e1-2',
		target: '2',
		source: '1',
	},
])
</script>

<template>
	<div style="height: 800px;">
		<VueFlow :nodes="nodes" :edges="edges">
			<Background></Background>
			<MiniMap></MiniMap>
		</VueFlow>
	</div>
</template>
<style>
/* import the necessary styles for Vue Flow to work */
@import '@vue-flow/core/dist/style.css';

/* import the default theme, this is optional but generally recommended */
@import '@vue-flow/core/dist/theme-default.css';
@import '@vue-flow/minimap/dist/style.css'
</style>