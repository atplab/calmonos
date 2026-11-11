/* ---------- Échecs : pièce classique en ré mineur — arpèges de piano à la manière baroque, basse noble, chant de violon lent ---------- */
var ecMu={on:false,L:null,T:0,s:0,t:0,rep:0,off:0,E:.4,
 /* 16 mesures de 8 croches : [basse, notes de l’accord] */
 CH:[[38,[57,62,65,69,74]],[34,[58,62,67,70,74]],[33,[57,61,64,67,73]],[38,[57,62,65,69,74]],[41,[57,60,65,69,72]],[34,[58,62,65,70,74]],[31,[58,62,65,67,70]],[33,[57,61,64,69,73]],
  [38,[57,62,65,69,74]],[37,[57,61,64,69,73]],[41,[57,62,65,69,74]],[31,[58,62,67,70,74]],[40,[60,64,67,70,76]],[41,[57,60,65,69,72]],[33,[57,61,64,67,73]],[38,[57,62,65,69,74]]],
 PAT:[0,1,2,3,4,3,2,1],
 /* chant lent : [mesure, croche, note, durée en croches] */
 MEL:[[0,0,81,8],[1,0,82,4],[1,4,81,4],[2,0,79,4],[2,4,76,4],[3,0,77,6],[3,6,74,2],[4,0,77,4],[4,4,81,4],[5,0,82,6],[5,6,79,2],[6,0,82,4],[6,4,79,4],[7,0,81,4],[7,4,85,4],
  [8,0,86,8],[9,0,85,4],[9,4,81,4],[10,0,81,4],[10,4,77,4],[11,0,79,4],[11,4,82,4],[12,0,76,4],[12,4,79,4],[13,0,81,6],[13,6,77,2],[14,0,76,4],[14,4,73,4],[15,0,74,8]],
 mf(n){return 440*Math.pow(2,(n-69)/12)},
 build(){const a=typeof AC!=='undefined'?AC:null;if(!a||typeof mg==='undefined'||!mg||this.L)return;
  const out=a.createGain();out.gain.value=0;
  const warm=a.createBiquadFilter();warm.type='lowpass';warm.frequency.value=3000;warm.Q.value=.3;warm.connect(out);out.connect(mg);
  /* résonance de salle : deux échos longs et sombres */
  const mk=(dt,fbv,w)=>{const d=a.createDelay(3),f=a.createGain(),l=a.createBiquadFilter(),g=a.createGain();d.delayTime.value=dt;f.gain.value=fbv;l.type='lowpass';l.frequency.value=1700;g.gain.value=w;d.connect(l);l.connect(f);f.connect(d);l.connect(g);g.connect(warm);return d};
  const d1=mk(.37,.4,.3),d2=mk(.61,.34,.24);
  const bus=a.createGain();bus.connect(warm);bus.connect(d1);bus.connect(d2);const dry=a.createGain();dry.connect(warm);
  const M={};this.MEL.forEach(([b,k,m,d])=>{M[b*8+k]=[m,d]});
  this.L={out,bus,dry,M}},
 /* piano : attaque nette mais douce, harmoniques claires, extinction naturelle */
 pno(f,t,d,v,bus){const a=AC;[[1,1,'triangle'],[2,.18,'sine'],[3,.06,'sine'],[4,.02,'sine']].forEach(([m,k,ty],i)=>{const o=a.createOscillator(),g=a.createGain();o.type=ty;o.frequency.value=f*m;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v*k,t+.008);g.gain.exponentialRampToValueAtTime(v*k*.3,t+.5);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(bus);o.start(t);o.stop(t+d+.05)})},
 /* violon doux : attaque lente, léger vibrato */
 vln(f,t,d,v,bus){const a=AC,o=a.createOscillator(),o2=a.createOscillator(),g=a.createGain(),lp=a.createBiquadFilter(),lf=a.createOscillator(),lg=a.createGain();o.type='sawtooth';o2.type='sine';o.frequency.value=f;o2.frequency.value=f;lp.type='lowpass';lp.frequency.value=1500;lp.Q.value=.5;
  lf.frequency.value=5;lg.gain.value=f*.006;lf.connect(lg);lg.connect(o.frequency);lg.connect(o2.frequency);
  g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+.25);g.gain.setTargetAtTime(v*.75,t+.4,.6);g.gain.setTargetAtTime(.0001,t+d-.25,.18);
  o.connect(lp);o2.connect(lp);lp.connect(g);g.connect(bus);[o,o2,lf].forEach(x=>{x.start(t);x.stop(t+d+.6)})},
 bass(f,t,d,v,bus){const a=AC,o=a.createOscillator(),g=a.createGain(),lp=a.createBiquadFilter();o.type='triangle';o.frequency.value=f;lp.type='lowpass';lp.frequency.value=420;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.03);g.gain.exponentialRampToValueAtTime(v*.5,t+d*.5);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(lp);lp.connect(g);g.connect(bus);o.start(t);o.stop(t+d+.05)},
 tick(){const L=this.L,a=typeof AC!=='undefined'?AC:null;if(!L||!a)return;if(this.t<a.currentTime)this.t=a.currentTime+.12;
  while(this.t<a.currentTime+.8){const s=this.s,b=(s>>3)%16,k=s%8,[r,T]=this.CH[b],t=this.t+(k?Math.random()*.01:0),E=this.E;
   if(k===0)this.bass(this.mf(r),t,E*8,.15,L.dry);
   /* arpège régulier, comme un prélude : chaque note à son tour */
   this.pno(this.mf(T[this.PAT[k]]),t,E*5,k===0?.055:k%2?.028:.036,L.bus);
   const m=L.M[s];if(m)this.vln(this.mf(m[0]),t,m[1]*E,.03,L.bus);
   this.t+=E;this.s=(this.s+1)%128;if(this.s===0)this.rep++}},
 loop(){clearTimeout(this.T);if(!this.on)return;if(!this.L&&typeof AC!=='undefined'&&AC){this.build();apply()}if(this.L&&!document.hidden&&prefs().music)this.tick();this.T=setTimeout(()=>this.loop(),120)},
 vol(m){if(!this.L||typeof AC==='undefined'||!AC)return;this.L.out.gain.setTargetAtTime(m&&this.on?.9:0,AC.currentTime,1)},
 set(v){v=!!v;if(v===this.on)return;this.on=v;
  if(v){if(Date.now()-(this.off||0)>45000){this.s=0;this.rep=0;this.t=0}this.build();this.loop()}else{clearTimeout(this.T);this.off=Date.now()}
  if(typeof AC!=='undefined'&&AC&&typeof music!=='undefined'&&music)apply()}};
function ecMus(v){if(typeof ecMu==='object')ecMu.set(v)}
