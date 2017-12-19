<template>
	<div class='player'>

		<!--navbar here-->
		<mu-paper>
			<mu-bottom-nav :value='bottomNav' @change='handlerChange'>
				<mu-bottom-nav-item value='popular' title='流行' icon='music_note' :to='{name:"popular"}'/>
				<mu-bottom-nav-item value='play' title='播放' icon='play_arrow' :to='{name:"play",params:{id:musicId}}'/>
				<mu-bottom-nav-item value='search' title='搜索' icon='search' :to='{name:"search"}'/>
			</mu-bottom-nav>
		</mu-paper>

		<!-- banner here-->
		<router-view></router-view>

		<play-box></play-box>
	</div>
</template>

<script>
import PlayBox from './PlayBox'
export default{
	data(){
		return{
			bottomNav:'popular',
		}
	},
	methods:{
		handlerChange(val){
			this.bottomNav=val;
		}
	},
	computed:{
		musicId(){
			return this.$store.getters.musicId;
		}
	},
	components:{
		PlayBox,
	}
}
</script>
<style>
	.mu-bottom-nav{
		background-color: #fafafa;
	}
	.mu-buttom-item{
			max-width:unset!important;
	}
	.mu-bottom-item-active{
		background-color:rgba(0,0,0,0.3);
	}
	.player{
		width:100%;
		overflow-y:hidden;
	}
</style>