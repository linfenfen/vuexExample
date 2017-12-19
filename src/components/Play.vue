<template>
	<div class='play'>
		<!--navbar here-->
		<mu-appbar>
			<mu-icon-button icon='navigate_before' slot='left' @click='goBack'/>
			<div class='logo'>iPlayer</div>
		</mu-appbar>

		<!--player here-->
		<div class='bgImg'>
			<img :src='audio.picUrl' />
			<!--封面cd-->
			<mu-avatar slot='left' :size='300' :src='audio.picUrl' />
		</div>

		<div class='controlBar'>
			<mu-content-block>
			    {{audio.songName}} - {{audio.singer}}
			</mu-content-block>
			<div class="controlBarSlide">
			    <span class="slideTime">{{audio.currentTime | time}}</span>
			    <mu-slider v-model="progressPercent" @change="editprogress" class="demo-slider"/>
			    <span class="slideTime">{{audio.duration | time}}</span>
			</div>
		</div>
	</div>
</template>
<script>
let audioPlay;
	export default{
		computed:{
			progressPercent:{
				get:function (){
					return this.$store.getters.progressPercent
				},
				set:function (val){
					this.$store.state.progressPercent=val
				}
			},
			audio(){
				return this.$store.getters.audio;
			},
		},
		mounted(){
			this.$nextTick(function(){
				//当一曲完结musicEndFlag:true,切换歌曲changMusicFlag：false时 重新获得歌曲
				if(this.$store.getters.changeMusicFlag&&!this.$store.getters.musicEndFlag){
					this.$store.dispatch('getSong',this.$route.params.id)
				}
			})
		},
		methods:{
			goBack(){
				this.$router.go(-1);
			},
			editprogress(value){
				this.$store.dispatch('play',{
					value:value,
					flag:1
				});
			},
		},
		filters:{
			time(value){
				let minute=Math.floor(value/60);
				let second=Math.floor(value%60);
				minute=minute>=10?minute:('0'+minute);
				second=second>=10?second:('0'+second);
				return minute+':'+second;
			}
		},
		watch: {
	    	'$route' (to, from) {
	      		this.$store.commit('getSong',this.$route.params.id);
	    	}
  		},
	}
</script>
<style scoped>
	.play{
		width:100%;
	}
	.bgImg{
		position: relative;
	}
	.bgImg>img{
		position:absolute;
		left:0;
		z-index: -1;
		width:100%;
		height:100%;
		filter:blur(10px);
		-webkit-filter: blur(10px); 
		-moz-filter: blur(10px);
		-ms-filter: blur(10px);
	}
	.mu-avatar{
		margin-top:50px;
	}	
	.controlBar{
		display:flex;
		flex-direction:column;
		flex-wrap:wrap;
		bottom:20px;
	}
	.controlBarSlide{
		display:flex;
		align-items:center;
	}
	.mu-slider{
		margin:0 10px;
	}
	@media screen and (max-width:414px) {
		.mu-avatar{
			width:220px!important;
			height:220px!important;
			margin-top:20px;
		}
	}
</style>