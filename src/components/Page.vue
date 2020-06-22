<template>
	<div style="height: 100%;">
		<v-container v-if="false" fill-height>
			<v-container class="text-center">
				<v-progress-circular :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
				<div style="padding-top: 10px;">Setting up your room</div>
			</v-container>
		</v-container>
		<v-container v-else style="max-width:1200px; margin:auto">
			<slot></slot>
		</v-container>
	</div>
</template>

<script>
	import Vue from 'vue';
	export default Vue.extend({
		props: {
			loading: {
				type: Boolean,
				required: false,
				default: false,
			}

		}
	});
</script>