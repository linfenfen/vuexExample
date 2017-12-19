<template>
	<div>
		<product-list></product-list>
		<hr>
		<cart></cart>
	</div>
</template>

<script>
import ProductList from './ProductList';
import Cart from './cart';
export default{
	components:{
		ProductList,Cart
	}
}
</script>
<style>
	html, body {
	  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	  color: #2c3e50;
	}

	ul {
	  line-height: 1.5em;
	  padding-left: 1.5em;
	}

	a {
	  color: #7f8c8d;
	  text-decoration: none;
	}

	a:hover {
	  color: #4fc08d;
	}
</style>