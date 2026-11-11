# Account, Passport and private inbox connection

Preview implementation, November 11, 2026. No production-branch merge or domain change.

## Existing work preserved

The main-domain seven-step Talent Passport remains in place. The provider directory and trading-card detail view were recovered from `v1-marketplace-engine`, with broken links removed and inquiry actions routed to the new private inbox. Existing provider and talent rows were not replaced. Chef Gregg is provider Card #001; the newer Passport and listing have different contact emails, so they require verification of both addresses before linking.

## Routes

- `/sign-in`: email-code sign-in, using Supabase Auth verification and the existing Resend sender. Codes are never returned to the browser. No email was sent to a real recipient as a test.
- `/account`: owned Passports and provider listings, basic profile editing, independent owner pause, sign-out, and linking another verified email.
- `/inbox`: saved conversations, replies, unread status, refresh, block/unblock and reports.
- `/providers` and `/providers/[id]`: existing active records, public-safe field selection, service/city filters and provider-specific free private inquiries.
- `/talent/admin`: existing protected staff entrance, extended with reported conversations and review status.

Every verified account has an inbox, including talent without a public provider listing. A Passport is not automatically public. Verification connects only profiles belonging to verified email identities, and does not add credential-verification badges. A second established account cannot be silently merged.

## Storage and authorization

`db/account-inbox.sql` is an additive schema change applied to the existing Supabase project. It adds ownership columns, owner pause, verified-identity mapping, conversations, messages, reports and persistent rate limits. Existing listing statuses retain their meanings. New private tables deny direct anonymous/authenticated access and are used through server routes with verified identity and participant checks. Privileged invoker RPCs are executable only by the service role. Message sending checks membership and blocking atomically. All cookie-authenticated writes require same-origin requests.

Anonymous Passport attachments now require a per-submission secret; a public Talent ID alone no longer authorizes uploads. The secret is stored as a hash. Existing profiles must use verified account ownership to upload. Existing private documents remain private.

Next.js was updated from 15.0.5 to pinned 15.5.29, and wildcard Server Action allowed origins were removed. No payments or message-credit charging was enabled.

## Verification

- Production build and TypeScript checks.
- `node --test tests/account-policy.test.cjs`: redirect safety, cross-origin request rejection, participant access decisions.
- `tests/account-inbox.sql`: transactional ownership claim, unverified rejection, identity linking/conflict, inquiry/reply persistence, unrelated sender rejection, blocked sends, owner-paused listing rejection, rate limits and direct-client privilege denial. Test users, listing and messages are rolled back; no test supply remains public.

## Remaining acceptance checks

Verify actual email delivery and sign-in with Gregg's two addresses in the preview; check the linked Passport and Card #001; run a real authorized two-account inquiry/reply and refresh. These are not claimed as completed by a build or the SQL tests. Do not send production emails, publish test listings or charge money as test substitutes.

The existing Sites app remains a separate runtime and record store. Its existing jobs/crew invitations and Prep orders are not automatically synchronized into this new inbox. The inbox reserves lane tags but currently creates food-service inquiry threads only. Message email/SMS/push alerts, attachments, full profile-field editing, account merging, new provider publication, paid public leads and call fees are outside this patch.

The main domain retains its current release until this preview is reviewed and a production release is authorized.
