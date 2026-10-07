/* 《폐허의 기록》 배경음 — 음악 파일 없이 Web Audio로 만드는 구역별 배경음 */
(function(){
 'use strict';
 let ac=null,master=null,duckG=null,cur=null,curKey='',muted=false,unlocked=false;
 const VOL=.32;
 try{muted=localStorage.getItem('ruins-mute')==='1';}catch(e){}
 let NB=null;
 function noise(){if(NB)return NB;const n=ac.sampleRate*3,b=ac.createBuffer(1,n,ac.sampleRate),d=b.getChannelData(0);let last=0;
  for(let i=0;i<n;i++){const w=Math.random()*2-1;last=(last+.02*w)/1.02;d[i]=last*3.5;}return NB=b;}
 function noiseSrc(){const s=ac.createBufferSource();s.buffer=noise();s.loop=true;return s;}
 function lfo(target,rate,depth,base){const o=ac.createOscillator(),g=ac.createGain();o.frequency.value=rate;g.gain.value=depth;o.connect(g);g.connect(target);target.value=base;o.start();return o;}
 function tone(freq,type,gain,out){const o=ac.createOscillator(),g=ac.createGain();o.type=type;o.frequency.value=freq;g.gain.value=gain;o.connect(g);g.connect(out);o.start();return o;}
 function ping(out,freq,type,peak,dec,when){const t=when||ac.currentTime,o=ac.createOscillator(),g=ac.createGain();o.type=type;o.frequency.value=freq;
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(peak,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+dec);o.connect(g);g.connect(out);o.start(t);o.stop(t+dec+.05);}
 function burst(out,f,q,peak,dec){const t=ac.currentTime,s=noiseSrc(),bp=ac.createBiquadFilter(),g=ac.createGain();bp.type='bandpass';bp.frequency.value=f;bp.Q.value=q;
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(peak,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+dec);s.connect(bp);bp.connect(g);g.connect(out);s.start(t);s.stop(t+dec+.1);}
 function echo(out,time,fb,mix){const d=ac.createDelay(2),f=ac.createGain(),w=ac.createGain(),lp=ac.createBiquadFilter();lp.type='lowpass';lp.frequency.value=2200;
  d.delayTime.value=time;f.gain.value=fb;w.gain.value=mix;d.connect(lp);lp.connect(f);f.connect(d);lp.connect(w);w.connect(out);return d;}
 /* 장면별 배경음 */
 const SCENES={
  city(out,st){
   const n=noiseSrc(),bp=ac.createBiquadFilter(),g=ac.createGain();bp.type='bandpass';bp.Q.value=.6;n.connect(bp);bp.connect(g);g.connect(out);n.start();
   st.push(n,lfo(bp.frequency,.07,180,420),lfo(g.gain,.11,.05,.09));
   const dr=ac.createGain();dr.gain.value=.05;dr.connect(out);st.push(tone(55,'sine',.6,dr),tone(82.6,'sine',.35,dr),tone(55.4,'triangle',.2,dr));
   return ()=>{if(Math.random()<.25)burst(out,900+Math.random()*1400,8,.05,1.6);};
  },
  school(out,st){
   const n=noiseSrc(),lp=ac.createBiquadFilter(),g=ac.createGain();lp.type='lowpass';lp.frequency.value=600;g.gain.value=.05;n.connect(lp);lp.connect(g);g.connect(out);n.start();st.push(n,lfo(g.gain,.08,.025,.05));
   const e=echo(out,.42,.45,.5);const sc=[523.25,587.33,659.25,783.99,880,1046.5];
   return ()=>{if(Math.random()<.55){const f=sc[Math.floor(Math.random()*sc.length)]*(Math.random()<.2?.5:1)*(1+(Math.random()-.5)*.012);ping(e,f,'triangle',.045,2.2);ping(out,f,'sine',.02,1.8);}};
  },
  school_past(out,st){
   const pad=ac.createGain();pad.gain.value=.03;pad.connect(out);[261.63,329.63,392,493.88].forEach(f=>st.push(tone(f,'sine',.5,pad)));st.push(lfo(pad.gain,.1,.012,.03));
   const e=echo(out,.36,.4,.5);const sc=[523.25,587.33,659.25,783.99,880];
   return ()=>{if(Math.random()<.7)ping(e,sc[Math.floor(Math.random()*sc.length)],'triangle',.05,1.6);if(Math.random()<.3)burst(out,3000,1,.02,.05);};
  },
  factory(out,st,pow){
   const lp=ac.createBiquadFilter(),g=ac.createGain();lp.type='lowpass';lp.frequency.value=pow?260:150;g.gain.value=pow?.09:.04;lp.connect(g);g.connect(out);
   st.push(tone(49,'sawtooth',.6,lp),tone(98.5,'square',.15,lp),lfo(g.gain,pow?1.6:.2,pow?.02:.01,pow?.09:.04));
   const n=noiseSrc(),hp=ac.createBiquadFilter(),hg=ac.createGain();hp.type='highpass';hp.frequency.value=3500;hg.gain.value=pow?.018:.008;n.connect(hp);hp.connect(hg);hg.connect(out);n.start();st.push(n);
   let k=0;return ()=>{k++;if(pow){const t=ac.currentTime;ping(out,62,'sine',.12,.35,t);ping(out,62,'sine',.08,.3,t+.6);}if(Math.random()<.35)burst(out,4500,1.5,.035,1.2);if(Math.random()<.15)burst(out,700,12,.04,.8);};
  },
  lab(out,st){
   const h=ac.createGain();h.gain.value=.035;h.connect(out);st.push(tone(60,'sine',.8,h),tone(120,'sine',.4,h),tone(180,'sine',.12,h));
   const n=noiseSrc(),lp=ac.createBiquadFilter(),g=ac.createGain();lp.type='lowpass';lp.frequency.value=800;g.gain.value=.025;n.connect(lp);lp.connect(g);g.connect(out);n.start();st.push(n);
   const e=echo(out,.3,.3,.35);
   return ()=>{if(Math.random()<.4){const t=ac.currentTime;ping(e,1320,'sine',.03,.12,t);if(Math.random()<.5)ping(e,990,'sine',.025,.12,t+.16);}if(Math.random()<.1)burst(out,200,4,.05,1.5);};
  },
  nl(out,st){
   const pad=ac.createGain();pad.gain.value=.028;const lp=ac.createBiquadFilter();lp.type='lowpass';lp.frequency.value=1800;pad.connect(lp);lp.connect(out);
   [261.63,329.63,392,493.88,587.33].forEach((f,i)=>{st.push(tone(f,i%2?'triangle':'sine',.45,pad),tone(f*1.004,'sine',.25,pad));});
   st.push(lfo(pad.gain,.06,.012,.028),lfo(lp.frequency,.05,500,1800));
   const e=echo(out,.55,.5,.55);const sc=[1046.5,1174.66,1318.51,1567.98,1760,2093];
   return ()=>{if(Math.random()<.6)ping(e,sc[Math.floor(Math.random()*sc.length)],'sine',.035,2.6);};
  },
  silent(){return null;}
 };
 function build(key){
  const g=ac.createGain();g.gain.value=0;g.connect(duckG);const st=[];
  const base=key.replace('_pow','').replace('_past','');
  let fn=SCENES[key.indexOf('_past')>=0&&SCENES[base+'_past']?base+'_past':base]||SCENES.silent;
  let out=g;if(key.indexOf('_past')>=0&&!SCENES[base+'_past']){const lp=ac.createBiquadFilter();lp.type='lowpass';lp.frequency.value=1100;lp.connect(g);out=lp;}
  const tick=fn(out,st,key.indexOf('_pow')>=0);
  let timer=null;if(tick){const loop=()=>{tick();timer=setTimeout(loop,1800+Math.random()*2600);};timer=setTimeout(loop,800);}
  g.gain.linearRampToValueAtTime(1,ac.currentTime+2.2);
  return {stop(){clearTimeout(timer);const t=ac.currentTime;try{g.gain.cancelScheduledValues(t);g.gain.setValueAtTime(g.gain.value,t);g.gain.linearRampToValueAtTime(0,t+1.6);}catch(e){}
   setTimeout(()=>{st.forEach(n=>{try{n.stop();}catch(e){}});try{g.disconnect();}catch(e){}},1800);}};
 }
 const API={
  unlock(){try{if(!ac){const C=window.AudioContext||window.webkitAudioContext;if(!C)return;ac=new C();master=ac.createGain();master.gain.value=muted?0:VOL;duckG=ac.createGain();duckG.gain.value=1;duckG.connect(master);master.connect(ac.destination);}
   if(ac.state==='suspended')ac.resume();unlocked=true;if(curKey&&!cur)cur=build(curKey);}catch(e){}},
  setScene(key){if(key===curKey)return;curKey=key;if(!ac||!unlocked)return;if(cur)cur.stop();cur=build(key);},
  setMuted(m){muted=!!m;try{localStorage.setItem('ruins-mute',muted?'1':'0');}catch(e){}if(master)master.gain.setTargetAtTime(muted?0:VOL,ac.currentTime,.2);},
  isMuted(){return muted;},
  duck(on){if(duckG)duckG.gain.setTargetAtTime(on?0:1,ac.currentTime,.4);}
 };
 window.RuinsAudio=API;
 document.addEventListener('visibilitychange',()=>{if(!ac)return;if(document.hidden)ac.suspend();else if(unlocked)ac.resume();});
})();
/* end of audio.js */
