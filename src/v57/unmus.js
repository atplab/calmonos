/* ---------- HoHo : petit trio de jazz de restaurant en fa majeur (vibraphone, piano électrique, contrebasse, balais) ---------- */
var unMu={on:false,L:null,T:0,s:0,t:0,rep:0,off:0,Q:.68,
 /* 16 mesures : [fondamentale, qualité (4 = majeur/dominante, 3 = mineur), voicing] */
 CH:[[41,4,[57,60,64,67]],[38,4,[54,59,60,64]],[43,3,[58,62,65,69]],[48,4,[52,57,58,62]],[45,3,[55,59,60,64]],[38,4,[54,59,60,64]],[43,3,[58,62,65,69]],[48,4,[52,57,58,62]],
  [41,4,[57,60,64,67]],[41,4,[57,62,63,67]],[46,4,[57,60,62,65]],[39,4,[55,60,61,65]],[45,3,[55,59,60,64]],[38,4,[54,59,60,64]],[43,3,[58,62,65,69]],[48,4,[52,57,58,62]]],
 MEL:[[[72,3],[69,1],[76,4]],[[74,2],[72,2],[66,4]],[[67,3],[70,1],[74,2],[72,2]],[[70,4],[0,2],[67,2]],[[72,3],[71,1],[69,2],[67,2]],[[66,2],[69,2],[72,4]],[[74,3],[72,1],[70,2],[69,2]],[[67,6],[0,2]],
  [[69,2],[72,2],[76,2],[79,2]],[[77,4],[75,2],[74,2]],[[74,3],[72,1],[69,4]],[[67,2],[70,2],[73,4]],[[72,4],[0,2],[71,2]],[[69,3],[66,1],[69,2],[72,2]],[[70,2],[69,2],[67,2],[65,2]],[[64,2],[67,2],[70,2],[0,2]]],
 mf(n){return 440*Math.pow(2,(n-69)/12)},
 build(){const a=typeof AC!=='undefined'?AC:null;if(!a||typeof mg==='undefined'||!mg||this.L)return;
  const out=a.createGain();out.gain.value=0;const warm=a.createBiquadFilter();warm.type='lowpass';warm.frequency.value=5200;warm.connect(out);out.connect(mg);
  const dl=a.createDelay(1),fb=a.createGain(),lp=a.createBiquadFilter(),wet=a.createGain();dl.delayTime.value=.19;fb.gain.value=.22;lp.type='lowpass';lp.frequency.value=2400;wet.gain.value=.3;
  dl.connect(lp);lp.connect(fb);fb.connect(dl);lp.connect(wet);wet.connect(warm);
  const bus=a.createGain();bus.connect(warm);bus.connect(dl);const dry=a.createGain();dry.connect(warm);
  /* vibraphone : trémolo du moteur */
  const vb=a.createGain(),tr=a.createOscillator(),tg=a.createGain();tr.frequency.value=5.2;tg.gain.value=.22;tr.connect(tg);tg.connect(vb.gain);tr.start();vb.connect(bus);
  const n=a.sampleRate*.6,nb=a.createBuffer(1,n,a.sampleRate),nd=nb.getChannelData(0);for(let i=0;i<n;i++)nd[i]=Math.random()*2-1;
  const M={};let st=0;this.MEL.forEach(bar=>bar.forEach(([m,d])=>{if(m)M[st]=[m,d];st+=d}));
  this.L={out,bus,dry,vb,nb,M}},
 vib(f,t,d,v,bus){const a=AC;[[1,1,d],[4,.06,.25],[10,.015,.08]].forEach(([m,k,dd])=>{const o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.value=f*m;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v*k,t+.004);g.gain.exponentialRampToValueAtTime(.0001,t+dd);o.connect(g);g.connect(bus);o.start(t);o.stop(t+dd+.05)})},
 ep(f,t,v,d,bus){const a=AC;[[1,1,d],[2,.2,d*.6],[7.1,.03,.12]].forEach(([m,k,dd])=>{const o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.value=f*m;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v*k,t+(m>5?.002:.01));g.gain.exponentialRampToValueAtTime(.0001,t+dd);o.connect(g);g.connect(bus);o.start(t);o.stop(t+dd+.05)})},
 bass(f,t,v,bus){const a=AC,o=a.createOscillator(),o2=a.createOscillator(),g=a.createGain(),lp=a.createBiquadFilter();o.type='triangle';o2.type='sine';o.frequency.value=f;o2.frequency.value=f;lp.type='lowpass';lp.frequency.setValueAtTime(900,t);lp.frequency.exponentialRampToValueAtTime(300,t+.4);
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.012);g.gain.exponentialRampToValueAtTime(v*.35,t+.18);g.gain.exponentialRampToValueAtTime(.0001,t+.62);o.connect(lp);o2.connect(lp);lp.connect(g);g.connect(bus);o.start(t);o2.start(t);o.stop(t+.66);o2.stop(t+.66)},
 nz(t,v,f,q,att,dec,bus,type){const a=AC,s=a.createBufferSource(),bp=a.createBiquadFilter(),g=a.createGain();s.buffer=this.L.nb;s.playbackRate.value=.9+Math.random()*.2;bp.type=type||'bandpass';bp.frequency.value=f;bp.Q.value=q;
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+att);g.gain.exponentialRampToValueAtTime(.0001,t+att+dec);s.connect(bp);bp.connect(g);g.connect(bus);s.start(t,Math.random()*.2);s.stop(t+att+dec+.05)},
 ride(t,v,bus){this.nz(t,v,8200,1.2,.003,.32,bus);const a=AC,o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.value=3150;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v*.18,t+.003);g.gain.exponentialRampToValueAtTime(.0001,t+.5);o.connect(g);g.connect(bus);o.start(t);o.stop(t+.55)},
 /* durée d’une croche « swing » : longue puis courte */
 sd(k){return k%2===0?this.Q*2/3:this.Q/3},
 tick(){const L=this.L,a=typeof AC!=='undefined'?AC:null;if(!L||!a)return;if(this.t<a.currentTime)this.t=a.currentTime+.12;
  while(this.t<a.currentTime+.5){const s=this.s,b=(s>>3)%16,k=s%8,[r,q,V]=this.CH[b],nx=this.CH[(b+1)%16][0],t=this.t,Q=this.Q,hum=()=>Math.random()*.012;
   /* contrebasse qui marche : fondamentale, tierce, quinte, approche chromatique */
   if(k%2===0){const bt=k/2;let nn=bt===0?r:bt===1?r+q:bt===2?r+7:nx+(b%2?1:-1);while(nn>52)nn-=12;while(nn<34)nn+=12;this.bass(this.mf(nn),t+hum(),bt===0?.2:.16,L.dry)}
   /* piano : rythme « charleston », accords courts et feutrés */
   const cp=k===0||k===3||(k===7&&b%4===3)||(k===5&&b%2===1&&Math.random()<.5);
   if(cp)V.forEach((n,i)=>this.ep(this.mf(n),t+i*.01+hum(),k===0?.035:.028,k===0?1:.55,L.bus));
   /* batterie aux balais : cymbale « ding, ding-da-ding », balai sur 2 et 4 */
   if(k===0||k===2||k===3||k===4||k===6||k===7)this.ride(t+hum(),k===3||k===7?.018:.03,L.dry);
   if(k===2||k===6){this.nz(t,.028,2400,.5,.05,.22,L.dry);this.nz(t,.02,7000,.7,.002,.05,L.dry,'highpass')}
   if(k===0&&b%8===7&&this.rep>0)this.nz(t+Q,.02,1800,.4,.12,.4,L.dry);
   /* mélodie au vibraphone (plus rare au deuxième passage) */
   const m=L.M[s];if(m&&!(this.rep%2===1&&b<8&&Math.random()<.4)){let d=0;for(let j=0;j<m[1];j++)d+=this.sd(k+j);this.vib(this.mf(m[0]),t+hum(),Math.min(2.4,d+.9),this.rep%2?.06:.075,L.vb)}
   this.t+=this.sd(k);this.s=(this.s+1)%128;if(this.s===0)this.rep++}},
 loop(){clearTimeout(this.T);if(!this.on)return;if(!this.L&&typeof AC!=='undefined'&&AC){this.build();apply()}if(this.L&&!document.hidden&&prefs().music)this.tick();this.T=setTimeout(()=>this.loop(),110)},
 vol(m){if(!this.L||typeof AC==='undefined'||!AC)return;this.L.out.gain.setTargetAtTime(m&&this.on?.85:0,AC.currentTime,.8)},
 set(v){v=!!v;if(v===this.on)return;this.on=v;
  if(v){if(Date.now()-(this.off||0)>45000){this.s=0;this.rep=0;this.t=0}this.build();this.loop()}else{clearTimeout(this.T);this.off=Date.now()}
  if(typeof AC!=='undefined'&&AC&&typeof music!=='undefined'&&music)apply()}};
function unMus(v){if(typeof unMu==='object')unMu.set(v)}
