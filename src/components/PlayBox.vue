<template>
	<div class="playerBox" v-show='showFlag'>
	    <audio ref="myAudio" :src="audio.location" @ended="audioEnd" id="playerBar" @loadedmetadata='setDuration'>
	    	<source :src='audio.location' />
	    </audio>

	    <div class="controlBarBtn">
	        <mu-icon-button icon="skip_previous"/>
	        <mu-icon-button class="addPlus" icon="play_arrow" @click="play" v-show='!playFlag' />
	        <mu-icon-button class="addPlus" icon="pause" @click="pause" v-show='playFlag'/>
	        <mu-icon-button icon="skip_next"/>
	    </div>
	</div>
</template>
<script>
	export default{
		computed:{
			audio(){
				return this.$store.getters.audio;
			},
			playFlag(){
				return this.$store.getters.playFlag;
			},
			showFlag(){
				return this.$route.path.match(/play/);
			}
		},
		methods:{
			play(){
				//不能用异步
				this.$store.commit('play',{
					flag:2
				});
			},
			pause(){
				this.$store.commit('pause');
			},
			audioEnd(){
				this.$store.commit('audioEnd');
				this.$router.push({name:'play',params:{id:this.$store.getters.musicId}})
			},
			setDuration(){
				this.$store.commit('setDuration'),
				this.$store.commit('play',{flag:2})
			}
		}
	}
</script>