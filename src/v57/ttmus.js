/* ---------- Tèconta : petite valse de neige en la mineur, couleur folklorique russe, au synthé doux, basse pincée et cloches ---------- */
var ttMu={on:false,L:null,T:0,s:0,t:0,rep:0,
 /* 16 mesures ; chaque mesure = 8 croches */
 CH:[[45,[57,60,64,69,72,76]],[45,[57,60,64,69,72,76]],[40,[56,59,64,68,71,76]],[40,[56,59,64,68,71,76]],[45,[57,60,64,69,72,76]],[38,[57,62,65,69,74,77]],[40,[56,59,64,68,71,76]],[45,[57,60,64,69,72,76]],
  [41,[57,60,65,69,72,77]],[48,[55,60,64,67,72,76]],[38,[57,62,65,69,74,77]],[40,[56,59,64,68,71,76]],[45,[57,60,64,69,72,76]],[38,[57,62,65,69,74,77]],[40,[56,59,64,68,71,76]],[45,[57,60,64,69,72,76]]],
 MEL:[[[76,3],[72,1],[74,2],[71,2]],[[72,2],[69,2],[69,2],[72,2]],[[71,3],[68,1],[71,2],[74,2]],[[76,2],[74,2],[71,4]],
  [[72,3],[76,1],[81,2],[79,1],[77,1]],[[77,3],[74,1],[77,2],[76,2]],[[74,2],[71,2],[68,2],[71,2]],[[69,6],[0,2]],
  [[77,3],[81,1],[79,2],[77,2]],[[76,3],[72,1],[76,2],[74,2]],[[74,2],[77,2],[81,3],[79,1]],[[80,4],[76,4]],
  [[81,2],[76,2],[72,2],[76,2]],[[77,3],[74,1],[77,2],[81,2]],[[80,2],[76,2],[74,2],[71,2]],[[69,4],[0,4]]],
 PAT:[0,2,1,3,2,4,3,2],E:.25,
 mf(n){return 440*Math.pow(2,(n-69)/12)},
 build(){const a=typeof AC!=='undefined'?AC:null;if(!a||typeof mg==='undefined'||!mg||this.L)return;
  const out=a.createGain();out.gain.value=0;out.connect(mg);
  const dl=a.createDelay(1.2),fb=a.createGain(),lp=a.createBiquadFilter(),wet=a.createGain();dl.delayTime.value=this.E*3;fb.gain.value=.3;lp.type='lowpass';lp.frequency.value=2200;wet.gain.value=.4;
  dl.connect(lp);lp.connect(fb);fb.connect(dl);lp.connect(wet);wet.connect(out);
  const bus=a.createGain();bus.connect(out);bus.connect(dl);const dry=a.createGain();dry.connect(out);
  const n=a.sampleRate*.3,nb=a.createBuffer(1,n,a.sampleRate),nd=nb.getChannelData(0);for(let i=0;i<n;i++)nd[i]=Math.random()*2-1;
  const M={};let st=0;this.MEL.forEach(bar=>bar.forEach(([m,d])=>{if(m)M[st]=[m,d];st+=d}));
  this.L={out,bus,dry,nb,M}},
 /* mélodie : synthé rond, un peu de grain, qui s’éteint doucement */
 lead(f,t,d,v,bus){const a=AC,o=a.createOscillator(),o2=a.createOscillator(),g=a.createGain(),g2=a.createGain(),lp=a.createBiquadFilter();o.type='triangle';o2.type='square';o.frequency.value=f;o2.frequency.value=f;o2.detune.value=6;g2.gain.value=.07;
  lp.type='lowpass';lp.frequency.setValueAtTime(2000,t);lp.frequency.exponentialRampToValueAtTime(800,t+d);lp.Q.value=.7;
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.03);g.gain.setTargetAtTime(v*.6,t+.08,.16);g.gain.setTargetAtTime(.0001,t+d*.9,.08);
  o.connect(lp);o2.connect(g2);g2.connect(lp);lp.connect(g);g.connect(bus);o.start(t);o2.start(t);o.stop(t+d+.5);o2.stop(t+d+.5)},
 /* basse pincée */
 bass(f,t,v,bus){const a=AC,o=a.createOscillator(),g=a.createGain(),lp=a.createBiquadFilter();o.type='triangle';o.frequency.value=f;lp.type='lowpass';lp.frequency.value=600;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+.32);o.connect(lp);lp.connect(g);g.connect(bus);o.start(t);o.stop(t+.36)},
 /* cloche douce pour l’arpège */
 bell(f,t,v,bus){const a=AC;[[1,1,.7],[2.76,.12,.25]].forEach(([m,k,d])=>{const o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.value=f*m;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v*k,t+.004);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(bus);o.start(t);o.stop(t+d+.05)})},
 pad(f,t,d,v,bus){const a=AC,o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+d*.3);g.gain.linearRampToValueAtTime(.0001,t+d*1.2);o.connect(g);g.connect(bus);o.start(t);o.stop(t+d*1.25)},
 /* battement feutré et petit souffle de balai */
 thump(t,v,bus){const a=AC,o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.setValueAtTime(95,t);o.frequency.exponentialRampToValueAtTime(48,t+.14);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+.2);o.connect(g);g.connect(bus);o.start(t);o.stop(t+.22)},
 brush(t,v,bus,nb){const a=AC,s=a.createBufferSource(),hp=a.createBiquadFilter(),g=a.createGain();s.buffer=nb;hp.type='highpass';hp.frequency.value=5200;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+.09);s.connect(hp);hp.connect(g);g.connect(bus);s.start(t);s.stop(t+.12)},
 tick(){const L=this.L,a=typeof AC!=='undefined'?AC:null;if(!L||!a)return;if(this.t<a.currentTime)this.t=a.currentTime+.12;
  while(this.t<a.currentTime+.4){const s=this.s,b=(s>>3)%16,k=s%8,[r,T]=this.CH[b],t=this.t,E=this.E,odd=this.rep%2===1;
   if(k===0){[T[0],T[1],T[2]].forEach(n=>this.pad(this.mf(n),t,E*8,.026,L.dry))}
   /* basse « oum-pa » : fondamentale, puis octave */
   if(k===0||k===4)this.bass(this.mf(r),t,k===0?.17:.11,L.dry);
   if(k===6)this.bass(this.mf(r+12),t,.06,L.dry);
   if(k===0)this.thump(t,.05,L.dry);
   if(k===3||k===7)this.brush(t,.014,L.dry,L.nb);
   this.bell(this.mf(T[this.PAT[k]]+12),t,odd?.032:.022,L.bus);
   const m=L.M[s];if(m)this.lead(this.mf(m[0]+(odd&&b>=8?12:0)),t,m[1]*E,odd&&b>=8?.06:.085,L.bus);
   this.t+=E;this.s=(this.s+1)%128;if(this.s===0)this.rep++}},
 loop(){clearTimeout(this.T);if(!this.on)return;if(!this.L&&typeof AC!=='undefined'&&AC){this.build();apply()}if(this.L&&!document.hidden&&prefs().music)this.tick();this.T=setTimeout(()=>this.loop(),110)},
 vol(m){if(!this.L||typeof AC==='undefined'||!AC)return;this.L.out.gain.setTargetAtTime(m&&this.on?.85:0,AC.currentTime,.6)},
 set(v){v=!!v;if(v===this.on)return;this.on=v;
  /* entre la partie et l’accueil du jeu, la musique reprend là où elle était au lieu de recommencer */
  if(v){/* les notes déjà programmées restent à leur place : on reprend juste après elles, sans les rejouer */
   if(Date.now()-(this.off||0)>45000){this.s=0;this.rep=0;this.t=0}this.build();this.loop()}else{clearTimeout(this.T);this.off=Date.now()}if(typeof AC!=='undefined'&&AC&&typeof music!=='undefined'&&music)apply()}};
function ttMus(v){if(typeof ttMu==='object')ttMu.set(v)}
