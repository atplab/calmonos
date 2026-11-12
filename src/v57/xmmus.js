/* ---------- Niveaux de Noël : mélodie lumineuse et paisible au célesta, harpe douce, nappes ouvertes et grelots légers ---------- */
var xmMu={on:false,L:null,T:0,s:0,t:0,
 /* 16 mesures en sol majeur ; chaque mesure = 8 croches */
 CH:[[43,[55,59,62,67,71,74]],[40,[52,55,59,64,67,71]],[48,[60,64,67,72,76,79]],[50,[57,62,66,69,74,78]],[43,[55,59,62,67,71,74]],[40,[52,55,59,64,67,71]],[48,[60,64,67,72,76,79]],[50,[57,62,66,69,74,78]],[40,[52,55,59,64,67,71]],[48,[60,64,67,72,76,79]],[43,[55,59,62,67,71,74]],[50,[57,62,66,69,74,78]],[48,[60,64,67,72,76,79]],[43,[55,59,62,67,71,74]],[45,[57,60,64,69,72,76]],[50,[57,62,66,69,74,78]]],
 MEL:[[[71,2],[74,2],[79,3],[76,1]],[[74,2],[71,2],[76,4]],[[76,2],[79,2],[76,2],[72,2]],[[74,4],[69,2],[71,2]],
  [[71,2],[74,2],[79,3],[81,1]],[[83,3],[79,1],[76,4]],[[79,2],[76,2],[74,2],[72,2]],[[74,6],[0,2]],
  [[76,2],[79,2],[83,4]],[[81,2],[79,2],[76,4]],[[74,2],[79,2],[83,3],[81,1]],[[78,4],[81,2],[78,2]],
  [[79,2],[76,2],[79,4]],[[83,2],[79,2],[74,4]],[[76,2],[72,2],[71,2],[69,2]],[[74,4],[69,2],[74,2]]],
 PAT:[0,1,2,3,2,1,3,2],E:.34,
 mf(n){return 440*Math.pow(2,(n-69)/12)},
 build(){const a=typeof AC!=='undefined'?AC:null;if(!a||typeof mg==='undefined'||!mg||this.L)return;
  const out=a.createGain();out.gain.value=0;out.connect(mg);
  const dl=a.createDelay(1.2),fb=a.createGain(),lp=a.createBiquadFilter(),wet=a.createGain();dl.delayTime.value=.34;fb.gain.value=.34;lp.type='lowpass';lp.frequency.value=3200;wet.gain.value=.42;
  dl.connect(lp);lp.connect(fb);fb.connect(dl);lp.connect(wet);wet.connect(out);
  const bus=a.createGain();bus.connect(out);bus.connect(dl);
  const n=a.sampleRate*.4,nb=a.createBuffer(1,n,a.sampleRate),nd=nb.getChannelData(0);for(let i=0;i<n;i++)nd[i]=Math.random()*2-1;
  const M={};let st=0;this.MEL.forEach(bar=>bar.forEach(([m,d])=>{if(m)M[st]=[m,d];st+=d}));
  this.L={out,bus,nb,M}},
 /* célesta / boîte à musique */
 cel(f,t,d,v,bus){const a=AC;[[1,1],[2,.3],[4.01,.09]].forEach(([m,k])=>{const o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.value=f*m;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v*k,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+d/m**.35);o.connect(g);g.connect(bus);o.start(t);o.stop(t+d+.1)})},
 /* kalimba : une note ronde et courte, pour les touches */
 kal(f,t,v,bus,L=.5){const a=AC;[[1,1,L],[5.4,.07,.07]].forEach(([m,k,d])=>{const o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.value=f*m;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v*k,t+.002);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(bus);o.start(t);o.stop(t+d+.05)})},
 /* harpe douce */
 harp(f,t,v,bus){const a=AC,o=a.createOscillator(),g=a.createGain(),lp=a.createBiquadFilter();o.type='triangle';o.frequency.value=f;lp.type='lowpass';lp.frequency.value=2200;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+1.1);o.connect(lp);lp.connect(g);g.connect(bus);o.start(t);o.stop(t+1.2)},
 /* nappe : s'ouvre et se referme doucement */
 pad(f,t,d,v,bus){const a=AC,o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+d*.35);g.gain.linearRampToValueAtTime(.0001,t+d*1.25);o.connect(g);g.connect(bus);o.start(t);o.stop(t+d*1.3)},
 jing(t,v,bus,nb){const a=AC,s=a.createBufferSource(),bp=a.createBiquadFilter(),g=a.createGain();s.buffer=nb;s.playbackRate.value=1+Math.random()*.2;bp.type='bandpass';bp.frequency.value=6800+Math.random()*1500;bp.Q.value=2.2;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+.14);s.connect(bp);bp.connect(g);g.connect(bus);s.start(t);s.stop(t+.2)},
 tick(){const L=this.L,a=typeof AC!=='undefined'?AC:null;if(!L||!a)return;if(this.t<a.currentTime)this.t=a.currentTime+.12;
  while(this.t<a.currentTime+.4){const s=this.s,b=(s>>3)%16,k=s%8,[r,T]=this.CH[b],t=this.t,E=this.E;
   if(k===0){[T[0],T[2],T[3]].forEach((n,i)=>this.pad(this.mf(n-12),t,E*8,.03,L.bus));this.harp(this.mf(r),t,.1,L.bus)}
   if(k===4)this.harp(this.mf(r+7),t,.06,L.bus);
   this.harp(this.mf(T[this.PAT[k]]),t,k===0?.05:.035,L.bus);
   const m=L.M[s];if(m)this.cel(this.mf(m[0]),t,Math.min(2.2,m[1]*E+1),.13,L.bus);
   if(k===2||k===6)this.jing(t,.035,L.bus,L.nb);
   if(k===5&&Math.random()<.35)this.cel(this.mf(T[4+Math.floor(Math.random()*2)]+12),t,1.4,.04,L.bus);
   this.t+=E;this.s=(this.s+1)%128}},
 /* effets : de petites notes claires et joyeuses, toujours dans la gamme pentatonique */
 sn(f){const m=Math.round(69+12*Math.log2(f/440)),P=[7,9,11,2,4];let b=m,bd=99;for(let d=-3;d<=3;d++){if(P.includes(((m+d)%12+12)%12)&&Math.abs(d)<bd){bd=Math.abs(d);b=m+d}}while(b<67)b+=12;while(b>88)b-=12;return b},
 fx(f,d){const a=AC;if(!a||!mg)return;if(!this.F){const bus=a.createGain(),dl=a.createDelay(1),fb=a.createGain(),lp=a.createBiquadFilter(),wet=a.createGain();dl.delayTime.value=.22;fb.gain.value=.28;lp.type='lowpass';lp.frequency.value=3200;wet.gain.value=.38;bus.connect(mg);bus.connect(dl);dl.connect(lp);lp.connect(fb);fb.connect(dl);lp.connect(wet);wet.connect(mg);
   const n=a.sampleRate*.4,nb=a.createBuffer(1,n,a.sampleRate),nd=nb.getChannelData(0);for(let i=0;i<n;i++)nd[i]=Math.random()*2-1;this.F={bus,nb}}
  const F=this.F,t=a.currentTime,n=this.sn(f);
  if(d<.22){this.kal(this.mf(n),t,.08,F.bus,.2)}
  else if(d>=.6){[0,4,7,12].forEach((o,k)=>this.cel(this.mf(this.sn(this.mf(n+o))),t+k*.09,1.4,.14,F.bus));this.jing(t+.3,.05,F.bus,F.nb)}
  else{this.kal(this.mf(n),t,.09,F.bus,.24)}},
 loop(){clearTimeout(this.T);if(!this.on)return;if(!this.L&&typeof AC!=='undefined'&&AC){this.build();apply()}if(this.L&&!document.hidden&&prefs().music)this.tick();this.T=setTimeout(()=>this.loop(),120)},
 vol(m){if(!this.L||typeof AC==='undefined'||!AC)return;this.L.out.gain.setTargetAtTime(m&&this.on?.9:0,AC.currentTime,.8)},
 set(v){v=!!v;if(v===this.on)return;this.on=v;if(v){this.t=0;this.s=0;this.build();this.loop()}else clearTimeout(this.T);if(typeof AC!=='undefined'&&AC&&typeof music!=='undefined'&&music)apply()}};
function xmMus(v){if(typeof xmMu!=='object')return;xmMu.want=!!v;xmMu.set(!!v&&!(typeof PLK!=='undefined'&&PLK&&!PLPA))}
