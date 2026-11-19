const assert=require('node:assert/strict'),{marketplaceRewrites,MARKETPLACE_ORIGIN}=require('../marketplace-routing.cjs');
const rules=marketplaceRewrites(),exact=source=>rules.find(r=>r.source===source&&!r.has);
for(const route of ['/','/account','/sign-in','/join','/forgot-password','/reset-password','/auth/:path*','/api/account','/api/auth','/api/exchange','/api/market','/api/leads','/api/files','/api/passport-link','/api/passports/bridge','/_assets/:path*','/brand/:path*','/favicon.ico','/site.webmanifest'])assert.equal(exact(route).destination,MARKETPLACE_ORIGIN+route,route);
for(const original of ['/talent','/talent/:path*','/api/talent/:path*','/kitchens','/shop','/_next/:path*','/:path*'])assert.equal(exact(original),undefined,'Original application path must remain original: '+original);
assert.equal(rules.find(r=>r.source==='/talent').has[0].key,'view');
assert.equal(exact('/messages').destination,MARKETPLACE_ORIGIN+'/account?section=messages');
assert.equal(exact('/private-chef').destination,MARKETPLACE_ORIGIN+'/private-chefs');
assert.ok(!require('node:fs').readFileSync('app/page.tsx','utf8').includes('redirect('),'Do not redirect visitors to the GPT hostname');
assert.ok(!require('../next.config.js').experimental?.serverActions?.allowedOrigins?.includes('*'));
assert.equal(new Set(rules.map(r=>r.source+JSON.stringify(r.has||[]))).size,rules.length);
console.log('PASS: domain route/API/asset ownership, original Talent isolation, original kitchen/shop routes, legacy aliases, no global catchall and no wildcard Server Action origins.');
const fs=require('node:fs');
function pages(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?pages(dir+'/'+e.name):e.name.endsWith('.tsx')?[dir+'/'+e.name]:[]);}
for(const path of pages('app'))assert.ok(!/<Link\b/.test(fs.readFileSync(path,'utf8')),'Use document navigation across the two framework runtimes: '+path);
console.log('PASS: original-page navigation loads a full document across Next/Vinext boundaries.');
