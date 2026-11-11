import { accountUser } from "@/lib/account-server";
import { redirect } from "next/navigation";
import AccountShell from "@/components/account-shell";
import SignInForm from "./sign-in-form";
import { localNext } from "@/lib/account-policy";
export default async function SignIn({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; link?: string }>;
}) {
  const { next, link } = await searchParams;
  if (link === "1" && !(await accountUser()))
    redirect("/sign-in?next=/account");
  return (
    <AccountShell>
      <SignInForm next={localNext(next)} link={link === "1"} />
    </AccountShell>
  );
}
