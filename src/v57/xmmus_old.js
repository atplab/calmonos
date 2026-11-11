/* ---------- Niveaux de Noël : « Douce nuit » au carillon, grelots de traîneau et tintements de cloches ---------- */
var xmMu={on:false,L:null,T:0,i:0,t:0,p:0,
 SEQ:[[392,3],[440,1],[392,2],[329.6,6],[392,3],[440,1],[392,2],[329.6,6],[587.3,4],[493.9,2],[523.3,6],[523.3,4],[392,2],[440,4],[440,2],[523.3,3],[493.9,1],[440,2],[392,3],[440,1],[392,2],[440,4],[440,2],[523.3,3],[493.9,1],[440,2],[392,3],[440,1],[392,2],[329.6,6],[587.3,4],[587.3,2],[698.5,3],[587.3,1],[493.9,2],[523.3,6],[659.3,6],[523.3,2],[392,2],[329.6,2],[392,3],[349.2,1],[293.7,2],[261.6,6],[0,6]],
 E:.5,
 build(){const a=typeof AC!=='undefined'?AC:null;if(!a||typeof mg==='undefined'||!mg||this.L)return;
  const out=a.createGain();out.gain.value=0;out.connect(mg);
  const dl=a.createDelay(1.2),fb=a.createGain(),lp=a.createBiquadFilter(),wet=a.createGain();dl.delayTime.value=.36;fb.gain.value=.38;lp.type='lowpass';lp.frequency.value=2600;wet.gain.value=.5;
  dl.connect(lp);lp.connect(fb);fb.connect(dl);lp.connect(wet);wet.connect(out);
  const bus=a.createGain();bus.connect(out);bus.connect(dl);
  const pad=a.createGain();pad.gain.value=.5;const fl=a.createBiquadFilter();fl.type='lowpass';fl.frequency.value=520;fl.connect(pad);pad.connect(out);
  [98,146.8,196,246.9].forEach((fr,k)=>[-5,5].forEach(dt=>{const o=a.createOscillator(),g=a.createGain(),l=a.createOscillator(),lg=a.createGain();o.type='triangle';o.frequency.value=fr;o.detune.value=dt;g.gain.value=.035;l.frequency.value=.06+k*.02;lg.gain.value=.015;l.connect(lg);lg.connect(g.gain);o.connect(g);g.connect(fl);o.start();l.start()}));
  const n=a.sampleRate*.4,nb=a.createBuffer(1,n,a.sampleRate),nd=nb.getChannelData(0);for(let i=0;i<n;i++)nd[i]=Math.random()*2-1;
  this.L={out,bus,nb}},
 bell(f,t,d,v,bus){const a=AC;[[1,1],[2.76,.28],[5.4,.1]].forEach(([m,k])=>{const o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.value=f*m;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v*k,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+d/m**.3);o.connect(g);g.connect(bus);o.start(t);o.stop(t+d+.1)})},
 jing(t,v,bus,nb){const a=AC,s=a.createBufferSource(),bp=a.createBiquadFilter(),g=a.createGain();s.buffer=nb;s.playbackRate.value=1+Math.random()*.2;bp.type='bandpass';bp.frequency.value=6500+Math.random()*1500;bp.Q.value=2.2;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+.16);s.connect(bp);bp.connect(g);g.connect(bus);s.start(t);s.stop(t+.2)},
 tick(){const L=this.L,a=typeof AC!=='undefined'?AC:null;if(!L||!a)return;if(this.t<a.currentTime)this.t=a.currentTime+.12;
  while(this.t<a.currentTime+.4){const[f,n]=this.SEQ[this.i],d=n*this.E;
   if(f)this.bell(f,this.t,Math.min(2.6,d+1.2),.13,L.bus);
   for(let k=0;k<n;k++)if((this.p+k)%3===0)this.jing(this.t+k*this.E,.05+((this.p+k)%6===0?.03:0),L.bus,L.nb);
   this.p=(this.p+n)%6;this.t+=d;this.i=(this.i+1)%this.SEQ.length}},
 fx(f,d){const a=AC;if(!a||!mg)return;if(!this.F){const bus=a.createGain(),dl=a.createDelay(1),fb=a.createGain(),lp=a.createBiquadFilter(),wet=a.createGain();dl.delayTime.value=.24;fb.gain.value=.3;lp.type='lowpass';lp.frequency.value=3000;wet.gain.value=.4;bus.connect(mg);bus.connect(dl);dl.connect(lp);lp.connect(fb);fb.connect(dl);lp.connect(wet);wet.connect(mg);
   const n=a.sampleRate*.4,nb=a.createBuffer(1,n,a.sampleRate),nd=nb.getChannelData(0);for(let i=0;i<n;i++)nd[i]=Math.random()*2-1;this.F={bus,nb}}
  const F=this.F,t=a.currentTime;
  if(d<.22){this.bell(f*1.5,t,.7,.16,F.bus);this.jing(t,.07,F.bus,F.nb);this.jing(t+.06,.05,F.bus,F.nb)}
  else if(d>=.28&&f>=800){[0,.07,.14,.21].forEach((o,k)=>{this.jing(t+o,.09,F.bus,F.nb);this.bell(f*[1,1.25,1.5,2][k],t+o,1,.1,F.bus)})}
  else{this.bell(f,t,Math.max(1,d*2),.17,F.bus);this.jing(t,.06,F.bus,F.nb);this.jing(t+.1,.05,F.bus,F.nb)}},
 loop(){clearTimeout(this.T);if(!this.on)return;if(!this.L&&typeof AC!=='undefined'&&AC){this.build();apply()}if(this.L&&!document.hidden&&prefs().music)this.tick();this.T=setTimeout(()=>this.loop(),120)},
 vol(m){if(!this.L||typeof AC==='undefined'||!AC)return;this.L.out.gain.setTargetAtTime(m&&this.on?.9:0,AC.currentTime,.8)},
 set(v){v=!!v;if(v===this.on)return;this.on=v;if(v){this.t=0;this.build();this.loop()}else clearTimeout(this.T);if(typeof AC!=='undefined'&&AC&&typeof music!=='undefined'&&music)apply()}};
function xmMus(v){if(typeof xmMu==='object')xmMu.set(v)}
