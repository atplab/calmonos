/* ---------- Échecs : lo-fi chillhop piano électrique, basse ronde, batterie feutrée ---------- */
var lfMu={on:false,L:null,T:0,s:0,t:0,rep:0,off:0,E:.2027,
 /* 8 mesures de 16 doubles-croches (≈74 bpm) : Dm9 · G13 · Cmaj9 · Am9 · Fmaj9 · Em7 · Dm7 · G13 */
 CH:[[38,[60,64,65,69,72]],[43,[59,65,69,76]],[36,[59,64,67,74]],[45,[60,64,67,71]],[41,[64,67,69,72]],[40,[55,59,62,67]],[38,[60,65,69,72]],[43,[59,65,69,76]]],
 /* mélodie paresseuse en ré mineur pentatonique : [mesure, pas, note, durée en pas] */
 MEL:[[0,2,81,3],[0,6,79,2],[0,10,77,4],[1,2,79,3],[1,8,81,2],[1,12,84,3],[2,2,83,4],[2,10,79,2],[2,13,76,3],[3,0,76,3],[3,6,79,3],[3,12,81,4],
  [4,2,84,3],[4,8,81,3],[4,12,79,3],[5,2,79,4],[5,10,76,2],[5,13,79,3],[6,0,77,3],[6,6,81,2],[6,10,84,4],[7,2,83,3],[7,8,81,2],[7,12,77,4]],
 mf(n){return 440*Math.pow(2,(n-69)/12)},
 build(){const a=typeof AC!=='undefined'?AC:null;if(!a||typeof mg==='undefined'||!mg||this.L)return;
  const out=a.createGain();out.gain.value=0;
  /* son de cassette : on arrondit les aigus */
  const tape=a.createBiquadFilter();tape.type='lowpass';tape.frequency.value=3600;tape.Q.value=.4;tape.connect(out);out.connect(mg);
  const dl=a.createDelay(1),fb=a.createGain(),lp=a.createBiquadFilter(),wet=a.createGain();dl.delayTime.value=this.E*6;fb.gain.value=.3;lp.type='lowpass';lp.frequency.value=1800;wet.gain.value=.35;dl.connect(lp);lp.connect(fb);fb.connect(dl);lp.connect(wet);wet.connect(tape);
  const bus=a.createGain();bus.connect(tape);bus.connect(dl);const dry=a.createGain();dry.connect(tape);
  const n=a.sampleRate*2,nb=a.createBuffer(1,n,a.sampleRate),nd=nb.getChannelData(0);for(let i=0;i<n;i++)nd[i]=Math.random()*2-1;
  const M={};this.MEL.forEach(([b,k,m,d])=>{M[b*16+k]=[m,d]});
  this.L={out,bus,dry,nb,M}},
 /* piano électrique : corps rond + petite cloche qui s’éteint vite */
 rh(f,t,d,v,bus){const a=AC;[[1,1,'sine',0],[2,.22,'sine',0],[1,.3,'triangle',6],[4,.05,'sine',0]].forEach(([m,k,ty,dt])=>{const o=a.createOscillator(),g=a.createGain();o.type=ty;o.frequency.value=f*m;o.detune.value=dt;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v*k,t+.01);g.gain.exponentialRampToValueAtTime(v*k*.4,t+.35);g.gain.exponentialRampToValueAtTime(.0001,t+d+.4);o.connect(g);g.connect(bus);o.start(t);o.stop(t+d+.45)})},
 bass(f,t,d,v,bus){const a=AC,o=a.createOscillator(),g=a.createGain(),lp=a.createBiquadFilter();o.type='triangle';o.frequency.value=f;lp.type='lowpass';lp.frequency.value=380;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(lp);lp.connect(g);g.connect(bus);o.start(t);o.stop(t+d+.05)},
 kick(t,v,bus){const a=AC,o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.setValueAtTime(110,t);o.frequency.exponentialRampToValueAtTime(42,t+.16);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+.24);o.connect(g);g.connect(bus);o.start(t);o.stop(t+.26)},
 snare(t,v,bus,nb){const a=AC,s=a.createBufferSource(),bp=a.createBiquadFilter(),g=a.createGain();s.buffer=nb;bp.type='bandpass';bp.frequency.value=1700;bp.Q.value=.7;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.004);g.gain.exponentialRampToValueAtTime(.0001,t+.16);s.connect(bp);bp.connect(g);g.connect(bus);s.start(t,Math.random());s.stop(t+.2)},
 hat(t,v,bus,nb){const a=AC,s=a.createBufferSource(),hp=a.createBiquadFilter(),g=a.createGain();s.buffer=nb;hp.type='highpass';hp.frequency.value=5000;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v*.6,t+.003);g.gain.exponentialRampToValueAtTime(.0001,t+.05);s.connect(hp);hp.connect(g);g.connect(bus);s.start(t,Math.random());s.stop(t+.08)},
 crackle(t,bus,nb){const a=AC,s=a.createBufferSource(),hp=a.createBiquadFilter(),g=a.createGain();s.buffer=nb;hp.type='highpass';hp.frequency.value=3000;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.012+Math.random()*.012,t+.001);g.gain.exponentialRampToValueAtTime(.0001,t+.012);s.connect(hp);hp.connect(g);g.connect(bus);s.start(t,Math.random());s.stop(t+.02)},
 tick(){const L=this.L,a=typeof AC!=='undefined'?AC:null;if(!L||!a)return;if(this.t<a.currentTime)this.t=a.currentTime+.12;
  while(this.t<a.currentTime+.5){const s=this.s,b=s>>4,k=s%16,[r,T]=this.CH[b],E=this.E,sw=(k%2)?E*.28:0,t=this.t+sw,pause=this.rep%4===3,even=this.rep%2===0;
   /* accords : un grand au temps 1, puis deux petits contretemps */
   const cd=(v,d)=>T.forEach((n,i)=>this.rh(this.mf(n),t+i*.012,d,v,L.bus));
   if(k===0)cd(.05,E*7);else if(k===7)cd(.028,E*3);else if(k===10&&!pause)cd(.026,E*4);
   /* basse ronde */
   if(k===0)this.bass(this.mf(r),t,E*5,.2,L.dry);else if(k===10)this.bass(this.mf(r+7),t,E*3,.12,L.dry);else if(k===14&&even)this.bass(this.mf(r+12),t,E*2,.08,L.dry);
   /* batterie feutrée (se tait un tour sur quatre) */
   if(!pause){if(k===0||k===10)this.kick(t,k===0?.3:.2,L.dry);if(k===4||k===12)this.snare(t,.07,L.dry,L.nb);if(k%2===0)this.hat(t,k%4===0?.022:.014,L.dry,L.nb)}
   /* mélodie : un tour sur deux, comme une pensée */
   const m=L.M[s];if(m&&even)this.rh(this.mf(m[0]),t,m[1]*E,.045,L.bus);
   this.t+=E;this.s=(this.s+1)%128;if(this.s===0)this.rep++}},
 loop(){clearTimeout(this.T);if(!this.on)return;if(!this.L&&typeof AC!=='undefined'&&AC){this.build();apply()}if(this.L&&!document.hidden&&prefs().music)this.tick();this.T=setTimeout(()=>this.loop(),110)},
 vol(m){if(!this.L||typeof AC==='undefined'||!AC)return;this.L.out.gain.setTargetAtTime(m&&this.on?.9:0,AC.currentTime,.8)},
 set(v){v=!!v;if(v===this.on)return;this.on=v;
  if(v){if(Date.now()-(this.off||0)>45000){this.s=0;this.rep=0;this.t=0}this.build();this.loop()}else{clearTimeout(this.T);this.off=Date.now()}
  if(typeof AC!=='undefined'&&AC&&typeof music!=='undefined'&&music)apply()}};
function lfMus(v){if(typeof lfMu==='object')lfMu.set(v)}
