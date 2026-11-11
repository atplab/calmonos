const fs=require('fs'),T=require('terser'),C=require('clean-css');
(async()=>{let h=fs.readFileSync(process.argv[2],'utf8'),parts=[],re=/<(script|style)([^>]*)>([\s\S]*?)<\/\1>/g,out='',last=0,m;
while((m=re.exec(h))){out+=h.slice(last,m.index);last=re.lastIndex;let b=m[3];
 if(m[1]==='script'&&b.length>2000&&!/type=/.test(m[2])){const r=await T.minify(b,{compress:{passes:2,unsafe:false},mangle:{toplevel:false},format:{comments:false,ascii_only:false}});if(r.error)throw r.error;b=r.code}
 else if(m[1]==='style'&&b.length>2000){const r=new C({level:1}).minify(b);if(r.errors.length)throw r.errors;b=r.styles}
 out+=`<${m[1]}${m[2]}>${b}</${m[1]}>`}
out+=h.slice(last);fs.writeFileSync(process.argv[3],out);console.log(h.length,'->',out.length)})().catch(e=>{console.error(e);process.exit(1)})
