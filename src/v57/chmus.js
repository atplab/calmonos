/* ---------- Cherche et trouve : nappe flottante en ré, harpe lente et petites cloches qui tombent comme des flocons ---------- */
var chMu={on:false,L:null,T:0,s:0,t:0,rep:0,off:0,E:.42,
 /* 8 accords de 2 mesures (16 croches chacun) : Dmaj9, Gmaj7(#11), Bm9, Aadd9 … */
 CH:[[38,[57,62,64,66,69]],[43,[54,59,62,66,73]],[47,[54,57,61,62,66]],[45,[52,57,59,61,64]],[38,[57,62,64,66,69]],[43,[54,59,62,66,73]],[40,[52,55,59,62,66]],[45,[52,57,61,64,71]]],
 /* mélodie lente sur 16 mesures (par croches), beaucoup d’espace */
 MEL:[[[78,6],[76,2]],[[74,8]],[[0,4],[73,2],[74,2]],[[78,8]],[[81,6],[78,2]],[[76,8]],[[0,4],[74,2],[73,2]],[[71,8]],
  [[69,4],[74,4]],[[76,6],[78,2]],[[73,8]],[[0,8]],[[78,3],[76,1],[74,4]],[[71,4],[69,4]],[[73,6],[71,2]],[[69,8]]],
 mf(n){return 440*Math.pow(2,(n-69)/12)},
 build(){const a=typeof AC!=='undefined'?AC:null;if(!a||typeof mg==='undefined'||!mg||this.L)return;
  const out=a.createGain();out.gain.value=0;const warm=a.createBiquadFilter();warm.type='lowpass';warm.frequency.value=4200;warm.connect(out);out.connect(mg);
  /* deux échos croisés pour un espace large */
  const mk=(dt,fbv,w)=>{const d=a.createDelay(2),f=a.createGain(),l=a.createBiquadFilter(),g=a.createGain();d.delayTime.value=dt;f.gain.value=fbv;l.type='lowpass';l.frequency.value=2000;g.gain.value=w;d.connect(l);l.connect(f);f.connect(d);l.connect(g);g.connect(warm);return d};
  const d1=mk(this.E*3,.42,.4),d2=mk(this.E*5,.35,.3);
  const bus=a.createGain();bus.connect(warm);bus.connect(d1);bus.connect(d2);const dry=a.createGain();dry.connect(warm);
  /* nappe qui respire lentement */
  const pf=a.createBiquadFilter();pf.type='lowpass';pf.frequency.value=900;pf.Q.value=.5;const pg=a.createGain();pg.gain.value=1;pf.connect(pg);pg.connect(dry);
  const lf=a.createOscillator(),lg=a.createGain();lf.frequency.value=.06;lg.gain.value=380;lf.connect(lg);lg.connect(pf.frequency);lf.start();
  const M={};let st=0;this.MEL.forEach(bar=>bar.forEach(([m,d])=>{if(m)M[st]=[m,d];st+=d}));
  this.L={out,bus,dry,pf,M}},
 harp(f,t,v,bus,d=2.4){const a=AC;[[1,1,d],[2,.25,d*.5],[3,.07,d*.25]].forEach(([m,k,dd])=>{const o=a.createOscillator(),g=a.createGain();o.type=m===1?'triangle':'sine';o.frequency.value=f*m;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v*k,t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+dd);o.connect(g);g.connect(bus);o.start(t);o.stop(t+dd+.05)})},
 bell(f,t,v,bus){const a=AC;[[1,1,3],[2.76,.14,1],[5.4,.05,.4]].forEach(([m,k,d])=>{const o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.value=f*m;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v*k,t+.004);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(bus);o.start(t);o.stop(t+d+.05)})},
 pad(f,t,d,v,L){const a=AC;[-6,6].forEach(dt=>{const o=a.createOscillator(),g=a.createGain();o.type='sawtooth';o.frequency.value=f;o.detune.value=dt;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+d*.4);g.gain.linearRampToValueAtTime(.0001,t+d*1.1);o.connect(g);g.connect(L.pf);o.start(t);o.stop(t+d*1.15)})},
 bass(f,t,d,v,bus){const a=AC,o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+.3);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(bus);o.start(t);o.stop(t+d+.05)},
 tick(){const L=this.L,a=typeof AC!=='undefined'?AC:null;if(!L||!a)return;if(this.t<a.currentTime)this.t=a.currentTime+.12;
  while(this.t<a.currentTime+.6){const s=this.s,b=s>>3,c=(b>>1)%8,k=s%16,[r,T]=this.CH[c],t=this.t,E=this.E;
   if(k===0){T.slice(0,4).forEach(n=>this.pad(this.mf(n),t,E*16,.012,L));this.bass(this.mf(r),t,E*15,.13,L.dry)}
   /* harpe : arpège lent qui monte puis redescend */
   const ar=[0,2,4,1,3,4,2,1];if(k%2===0)this.harp(this.mf(T[ar[(k/2)%8]]),t+Math.random()*.02,k===0?.07:.045,L.bus);
   const m=L.M[s%128];if(m)this.harp(this.mf(m[0]),t,.09,L.bus,Math.min(4,m[1]*E+1.6));
   /* petites cloches éparses, toujours dans la gamme */
   if(k%4===3&&Math.random()<.22)this.bell(this.mf([81,83,85,86,88,90][Math.random()*6|0]),t,.03,L.bus);
   this.t+=E;this.s=(this.s+1)%128;if(this.s===0)this.rep++}},
 loop(){clearTimeout(this.T);if(!this.on)return;if(!this.L&&typeof AC!=='undefined'&&AC){this.build();apply()}if(this.L&&!document.hidden&&prefs().music)this.tick();this.T=setTimeout(()=>this.loop(),120)},
 vol(m){if(!this.L||typeof AC==='undefined'||!AC)return;this.L.out.gain.setTargetAtTime(m&&this.on?.9:0,AC.currentTime,1)},
 set(v){v=!!v;if(v===this.on)return;this.on=v;
  if(v){if(Date.now()-(this.off||0)>45000){this.s=0;this.rep=0;this.t=0}this.build();this.loop()}else{clearTimeout(this.T);this.off=Date.now()}
  if(typeof AC!=='undefined'&&AC&&typeof music!=='undefined'&&music)apply()}};
function chMus(v){if(typeof chMu==='object')chMu.set(v)}
