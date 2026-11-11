/* ---------- Relie les points : méditation au handpan en ré mineur (gamme Kurd), nappe grave, longues résonances — rien de bruité ---------- */
var fiMu={on:false,L:null,T:0,s:0,t:0,rep:0,off:0,E:.43,
 /* gamme du handpan : ré la sib do ré mi fa la do ré */
 SC:[50,57,58,60,62,64,65,69,72,74],
 /* 4 motifs d’une mesure (8 croches), -1 = silence ; chiffres = degrés de la gamme */
 PH:{A:[4,-1,7,6,-1,4,3,-1],B:[4,-1,6,5,-1,3,4,-1],C:[3,-1,5,4,-1,2,1,-1],D:[2,-1,4,-1,3,1,-1,2]},
 SEQ:'ABAC ABDC ABAC ADBC'.replace(/ /g,'').split(''),
 mf(n){return 440*Math.pow(2,(n-69)/12)},
 build(){const a=typeof AC!=='undefined'?AC:null;if(!a||typeof mg==='undefined'||!mg||this.L)return;
  const out=a.createGain();out.gain.value=0;
  const warm=a.createBiquadFilter();warm.type='lowpass';warm.frequency.value=3200;warm.Q.value=.3;warm.connect(out);out.connect(mg);
  const mk=(dt,fbv,w)=>{const d=a.createDelay(3),f=a.createGain(),l=a.createBiquadFilter(),g=a.createGain();d.delayTime.value=dt;f.gain.value=fbv;l.type='lowpass';l.frequency.value=1800;g.gain.value=w;d.connect(l);l.connect(f);f.connect(d);l.connect(g);g.connect(warm);return d};
  const d1=mk(this.E*3,.42,.34),d2=mk(this.E*5,.36,.28);
  const bus=a.createGain();bus.connect(warm);bus.connect(d1);bus.connect(d2);const dry=a.createGain();dry.connect(warm);
  this.L={out,bus,dry}},
 /* handpan : « poum » rond, deuxième et troisième harmoniques, longue résonance */
 hp(f,t,v,bus){const a=AC;[[1,1,2.8],[2,.34,1.4],[2.99,.1,.7]].forEach(([m,k,d])=>{const o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.setValueAtTime(f*m*1.012,t);o.frequency.exponentialRampToValueAtTime(f*m,t+.05);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v*k,t+.005);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(bus);o.start(t);o.stop(t+d+.05)})},
 drone(f,t,d,v,bus){const a=AC;[-3,3].forEach(dt=>{const o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.value=f;o.detune.value=dt;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+d*.4);g.gain.linearRampToValueAtTime(.0001,t+d*1.1);o.connect(g);g.connect(bus);o.start(t);o.stop(t+d*1.15)})},
 tick(){const L=this.L,a=typeof AC!=='undefined'?AC:null;if(!L||!a)return;if(this.t<a.currentTime)this.t=a.currentTime+.12;
  while(this.t<a.currentTime+.8){const s=this.s,b=(s>>3)%16,k=s%8,E=this.E,t=this.t+(k?Math.random()*.012:0),ph=this.PH[this.SEQ[b]];
   /* nappe grave qui respire toutes les 4 mesures */
   if(s%32===0){this.drone(this.mf(38),this.t,E*32,.05,L.dry);this.drone(this.mf(45),this.t,E*32,.022,L.dry)}
   /* note grave du handpan au début de chaque mesure */
   if(k===0)this.hp(this.mf(this.SC[0]),t,.13,L.dry);
   const d=ph[k];if(d>=0)this.hp(this.mf(this.SC[d]+(this.rep%2&&k%4===0?0:0)),t,.07+Math.random()*.02,L.bus);
   /* petite note aiguë éparse, toujours dans la gamme */
   if(k%2===1&&Math.random()<.16)this.hp(this.mf(this.SC[[7,8,9][Math.random()*3|0]]),t,.035,L.bus);
   this.t+=E;this.s=(this.s+1)%128;if(this.s===0)this.rep++}},
 loop(){clearTimeout(this.T);if(!this.on)return;if(!this.L&&typeof AC!=='undefined'&&AC){this.build();apply()}if(this.L&&!document.hidden&&prefs().music)this.tick();this.T=setTimeout(()=>this.loop(),120)},
 vol(m){if(!this.L||typeof AC==='undefined'||!AC)return;this.L.out.gain.setTargetAtTime(m&&this.on?.9:0,AC.currentTime,1)},
 set(v){v=!!v;if(v===this.on)return;this.on=v;
  if(v){if(Date.now()-(this.off||0)>45000){this.s=0;this.rep=0;this.t=0}this.build();this.loop()}else{clearTimeout(this.T);this.off=Date.now()}
  if(typeof AC!=='undefined'&&AC&&typeof music!=='undefined'&&music)apply()}};
function fiMus(v){if(typeof fiMu==='object')fiMu.set(v)}
