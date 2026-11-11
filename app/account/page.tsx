import { redirect } from "next/navigation";
import { accountUser, claimProfiles, myProfiles } from "@/lib/account-server";
import AccountShell from "@/components/account-shell";
import AccountProfiles from "./profiles";
export const dynamic = "force-dynamic";
export default async function AccountPage() {
  const user = await accountUser();
  if (!user) redirect("/sign-in?next=/account");
  try {
    await claimProfiles(user.id);
    const profiles = await myProfiles(user.id);
    return (
      <AccountShell>
        <AccountProfiles initial={profiles} />
      </AccountShell>
    );
  } catch {
    return (
      <AccountShell>
        <h1 className="text-3xl font-black">Your account</h1>
        <p role="alert" className="mt-5">
          We couldn’t load your profiles. Your existing details haven’t been
          changed. Please reload this page.
        </p>
      </AccountShell>
    );
  }
}
