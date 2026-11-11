/* ---------- Échecs : piano feutré très lent, nappe chaude et notes espacées — concentration et patience, sans batterie ni bruit ---------- */
var lfMu={on:false,L:null,T:0,s:0,t:0,rep:0,off:0,E:.6,
 /* 8 accords de 2 mesures (16 temps de .6 s chacun) : Am9 · Fmaj7 · Cmaj9 · G6 · Dm9 · Fmaj7 · Em7 · Am9 */
 CH:[[33,[57,60,64,67,71]],[29,[57,60,64,69]],[36,[55,60,64,67,71]],[31,[55,59,62,66,69]],[38,[57,60,64,65,69]],[29,[57,60,64,69]],[28,[55,59,62,67]],[33,[57,60,64,67,71]]],
 /* mélodie rare, avec de longs silences : [temps dans la boucle de 128, note, durée en temps] */
 MEL:[[4,76,6],[14,72,4],[22,74,8],[34,72,5],[44,69,6],[52,71,8],[66,76,6],[76,79,5],[84,76,8],[98,74,5],[106,72,6],[114,71,5],[122,69,6]],
 mf(n){return 440*Math.pow(2,(n-69)/12)},
 build(){const a=typeof AC!=='undefined'?AC:null;if(!a||typeof mg==='undefined'||!mg||this.L)return;
  const out=a.createGain();out.gain.value=0;
  const warm=a.createBiquadFilter();warm.type='lowpass';warm.frequency.value=2600;warm.Q.value=.3;warm.connect(out);out.connect(mg);
  /* deux échos lents et sombres pour l’espace */
  const mk=(dt,fbv,w)=>{const d=a.createDelay(3),f=a.createGain(),l=a.createBiquadFilter(),g=a.createGain();d.delayTime.value=dt;f.gain.value=fbv;l.type='lowpass';l.frequency.value=1500;g.gain.value=w;d.connect(l);l.connect(f);f.connect(d);l.connect(g);g.connect(warm);return d};
  const d1=mk(this.E*3,.38,.34),d2=mk(this.E*5,.3,.26);
  const bus=a.createGain();bus.connect(warm);bus.connect(d1);bus.connect(d2);const dry=a.createGain();dry.connect(warm);
  const M={};this.MEL.forEach(([s,m,d])=>{M[s]=[m,d]});
  this.L={out,bus,dry,M}},
 /* piano feutré : son rond, attaque douce, longue extinction */
 pno(f,t,d,v,bus){const a=AC;[[1,1,'sine'],[2,.16,'sine'],[3,.04,'sine'],[1,.2,'triangle']].forEach(([m,k,ty],i)=>{const o=a.createOscillator(),g=a.createGain();o.type=ty;o.frequency.value=f*m;if(i===3)o.detune.value=4;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v*k,t+.025);g.gain.exponentialRampToValueAtTime(v*k*.35,t+.7);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(bus);o.start(t);o.stop(t+d+.05)})},
 pad(f,t,d,v,bus){const a=AC;[-5,5].forEach(dt=>{const o=a.createOscillator(),g=a.createGain();o.type='triangle';o.frequency.value=f;o.detune.value=dt;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+d*.45);g.gain.linearRampToValueAtTime(.0001,t+d*1.1);o.connect(g);g.connect(bus);o.start(t);o.stop(t+d*1.15)})},
 bass(f,t,d,v,bus){const a=AC,o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+.4);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(bus);o.start(t);o.stop(t+d+.05)},
 tick(){const L=this.L,a=typeof AC!=='undefined'?AC:null;if(!L||!a)return;if(this.t<a.currentTime)this.t=a.currentTime+.12;
  while(this.t<a.currentTime+.8){const s=this.s,c=(s>>4)%8,k=s%16,[r,T]=this.CH[c],t=this.t,E=this.E;
   if(k===0){T.slice(0,4).forEach(n=>this.pad(this.mf(n-12),t,E*16,.01,L.dry));this.bass(this.mf(r),t,E*14,.16,L.dry)}
   /* arpège très lent : quelques notes seulement, chacune a le temps de s’éteindre */
   const ar={0:0,5:2,9:1,12:3};if(k in ar)this.pno(this.mf(T[ar[k]%T.length]),t,E*6,k===0?.06:.04,L.bus);
   const m=L.M[s];if(m)this.pno(this.mf(m[0]),t,m[1]*E+1,.07,L.bus);
   this.t+=E;this.s=(this.s+1)%128;if(this.s===0)this.rep++}},
 loop(){clearTimeout(this.T);if(!this.on)return;if(!this.L&&typeof AC!=='undefined'&&AC){this.build();apply()}if(this.L&&!document.hidden&&prefs().music)this.tick();this.T=setTimeout(()=>this.loop(),120)},
 vol(m){if(!this.L||typeof AC==='undefined'||!AC)return;this.L.out.gain.setTargetAtTime(m&&this.on?.9:0,AC.currentTime,1)},
 set(v){v=!!v;if(v===this.on)return;this.on=v;
  if(v){if(Date.now()-(this.off||0)>45000){this.s=0;this.rep=0;this.t=0}this.build();this.loop()}else{clearTimeout(this.T);this.off=Date.now()}
  if(typeof AC!=='undefined'&&AC&&typeof music!=='undefined'&&music)apply()}};
function lfMus(v){if(typeof lfMu==='object')lfMu.set(v)}
