/* ---------- Air hockey : petit groove lumineux en fa majeur, marimba, basse bondissante, percussions tonales douces (aucun bruit blanc) ---------- */
var ahMu={on:false,L:null,T:0,s:0,t:0,rep:0,off:0,E:.288,
 /* 8 accords de 2 mesures (16 croches) : Fmaj9 · Am7 · Bbmaj7 · C6 · Dm7 · Gm7 · Bbmaj7 · C7sus */
 CH:[[41,[65,69,72,76]],[45,[64,67,71,72]],[46,[62,65,69,70]],[48,[64,67,69,72]],[38,[62,65,69,72]],[43,[62,65,67,70]],[46,[62,65,69,70]],[48,[60,65,67,70]]],
 /* mélodie : [croche dans l’accord, note, durée] */
 PH:[[[0,81,2],[3,84,1],[4,81,2],[8,79,2],[11,81,1],[12,77,3]],[[0,76,2],[3,79,1],[4,81,2],[8,79,2],[12,76,3]],[[0,77,2],[3,81,1],[4,82,2],[8,81,2],[11,79,1],[12,77,3]],[[0,79,2],[3,81,1],[4,84,3],[8,81,2],[12,79,3]],
  [[0,81,2],[3,77,1],[4,81,2],[8,84,2],[11,81,1],[12,77,3]],[[0,79,2],[3,82,1],[4,86,2],[8,82,2],[12,79,3]],[[0,81,2],[3,82,1],[4,81,2],[8,77,2],[12,74,3]],[[0,72,2],[3,76,1],[4,79,2],[8,84,4],[14,81,2]]],
 mf(n){return 440*Math.pow(2,(n-69)/12)},
 build(){const a=typeof AC!=='undefined'?AC:null;if(!a||typeof mg==='undefined'||!mg||this.L)return;
  const out=a.createGain();out.gain.value=0;
  const warm=a.createBiquadFilter();warm.type='lowpass';warm.frequency.value=3400;warm.Q.value=.3;warm.connect(out);out.connect(mg);
  const dl=a.createDelay(1),fb=a.createGain(),lp=a.createBiquadFilter(),wet=a.createGain();dl.delayTime.value=this.E*3;fb.gain.value=.3;lp.type='lowpass';lp.frequency.value=2000;wet.gain.value=.3;dl.connect(lp);lp.connect(fb);fb.connect(dl);lp.connect(wet);wet.connect(warm);
  const bus=a.createGain();bus.connect(warm);bus.connect(dl);const dry=a.createGain();dry.connect(warm);
  const M={};this.PH.forEach((ph,c)=>ph.forEach(([k,m,d])=>{M[c*16+k]=[m,d]}));
  this.L={out,bus,dry,M}},
 /* marimba douce : corps rond, petite brillance courte */
 mar(f,t,d,v,bus){const a=AC;[[1,1,'sine',d],[3.9,.1,'sine',.12],[2,.18,'triangle',d*.5]].forEach(([m,k,ty,dd])=>{const o=a.createOscillator(),g=a.createGain();o.type=ty;o.frequency.value=f*m;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v*k,t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+dd+.15);o.connect(g);g.connect(bus);o.start(t);o.stop(t+dd+.2)})},
 keys(f,t,d,v,bus){const a=AC,o=a.createOscillator(),g=a.createGain();o.type='triangle';o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(bus);o.start(t);o.stop(t+d+.05)},
 bass(f,t,d,v,bus){const a=AC,o=a.createOscillator(),g=a.createGain(),lp=a.createBiquadFilter();o.type='triangle';o.frequency.value=f;lp.type='lowpass';lp.frequency.value=450;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(lp);lp.connect(g);g.connect(bus);o.start(t);o.stop(t+d+.05)},
 kick(t,v,bus){const a=AC,o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.setValueAtTime(115,t);o.frequency.exponentialRampToValueAtTime(48,t+.12);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+.2);o.connect(g);g.connect(bus);o.start(t);o.stop(t+.22)},
 /* petit « clic de bois » tonal à la place d’une caisse claire bruitée */
 tok(t,v,bus){const a=AC,o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.setValueAtTime(900,t);o.frequency.exponentialRampToValueAtTime(520,t+.05);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.003);g.gain.exponentialRampToValueAtTime(.0001,t+.07);o.connect(g);g.connect(bus);o.start(t);o.stop(t+.09)},
 tick(){const L=this.L,a=typeof AC!=='undefined'?AC:null;if(!L||!a)return;if(this.t<a.currentTime)this.t=a.currentTime+.12;
  while(this.t<a.currentTime+.5){const s=this.s,c=(s>>4)%8,k=s%16,j=s%8,[r,T]=this.CH[c],t=this.t,E=this.E;
   /* accords rebondissants sur les contretemps */
   if(j===0)T.forEach((n,i)=>this.keys(this.mf(n-12),t+i*.008,E*3,.022,L.bus));else if(j===3||j===6)T.slice(1).forEach(n=>this.keys(this.mf(n-12),t,E*1.5,.016,L.bus));
   /* basse qui rebondit */
   if(j===0)this.bass(this.mf(r),t,E*2.5,.2,L.dry);else if(j===3)this.bass(this.mf(r+12),t,E*1.2,.1,L.dry);else if(j===4)this.bass(this.mf(r+7),t,E*1.5,.13,L.dry);else if(j===6)this.bass(this.mf(r+12),t,E*1.2,.09,L.dry);
   /* pulsation douce : grosse caisse sur les temps, clic de bois sur les contretemps */
   if(j===0||j===4)this.kick(t,j===0?.26:.18,L.dry);if(j===2||j===6)this.tok(t,.03,L.dry);
   const m=L.M[s];if(m)this.mar(this.mf(m[0]),t,m[1]*E,.07,L.bus);
   this.t+=E;this.s=(this.s+1)%128;if(this.s===0)this.rep++}},
 loop(){clearTimeout(this.T);if(!this.on)return;if(!this.L&&typeof AC!=='undefined'&&AC){this.build();apply()}if(this.L&&!document.hidden&&prefs().music)this.tick();this.T=setTimeout(()=>this.loop(),110)},
 vol(m){if(!this.L||typeof AC==='undefined'||!AC)return;this.L.out.gain.setTargetAtTime(m&&this.on?.9:0,AC.currentTime,.6)},
 set(v){v=!!v;if(v===this.on)return;this.on=v;
  if(v){if(Date.now()-(this.off||0)>45000){this.s=0;this.rep=0;this.t=0}this.build();this.loop()}else{clearTimeout(this.T);this.off=Date.now()}
  if(typeof AC!=='undefined'&&AC&&typeof music!=='undefined'&&music)apply()}};
function ahMus(v){if(typeof ahMu==='object')ahMu.set(v)}
