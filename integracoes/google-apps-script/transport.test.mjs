import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import {transformSync} from 'esbuild';

function transport(enabled=true) {
  let source=readFileSync(new URL('../../projeto/src/leadCapture.ts',import.meta.url),'utf8');
  if(enabled) source=source.replace("export const LEADS_ENDPOINT = '';","export const LEADS_ENDPOINT = 'https://script.google.com/macros/s/TEST/exec';");
  let receive;let timeout;const nodes=[];
  const context=vm.createContext({
    module:{exports:{}},exports:{},
    window:{addEventListener:(_,f)=>{receive=f;},removeEventListener:()=>{receive=null;}},
    document:{createElement:tag=>{const node={tag,appendChild(){},remove(){this.removed=true;},submit(){}};nodes.push(node);return node;},body:{append(){}}},
    setTimeout: f=>{timeout=f;return 1;},clearTimeout:()=>{},
  });
  vm.runInContext(transformSync(source,{loader:'ts',format:'cjs'}).code,context);
  return {api:context.module.exports,nodes,ack:data=>receive?.({origin:'https://script.googleusercontent.com',data}),event:e=>receive?.(e),expire:()=>timeout()};
}
const lead={name:'Teste',phone:'61999990000',city:'Brasília',interest:'Split',source:'Consultor do site'};
test('unconfigured receiver cannot report success',async()=>{
  const t=transport(false);await assert.rejects(t.api.saveLead(lead,'id'),/indisponível/);assert.equal(t.nodes.length,0);
});
test('success requires matching id and trusted origin',async()=>{
  const t=transport();let settled=false;const pending=t.api.saveLead(lead,'id').then(()=>{settled=true;});
  const data={type:'gouveclima-lead',requestId:'id',ok:true};
  t.event({origin:'https://example.com',data});t.ack({...data,requestId:'other'});
  await Promise.resolve();assert.equal(settled,false);
  t.ack(data);await pending;assert.equal(settled,true);assert.ok(t.nodes.filter(n=>n.tag!=='input').every(n=>n.removed));
});
test('receiver failure and timeout reject without clearing form values',async()=>{
  const t=transport();const pending=t.api.saveLead(lead,'id');
  t.ack({type:'gouveclima-lead',requestId:'id',ok:false});await assert.rejects(pending,/Não foi possível/);
  const t2=transport();const p2=t2.api.saveLead(lead,'id');t2.expire();await assert.rejects(p2,/confirmação/);
});
