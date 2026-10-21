import TalentJoinForm from './TalentJoinForm';

export default async function TalentJoinPage({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){
  const q=await searchParams;
  const value=(key:string)=>Array.isArray(q[key])?q[key]?.[0]||'':q[key]||'';
  const source=value('source')||value('utm_source')||'talent-direct';
  const referral=value('ref');
  const market=value('market');
  return <TalentJoinForm source={source} referral={referral} market={market}/>;
}
