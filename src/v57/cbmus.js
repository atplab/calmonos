/* ---------- Coloriage : piano électrique feutré en la majeur, accords doux, basse ronde, comme un après-midi tranquille ---------- */
var cbMu={on:false,L:null,T:0,s:0,t:0,rep:0,off:0,
 /* 8 mesures d’accords (une par mesure), mélodie sur 16 mesures ; chaque mesure = 8 croches */
 CH:[[42,[57,61,64,68]],[47,[54,58,61,66]],[40,[56,59,61,64]],[45,[57,61,64,68]],[38,[57,61,62,66]],[38,[57,61,64,66]],[37,[56,59,61,64]],[37,[56,59,64,68]]],
 MEL:[[[73,3],[71,1],[69,4]],[[70,2],[71,2],[73,4]],[[68,4],[0,2],[71,2]],[[69,6],[0,2]],[[66,2],[69,2],[73,3],[74,1]],[[76,4],[73,2],[69,2]],[[71,3],[68,1],[64,4]],[[68,4],[0,4]],
  [[0,2],[73,2],[76,2],[73,2]],[[71,4],[70,2],[66,2]],[[68,2],[71,2],[76,4]],[[73,6],[0,2]],[[74,3],[73,1],[69,2],[66,2]],[[69,4],[73,4]],[[71,2],[68,2],[64,2],[68,2]],[[64,6],[0,2]]],
 E:.29,
 mf(n){return 440*Math.pow(2,(n-69)/12)},
 build(){const a=typeof AC!=='undefined'?AC:null;if(!a||typeof mg==='undefined'||!mg||this.L)return;
  const out=a.createGain();out.gain.value=0;const warm=a.createBiquadFilter();warm.type='lowpass';warm.frequency.value=3200;warm.connect(out);out.connect(mg);
  const dl=a.createDelay(1.5),fb=a.createGain(),lp=a.createBiquadFilter(),wet=a.createGain();dl.delayTime.value=this.E*3;fb.gain.value=.28;lp.type='lowpass';lp.frequency.value=1800;wet.gain.value=.34;
  dl.connect(lp);lp.connect(fb);fb.connect(dl);lp.connect(wet);wet.connect(warm);
  const bus=a.createGain();bus.connect(warm);bus.connect(dl);const dry=a.createGain();dry.connect(warm);
  /* léger trémolo du piano électrique */
  const tr=a.createOscillator(),tg=a.createGain(),ep=a.createGain();ep.gain.value=1;tr.frequency.value=4.2;tg.gain.value=.08;tr.connect(tg);tg.connect(ep.gain);tr.start();ep.connect(bus);
  const n=a.sampleRate*.3,nb=a.createBuffer(1,n,a.sampleRate),nd=nb.getChannelData(0);for(let i=0;i<n;i++)nd[i]=Math.random()*2-1;
  const M={};let st=0;this.MEL.forEach(bar=>bar.forEach(([m,d])=>{if(m)M[st]=[m,d];st+=d}));
  this.L={out,bus,dry,ep,nb,M}},
 /* piano électrique : corps rond, petite lame métallique au début */
 epn(f,t,v,d,bus){const a=AC;[[1,1,d],[2,.22,d*.6],[7.1,.035,.18]].forEach(([m,k,dd])=>{const o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.value=f*m;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v*k,t+(m>5?.002:.012));g.gain.exponentialRampToValueAtTime(.0001,t+dd);o.connect(g);g.connect(bus);o.start(t);o.stop(t+dd+.05)})},
 bass(f,t,v,d,bus){const a=AC,o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(bus);o.start(t);o.stop(t+d+.05)},
 pad(f,t,d,v,bus){const a=AC,o=a.createOscillator(),g=a.createGain();o.type='triangle';o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+d*.4);g.gain.linearRampToValueAtTime(.0001,t+d*1.15);o.connect(g);g.connect(bus);o.start(t);o.stop(t+d*1.2)},
 brush(t,v,bus,nb){const a=AC,s=a.createBufferSource(),bp=a.createBiquadFilter(),g=a.createGain();s.buffer=nb;bp.type='bandpass';bp.frequency.value=3800;bp.Q.value=.6;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.03);g.gain.exponentialRampToValueAtTime(.0001,t+.2);s.connect(bp);bp.connect(g);g.connect(bus);s.start(t);s.stop(t+.25)},
 thump(t,v,bus){const a=AC,o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.setValueAtTime(80,t);o.frequency.exponentialRampToValueAtTime(45,t+.16);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+.24);o.connect(g);g.connect(bus);o.start(t);o.stop(t+.26)},
 tick(){const L=this.L,a=typeof AC!=='undefined'?AC:null;if(!L||!a)return;if(this.t<a.currentTime)this.t=a.currentTime+.12;
  while(this.t<a.currentTime+.45){const s=this.s,b=(s>>3)%16,k=s%8,[r,T]=this.CH[b%8],t=this.t,E=this.E;
   /* accord égrené en douceur, rappel plus léger au milieu de la mesure */
   if(k===0){T.forEach((n,i)=>this.epn(this.mf(n),t+i*.018,.05,2.6,L.ep));T.forEach(n=>this.pad(this.mf(n-12),t,E*8,.012,L.dry))}
   if(k===3||(k===6&&b%2===1))T.slice(1).forEach((n,i)=>this.epn(this.mf(n),t+i*.014,.026,1.2,L.ep));
   if(k===0)this.bass(this.mf(r),t,.2,E*4.5,L.dry);
   if(k===5)this.bass(this.mf(r+(b%2?7:12)),t,.11,E*2.5,L.dry);
   if(k===0&&this.rep>0)this.thump(t,.05,L.dry);
   if((k===2||k===6)&&this.rep>0)this.brush(t,.016,L.dry,L.nb);
   const m=L.M[s];if(m)this.epn(this.mf(m[0]+12),t,this.rep%2?.06:.07,Math.min(3,m[1]*E+1.2),L.bus);
   this.t+=E;this.s=(this.s+1)%128;if(this.s===0)this.rep++}},
 loop(){clearTimeout(this.T);if(!this.on)return;if(!this.L&&typeof AC!=='undefined'&&AC){this.build();apply()}if(this.L&&!document.hidden&&prefs().music)this.tick();this.T=setTimeout(()=>this.loop(),110)},
 vol(m){if(!this.L||typeof AC==='undefined'||!AC)return;this.L.out.gain.setTargetAtTime(m&&this.on?.9:0,AC.currentTime,.8)},
 set(v){v=!!v;if(v===this.on)return;this.on=v;
  /* entre l’accueil et le dessin, la musique continue là où elle était */
  if(v){if(Date.now()-(this.off||0)>45000){this.s=0;this.rep=0;this.t=0}this.build();this.loop()}else{clearTimeout(this.T);this.off=Date.now()}
  if(typeof AC!=='undefined'&&AC&&typeof music!=='undefined'&&music)apply()}};
function cbMus(v){if(typeof cbMu==='object')cbMu.set(v)}
