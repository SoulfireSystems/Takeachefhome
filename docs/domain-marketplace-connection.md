# TakeaChefHome.com / marketplace integration

November 19, 2026. Gregg's direction: place the approved GPT-built marketplace into the existing TakeaChefHome.com website and connect the work already built. Keep the approved logo, house app mark, signature Chef Board Blue and readable Talent lettering. Public users use native email/password accounts, without a ChatGPT login.

## Route ownership

The existing Vercel project stays responsible for TakeaChefHome.com. Exact Next beforeFiles rewrites serve the existing Sites marketplace and its API/assets while the browser stays on the original domain. This keeps its D1/R2 records and encrypted service configuration in their owning runtime. It is not an iframe, a DNS move, a new website or a database merger.

| Visitor action | Route / owning records |
| --- | --- |
| Homepage, ten-category grid, directory, location discovery | `/`, `/directory`, state/city/destination routes; existing Sites runtime |
| Chef, catering, meal prep, food trucks, experiences, classes | Existing category/provider/inquiry routes in Sites |
| Requests, replies, provider quote summaries, account | `/start`, `/my-request`, `/account`, `/account?section=messages`; Sites D1 |
| Paid work and crew-board shift profiles | `/jobs`, `/find-crew`, `/talent?view=...`; existing Sites labor system |
| Original Talent enrollment and Opportunity Board | Bare `/talent`, `/talent/passport`, `/talent/home`, `/talent/board`; original Next/Supabase records |
| Original Talent private APIs, uploads and pipeline | `/api/talent/...`, `/talent/admin`, `/talent/board-admin`; original implementation retained |
| Outsourced prep | Existing `/prep-your-shift` product and named order/partner/capacity/desk/specs routes; Sites D1/R2 |
| Legacy prep-shift applications | Existing original deep routes/API retained; not relabeled as outsourced preparation |
| Kitchens/Cold Grid and Chef Gear | Original `/kitchens` and `/shop`; truthful Coming Soon information, no invented inventory or checkout |
| Owner payments/email configuration | `/account?section=connections`; existing signed-in owner controls and encrypted configuration |
| Private owner agent tools | Existing Sites MCP endpoint/authentication retained; it does not create an unattended scheduler |

Original-page links use document navigation across the Next 15 / Vinext React runtime boundary. Known asset and API paths are proxied explicitly. Original `/_next`, Talent APIs, shop/kitchens and unknown routes are not swallowed by a global catchall.

## Authentication and ownership

The prior native-account/Passport release is recovered from GitHub branch `native-accounts-passport-link`, commit 032e84120bfb9ca8d22738d559dea301e20860bb, on main baseline 67047e09baa17813de6e366ed64a2d0f7ea86035. Its 17 local source files were checked against their GitHub blob hashes before reuse. No separate prior checkout changes were overwritten.

The existing Supabase project udsgkbbfvyokfmsjoauj is ACTIVE_HEALTHY. Read-only aggregates at this checkpoint: 2 Talent Passports, 2 provider profiles, 0 original private conversations and 0 confirmed native accounts. No profile, upload, conversation or account is transferred solely on equal email. The signed bridge requires existing Passport ownership proof, explicit confirmation and one-use short-lived POST tickets.

Fixed-host signed backchannels stay unchanged. Public Passport return/sign-out links return to TakeaChefHome.com. Original-domain ticket POSTs are explicitly accepted as first-party; other origins are denied. Marketplace APIs accept the runtime origin and exact original-domain origins only. Forwarded-host headers and lookalike domains cannot authorize writes. Signup/reset mail uses the actual validated browser origin; callback and sign-out Location headers are relative so the browser remains on its domain.

Supabase callback allowlist and actual confirmation/reset sender/delivery must be verified before production account cutover. Required exact callbacks: https://www.takeachefhome.com/auth/callback, https://takeachefhome.com/auth/callback and https://prep-your-shift.ggg398.chatgpt.site/auth/callback. Confirmation stays enabled. No owner password or email ownership is fabricated to test this.

## Preserved earlier work

The older `fix/passport-account-inbox` branch is two commits ahead and 21 behind main. Its SQL tables and existing provider rows are retained. Its alternative email-code/session/inbox implementation is not merged over the newer account bridge. The provider directory/Card #001 and existing Supabase provider records are not automatically imported into the Sites provider directory by this proxy. That requires explicit provider ownership reconciliation and per-listing approval checks; a cross-app link is not completed migration.

Square/Zoho settings, public paid posting, call fees, provider payouts, native confirmation-mail sending and unattended scheduling are separate operational acceptance items. Existing connection screens/webhook routes are routed, not represented as a successful payment, delivered email, completed paid entitlement or active scheduled agent.

## Verification

- Original Next build passes on pinned 15.5.29 recovered from the reviewed account/inbox branch; its wildcard Server Action origin setting is removed.
- Domain route/asset/API ownership tests, framework-boundary document navigation, native-account origin/PKCE tests, two-application Passport ownership/replay/sign-out tests and existing account/inbox/directory/route suites are required.
- Signed tickets stay hashed at rest and out of URLs. No original or Sites production records are created by fixture tests.
- Browser and deployment acceptance is recorded separately in the project release ledger. A saved branch or build does not mean the combined original-domain experience is live.

Rollback baseline: original production main 67047e09baa17813de6e366ed64a2d0f7ea86035; last session-verified live Sites version 27. Native release v28 was saved but not published by its session. Refresh both live deployments before cutover; no DNS change is planned.
