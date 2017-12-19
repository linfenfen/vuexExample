<template>
	<div class='cart'>
		<h2>Your Cart</h2>
		<p v-show='!products.length'><i>Please add some products to cart.</i></p>
		<ul>
			<li v-for='p in products'>
				{{p.title}} - {{p.price | price}}*{{p.inventory}}
			</li>
		</ul>
		<p v-show='products.length'>Total: {{total | price}}</p>
		<p><button :disabled='!products.length' @click='clearCart'>Checkout</button></p>
		<p>Checkout {{checkStatus | cheack}}</p>
	</div>
</template>
<script>
import {mapGetters} from 'vuex';
export default{
	computed:{
		...mapGetters({
			products:'cartProducts',
			checkStatus:'checkStatus'
		}),
		total(){
			return this.products.reduce((total,p)=>{return total+p.price*p.inventory},0).toFixed(2);
		},
	},
	filters:{
		price(value){
			return '$'+value;
		},
		cheack(value){
			return value?'您已付清,欢迎继续购买':'请结账';
		}
	},
	methods:{
		clearCart(){
			alert('您已结算,共计:$'+this.total);
			this.$store.commit('clearCart')
		}
	}
}
</script>