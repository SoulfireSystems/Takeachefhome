const required = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'RESEND_API_KEY',
  'MARKETPLACE_FROM_EMAIL',
];

if (process.env.VERCEL) {
  console.log('TAKEACHEFHOME_ENV_CHECK_START');
  for (const key of required) {
    console.log(`${key}=${process.env[key] ? 'present' : 'missing'}`);
  }
  console.log('TAKEACHEFHOME_ENV_CHECK_END');
}
