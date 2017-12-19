import Vue from 'vue';
import Vuex from 'vuex'
import axios from 'axios'
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueLocalStorage)
Vue.use(Vuex);
let ctime=null;
const state={
		//registration部分
		registrations:[],
		users:[
			{id:1,name:'Max',registered:false,disable:false},
        	{id:2,name:'Jack',registered:false,disable:false},
        	{id:3,name:'Mark',registered:false,disable:false},
        	{id:4,name:'Alice',registered:false,disable:false},
		],

		//shop部分
		products:[
		  {"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2},
		  {"id": 2, "title": "H&M T-Shirt White", "price": 10.99, "inventory": 10},
		  {"id": 3, "title": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 5},
		  {"id": 4, "title": "Charli", "price": 9.99, "inventory": 0}
		],
		checkStatus:false,

		//music部分
		//搜索到的歌单列表
		playList:[],
		//当前播放的歌单列表
		curPlayList:[],
		//搜索歌单id
		tileId:'',
		//当前播放歌单id
		curListId:'',
		//搜索结果
		result:[],
		audio:{
			location:'',
	        flag:'',
	        songName:'',
	        singer:'',
	        album:'',
	        picUrl:'',
	        duration:'',
	        currentTime:'',
	        progressPercent:'',
		},
		//是否正在播放标志
		playFlag:'',
		//当前歌曲id
		musicId:'',
		//当前列表播放完毕的标签
		musicEndFlag:false,
		//是否切换歌曲标签
		changeMusicFlag:true,
	}
const getters={
		//registration部分
		unregisteredUser(state){
			return state.users.filter(user=>!user.registered)
		},
		registrations(state){
			return state.registrations;
		},
		totalRegistrations(state){
			return state.registrations.length;
		},

		//shop部分
		products(state){
			return state.products;
		},
		cartProducts(state){
			return state.products.filter(p=>p.inventory>0);
		},
		product(state){
			return (product)=>{
				return state.products.find(p=>p.id===product.id)
			}
		},
		checkStatus(state){
			return state.checkStatus;
		},
		totalProduct(state,getters){
			return getters.cartProducts.length;
		},

		//music部分
		audio:state=>state.audio,
		playList:state=>state.playList,
		curPlayList:state=>state.curPlayList,
		tileId:state=>state.tileId,
		curListId:state=>state.curListId,
		result:state=>state.result,
		songs:state=>state.result.songs,
		playFlag:state=>state.playFlag,
		musicEndFlag:state=>state.musicEndFlag,
		changeMusicFlag:state=>state.changeMusicFlag,
		musicId:state=>state.musicId,
		progressPercent:state=>state.audio.progressPercent,
	}
const mutations={
		//registration部分
		registered(state,userId){
			const date=new Date();
			const user=state.users.find(user=>user.id==userId); 
			const registration={
				userId:user.id,
				name:user.name,
				date:(date.getMonth()+1)+'/'+date.getDay()
			};
			user.registered=true;
			state.registrations.push(registration);
		},
		unregistered(state,payload){
			const user=state.users.find(user=>user.id==payload.userId); 
			user.registered=false;
			const registration=state.registrations.find(registration=>registration.userId==payload.userId)
			state.registrations.splice(state.registrations.indexOf(registration),1);
		},

		//shop部分
		addToCart(state,payload){
			state.checkStatus=false;
			const product=state.products.find(p=>p.id===payload.productId);
			product.inventory++;
		},
		clearCart(state){
			state.checkStatus=true;
			state.products.map((p)=>{p.inventory=0});
		},

		//music部分
		//获取歌单详情
		playList(state,id){
				const url='/api/playlist/detail?id='+id;
				state.tileId=id;
				axios.get(url).then(res=>{
					state.playList=res.data.playlist.tracks;
				})
		},
		//设置初始化的flag标识
		setFlag(state){
			state.changeMusicFlag=true;
			state.musicEndFlag=false;
		},
		//播放+移动进度条
		play(state,payload){
			clearInterval(ctime);
			state.musicEndFlag=false;
			const totalTime=state.audio.duration;
			const audioPlay=document.querySelector('#playerBar');
			let curTime;
			let process;
			if(payload.flag==1){
				//移动进度条
				process=payload.value;
				curTime=(process/100*totalTime).toFixed(2);
				audioPlay.currentTime=curTime;
				if(!state.playFlag){
					audioPlay.play();
				}
			}else if(payload.flag==2){
				//播放
				curTime=audioPlay.currentTime;
				state.audio.currentTime=curTime;
				audioPlay.play();
				process=((curTime/totalTime)*100).toFixed(1);
			}
			state.playFlag=true;
			state.audio.currentTime=curTime;
			state.audio.progressPercent=process;
			ctime=setInterval(()=>{
				curTime++;
				process=((curTime/totalTime)*100).toFixed(1);

				state.audio.currentTime=curTime;
				state.audio.progressPercent=process;
			},1000);

		},
		//暂停播放
		pause(state){
			const audioPlay=document.querySelector('#playerBar');
			clearInterval(ctime);
			state.playFlag=false;
			audioPlay.pause();
		},
		//搜索
		searchSong(state,payload){
			const url='/api/search?keywords='+payload.keyWords+'?limit=30';
			axios.get(url).then((res)=>{
				state.result=res.data.result;
			})
		},
		//从搜索页面或者单首歌曲入口进入play时，清除playlist
		//未来可以修改为当前入口进入后添加到播放列表
		setListInit(state){
			state.curListId='';
			state.curPlayList=[];
		},
		//获取歌词详情
		getSong(state,id){
			const url='/api/song/detail?ids='+id;
			const locationUrl='/api/music/url?id='+id;
			//初始化
			state.musicId=id;
			clearInterval(ctime);
			state.playFlag=false;
			state.musicEndFlag=false;
			state.changeMusicFlag=false;
			state.audio.currentTime='0';

			axios.get(locationUrl).then((res)=>{
				state.audio.location=res.data.data[0].url;
				state.audio.flag=res.data.data[0].flag;
			})
			axios.get(url).then((res)=>{
				const temp=res.data.songs[0]
				state.audio.songName=temp.name;
				state.audio.singer=temp.ar[0].name;
				state.audio.album=temp.al.name;
				state.audio.picUrl=temp.al.picUrl;
			});
		},
		//需要在audio加载完成后在设置duration  事件：canplay
		setDuration(state){
			const audioPlay=document.querySelector('#playerBar');
			state.audio.duration=audioPlay.duration;
			state.audio.currentTime=audioPlay.currentTime;
			state.audio.progressPercent=((audioPlay.currentTime/audioPlay.duration)*100).toFixed(1);;
		},
		//播放列表
		audioEnd(state,flag){
			const audioPlay=document.querySelector('#playerBar');
			clearInterval(ctime);
			state.changeMusicFlag=true;
			audioPlay.pause();
			if(state.curPlayList.length>0){
				const music=state.curPlayList.find(music=>music.id==state.musicId);
				const index=state.curPlayList.indexOf(music);
				if(flag==1&&index<(state.curPlayList.length-1)){
					//按照列表顺序播放  前进一首
					const nextMusic=state.curPlayList[index+1];
					state.musicId=nextMusic.id;
				}else if(flag== -1&&index>0){
					//后退一首
					const nextMusic=state.curPlayList[index-1];
					state.musicId=nextMusic.id;
				}else if((flag == -1&&index==0) || (flag==1&&index==(state.playList.length-1)&&audioPlay.currentTime!=audioPlay.duration)){
					//第一首与最后一首(不是播放结束状态)不进行操作
				}else{
					//列表播放到最后一首歌 暂停 不进行列表循环
					state.playFlag=false;
					state.musicEndFlag=true;
					audioPlay.currentTime=0;
					state.audio.currentTime=0;
					state.audio.progressPercent=0;
				}
			}else{
				//无列表，只有当前一首歌
				const audioPlay=document.querySelector('#playerBar');
				state.playFlag=false;
				state.musicEndFlag=true;
				audioPlay.currentTime=0;
				state.audio.currentTime=0;
				state.audio.progressPercent=0;
			}

		},
		//替换当前歌单
		changList(state){
			state.curPlayList=state.playList;
			state.curListId=state.tileId;
		}
	}
const actions={
		//registration部分
		//context 也可以为{commit}，则下面直接使用commit
		registered(context,userId){
			const user=context.state.users.find(user=>user.id==userId); 
			user.disable=true;
			setTimeout(()=>{
				context.commit('registered',userId);
				user.disable=false;
			},1000)
		},

		//shop部分
		addToCart({commit},payload){
			commit('addToCart',payload)
		},


		//music部分
		//移动滚动条时候使用
		play({commit},payload){
			commit('play',payload)
		},
		playList({commit},id){
			commit('playList',id);
		},
		getSong({commit},payload){
			commit('getSong',payload);
		},
		setDuration({commit}){
			commit('setDuration');
		},
		audioEnd(context,flag){
			//自动播放下一首
			context.commit('audioEnd',flag);
			if(!context.state.musicEndFlag){
				context.commit('getSong',context.state.musicId)
				context.commit('play',{flag:2});
			}
		},
		changList({commit}){
			commit('changList');
		}
	}

export const store=new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})