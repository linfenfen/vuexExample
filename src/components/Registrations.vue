<template>
	<div id='registrations'>
		<div class='summary'>
			<h3>Registrations</h3>
			<h5>Total: {{total}}</h5>
		</div>
		<hr>
		<div class='row' v-for='registration in registrations'>
			<h4>{{registration.name}}</h4>
			<span @click='unregister(registration)'>(Unregister)</span>
			<div class='date'>{{registration.date}}</div>
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex';
export default{
	methods:{
		unregister(registration){
			this.$store.commit({
				type:'unregistered',
				userId:registration.userId
			})
		}
	},
	computed:{
		...mapGetters({
			total:'totalRegistrations',
			registrations:'registrations'
		}) 
	}
}
</script>