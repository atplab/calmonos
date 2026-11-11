/* ---------- Casse-briques : valse-marche enneigée en sol majeur, célesta et glockenspiel, basse pizzicato, petits carillons (aucun bruit blanc) ---------- */
var bkMu={on:false,L:null,T:0,s:0,t:0,rep:0,off:0,E:.25,
 /* 8 accords de 2 mesures (16 croches) : G · Em7 · Cmaj7 · D · G/B · Am7 · Cmaj7 · D */
 CH:[[43,[67,71,74,79]],[40,[64,67,71,74]],[36,[60,64,67,71]],[38,[62,66,69,74]],[47,[62,67,71,74]],[45,[64,67,69,72]],[36,[60,64,67,71]],[38,[62,66,69,74]]],
 PH:[[[0,79,2],[2,83,1],[3,86,1],[4,83,2],[8,81,2],[10,79,2],[12,83,3]],[[0,79,2],[2,81,1],[3,83,1],[4,86,3],[8,83,2],[10,81,2],[12,79,3]],[[0,84,2],[2,83,1],[3,79,1],[4,76,2],[6,79,2],[8,83,2],[12,84,3]],[[0,81,2],[2,78,1],[3,81,1],[4,86,3],[8,85,2],[10,81,2],[12,78,3]],
  [[0,83,2],[2,86,1],[3,88,1],[4,86,2],[6,83,2],[8,79,2],[12,83,3]],[[0,84,2],[2,81,1],[3,84,1],[4,88,3],[8,86,2],[10,84,2],[12,81,3]],[[0,84,2],[2,86,1],[3,88,1],[4,91,3],[8,88,2],[10,86,2],[12,84,3]],[[0,86,3],[4,85,1],[5,86,1],[6,90,2],[8,86,4],[12,81,3],[14,86,2]]],
 mf(n){return 440*Math.pow(2,(n-69)/12)},
 build(){const a=typeof AC!=='undefined'?AC:null;if(!a||typeof mg==='undefined'||!mg||this.L)return;
  const out=a.createGain();out.gain.value=0;
  const warm=a.createBiquadFilter();warm.type='lowpass';warm.frequency.value=4800;warm.Q.value=.3;warm.connect(out);out.connect(mg);
  const dl=a.createDelay(1),fb=a.createGain(),lp=a.createBiquadFilter(),wet=a.createGain();dl.delayTime.value=this.E*3;fb.gain.value=.3;lp.type='lowpass';lp.frequency.value=2800;wet.gain.value=.3;dl.connect(lp);lp.connect(fb);fb.connect(dl);lp.connect(wet);wet.connect(warm);
  const bus=a.createGain();bus.connect(warm);bus.connect(dl);const dry=a.createGain();dry.connect(warm);
  const M={};this.PH.forEach((ph,c)=>ph.forEach(([k,m,d])=>{M[c*16+k]=[m,d]}));
  this.L={out,bus,dry,M}},
 /* célesta / glockenspiel : cloche claire qui s’éteint vite */
 gl(f,t,d,v,bus){const a=AC;[[1,1,d+.5],[2.76,.12,.3],[5.4,.04,.12]].forEach(([m,k,dd])=>{const o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.value=f*m;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v*k,t+.004);g.gain.exponentialRampToValueAtTime(.0001,t+dd);o.connect(g);g.connect(bus);o.start(t);o.stop(t+dd+.05)})},
 pz(f,t,d,v,bus){const a=AC,o=a.createOscillator(),g=a.createGain(),lp=a.createBiquadFilter();o.type='triangle';o.frequency.value=f;lp.type='lowpass';lp.frequency.value=1500;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(lp);lp.connect(g);g.connect(bus);o.start(t);o.stop(t+d+.05)},
 tok(t,v,bus){const a=AC,o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.setValueAtTime(1100,t);o.frequency.exponentialRampToValueAtTime(700,t+.04);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.003);g.gain.exponentialRampToValueAtTime(.0001,t+.06);o.connect(g);g.connect(bus);o.start(t);o.stop(t+.08)},
 tick(){const L=this.L,a=typeof AC!=='undefined'?AC:null;if(!L||!a)return;if(this.t<a.currentTime)this.t=a.currentTime+.12;
  while(this.t<a.currentTime+.5){const s=this.s,c=(s>>4)%8,j=s%8,[r,T]=this.CH[c],t=this.t,E=this.E;
   /* « oum-pa » sautillant : basse pizzicato, puis petits accords staccato */
   if(j===0)this.pz(this.mf(r),t,E*3,.2,L.dry);else if(j===4)this.pz(this.mf(r+7),t,E*2,.13,L.dry);else if(j===6)this.pz(this.mf(r+12),t,E*1.2,.07,L.dry);
   if(j===2||j===5)T.slice(0,3).forEach((n,i)=>this.pz(this.mf(n-12),t+i*.006,E*1.1,.03,L.bus));
   if(j===2||j===6)this.tok(t,.016,L.dry);
   const m=L.M[s];if(m)this.gl(this.mf(m[0]),t,m[1]*E,.075,L.bus);
   /* petits carillons de neige, éparpillés dans l’accord */
   if(j===7&&Math.random()<.4)this.gl(this.mf(T[Math.random()*4|0]+24),t,.3,.025,L.bus);
   this.t+=E;this.s=(this.s+1)%128;if(this.s===0)this.rep++}},
 loop(){clearTimeout(this.T);if(!this.on)return;if(!this.L&&typeof AC!=='undefined'&&AC){this.build();apply()}if(this.L&&!document.hidden&&prefs().music)this.tick();this.T=setTimeout(()=>this.loop(),110)},
 vol(m){if(!this.L||typeof AC==='undefined'||!AC)return;this.L.out.gain.setTargetAtTime(m&&this.on?.9:0,AC.currentTime,.6)},
 set(v){v=!!v;if(v===this.on)return;this.on=v;
  if(v){if(Date.now()-(this.off||0)>45000){this.s=0;this.rep=0;this.t=0}this.build();this.loop()}else{clearTimeout(this.T);this.off=Date.now()}
  if(typeof AC!=='undefined'&&AC&&typeof music!=='undefined'&&music)apply()}};
function bkMus(v){if(typeof bkMu==='object')bkMu.set(v)}
