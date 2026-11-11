import { redirect } from "next/navigation";
import AccountShell from "@/components/account-shell";
import { accountUser } from "@/lib/account-server";
import Inbox from "./inbox";
export const dynamic = "force-dynamic";
export default async function InboxPage({
  searchParams,
}: {
  searchParams: Promise<{ provider?: string; id?: string }>;
}) {
  const params = await searchParams;
  const qs = new URLSearchParams();
  if (params.provider) qs.set("provider", params.provider);
  if (params.id) qs.set("id", params.id);
  if (!(await accountUser()))
    redirect(
      "/sign-in?next=" +
        encodeURIComponent("/inbox" + (qs.size ? "?" + qs : "")),
    );
  return (
    <AccountShell>
      <Inbox provider={params.provider || ""} initialId={params.id || ""} />
    </AccountShell>
  );
}
