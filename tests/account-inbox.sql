begin;
do $$
declare
 owner_id uuid:=gen_random_uuid(); customer_id uuid:=gen_random_uuid(); stranger_id uuid:=gen_random_uuid();
 unverified_id uuid:=gen_random_uuid(); provider_id uuid; thread_id uuid; blocked boolean:=false; denied boolean:=false;
begin
 insert into auth.users(id,email,email_confirmed_at) values
 (owner_id,'inbox-owner-test@example.invalid',now()),
 (customer_id,'inbox-customer-test@example.invalid',now()),
 (stranger_id,'inbox-stranger-test@example.invalid',now()),
 (unverified_id,'inbox-unverified-test@example.invalid',null);
 insert into public.provider_profiles(display_name,professional_type,city,bio,contact_name,contact_email,status)
 values('ISOLATED INBOX TEST','chef','Test','Transaction-only verification','Test','inbox-owner-test@example.invalid','active') returning id into provider_id;
 perform public.account_bind_identity(owner_id,owner_id);
 perform public.account_bind_identity(stranger_id,owner_id);
 perform public.account_claim_profiles(owner_id);
 denied:=false;
 begin perform public.account_bind_identity(stranger_id,customer_id);exception when others then denied:=true;end;
 if not denied then raise exception 'Verified identity could be moved to another account';end if;
 if not exists(select 1 from public.provider_profiles where id=provider_id and account_id=owner_id) then raise exception 'Ownership claim failed';end if;
 begin perform public.account_claim_profiles(unverified_id);exception when others then denied:=true;end;
 if not denied then raise exception 'Unverified claim was allowed';end if;
 thread_id:=public.account_send_message(customer_id,'Initial test inquiry',null,provider_id,'Isolated test');
 perform public.account_send_message(owner_id,'Provider test reply',thread_id);
 if (select count(*) from public.account_messages where conversation_id=thread_id)<>2 then raise exception 'Message persistence failed';end if;
 denied:=false;
 begin perform public.account_send_message(stranger_id,'Unauthorized reply',thread_id);exception when others then denied:=true;end;
 if not denied then raise exception 'Unrelated account could send';end if;
 update public.account_conversations set provider_blocked=true where id=thread_id;
 denied:=false;
 begin perform public.account_send_message(customer_id,'Blocked reply',thread_id);exception when others then denied:=true;end;
 if not denied then raise exception 'Blocked conversation accepted message';end if;
 update public.provider_profiles set owner_paused=true where id=provider_id;
 denied:=false;
 begin perform public.account_send_message(customer_id,'New request',null,provider_id,'Paused provider');exception when others then denied:=true;end;
 if not denied then raise exception 'Paused listing accepted new inquiry';end if;
 if not public.account_rate_limit('transaction-test',900,1) then raise exception 'Initial rate-limit failed';end if;
 if public.account_rate_limit('transaction-test',900,1) then raise exception 'Rate-limit failed';end if;
 if has_table_privilege('anon','public.account_messages','SELECT') or has_table_privilege('authenticated','public.account_messages','SELECT') then raise exception 'Direct message read grant detected';end if;
 if has_function_privilege('anon','public.account_claim_profiles(uuid)','EXECUTE') or has_function_privilege('authenticated','public.account_send_message(uuid,text,uuid,uuid,text)','EXECUTE') then raise exception 'Privileged RPC is exposed';end if;
end; $$;
rollback;
select 'PASS: claim, unverified rejection, inquiry, reply, unauthorized sender, block, pause, rate limits, private grants; fixtures rolled back' as result;
