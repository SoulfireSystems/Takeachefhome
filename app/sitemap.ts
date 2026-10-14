import type { MetadataRoute } from 'next';

const base='https://www.takeachefhome.com';

export default function sitemap():MetadataRoute.Sitemap{
  const routes=[
    '',
    '/providers',
    '/private-chef',
    '/catering',
    '/board',
    '/post-a-lead',
    '/kitchens',
    '/shop',
    '/talent',
    '/talent/jobs',
    '/talent/all-day',
    '/talent/join',
    '/talent/post',
  ];

  return routes.map(route=>({
    url:base+route,
    lastModified:new Date(),
    changeFrequency:route===''?'daily':'weekly',
    priority:route===''?1:route==='/providers'||route==='/board'||route==='/talent'?0.9:0.7,
  }));
}
