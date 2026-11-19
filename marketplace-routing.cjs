// Keep the original Talent, kitchen and shop routes in their owning application.
// Only the known working Exchange routes are served by the existing Sites runtime.
const MARKETPLACE_ORIGIN='https://prep-your-shift.ggg398.chatgpt.site';
const pageRoutes=['/','/exchange','/directory','/providers/:path*','/private-chefs','/catering','/meal-prep','/classes','/brunch','/weddings','/corporate','/service/:path*','/start','/customer-intake','/request','/my-request','/customer-dashboard','/provider-dashboard','/list-services','/post-a-need','/jobs','/find-crew','/states','/cities','/state/:path*','/city/:path*','/international','/destinations','/destination/:path*','/account','/admin','/lead-desk','/rules','/privacy','/terms','/how-it-works','/sign-in','/join','/forgot-password','/reset-password','/auth/:path*','/prep-your-shift','/prep-your-shift/order','/prep-your-shift/partner','/prep-your-shift/capacity','/prep-your-shift/orders','/prep-your-shift/specs','/prep-your-shift/desk'];
const apiRoutes=['/api/account','/api/auth','/api/exchange','/api/market','/api/leads','/api/files','/api/connections','/api/safety','/api/passport-link','/api/passports/bridge','/api/square/webhook'];
const assetRoutes=['/_assets/:path*','/brand/:path*','/favicon.ico','/favicon-32.png','/apple-touch-icon.png','/site.webmanifest'];
function marketplaceRewrites(origin=MARKETPLACE_ORIGIN){
 return [
  ...[...pageRoutes,...apiRoutes,...assetRoutes].map(source=>({source,destination:origin+source})),
  // Preserve old direct links to the existing crew board. Bare /talent stays original.
  {source:'/talent',has:[{type:'query',key:'view'}],destination:origin+'/talent'},
  {source:'/private-chef',destination:origin+'/private-chefs'},
  {source:'/post-a-lead',destination:origin+'/start'},
  {source:'/messages',destination:origin+'/account?section=messages'},
  {source:'/inbox',destination:origin+'/account?section=messages'}
 ];
}
module.exports={MARKETPLACE_ORIGIN,pageRoutes,apiRoutes,assetRoutes,marketplaceRewrites};
