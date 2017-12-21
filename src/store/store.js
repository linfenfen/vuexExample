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

		//存放歌词
		//测试id
		idd:32719128,
		lrc:'',
		// lrc:"[by:RedClayBean]\n[00:05.59]I found your hairband on my bedroom floor\n[00:08.72]The only evidence that you've been here before\n[00:12.37]And I don't get waves of missing you anymore\n[00:15.37]They're more like tsunami tides in my eyes\n[00:17.81]Never getting dry, so I get high\n[00:19.75]Smoke in the day then I sleep with the light on\n[00:21.81]Weeks pass in the blink of an eye\n[00:23.19]And I'm still drunk by the end of the night\n[00:24.75]I don't drink like everybody else\n[00:26.00]End up forgetting things about myself\n[00:27.12]I'm stubborn I'm forward head's just blocked\n[00:29.37]My head's still with you but my heart's just not\n[00:31.62]So am I close to you anymore, if it's over\n[00:37.87]And there's no chance that we'll work it out\n[00:43.21]You and I ended over U.N.I.\n[00:46.09]And I said that's fine\n[00:52.52]But you're the only one that knows I lied\n[00:56.84]You and I ended over U.N.I.\n[01:02.71]And I said that's fine\n[01:05.33]But you're the only one that knows I lied\n[01:11.58]Everybody said that we'll be together forever but I know that\n[01:13.71]I never wanna settle down, come around\n[01:14.96]break up the love like lego now\n[01:16.27]Never wanna turn into another like you\n[01:17.65]Sleep with my thoughts dance with my views\n[01:19.33]Everything's great but everything's short\n[01:20.71]But you live in your halls and I live in a tour bus,\n[01:23.02]Now I'm in position to be another stalker\n[01:24.33]And every thing I say seems to always sound awkward\n[01:26.14]Like our last kiss it was perfect, we were nervous, on the surface\n[01:29.08]And I'm always saying everyday that it was worth it\n[01:30.90]Pain is only relevant if it still hurts\n[01:32.27]I forget like an elephant, or we can use a sedative\n[01:33.71]And go back to the day we fell in love on first kiss\n[01:36.21]So am I close to you anymore, now it's over\n[01:42.44]And there's no chance that we'll work it out\n[01:47.38]You and I ended over U.N.I.\n[01:54.00]And I said that's fine\n[01:56.94]But you're the only one that knows I lied\n[02:00.57]You and I ended over U.N.I.\n[02:06.88]And I said that's fine\n[02:09.63]But you're the only one that knows I lied\n[02:26.69]Because, if I was gonna go somewhere, I'd be there by now\n[02:34.07]And maybe I can let myself down, oh\n[02:40.69]And thinking I am unaware, I keep my feet on the ground\n[02:46.01]And keep looking around\n[02:51.82]Because if you want\n[02:55.88]I'll take you in my arms and keep you sheltered\n[03:02.25]From all that I've done wrong\n[03:04.57]And I know you'll say that I'm the only one\n[03:10.94]But I know God made another one of me\n[03:15.00]To love you better than I ever will\n",
		// lrc:"[by:Aria-Sul-G]\n[00:12]I met this boy in Molly town\n[00:15]He said a boom, a boom, boom, boom\n[00:18]He said he'd like to buy my round\n[00:21]I said OK, but you can't buy me baby\n[00:24]You look just like my favourite sound\n[00:27]So I stay alalala\n[00:30]Asking if I was allowed to come and play\n[00:33]The rest is history\n[00:35]What is a girl like me to do-u-u\n[00:39]Not for a second I can leave you-u-u\n[00:42]Been here a month and I know your smile-u-u\n[00:46]My heart is thinking I'll stay a while-u-u-u-u\n[00:51]The weeks went on and the months fell out\n[00:54]Of my way, what can I sing about it\n[00:57]You swore you'd always be around\n[01:00]If I stay, so I'm staying\n[01:03]I hold my plans to the god of fate\n[01:05]And all he say was boom, boom, boom\n[01:08]You're the point to the love I found\n[01:11]In a way, don't think I'm crazy\n[01:14]What is a girl like me to do-u-u\n[01:17]Not for a second I can leave you-u-u\n[01:21]Been here a month and I know your smile-u-u\n[01:24]My heart is thinking I'll stay a while-u-u-u-u, whoa\n[01:30]O-e-o, o-e-o, o-e-o-o-o-o\n[01:36]O-e-o, o-e-o, o-e-o-o-o-o\n[01:41]O-e-o, o-e-o, o-e-o-o-o-o\n[01:47]O-e-o, o-e-o, o-e-o-o-o-o\n[01:52]Got my camera, got my six\n[01:55]Anymore I'm leaving him\n[01:58]Run from life as I know it\n[02:01]Cause you got me, got me, got me transfixed\n[02:04]Thought I'd travel far away\n[02:07]But you call me half the way\n[02:09]Down in moyo I would stay\n[02:12]Cause you got me, got me, got me good babe\n[02:15]What is a girl like me to do-u-u\n[02:19]Not for a second I can leave you-u-u\n[02:22]Been here a month and I know your smile-u-u\n[02:26]My heart is thinking I'll stay a while-u-u-u-u, whoa\n[02:42]I'll never let you go\n[02:45]Boy, you're my comfort child\n[02:48]I'll never let you go\n[02:50]No, no, ooh\n[02:53]I see our love's been on lock and there's no talk if I stop it\n[02:57]You just don't want to see me go\n[02:59]Every look I've been clocking, on your door I've been knocking\n[03:02]Get your life and baby let's go, go\n[03:05]I met this boy in Molly town\n[03:08]He said a boom, a boom, boom, boom\n[03:11]He said he'd like to buy my round\n[03:13]I said OK, a boom, boom, boom\n",
		//歌词对象 存储对应时间对应margin、text、index
		lrcObj:[],
		//全部歌词存储
		lrcStr:'',
		//存储歌词偏移量
		marginTop:'',
		//成功获取歌词flag
		suclrc:false,
		//歌词作者
		authorlrc:'',
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
		lrc:state=>state.lrc,
		lrcObj:state=>state.lrcObj,
		lrcStr:state=>state.lrcStr,
		marginTop:state=>state.marginTop,
		suclrc:state=>state.suclrc,
		authorlrc:state=>state.authorlrc,
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
			state.marginTop=0;

			axios.get(locationUrl).then((res)=>{
				state.audio.location=res.data.data[0].url;
				state.audio.flag=res.data.data[0].flag;
			}).catch(erro=>{console.log("歌曲信息获取失败"+erro)})
			axios.get(url).then((res)=>{
				const temp=res.data.songs[0]
				state.audio.songName=temp.name;
				state.audio.singer=temp.ar[0].name;
				state.audio.album=temp.al.name;
				state.audio.picUrl=temp.al.picUrl;
			}).catch(erro=>{console.log("歌曲地址获取失败"+erro)});
		},
		//需要在audio加载完成后在设置duration  事件：canplay
		setDuration(state){
			const audioPlay=document.querySelector('#playerBar');
			state.audio.duration=audioPlay.duration;
			state.audio.currentTime=audioPlay.currentTime;
			state.audio.progressPercent=((audioPlay.currentTime/audioPlay.duration)*100).toFixed(1);;
		},
		//播放列表   flag：1前进 ；flag:-1 后退；
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

					//处理歌词
					const lrc=document.querySelector('#lrc');
					if(lrc){
						lrc.style.opacity=0;
						state.marginTop=0;
						setTimeout(()=>{lrc.style.opacity=1},785);
					}
				}
			}else{
				//无列表，只有当前一首歌
				const audioPlay=document.querySelector('#playerBar');
				state.playFlag=false;
				state.musicEndFlag=true;
				audioPlay.currentTime=0;
				state.audio.currentTime=0;
				state.audio.progressPercent=0;

				//处理歌词
				const lrc=document.querySelector('#lrc');
				if(lrc){
					lrc.style.opacity=0;
					state.marginTop=0;
					setTimeout(()=>{lrc.style.opacity=1},785);
				}
			}

		},
		//替换当前歌单
		changList(state){
			state.curPlayList=state.playList;
			state.curListId=state.tileId;
		},
		//获取歌词详情，与getSong同时使用
		getlrc(state,id){
			const url='/api/lyric?id='+id;
			state.suclrc=false;
			axios.get(url).then((res)=>{
				state.lrc=res.data.lrc.lyric;
				state.suclrc=true;
			}).catch(erro=>{console.log("获取歌词出错"+erro)})
		},
		//处理歌词,与getSong同时使用
		initlrc(state){
			//处理歌词 时间匹配只能是整数，否则会有问题
			const Reg=/\[(\d+):(\d+.*\d*)\]/;
			let lrcArr=state.lrc.split('\n');
			let lrc;
			let tempTime;
			state.lrcObj={};
			state.lrcStr='';
			state.marginTop=0;
			state.authorlrc='';

			//用于多组时间一起时 保存当前的index
			let index=-1;
			for(let i=0,len=lrcArr.length-1;i<len;i++){
				let everylrc=lrcArr[i].split(']');
				let text;
				let tempTime;
				if(everylrc[0].match(/^\[\d+/)){
					//拥有时间戳的词
					text=everylrc[1];
					//处理时间多组的歌曲编码方式
					while(text==''){
						i++;
						let everylrc=lrcArr[i].split(']');
						text=everylrc[1];
					}
					index++;
					let time=everylrc[0].slice(1).split(':');
					tempTime=Math.round(parseFloat(time[0])*60+parseFloat(time[1]));
					state.lrcObj[tempTime]={
						index:index,
						text:text,
						top:index*30
					}
					state.lrcStr+='<li>'+text+'</li>';
				}else{
					index++;
					state.authorlrc+='<li>'+everylrc[0].slice(1)+'</li>';
				}
			}
		},
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
			commit('getlrc',payload);
		},
		setDuration({commit}){
			commit('setDuration');
		},
		audioEndOnly(context,flag){
			context.commit('audioEnd',flag);
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