<template>
	<div class='popular'>
		<!--navbar-->
		<mu-appbar>
			<div class='logo'>iPlayer </div>
		</mu-appbar>

		<!--banner-->
		<mu-card>
		   <!-- swiper -->
		    <swiper :options="swiperOption">
		       <swiper-slide v-for='(item,index) in banners'>
		       	<mu-card-media>
		       	<img :src='item.pic' />
		       </mu-card-media>
		       </swiper-slide>
		        <div class="swiper-pagination" slot="pagination"></div>
		    </swiper>
		</mu-card>

		<!--热门歌单-->
		<mu-grid-list class='gridlist-demo'>
			<mu-sub-header>热门歌单</mu-sub-header>
			<mu-grid-tile v-for="(tile, index) in list" :key="index">
			      <img :src="tile.coverImgUrl"/>
			      <span slot="title">{{tile.name}}</span>
			       <mu-icon-button icon="play_arrow" slot="action" @click='getListDetail(tile.id)' />
			</mu-grid-tile>
		</mu-grid-list>
	</div>
</template>
<script scoped>
import {swiper,swiperSlide} from 'vue-awesome-swiper'
import axios from 'axios'
export default {
   data() {
     return {
        swiperOption: {
         centeredSlides: true,
         autoplay: {
           delay: 2500,
           disableOnInteraction: false
         },
         pagination: {
           el: '.swiper-pagination',
           clickable: true
         }
        },
       banners:[],
       list:[],
     }
   },
   components:{
   	swiper,swiperSlide
   },
   created(){
   	this.$nextTick(function(){
   		this.initPopular();
   	})
   },
   methods:{
   	initPopular(){
   	      axios.get('/api/banner').then(res=> {
   	             this.banners=res.data.banners;
   	      }).catch(error=>{console.log(error)}),
   	      axios.get('/api/top/playlist/highquality?limit=8').then(res=> {
   	             this.list=res.data.playlists;
   	      })
   	},
   	getListDetail(id){
   		this.$router.push({name:'songlist',params:{id:id}})
   	}
   },
}
</script>
<style scoped>
	@media screen and (min-width:960px) {
		.mu-card-media>img{
			height:400px!important;
		}
		.mu-grid-list>div:nth-child(n+2){
		      width:25%!important;
		}
	}
	.mu-grid-tile>img{
		width:100%;
	}
	.mu-grid-list{
		width:100%;
	}
</style>
