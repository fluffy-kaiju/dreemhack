<template>
	<div>
		<h1>Jobs</h1>
		<p>{{ pending }}</p>
		<UTable loading :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
			:progress="{ color: 'primary', animation: 'carousel' }" class="w-full" :rows="jobs" :columns="columns">
			<template #status-data="{ row }">
				<UBadge :color="FStatus(row.status)"> {{ row.status }} </UBadge>
			</template>
		</UTable>
	</div>
</template>

<script lang="ts" setup>
import { JobsApi } from '#imports';

console.log("fetching jobs");
const { data: jobs, pending } = await useAsyncData('jobs', () => {
	return JobsApi.getJobs();
}, {});
console.log("response", jobs);

const columns = ref([
	{
		key: 'id',
		label: 'ID',
	},
	{
		key: 'name',
		label: 'Name',
	},
	{
		key: 'description',
		label: 'Description',
		sortable: true,
	},
	{
		key: 'status',
		label: 'Status',
		sortable: true,
	},
]);

function FStatus(status: string) {
	switch (status) {
		case 'COMPLETED':
			return 'emerald';
		case 'IN_PROGRESS':
			return 'orange';
		case 'FAILED':
			return 'red';
		default:
			return 'gray';
	}
};
</script>

<style></style>