<template>
	<ul>
		<li v-for='p in products'>
			{{p.title}} - {{p.price}}元
			<br>
			<button @click='addToCart(p)'>Add to cart</button>
		</li>
	</ul>
</template>

<script>
import {mapGetters} from 'vuex'
export default{
	computed:{
		...mapGetters({
			products:'products'
		})
	},
	methods:{
		addToCart(p){
			this.$store.dispatch({
				type:'addToCart',
				productId:p.id
			})
		}
	},
}
</script>