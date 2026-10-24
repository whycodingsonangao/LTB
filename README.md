# Kampung Exchange (mock-up)

Clickable mock-up of a members-only resource-sharing platform for Singapore's community well-being charities. Built for LTB (COR-MGMT1301) Group 6 Wolverine. The visual language follows [majurity.sg](https://www.majurity.sg/).

**All data is mocked.** Organisations, listings, reviews and figures are fictional.

## Run it

Double-click `index.html`. No build step or server is needed.

Demo state (bookings, credits, new listings) is saved in your browser's localStorage. Use **Reset demo data** in the top bar to start over.

## What's in it

| Page | Route | Shows |
|---|---|---|
| Home | `#/` | Hero search ("I need X on date within Y km"), impact stats, List/Link/Lend, 4 resource pools, how it works, trust model |
| Browse | `#/browse` | Filters (pool, category, date, distance, instant-book, free), sort, live match count |
| Listing | `#/listing/L1` | Standardised category, weekly availability, house rules, owner trust score, reviews, booking panel (Instant vs Request to Book, credit maths) |
| Organisation | `#/org/o2` | Member profile, listings and reviews |
| Dashboard | `#/dashboard` | Overview, incoming requests (approve/decline), my bookings, my listings (pause/resume), credit ledger |
| List a resource | `#/new` | Create a listing; goes live immediately (members are pre-verified) |
| Join | `#/join` | Verified-charity application (UEN, charity no., IPC, documents) |
| TMT Admin | `#/admin` | Verification queue, flagged listings, exchange metrics, members by trust score |

Switch between **charity member** and **TMT Admin** using the "Viewing as" dropdown in the top bar.

### Suggested demo walkthrough
1. Home → search for *Space: Training Room* within 10 km.
2. Open a listing → Instant book one, or send a request.
3. Dashboard → My bookings → **Simulate approval** → **Mark completed** → rate the lender.
4. Incoming requests → approve a request from another charity.
5. Join → submit an application → switch to TMT Admin → verify it.

## Files
- `index.html`: page shell
- `css/styles.css`: design tokens and components
- `js/data.js`: all mock data (edit here to change orgs and listings)
- `js/app.js`: hash router, views and interactions (vanilla JS)
