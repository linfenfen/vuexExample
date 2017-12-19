<template>
	<div class="playerBox" v-show='showFlag'>
	    <audio ref="myAudio" :src="audio.location" @ended="audioEnd(1)" id="playerBar" @loadedmetadata='setDuration'>
	    	<source :src='audio.location' />
	    </audio>

	    <div class="controlBarBtn">
	        <mu-icon-button icon="skip_previous" @click='audioEnd(-1)'/>
	        <mu-icon-button class="addPlus" icon="play_arrow" @click="play" v-show='!playFlag' />
	        <mu-icon-button class="addPlus" icon="pause" @click="pause" v-show='playFlag'/>
	        <mu-icon-button icon="skip_next" @click='audioEnd(1)'/>
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
			audioEnd(flag){
				this.$store.dispatch('audioEnd',flag);
			},
			setDuration(){
				this.$store.dispatch('setDuration'),
				this.$store.commit('play',{flag:2})
			}
		}
	}
</script>