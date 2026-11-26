// Execute com Node.js: node testar.cjs
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
const core=html.match(/<script id="core">([\s\S]*?)<\/script>/)[1];
const results=vm.runInNewContext(core+'\nselfTest();');
const out=['teste;esperado;obtido;resultado',...results.map(r=>[r.name,JSON.stringify(r.expected),JSON.stringify(r.actual),r.ok?'APROVADO':'FALHOU'].join(';'))];
fs.writeFileSync(path.join(__dirname,'resultados_testes.csv'),'\ufeff'+out.join('\n'));
for(const r of results)console.log(`${r.ok?'OK':'ERRO'} ${r.name}`);
console.log(`${results.filter(r=>r.ok).length}/${results.length} aprovados.`);
process.exitCode=results.every(r=>r.ok)?0:1;
