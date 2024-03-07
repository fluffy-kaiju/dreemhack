<template>
	<div>
		<h1>Jobs</h1>
		<UTable :rows="jobs" :columns="columns">
			<template #status-data="{ row }">
				<UBadge :color="FStatus(row.status)"> {{ row.status }} </UBadge>
			</template>
		</UTable>
	</div>
</template>

<script lang="ts" setup>
// Fetch jobs from the server http://localhost:3000/jobs
console.log("fetching jobs");
const { data: jobs } = await useFetch('http://localhost:3000/jobs');
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
	console.log("status", status);
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