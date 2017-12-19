<template>
	<div class='search'>
		<mu-appbar>
			<div class='box'>
				<mu-text-field icon='search' class='appbar-search-field' hintText='请输入要搜索的内容' slot='right' v-model='searchKey' @keyup.enter.native='searchSong(searchKey)' @keyup.native='checkFlag(searchKey)'/>
				<mu-flat-button color="white" label="搜索" slot="right" @click='searchSong(searchKey)' :disabled='!searchFlag'/>
			</div>
		</mu-appbar>

		<mu-list v-if='songs'>
		  <mu-sub-header>搜索记录</mu-sub-header>
		  <template v-for='song in songs'>
			  <mu-list-item :title='song.name' :describeText='song.artists[0].name' @click='getSong(song.id)'>
			    <mu-avatar :src="song.artists[0].img1v1Url" slot="leftAvatar"/>
			    <mu-icon-menu slot="right" icon="more_vert" >
		            <mu-menu-item title="分享" />
		            <mu-menu-item title="收藏" />
		            <mu-menu-item title="删除" />
			    </mu-icon-menu>
			  </mu-list-item>
		  </template>
		</mu-list>
	</div>
</template>
<script scoped>
export default{
	data(){
		return {
			searchKey:'',
			searchFlag:false,
		}
	},
	computed:{
		songs(){
			return this.$store.getters.songs;
		},
	},
	methods:{
		searchSong(value){
			if(this.searchFlag){
				this.$store.commit('searchSong',{
					keyWords:value
				})
			}
		},
		checkFlag(value){
			if(value){
				this.searchFlag=true;
			}else{
				this.searchFlag=false;
			}
		},
		getSong(id){
			this.$store.commit('setListInit');

			this.$router.push({name:'play',params:{id:id}});
		}
	},
	destroyed(){
		this.$store.state.result=[];
	}
}
</script>
<style>
	.box{
		width:60%;
		margin:0 auto;
	}
	.mu-text-field-hint {
		text-align:left;
		padding-left:10px;
    	color: rgba(255,255,255,0.54);
  	}
  	.mu-item-right>.mu-icon-menu{
		align-self: unset;
		-ms-flex-item-align:unset;
  	}
  	.mu-flat-button{
  		background-color: rgba(133,34,146,0.5)
  	}
  	.mu-flat-button:hover{
  		background-color: rgba(90,18,130,0.5)
  	}
  	.mu-flat-button.disabled{
  		background-color: rgba(191, 186, 186,0.4)
  	}
	@media screen and (max-width:441px) {
		.box{
			width:100%;
		}
	}
</style>