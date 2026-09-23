import type { Metadata } from 'next';
import './globals.css';

const siteUrl='https://www.takeachefhome.com';

export const metadata:Metadata={
  metadataBase:new URL(siteUrl),
  title:{
    default:'TakeAChefHome.com — The Culinary Exchange',
    template:'%s | TakeAChefHome.com',
  },
  description:'Find private chefs, caterers, meal prep, food trucks, culinary jobs, shifts, kitchen space, cold storage and the people who move food work.',
  applicationName:'TakeAChefHome',
  keywords:[
    'private chef','catering','meal prep','food trucks','culinary jobs','chef jobs',
    'kitchen rental','commissary kitchen','cold storage','culinary marketplace'
  ],
  openGraph:{
    type:'website',
    url:siteUrl,
    siteName:'TakeAChefHome.com',
    title:'TakeAChefHome.com — The Culinary Exchange',
    description:'Food service. Food work. Kitchen infrastructure. One culinary exchange.',
  },
  twitter:{
    card:'summary',
    title:'TakeAChefHome.com — The Culinary Exchange',
    description:'Food service. Food work. Kitchen infrastructure. One culinary exchange.',
  },
  alternates:{canonical:'/'},
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="en">
      <body className="bg-[#F3EEE2] text-[#171310] antialiased">{children}</body>
    </html>
  );
}
