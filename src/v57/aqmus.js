/* ---------- Musique aquatique du match-3 : nappe douce, vagues, bulles et gouttes qui résonnent sous l’eau ---------- */
var aqMu={on:false,L:null,T:0,
 build(){const a=typeof AC!=='undefined'?AC:null;if(!a||typeof mg==='undefined'||!mg||this.L)return;
  const out=a.createGain();out.gain.value=0;out.connect(mg);
  const dl=a.createDelay(1.5);dl.delayTime.value=.42;const fb=a.createGain();fb.gain.value=.42;const lp=a.createBiquadFilter();lp.type='lowpass';lp.frequency.value=1700;
  dl.connect(lp);lp.connect(fb);fb.connect(dl);const wet=a.createGain();wet.gain.value=.6;lp.connect(wet);wet.connect(out);
  const bus=a.createGain();bus.connect(out);bus.connect(dl);
  const pad=a.createGain();pad.gain.value=.55;const fl=a.createBiquadFilter();fl.type='lowpass';fl.frequency.value=650;fl.Q.value=.8;fl.connect(pad);pad.connect(out);
  const lf=a.createOscillator(),lg=a.createGain();lf.frequency.value=.07;lg.gain.value=360;lf.connect(lg);lg.connect(fl.frequency);lf.start();
  [174.6,261.6,329.6,440,493.9].forEach((fr,i)=>[-7,7].forEach(dt=>{const o=a.createOscillator(),g=a.createGain(),l2=a.createOscillator(),l2g=a.createGain();o.type='triangle';o.frequency.value=fr;o.detune.value=dt;g.gain.value=.04;l2.frequency.value=.05+i*.023;l2g.gain.value=.02;l2.connect(l2g);l2g.connect(g.gain);o.connect(g);g.connect(fl);o.start();l2.start()}));
  const n=a.sampleRate*3,buf=a.createBuffer(1,n,a.sampleRate),d=buf.getChannelData(0);let b=0;for(let i=0;i<n;i++){b=.97*b+.03*(Math.random()*2-1);d[i]=b*7}
  const ns=a.createBufferSource();ns.buffer=buf;ns.loop=true;const bp=a.createBiquadFilter();bp.type='bandpass';bp.frequency.value=420;bp.Q.value=.6;const ng=a.createGain();ng.gain.value=.13;
  const wl=a.createOscillator(),wg=a.createGain();wl.frequency.value=.11;wg.gain.value=.08;wl.connect(wg);wg.connect(ng.gain);ns.connect(bp);bp.connect(ng);ng.connect(out);ns.start();wl.start();
  this.L={out,bus}},
 pip(){const L=this.L,a=typeof AC!=='undefined'?AC:null;if(!L||!a)return;const t=a.currentTime,o=a.createOscillator(),g=a.createGain();o.type='sine';
  if(Math.random()<.55){const f0=380+Math.random()*520;o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f0*1.7,t+.14);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.1,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+.2);o.connect(g);g.connect(L.bus);o.start(t);o.stop(t+.25)}
  else{const N=[523.3,587.3,659.3,784,880,1046.5],f=N[Math.random()*N.length|0],o2=a.createOscillator(),g2=a.createGain();o.frequency.value=f;o2.frequency.value=f*2;o2.type='sine';g2.gain.value=.25;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.08,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+1.5);o.connect(g);o2.connect(g2);g2.connect(g);g.connect(L.bus);o.start(t);o2.start(t);o.stop(t+1.6);o2.stop(t+1.6)}},
 fx(f,d){const a=AC;if(!a||!mg)return;const t=a.currentTime;
  if(!this.F){const bus=a.createGain(),dl=a.createDelay(1),fb=a.createGain(),lp=a.createBiquadFilter(),wet=a.createGain();dl.delayTime.value=.27;fb.gain.value=.33;lp.type='lowpass';lp.frequency.value=1600;wet.gain.value=.45;bus.connect(mg);bus.connect(dl);dl.connect(lp);lp.connect(fb);fb.connect(dl);lp.connect(wet);wet.connect(mg);
   const n=a.sampleRate*.6,nb=a.createBuffer(1,n,a.sampleRate),nd=nb.getChannelData(0);for(let i=0;i<n;i++)nd[i]=Math.random()*2-1;this.F={bus,nb}}
  const F=this.F,splash=(v,len,f0,f1)=>{const s=a.createBufferSource(),bp=a.createBiquadFilter(),g=a.createGain();s.buffer=F.nb;bp.type='bandpass';bp.Q.value=.9;bp.frequency.setValueAtTime(f0,t);bp.frequency.exponentialRampToValueAtTime(f1,t+len);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+len*.25);g.gain.exponentialRampToValueAtTime(.0001,t+len);s.connect(bp);bp.connect(g);g.connect(F.bus);s.start(t);s.stop(t+len+.05)};
  const bub=(t0,f0,v)=>{const o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.setValueAtTime(f0,t0);o.frequency.exponentialRampToValueAtTime(f0*1.8,t0+.12);g.gain.setValueAtTime(.0001,t0);g.gain.exponentialRampToValueAtTime(v,t0+.015);g.gain.exponentialRampToValueAtTime(.0001,t0+.17);o.connect(g);g.connect(F.bus);o.start(t0);o.stop(t0+.2)};
  if(d<.22){const b=f*.9;bub(t,b,.16);bub(t+.045,b*1.25,.12);bub(t+.1,b*1.58,.09);splash(.07,.2,1800,500)}
  else if(d>=.28&&f>=800){splash(.11,.55,300,1800);const o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.value=f*1.5;g.gain.setValueAtTime(.0001,t+.12);g.gain.exponentialRampToValueAtTime(.1,t+.14);g.gain.exponentialRampToValueAtTime(.0001,t+1.4);o.connect(g);g.connect(F.bus);o.start(t+.12);o.stop(t+1.5)}
  else{const o=a.createOscillator(),o2=a.createOscillator(),g=a.createGain(),g2=a.createGain();o.type='sine';o2.type='sine';o.frequency.value=f;o2.frequency.value=f*2;g2.gain.value=.22;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.16,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+Math.max(.5,d*2.2));o.connect(g);o2.connect(g2);g2.connect(g);g.connect(F.bus);o.start(t);o2.start(t);o.stop(t+Math.max(.5,d*2.2)+.1);o2.stop(t+Math.max(.5,d*2.2)+.1);splash(.05,.3,900,350)}},
 loop(){clearTimeout(this.T);if(!this.on)return;if(!this.L&&typeof AC!=='undefined'&&AC){this.build();apply()}if(this.L&&!document.hidden&&prefs().music)this.pip();this.T=setTimeout(()=>this.loop(),700+Math.random()*1900)},
 vol(m){if(!this.L||typeof AC==='undefined'||!AC)return;this.L.out.gain.setTargetAtTime(m&&this.on?.9:0,AC.currentTime,1.4)},
 set(v){v=!!v;if(v===this.on)return;this.on=v;if(v){this.build();this.loop()}else clearTimeout(this.T);if(typeof AC!=='undefined'&&AC&&typeof music!=='undefined'&&music)apply()}};
function m3Mus(v){if(typeof aqMu==='object')aqMu.set(v)}
