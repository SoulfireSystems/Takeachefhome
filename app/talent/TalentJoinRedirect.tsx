'use client';

import { useEffect } from 'react';

export default function TalentJoinRedirect(){
  useEffect(()=>{
    const handler=(event:MouseEvent)=>{
      if(window.location.pathname!=='/talent') return;
      const target=event.target as HTMLElement|null;
      const button=target?.closest('button');
      if(!button) return;
      event.preventDefault();
      event.stopPropagation();
      window.location.assign('/talent/join?source=talent-home');
    };
    document.addEventListener('click',handler,true);
    return()=>document.removeEventListener('click',handler,true);
  },[]);
  return null;
}
