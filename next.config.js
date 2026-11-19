const {marketplaceRewrites}=require('./marketplace-routing.cjs');
/** @type {import('next').NextConfig} */
module.exports={
 async rewrites(){return {beforeFiles:marketplaceRewrites(),afterFiles:[],fallback:[]};},
 async redirects(){return [{source:'/signin-with-chatgpt',destination:'/sign-in',permanent:false},{source:'/signout-with-chatgpt',destination:'/auth/sign-out',permanent:false}];},
 async headers(){return [
  {source:'/talent/connect',headers:[{key:'Referrer-Policy',value:'no-referrer'},{key:'X-Frame-Options',value:'DENY'},{key:'Cache-Control',value:'private, no-store'}]},
  {source:'/api/:path*',headers:[{key:'Cache-Control',value:'private, no-store'}]},
  {source:'/account',headers:[{key:'Cache-Control',value:'private, no-store'}]},
  {source:'/auth/:path*',headers:[{key:'Cache-Control',value:'private, no-store'},{key:'Referrer-Policy',value:'no-referrer'}]}
 ];}
};
