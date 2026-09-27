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


## Visual Metaphors by Marketplace Lane

TakeAChefHome does **not** use one generic card component for every category. Each lane borrows a familiar visual language that matches how people already think about that kind of purchase or work.

### The Roster — provider cards

Used for:
- Private Chefs
- Catering companies / teams
- Food Trucks

Visual language:
- premium trading card / baseball card
- serial card number
- strong portrait or vehicle/team image
- role / business type
- home market
- verified mark
- factual stats only
- services
- experience
- starting minimum

Private Chef cards emphasize the individual.
Catering cards emphasize the team/business and event capacity.
Food Truck cards emphasize the truck, cuisine, event fit and service radius.

Do not use invented ratings, fake scores or gamified skill numbers.

### The Weekly — meal prep

Meal Prep uses a **weekly meal sheet / subscription plan / grocery circular** visual language.

Primary information:
- meals per week
- portions
- cuisine style
- dietary options
- delivery or pickup days
- service market
- weekly starting price
- rotating menu or sample menu

The product is the plan, not the provider portrait.

### The Experience Guide — culinary experiences

Experiences use a **ticket / event poster / showbill** visual language.

Primary information:
- experience title
- host
- city
- date or availability
- duration
- capacity
- private / ticketed / group
- starting price

The interface should feel like discovering something to attend.

### The Class Catalog — cooking classes

Cooking Classes use a **course catalog / workshop card / recipe index card** visual language.

Primary information:
- class title
- level
- duration
- class size
- format
- what guests will make or learn
- what is included
- price

The interface should feel educational without resembling a generic school website.

### ALL DAY — shift workers

ALL DAY uses a **crew credential + timecard + call sheet** visual language.

Shift workers do not get the same trading-card treatment as client-facing chefs/caterers.

#### Worker identity: Crew Pass

Each worker has a compact **Crew Pass** inspired by an event credential or union work card.

Display only factual information:
- name / preferred work name
- primary roles
- home market
- travel radius or service area
- availability status
- years experience, when supplied
- certifications, when verified
- transportation status, when voluntarily supplied and appropriate
- profile photo
- completed-platform shifts, once real data exists
- last active / availability update, once real data exists

Possible role marks:
- PREP
- LINE
- BANQUET
- SERVER
- BAR
- DISH
- LEAD
- RUNNER
- SETUP
- BREAKDOWN

Do not invent a reliability score, star rating, speed score or other gamified worker ranking.

#### Shift opportunity: Call Sheet

Every ALL DAY shift is presented like a **call sheet / shift ticket**.

Primary information:
- role needed
- date
- call time
- end time
- market / venue area
- pay
- number of workers needed
- uniform
- key duties
- requirements
- parking / arrival instructions when appropriate
- status: OPEN / FILLING / FILLED

The visual hierarchy should make date, call time and pay readable in seconds.

#### Worker-to-shift flow

Worker opens ALL DAY
→ scans Call Sheets
→ opens a shift
→ sees role, time, pay and requirements
→ applies / claims interest
→ operator reviews Crew Pass
→ operator confirms worker
→ shift moves toward FILLED
→ completed work becomes factual marketplace history

The design goal is to feel closer to **back-of-house dispatch** than a generic jobs website.

### Marketplace visual map

- Private Chef → Player Card
- Catering → Team Card
- Food Truck → Truck Card
- Meal Prep → Weekly Meal Sheet
- Experience → Ticket / Poster
- Cooking Class → Course / Recipe Card
- Shift Worker → Crew Pass
- Shift Opportunity → Call Sheet
- The Board → Classified Exchange Board
- Kitchen Exchange / Cold Grid → Property / Infrastructure Listing
- Chef Gear → Equipment Classified

Familiar behavior, distinct TakeAChefHome identity.
