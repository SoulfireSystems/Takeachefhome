# TakeAChefHome V1 Product Contract

## One sentence

**TakeAChefHome is the culinary exchange for finding food service, finding food work, and accessing the infrastructure behind both.**

V1 is utility-first. Every visible marketplace count, provider, request, job, shift, kitchen, storage listing, or product must represent real data.

## The two front doors

### Client marketplace — `/`

People arrive because they need food service or food-business infrastructure.

Primary actions:
- Find a Pro
- Post a Request
- Browse The Board
- Find Space
- Enter Talent only when the visitor works in food

Client service categories:
- Private Chef
- Catering
- Meal Prep
- Food Truck
- Experiences
- Cooking Classes

Infrastructure categories:
- Kitchen Exchange
- Cold Grid
- Chef Gear

### Talent — `/talent`

People arrive because they work in food or need food workers.

Primary actions:
- Find Jobs — `/talent/jobs`
- ALL DAY / Shifts — `/talent/all-day`
- Post Work — `/talent/post`
- Get Listed — `/talent/join`

A professional profile should become the common identity used across client discovery, jobs, shifts, and later booking tools.

## Marketplace lanes

### Find a Pro — `/providers`

This is **supply** for clients.

Clients search active provider profiles by service + city.

Provider submissions begin as `pending`. They do not become public inventory automatically.

### The Board — `/board`

This is **demand**.

Clients post real requests. Professionals browse and respond privately.

The Board is the heartbeat of the marketplace, not the entire website.

Opportunity statuses:
- open
- responses-received
- booked
- closed

### Jobs + ALL DAY

Jobs are ongoing/regular culinary employment.

ALL DAY is short-notice and shift-based work:
- prep crews
- banquet/event staff
- cooks
- servers
- bartenders
- dish
- temporary production help

Do not merge Jobs and ALL DAY into one vague staffing page.

### Kitchen Exchange + Cold Grid

Kitchen Exchange covers:
- commissary kitchens
- prep space
- production kitchens
- ghost-kitchen access

Cold Grid covers:
- cooler space
- freezer space
- overflow storage
- event staging
- temporary refrigerated holding

V1 supports real demand requests. Supply inventory is added only when real space owners are onboarded.

### Chef Gear

Chef Gear remains in the ecosystem.

Direction:
- Buy
- Sell
- Rent

No placeholder product inventory presented as live.

## Visual language

**Craigslist structurally, not visually.**

Principles:
- dense useful choices
- fast scanning
- minimal hunting
- strong category hierarchy
- real marketplace activity near the top
- editorial food-culture energy rather than generic SaaS cards

Core palette:
- Chef Board Blue: `#135DFF`
- Ink: `#171310`
- Warm paper: `#F3EEE2`
- Light paper: `#F8F4EA`
- Brass/gold: `#D4A64F`

Use strong borders and type hierarchy. Photography is an accent, not the navigation system.

## Trust rules

1. Never manufacture provider counts, open jobs, shifts, requests, kitchens, reviews, ratings, or booking volume.
2. Empty state is better than fake activity.
3. Private client/provider contact information never appears on public listings.
4. Provider listings require review before public activation.
5. Uploaded provider photos must be constrained by type and size.
6. Server-side privileged database access stays server-side.
7. Test marketplace data must be clearly marked and deleted after testing.

## V1 transaction loops

### Client request loop

Client posts request
→ opportunity saved
→ appears on The Board
→ professional responds
→ response saved privately
→ opportunity status changes
→ client receives response
→ booking/closure follows

### Provider discovery loop

Professional submits profile
→ pending review
→ profile activated
→ appears in Find a Pro
→ client views profile
→ client posts or later sends targeted request

### Talent loop

Operator posts job or shift
→ opportunity appears in Jobs or ALL DAY
→ worker applies
→ application saved privately
→ operator follows up
→ opportunity is filled/closed

## What V1 deliberately does not need

- social feed
- AI concierge
- complex internal messaging
- native mobile app
- complicated subscriptions
- delivery logistics
- restaurant POS
- fake demo activity
- dozens of dashboards

Build liquidity first.

## Scoreboard

Track:
- active provider profiles
- open client requests
- responses sent
- time to first response
- open jobs
- open shifts
- applications
- requests booked/closed
- gross booking value when payments are added

Pages shipped are not the scoreboard. Marketplace activity is.
