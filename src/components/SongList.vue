<template>
	<div class='songList'>
		<mu-appbar>
			<mu-icon-button icon='navigate_before' slot='left' @click='goBack'/>
			<div class='logo'>iPlayer</div>
		</mu-appbar>
		<mu-list v-if='songs'>
		  <mu-sub-header>歌单详情</mu-sub-header>
		  <template v-for='song in songs'>
			  <mu-list-item :title='song.name' @click='getSong(song.id)'>
			    <mu-avatar :src="song.al.picUrl" slot="leftAvatar"/>
			    <span slot="describe">
			        <span style="color: rgba(0, 0, 0, .87)">{{song.ar[0].name}} -</span> {{song.al.name}}
			    </span>
			  </mu-list-item>
		  </template>
		</mu-list>
	</div>
</template>
<script>
	export default{
		computed:{
			songs(){
				return this.$store.getters.playList;
			}
		},
		mounted(){
			this.$nextTick(function(){
				//要用异步的playlist  这样不会导致音乐卡顿
				if(this.$store.getters.tileId!=this.$route.params.id){
					this.$store.dispatch('playList',this.$route.params.id);
				}
			})
		},
		methods:{
			goBack(){
				this.$router.go(-1)
			},
			getSong(id){
				if(this.$store.getters.musicId!==id){
					this.$store.commit('setFlag')
				}
				//当当前歌单与播放歌单不同时，加载新的歌单
				if(this.$store.getters.tileId!=this.$store.getters.curListId){
					this.$store.dispatch('changList');
				}

				this.$router.push({name:'play',params:{id:id}});
			}
		}
	}
</script>