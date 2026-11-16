/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() { return [{ source: '/talent/connect', headers: [{key:'Referrer-Policy',value:'no-referrer'},{key:'X-Frame-Options',value:'DENY'},{key:'Cache-Control',value:'private, no-store'}] }]; },
  experimental: {
    serverActions: {
      allowedOrigins: ["*"],
    },
  },
};

module.exports = nextConfig;
