/* ---------- Échecs : pulsation douce et régulière (comme une pensée qui avance), kalimba feutrée, nappe sombre — pour se concentrer ---------- */
var ecMu={on:false,L:null,T:0,s:0,t:0,rep:0,off:0,E:.46,
 /* 4 accords de 4 mesures (8 croches par mesure) en ré dorien : Dm9 · Bbmaj7 · Gm9 · A7sus4 */
 CH:[[38,[50,57,60,64,69]],[34,[46,53,57,62,65]],[43,[43,50,55,58,62]],[45,[45,52,57,62,64]]],
 /* petit motif de 8 notes qui tourne (indices dans l’accord) */
 PAT:[0,2,3,2,4,3,2,1],
 /* grandes notes lentes au-dessus : [croche dans la boucle de 128, note, durée en croches] */
 MEL:[[0,81,12],[16,77,10],[32,74,12],[48,76,10],[64,77,12],[80,74,10],[96,72,12],[112,76,14]],
 mf(n){return 440*Math.pow(2,(n-69)/12)},
 build(){const a=typeof AC!=='undefined'?AC:null;if(!a||typeof mg==='undefined'||!mg||this.L)return;
  const out=a.createGain();out.gain.value=0;
  const warm=a.createBiquadFilter();warm.type='lowpass';warm.frequency.value=2200;warm.Q.value=.3;warm.connect(out);out.connect(mg);
  const mk=(dt,fbv,w)=>{const d=a.createDelay(3),f=a.createGain(),l=a.createBiquadFilter(),g=a.createGain();d.delayTime.value=dt;f.gain.value=fbv;l.type='lowpass';l.frequency.value=1400;g.gain.value=w;d.connect(l);l.connect(f);f.connect(d);l.connect(g);g.connect(warm);return d};
  const d1=mk(this.E*3,.36,.3),d2=mk(this.E*6,.3,.22);
  const bus=a.createGain();bus.connect(warm);bus.connect(d1);bus.connect(d2);const dry=a.createGain();dry.connect(warm);
  const M={};this.MEL.forEach(([s,m,d])=>{M[s]=[m,d]});
  this.L={out,bus,dry,M}},
 /* kalimba feutrée : attaque douce, petite brillance qui disparaît tout de suite */
 kal(f,t,v,bus){const a=AC;[[1,1,.9],[4,.07,.18],[2,.12,.5]].forEach(([m,k,d])=>{const o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.value=f*m;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v*k,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(bus);o.start(t);o.stop(t+d+.05)})},
 long(f,t,d,v,bus){const a=AC;[-4,4].forEach(dt=>{const o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.value=f;o.detune.value=dt;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+.6);g.gain.setTargetAtTime(v*.5,t+.8,1.2);g.gain.setTargetAtTime(.0001,t+d-.8,.5);o.connect(g);g.connect(bus);o.start(t);o.stop(t+d+1)})},
 pad(f,t,d,v,bus){const a=AC;[-5,5].forEach(dt=>{const o=a.createOscillator(),g=a.createGain();o.type='triangle';o.frequency.value=f;o.detune.value=dt;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+d*.4);g.gain.linearRampToValueAtTime(.0001,t+d*1.1);o.connect(g);g.connect(bus);o.start(t);o.stop(t+d*1.15)})},
 tick(){const L=this.L,a=typeof AC!=='undefined'?AC:null;if(!L||!a)return;if(this.t<a.currentTime)this.t=a.currentTime+.12;
  while(this.t<a.currentTime+.8){const s=this.s,c=(s>>5)%4,k=s%8,[r,T]=this.CH[c],t=this.t,E=this.E;
   if(s%32===0){T.slice(1,4).forEach(n=>this.pad(this.mf(n),t,E*32,.011,L.dry));this.long(this.mf(r),t,E*32,.15,L.dry)}
   /* pulsation régulière : le motif tourne sans jamais presser */
   this.kal(this.mf(T[this.PAT[k]]+(k%4===3?12:0)),t,k===0?.065:.04,L.bus);
   const m=L.M[s];if(m)this.long(this.mf(m[0]),t,m[1]*E,.045,L.bus);
   this.t+=E;this.s=(this.s+1)%128;if(this.s===0)this.rep++}},
 loop(){clearTimeout(this.T);if(!this.on)return;if(!this.L&&typeof AC!=='undefined'&&AC){this.build();apply()}if(this.L&&!document.hidden&&prefs().music)this.tick();this.T=setTimeout(()=>this.loop(),120)},
 vol(m){if(!this.L||typeof AC==='undefined'||!AC)return;this.L.out.gain.setTargetAtTime(m&&this.on?.9:0,AC.currentTime,1)},
 set(v){v=!!v;if(v===this.on)return;this.on=v;
  if(v){if(Date.now()-(this.off||0)>45000){this.s=0;this.rep=0;this.t=0}this.build();this.loop()}else{clearTimeout(this.T);this.off=Date.now()}
  if(typeof AC!=='undefined'&&AC&&typeof music!=='undefined'&&music)apply()}};
function ecMus(v){if(typeof ecMu==='object')ecMu.set(v)}
