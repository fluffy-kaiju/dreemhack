<script setup lang="ts">
	const route = useRoute()

	const links = [{
		label: 'Profile',
		icon: 'i-heroicons-user',
		to: '/'
	}, {
		label: 'Workers',
		icon: 'i-heroicons-server',
		to: '/workers'
	}, {
		label: 'Jobs',
		icon: 'i-heroicons-rectangle-stack',
		to: '/jobs'
	}]
</script>

<template>
	<UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
</template>