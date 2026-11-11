const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const ts=require('typescript');
const Module=require('node:module');
const source=ts.transpileModule(fs.readFileSync('lib/account-policy.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const mod=new Module('account-policy');mod._compile(source,'account-policy.js');
const {localNext,sameOrigin,isParticipant}=mod.exports;
test('sign-in return paths cannot redirect outside the application',()=>{
 for(const path of ['https://evil.example','//evil.example','/\\evil.example','/\n/evil.example'])assert.equal(localNext(path),'/account');
 assert.equal(localNext('/inbox?provider=123'),'/inbox?provider=123');
});
test('cookie authenticated writes require an explicit matching origin',()=>{
 assert.equal(sameOrigin(new Request('https://takeachefhome.com/api/account/inbox',{headers:{origin:'https://attacker.example'}})),false);
 assert.equal(sameOrigin(new Request('https://takeachefhome.com/api/account/inbox')),false);
 assert.equal(sameOrigin(new Request('https://takeachefhome.com/api/account/inbox',{headers:{origin:'https://takeachefhome.com'}})),true);
});
test('only the customer or claimed provider account may read a conversation',()=>{
 assert.equal(isParticipant('customer','customer','provider'),true);
 assert.equal(isParticipant('provider','customer','provider'),true);
 assert.equal(isParticipant('stranger','customer','provider'),false);
 assert.equal(isParticipant('stranger','customer',null),false);
});
