
/* ---------- Cuisine : deux musiques de restaurant ----------
   Burger des Étoiles : petit diner rétro, swing doux en do majeur (vibraphone, piano électrique, basse qui marche, balais).
   Sushi des Vagues : funk « city pop » sur un bateau.
   Hot-dog de la Lune : bossa nova de rue en fa (flûte douce, Rhodes syncopé, basse bossa, claves). Aucun bruit blanc.
   Ambiance : murmures de conversation, tintements de couverts, caisse (burger) ou sonnette de vélo (rue), sous la musique. */
var kzMu={on:false,L:null,T:0,s:0,t:0,off:0,k:'bu',
 SG:{
  bu:{E:.3,sw:.32,
   CH:[[48,[60,64,67]],[45,[60,64,69]],[41,[60,65,69]],[43,[59,62,67]],[48,[60,64,67]],[45,[60,64,69]],[38,[62,65,69,72]],[43,[59,62,65,67]]],
   BW:[[0,4,7,9],[0,3,7,10],[0,4,7,9],[0,4,7,9],[0,4,7,9],[0,3,7,10],[0,3,7,10],[0,4,7,10]],
   PH:[[[0,72,2],[2,76,2],[4,79,3],[7,76,1]],[[0,81,2],[2,79,2],[4,76,4]],[[0,77,2],[2,81,2],[4,84,3],[7,81,1]],[[0,79,4],[4,74,2],[6,77,2]],
    [[0,76,2],[2,79,2],[4,84,2],[6,83,2]],[[0,81,3],[3,79,1],[4,76,4]],[[0,77,2],[2,76,2],[4,74,2],[6,77,2]],[[0,79,6]]]},
  su:{E:.144,sw:0,n:16, /* funk « city pop » en mi dorien, ~104 bpm : basse slappée, stabs de clavinet, lead cuivré, petits traits de koto */
   CH:[[40,[55,59,62,66]],[45,[55,59,61,64]],[40,[55,59,62,66]],[45,[55,59,61,64]],[36,[55,59,60,64]],[47,[54,57,62,66]],[45,[55,60,64,67]],[47,[54,57,59,63]]],
   PH:[[[0,76,3],[3,79,1],[4,81,2],[6,79,2],[8,83,4],[12,81,2],[14,79,2]],[[0,76,6],[8,73,2],[10,74,2],[12,76,4]],[[0,79,2],[2,81,2],[4,83,2],[6,86,6],[12,83,2],[14,81,2]],[[0,83,4],[4,81,2],[6,79,2],[8,76,8]],
    [[0,79,4],[4,76,2],[6,79,2],[8,83,6],[14,84,2]],[[0,86,4],[4,83,4],[8,81,4],[12,78,4]],[[0,79,3],[3,76,1],[4,72,4],[8,74,2],[10,76,2],[12,79,4]],[[0,78,4],[4,75,4],[8,71,8]]]},
  hd:{E:.27,sw:0,
   CH:[[41,[64,65,69,72]],[38,[60,62,65,69]],[43,[62,65,67,70]],[36,[64,67,70,72]],[41,[64,65,69,72]],[46,[62,65,69,70]],[43,[62,65,67,70]],[36,[64,67,70,72]]],
   PH:[[[0,81,3],[3,79,1],[4,77,4]],[[0,76,2],[2,77,2],[4,81,4]],[[0,79,3],[3,77,1],[4,74,2],[6,77,2]],[[0,76,8]],
    [[0,72,2],[2,77,2],[4,81,3],[7,84,1]],[[0,82,4],[4,81,2],[6,79,2]],[[0,77,3],[3,79,1],[4,81,2],[6,79,2]],[[0,79,4],[4,76,4]]]}},
 mf(n){return 440*Math.pow(2,(n-69)/12)},
 build(){const a=typeof AC!=='undefined'?AC:null;if(!a||typeof mg==='undefined'||!mg||this.L)return;
  const out=a.createGain();out.gain.value=0;const warm=a.createBiquadFilter();warm.type='lowpass';warm.frequency.value=5200;warm.Q.value=.3;warm.connect(out);out.connect(mg);
  const dl=a.createDelay(1),fb=a.createGain(),lp=a.createBiquadFilter(),wet=a.createGain();dl.delayTime.value=.36;fb.gain.value=.26;lp.type='lowpass';lp.frequency.value=2600;wet.gain.value=.26;dl.connect(lp);lp.connect(fb);fb.connect(dl);lp.connect(wet);wet.connect(warm);
  const bus=a.createGain();bus.connect(warm);bus.connect(dl);const dry=a.createGain();dry.connect(warm);const amb=a.createGain();amb.gain.value=.8;amb.connect(warm);const am2=a.createGain();am2.gain.value=.25;amb.connect(dl);
  const M={};for(const k in this.SG){M[k]={};const n=this.SG[k].n||8;this.SG[k].PH.forEach((ph,c)=>ph.forEach(([s,m,d])=>{M[k][c*n+s]=[m,d]}))}
  this.L={out,bus,dry,amb,M}},
 env(g,t,v,at,d){g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+at);g.gain.exponentialRampToValueAtTime(.0001,t+d)},
 /* vibraphone : deux sinus à peine désaccordés, longue résonance */
 vib(f,t,d,v,bus){const a=AC;[[1,1],[1.004,.6],[4,.05]].forEach(([m,k])=>{const o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.value=f*m;this.env(g,t,v*k,.006,d+.7);o.connect(g);g.connect(bus);o.start(t);o.stop(t+d+.8)})},
 /* piano électrique : sinus + harmonique douce */
 ep(f,t,d,v,bus){const a=AC;[[1,1],[2,.25],[3,.06]].forEach(([m,k])=>{const o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.value=f*m;this.env(g,t,v*k,.012,d);o.connect(g);g.connect(bus);o.start(t);o.stop(t+d+.05)})},
 bass(f,t,d,v,bus){const a=AC,o=a.createOscillator(),g=a.createGain(),lp=a.createBiquadFilter();o.type='triangle';o.frequency.value=f;lp.type='lowpass';lp.frequency.value=900;this.env(g,t,v,.01,d);o.connect(lp);lp.connect(g);g.connect(bus);o.start(t);o.stop(t+d+.05)},
 /* flûte douce : sinus avec un léger vibrato */
 fl(f,t,d,v,bus){const a=AC,o=a.createOscillator(),g=a.createGain(),lf=a.createOscillator(),lg=a.createGain();o.type='sine';o.frequency.value=f;lf.frequency.value=5.2;lg.gain.value=f*.006;lf.connect(lg);lg.connect(o.frequency);
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.07);g.gain.setValueAtTime(v,t+Math.max(.08,d-.12));g.gain.exponentialRampToValueAtTime(.0001,t+d+.25);o.connect(g);g.connect(bus);o.start(t);lf.start(t);o.stop(t+d+.3);lf.stop(t+d+.3)},
 /* une voix lointaine : quelques syllabes glissantes à travers un filtre de voyelle */
 talk(t,bus){const a=AC,n=2+Math.floor(Math.random()*4),p0=150+Math.random()*120,pan=a.createStereoPanner?a.createStereoPanner():null;let tt=t;
  const bp=a.createBiquadFilter();bp.type='bandpass';bp.Q.value=4;bp.frequency.value=700+Math.random()*700;const g0=a.createGain();g0.gain.value=1;bp.connect(g0);if(pan){pan.pan.value=Math.random()*1.6-.8;g0.connect(pan);pan.connect(bus)}else g0.connect(bus);
  for(let i=0;i<n;i++){const d=.09+Math.random()*.14,o=a.createOscillator(),g=a.createGain(),p=p0*(.9+Math.random()*.25);o.type='sawtooth';o.frequency.setValueAtTime(p,tt);o.frequency.linearRampToValueAtTime(p*(.85+Math.random()*.3),tt+d);
   g.gain.setValueAtTime(.0001,tt);g.gain.exponentialRampToValueAtTime(.006,tt+.03);g.gain.exponentialRampToValueAtTime(.0001,tt+d);o.connect(g);g.connect(bp);o.start(tt);o.stop(tt+d+.02);tt+=d+.03+Math.random()*.06}},
 clink(t,bus,v=.012){const a=AC,f=2300+Math.random()*1500;[[1,1],[2.7,.3]].forEach(([m,k])=>{const o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.value=f*m;this.env(g,t,v*k,.002,.25);o.connect(g);g.connect(bus);o.start(t);o.stop(t+.3)})},
 ding(t,bus){[1318.5,1760].forEach((f,i)=>{const a=AC,o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.value=f;this.env(g,t+i*.12,.02,.004,.9);o.connect(g);g.connect(bus);o.start(t+i*.12);o.stop(t+i*.12+1)})},
 amb(t,j,L){if(Math.random()<.22)this.talk(t,L.amb);if(Math.random()<.05)this.clink(t+Math.random()*.2,L.amb);
  if(j===0&&Math.random()<(this.k==='su'?.02:.04))this.ding(t,L.amb);if(this.k==='hd'&&j===4&&Math.random()<.03){this.clink(t,L.amb,.02);this.clink(t+.09,L.amb,.02)}},
 /* clavinet : petite note pincée, brillante et courte */
 clav(f,t,d,v,bus){const a=AC,o=a.createOscillator(),g=a.createGain(),lp=a.createBiquadFilter();o.type='sawtooth';o.frequency.value=f;lp.type='lowpass';lp.frequency.setValueAtTime(2600,t);lp.frequency.exponentialRampToValueAtTime(700,t+d);this.env(g,t,v,.004,d);o.connect(lp);lp.connect(g);g.connect(bus);o.start(t);o.stop(t+d+.05)},
 /* cuivre doux : deux dents de scie à peine désaccordées, filtre qui s’ouvre */
 brass(f,t,d,v,bus){const a=AC,lp=a.createBiquadFilter(),g=a.createGain();lp.type='lowpass';lp.frequency.setValueAtTime(600,t);lp.frequency.linearRampToValueAtTime(2200,t+.06);lp.frequency.linearRampToValueAtTime(1400,t+d);lp.connect(g);g.connect(bus);
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.04);g.gain.setValueAtTime(v,t+Math.max(.05,d-.06));g.gain.exponentialRampToValueAtTime(.0001,t+d+.12);
  [1,1.006].forEach(m=>{const o=a.createOscillator();o.type='sawtooth';o.frequency.value=f*m;o.connect(lp);o.start(t);o.stop(t+d+.15)})},
 koto(f,t,v,bus){const a=AC;[[1,1,.6],[2,.35,.3],[3,.12,.15]].forEach(([m,k,dd])=>{const o=a.createOscillator(),g=a.createGain();o.type=m===1?'triangle':'sine';o.frequency.setValueAtTime(f*m*1.01,t);o.frequency.exponentialRampToValueAtTime(f*m,t+.03);this.env(g,t,v*k,.003,dd);o.connect(g);g.connect(bus);o.start(t);o.stop(t+dd+.05)})},
 kick(t,bus){const a=AC,o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.setValueAtTime(110,t);o.frequency.exponentialRampToValueAtTime(45,t+.12);this.env(g,t,.12,.004,.2);o.connect(g);g.connect(bus);o.start(t);o.stop(t+.25)},
 tok(t,v,bus,f=1100){const a=AC,o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.setValueAtTime(f,t);o.frequency.exponentialRampToValueAtTime(f*.62,t+.04);this.env(g,t,v,.003,.06);o.connect(g);g.connect(bus);o.start(t);o.stop(t+.08)},
 style(x){const k=x===2?'su':x?'hd':'bu';if(k===this.k)return;this.k=k;this.s=0;this.t=0},
 tick(){const L=this.L,a=typeof AC!=='undefined'?AC:null;if(!L||!a)return;if(this.t<a.currentTime)this.t=a.currentTime+.12;
  const G=this.SG[this.k],E=G.E;
  const N=G.n||8;
  while(this.t<a.currentTime+.5){const s=this.s,c=Math.floor(s/N)%8,j=s%N,[r,T]=G.CH[c],t0=this.t,t=t0+(j%2?E*G.sw:0);
   if(this.k==='su'){const nr=G.CH[(c+1)%8][0];
    /* basse funk : fondamentale, « pop » à l’octave, quinte, approche chromatique */
    const B={0:[r,3,.2],3:[r+12,1,.12],6:[r,2,.17],10:[r+7,1,.12],11:[r+10,1,.08],12:[r+12,1,.11],14:[nr-1,1,.12]}[j];if(B)this.bass(this.mf(B[0]),t,E*B[1]*1.1,B[2],L.dry);
    if(j===2||j===7||j===10)T.forEach((n,i)=>this.clav(this.mf(n),t+i*.004,E*.9,.022,L.bus));
    if(j===0||j===8)this.kick(t,L.dry);if(j===4||j===12)this.tok(t,.02,L.dry,1800);if(j%4===2)this.tok(t,.008,L.dry,5200);
    const m=L.M.su[s];if(m)this.brass(this.mf(m[0]),t,m[1]*E,.045,L.bus);
    if((c===3&&j>=12)||(c===7&&j>=8&&j%2===0)){const K=[71,74,76,78,81,83,86,88];this.koto(this.mf(K[(c===3?j-12:(j-8)/2+4)%8]),t,.04,L.bus)}}
   else if(this.k==='bu'){
    if(j%2===0)this.bass(this.mf(r+G.BW[c][j>>1]),t,E*1.7,.17,L.dry);
    if(j===2||j===6){T.forEach((n,i)=>this.ep(this.mf(n),t+i*.008,E*1.4,.03,L.bus));this.tok(t,.012,L.dry,900)}
    if(j===7&&c%2)this.ep(this.mf(T[T.length-1]+12),t,E,.02,L.bus);
    const m=L.M.bu[s];if(m)this.vib(this.mf(m[0]),t,m[1]*E,.07,L.bus)}
   else{
    if(j===0||j===4)this.bass(this.mf(r),t,E*2.6,.18,L.dry);else if(j===3||j===7)this.bass(this.mf(r+7),t,E*.9,.12,L.dry);
    if(j===1||j===3||j===6)T.forEach((n,i)=>this.ep(this.mf(n),t+i*.006,E*(j===6?1.8:.9),.026,L.bus));
    if((c%2===0&&(j===0||j===3||j===6))||(c%2===1&&(j===2||j===4)))this.tok(t,.014,L.dry,1500);
    const m=L.M.hd[s];if(m)this.fl(this.mf(m[0]),t,m[1]*E,.06,L.bus)}
   if(N===8||j%2===0)this.amb(t0,N===8?j:j/2,L);
   this.t+=E;this.s=(this.s+1)%(8*N)}},
 loop(){clearTimeout(this.T);if(!this.on)return;if(!this.L&&typeof AC!=='undefined'&&AC){this.build();apply()}if(this.L&&!document.hidden&&prefs().music)this.tick();this.T=setTimeout(()=>this.loop(),110)},
 vol(m){if(!this.L||typeof AC==='undefined'||!AC)return;this.L.out.gain.setTargetAtTime(m&&this.on?.9:0,AC.currentTime,.6)},
 set(v){v=!!v;if(v===this.on)return;this.on=v;
  if(v){if(Date.now()-(this.off||0)>45000){this.s=0;this.t=0}this.build();this.loop()}else{clearTimeout(this.T);this.off=Date.now()}
  if(typeof AC!=='undefined'&&AC&&typeof music!=='undefined'&&music)apply()}};
function kzMus(v){if(typeof kzMu==='object')kzMu.set(v)}
