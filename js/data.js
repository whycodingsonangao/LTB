// All data below is fictional and exists only for the mock-up.
// Organisation names, people, reviews and figures are invented.

// Demo dates are relative to the day the page is opened, so upcoming bookings and
// pending requests never drift into the past. demoDate(offset, days): `offset` days
// from today (negative = past), then stepped away from today until it lands on one
// of `days` (0=Sun ... 6=Sat), matching the listing's availability.
const DEMO_TODAY = new Date();
DEMO_TODAY.setHours(0, 0, 0, 0);
function demoDate(offset, days) {
  const d = new Date(DEMO_TODAY);
  d.setDate(d.getDate() + offset);
  const step = offset < 0 ? -1 : 1;
  for (let i = 0; days && i < 7 && !days.includes(d.getDay()); i++) d.setDate(d.getDate() + step);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
const WEEKDAYS = [1, 2, 3, 4, 5];

// Credit economics. Donors fund credits with real money and TMT, as the neutral
// trusted party, issues them. 1 credit = S$10. Owners are valued at 75% of the
// market rate, and every listing must sit inside the band below.
const CREDIT_VALUE = 10;
const PAYOUT_RATE = 0.75;
const RATE_BAND = { min: 0.5, max: 1 };
const creditsFor = (marketValue) => Math.max(1, Math.round((marketValue * PAYOUT_RATE) / CREDIT_VALUE));

// The four resource types from the Re.Source brand ("More resources for less waste").
const POOLS = {
  space: { id: "space", label: "Spaces", short: "Spaces", sub: "Venues & facilities", icon: "home",
    blurb: "Training rooms, halls, kitchens and storage that sit empty between programmes, in one of the world's priciest rental markets.",
    examples: ["Training rooms & event halls", "Pallet & warehouse space", "Hot desks & commercial kitchens"] },
  manpower: { id: "manpower", label: "Manpower", short: "Manpower", sub: "Volunteers & expertise", icon: "users",
    blurb: "Volunteers and spare staff hours shared across organisations, from weekend drivers to experienced facilitators.",
    examples: ["Volunteer drivers", "Trainers & facilitators", "Event and programme volunteers"] },
  equipment: { id: "equipment", label: "Equipment", short: "Equipment", sub: "Tools & transport", icon: "truck",
    blurb: "Vans, trucks, event furniture, AV kits and mobility aids, borrowed for a day instead of bought.",
    examples: ["14-seater & wheelchair vans", "Chairs, tables & AV kits", "Wheelchairs & refurbished laptops"] },
  services: { id: "services", label: "Services", short: "Services", sub: "Skills & support", icon: "tool",
    blurb: "Professional skills given pro bono: a designer for two weeks, an accountant for audit season.",
    examples: ["Pro-bono accountants", "Graphic design", "IT support"] },
};

// Standardised taxonomy: "<Type>: <Resource>"
const CATEGORIES = [
  { id: "van-14", pool: "equipment", label: "Asset: 14-Seater Van", icon: "truck" },
  { id: "van-wheelchair", pool: "equipment", label: "Asset: Wheelchair Van", icon: "truck" },
  { id: "van-chiller", pool: "equipment", label: "Asset: Refrigerated Van", icon: "truck" },
  { id: "truck-tail", pool: "equipment", label: "Asset: Tail-lift Truck", icon: "truck" },
  { id: "svc-driver", pool: "manpower", label: "Manpower: Volunteer Driver", icon: "users" },
  { id: "space-training", pool: "space", label: "Space: Training Room", icon: "home" },
  { id: "space-hall", pool: "space", label: "Space: Event Hall", icon: "home" },
  { id: "space-storage", pool: "space", label: "Space: Storage", icon: "box" },
  { id: "space-desk", pool: "space", label: "Space: Hot Desk", icon: "monitor" },
  { id: "space-kitchen", pool: "space", label: "Space: Commercial Kitchen", icon: "coffee" },
  { id: "eq-furniture", pool: "equipment", label: "Equipment: Event Furniture", icon: "grid" },
  { id: "eq-av", pool: "equipment", label: "Equipment: AV Kit", icon: "monitor" },
  { id: "eq-laptops", pool: "equipment", label: "Equipment: Laptops", icon: "monitor" },
  { id: "eq-mobility", pool: "equipment", label: "Equipment: Mobility Aids", icon: "tool" },
  { id: "svc-accountant", pool: "services", label: "Service: Pro-bono Accountant", icon: "dollar" },
  { id: "svc-design", pool: "services", label: "Service: Graphic Design", icon: "pen" },
  { id: "svc-it", pool: "services", label: "Service: IT Support", icon: "monitor" },
  { id: "svc-training", pool: "manpower", label: "Manpower: Trainer & Facilitator", icon: "users" },
];

const ORGS = [
  { id: "o1", name: "Harbourlight Family Services", short: "HF", type: "charity", area: "Toa Payoh", lat: 1.3343, lng: 103.8563, trust: 4.8, exchanges: 27, since: "Mar 2026", ipc: true, uen: "S98SS0123A", color: "#C92746", focus: "Families & caregivers" },
  { id: "o2", name: "Silver Threads Eldercare", short: "ST", type: "charity", area: "Ang Mo Kio", lat: 1.3691, lng: 103.8454, trust: 4.9, exchanges: 41, since: "Mar 2026", ipc: true, uen: "S03SS0456B", color: "#1E3F8A", focus: "Seniors" },
  { id: "o3", name: "Lighthouse Youth Network", short: "LY", type: "charity", area: "Jurong West", lat: 1.3404, lng: 103.7090, trust: 4.7, exchanges: 19, since: "Apr 2026", ipc: true, uen: "T11SS0789C", color: "#F25300", focus: "Youth" },
  { id: "o4", name: "Kampong Meals Collective", short: "KM", type: "charity", area: "Bedok", lat: 1.3236, lng: 103.9273, trust: 4.6, exchanges: 33, since: "Mar 2026", ipc: false, uen: "T15SS0234D", color: "#1E8A5B", focus: "Food support" },
  { id: "o5", name: "Hearts & Hands Disability Services", short: "HH", type: "charity", area: "Bukit Batok", lat: 1.3590, lng: 103.7637, trust: 4.9, exchanges: 22, since: "Apr 2026", ipc: true, uen: "S89SS0567E", color: "#6B3FA0", focus: "Persons with disabilities" },
  { id: "o6", name: "Second Wind Caregivers Association", short: "SW", type: "charity", area: "Tampines", lat: 1.3496, lng: 103.9568, trust: 4.5, exchanges: 15, since: "May 2026", ipc: true, uen: "T18SS0890F", color: "#C24400", focus: "Caregivers" },
  { id: "o7", name: "Evergreen Bereavement Care", short: "EB", type: "charity", area: "Queenstown", lat: 1.2942, lng: 103.7861, trust: 4.8, exchanges: 11, since: "May 2026", ipc: true, uen: "T19SS0345G", color: "#29313E", focus: "Grief support" },
  { id: "o8", name: "Northstar Community Services", short: "NS", type: "charity", area: "Woodlands", lat: 1.4382, lng: 103.7890, trust: 4.7, exchanges: 24, since: "Mar 2026", ipc: true, uen: "S95SS0678H", color: "#0A7EA4", focus: "Community resilience" },
  { id: "o9", name: "Bloom Mental Wellness", short: "BM", type: "charity", area: "Novena", lat: 1.3204, lng: 103.8438, trust: 4.6, exchanges: 13, since: "Jun 2026", ipc: false, uen: "T21SS0901J", color: "#E74056", focus: "Mental well-being" },
  { id: "c1", name: "Swiftline Logistics", short: "SL", type: "corporate", area: "Ubi", lat: 1.3299, lng: 103.8990, trust: 5.0, exchanges: 18, since: "Mar 2026", color: "#29313E", focus: "Corporate partner" },
  { id: "c2", name: "Meridian Bank Singapore", short: "MB", type: "corporate", area: "Raffles Place", lat: 1.2840, lng: 103.8514, trust: 4.9, exchanges: 21, since: "Mar 2026", color: "#29313E", focus: "Corporate partner" },
  { id: "c3", name: "Brightpath Tech", short: "BT", type: "corporate", area: "one-north", lat: 1.2995, lng: 103.7872, trust: 4.8, exchanges: 9, since: "Jul 2026", color: "#29313E", focus: "Corporate partner" },
];

// days: 0=Sun ... 6=Sat. booking: "instant" | "request". credits: per unit (0 = corporate gift).
const LISTINGS = [
  { id: "L1", orgId: "o2", cat: "van-14", title: "14-seater van (driver optional)", days: [2, 4], time: "1:00pm - 6:00pm", booking: "request", credits: creditsFor(180), unit: "half-day", value: 180, qty: "1 van",
    desc: "Our van runs morning senior-centre pickups and sits idle on Tuesday and Thursday afternoons. Ideal for excursions, home-visit teams or event transport. One of our trained volunteer drivers can come along if you give us 3 days' notice.",
    rules: ["Return with at least half a tank", "No food on board", "Driver must hold a Class 3 licence"] },
  { id: "L2", orgId: "o5", cat: "van-wheelchair", title: "Wheelchair-accessible van with tail-lift", days: [1, 3, 5], time: "9:00am - 1:00pm", booking: "request", credits: creditsFor(260), unit: "half-day", value: 260, qty: "2 wheelchairs + 6 seated",
    desc: "Tail-lift van fitted for two wheelchair users plus six seated passengers. Perfect for medical appointments, outings and day-care transfers. Wheelchair tie-down training is provided at handover.",
    rules: ["Short handover briefing required", "Return by 1:15pm"] },
  { id: "L3", orgId: "c1", cat: "truck-tail", title: "Tail-lift truck slots + driver (Saturdays)", days: [6], time: "8:00am - 12:00pm", booking: "request", credits: 0, unit: "slot", value: 350, qty: "10ft truck",
    desc: "Swiftline donates idle Saturday-morning capacity on our 10ft tail-lift trucks, with a professional driver. Great for donation drives, moving furniture to beneficiaries' homes or bulk food deliveries.",
    rules: ["Loading and unloading crew to be provided by the borrower", "Max 1.5 tonnes"] },
  { id: "L4", orgId: "o4", cat: "van-chiller", title: "Refrigerated van for food-rescue runs", days: [0], time: "2:00pm - 7:00pm", booking: "request", credits: creditsFor(220), unit: "session", value: 220, qty: "1 chiller van",
    desc: "Chiller van (0-4°C) used for our weekday food-rescue routes. Available on Sunday afternoons for anyone moving perishables or cooked food for distribution.",
    rules: ["Clean and sanitise the cargo area after use", "Log the temperature at pickup and return"] },
  { id: "L5", orgId: "o1", cat: "space-training", title: "Training room for 30, with projector", days: [1, 2, 3, 4, 5], time: "7:00pm - 10:00pm", booking: "request", credits: creditsFor(300), unit: "session", value: 300, qty: "30 pax",
    desc: "Bright training room at our Toa Payoh centre with a projector, whiteboard and 30 chairs. Free on weekday evenings after our programmes end. Five minutes' walk from Braddell MRT.",
    rules: ["Reset the room layout after use", "Keep noise down after 9:30pm"] },
  { id: "L6", orgId: "c2", cat: "space-hall", title: "Auditorium & breakout rooms (120 pax)", days: [6], time: "9:00am - 6:00pm", booking: "request", credits: 0, unit: "day", value: 2400, qty: "120 pax + 3 rooms",
    desc: "Meridian Bank opens its level 3 auditorium and three breakout rooms on Saturdays for exclusive charity use. AV technician on site. Suits volunteer briefings, public workshops and AGMs.",
    rules: ["Security registration 48h before", "No open flames or cooking"] },
  { id: "L7", orgId: "o6", cat: "space-storage", title: "Warehouse pallet space (up to 4 pallets)", days: [0, 1, 2, 3, 4, 5, 6], time: "Access 9:00am - 6:00pm", booking: "request", credits: creditsFor(120), unit: "week", value: 120, qty: "4 pallet bays",
    desc: "Spare pallet bays in our Tampines warehouse, ideal for storing diapers, canned food, wheelchairs and other donation stock between drives. Racking and a pallet jack are available.",
    rules: ["No perishables or hazardous items", "Label every pallet with your organisation's name"] },
  { id: "L8", orgId: "o9", cat: "space-desk", title: "Hot desks x4 in a quiet office", days: [1, 2, 3, 4, 5], time: "9:00am - 6:00pm", booking: "instant", credits: creditsFor(40), unit: "day", value: 40, qty: "4 desks",
    desc: "Four hot desks with Wi-Fi, a printer and a pantry. Good for staff who need a central base between home visits, or small teams who need a quiet day to work on grant applications.",
    rules: ["Clear the desk at the end of the day"] },
  { id: "L9", orgId: "o7", cat: "space-kitchen", title: "Commercial kitchen (Saturday afternoons)", days: [6], time: "1:00pm - 6:00pm", booking: "request", credits: creditsFor(400), unit: "session", value: 400, qty: "6 burners, 2 ovens",
    desc: "NEA-licensed commercial kitchen used for weekday meal programmes. Free on Saturday afternoons for cooking workshops, festive meal prep or social-enterprise trials.",
    rules: ["Food-handler certificate required", "Deep-clean checklist on exit"] },
  { id: "L10", orgId: "o3", cat: "eq-furniture", title: "80 stackable chairs + 12 foldable tables", days: [0, 1, 2, 3, 4, 5, 6], time: "Pickup 10:00am - 8:00pm", booking: "instant", credits: creditsFor(150), unit: "day", value: 150, qty: "80 chairs, 12 tables",
    desc: "Event furniture kept at our Jurong West hub. Self-collect (you'll need a van) or pair it with a transport listing. Take any quantity you need.",
    rules: ["Return within 24h of your booking date", "Wipe down before returning"] },
  { id: "L11", orgId: "o8", cat: "eq-av", title: "Portable PA system & projector kit", days: [0, 1, 2, 3, 4, 5, 6], time: "Pickup 9:00am - 6:00pm", booking: "instant", credits: creditsFor(120), unit: "day", value: 120, qty: "1 kit",
    desc: "Battery-powered PA speaker with 2 wireless mics, a 3,000-lumen projector, a portable screen and an HDMI adapter set. Packed in a wheeled case.",
    rules: ["Charge the speaker before returning"] },
  { id: "L12", orgId: "c3", cat: "eq-laptops", title: "Refurbished laptops (loan or donate)", days: [1, 2, 3, 4, 5], time: "Collect 10:00am - 5:00pm", booking: "request", credits: 0, unit: "batch", value: 6000, qty: "15 laptops",
    desc: "Retired Brightpath laptops, wiped and refurbished with Windows 11 and Office. Available as a loan for training programmes, or as a permanent donation to verified charities.",
    rules: ["Tell us how you plan to use them in your request"] },
  { id: "L13", orgId: "o1", cat: "eq-mobility", title: "Wheelchairs x6 (short-term loan)", days: [0, 1, 2, 3, 4, 5, 6], time: "Pickup 9:00am - 5:00pm", booking: "instant", credits: creditsFor(30), unit: "day", value: 30, qty: "6 wheelchairs",
    desc: "Foldable manual wheelchairs for outings, events or short-term beneficiary needs while a permanent aid is being arranged.",
    rules: ["Max loan of 14 days", "Report any damage on return"] },
  { id: "L14", orgId: "o3", cat: "svc-design", title: "Graphic designer volunteer - 10 hrs/month", days: [1, 2, 3, 4, 5], time: "Flexible, remote", booking: "request", credits: creditsFor(80), unit: "hour", value: 80, qty: "10 hrs/month",
    desc: "Our long-time volunteer designer has spare hours this quarter. Annual reports, event posters, social media kits, donor decks. Brief over a call, delivered in Canva or Figma.",
    rules: ["Send a brief at least 1 week ahead", "Credit the designer in the final work"] },
  { id: "L15", orgId: "c2", cat: "svc-accountant", title: "Pro-bono accountants for audit prep", days: [1, 3], time: "Evenings, remote or on-site", booking: "request", credits: 0, unit: "engagement", value: 3000, qty: "Team of 2-3",
    desc: "Meridian's finance volunteers help small charities prepare for their annual audit, tidy up their books and set up simple budgeting templates. Engagements run 2-4 weeks.",
    rules: ["One engagement per organisation per year"] },
  { id: "L16", orgId: "o9", cat: "svc-it", title: "IT volunteer - 5 hrs/week", days: [2, 4], time: "2:00pm - 6:00pm", booking: "instant", credits: creditsFor(70), unit: "hour", value: 70, qty: "5 hrs/week",
    desc: "Laptop set-up, Microsoft 365 and Google Workspace admin, Wi-Fi troubleshooting and basic cybersecurity hygiene checks. Remote or on-site in central Singapore.",
    rules: [] },
  { id: "L17", orgId: "c1", cat: "svc-driver", title: "Volunteer drivers (Class 3/4)", days: [0, 6], time: "8:00am - 6:00pm", booking: "request", credits: 0, unit: "shift", value: 160, qty: "Up to 4 drivers",
    desc: "Swiftline staff volunteer as drivers on weekends. Pair them with any van listing on the exchange, or with your own vehicles when your regular drivers are away.",
    rules: ["Book at least 5 days ahead"] },
  { id: "L18", orgId: "o6", cat: "svc-training", title: "Caregiver-training facilitator", days: [3, 6], time: "Flexible", booking: "request", credits: creditsFor(120), unit: "hour", value: 120, qty: "1 facilitator",
    desc: "Experienced facilitator who runs our caregiver-resilience workshops. Can deliver a session to your caregivers or train your staff to run it themselves.",
    rules: ["Minimum 2-hour session"] },
  { id: "L19", orgId: "o9", cat: "space-training", title: "Workshop room for 20, with TV screen", days: [1, 2, 3, 4, 5, 6], time: "9:00am - 5:00pm", booking: "instant", credits: creditsFor(180), unit: "session", value: 180, qty: "20 pax",
    desc: "Our group-therapy room in Novena doubles as a workshop space when sessions aren't running. It has a 65-inch TV screen, a whiteboard and stackable chairs for 20. Two minutes' walk from Novena MRT.",
    rules: ["Leave the room as you found it", "No food in the room"] },
];

// Past exchanges shared by the bookings, ledger and reviews below, so they stay in step.
const PAST = {
  designDone: demoDate(-39, WEEKDAYS), // Harbourlight used Lighthouse's designer (L14)
  bloomLent: demoDate(-29, WEEKDAYS), // Harbourlight lent its training room to Bloom (L5)
  wheelchairsLent: demoDate(-20), // Harbourlight lent wheelchairs to Northstar (L13)
  paKit: demoDate(-14), // Harbourlight borrowed Northstar's PA kit (L11)
  evergreenLent: demoDate(-9, WEEKDAYS), // Harbourlight lent its training room to Evergreen (L5)
  chairsBooked: demoDate(-4), // Harbourlight booked Lighthouse's chairs (L10)
};

const REVIEWS = [
  { listingId: "L1", from: "o3", stars: 5, date: demoDate(-15, [2, 4]), text: "Van was spotless and the volunteer driver knew the route to the nature park. Saved us about $180 on our youth excursion.", tags: ["As described", "On time"] },
  { listingId: "L1", from: "o8", stars: 5, date: demoDate(-36, [2, 4]), text: "Smooth handover. Silver Threads was flexible when our session overran.", tags: ["Flexible"] },
  { listingId: "L2", from: "o2", stars: 5, date: demoDate(-22, [1, 3, 5]), text: "Tie-down briefing was really thorough. Our seniors felt safe.", tags: ["As described", "Great briefing"] },
  { listingId: "L3", from: "o4", stars: 5, date: demoDate(-12, [6]), text: "Swiftline's driver helped load 300 food packs. Incredible.", tags: ["Above and beyond"] },
  { listingId: "L5", from: "o7", stars: 5, date: PAST.evergreenLent, text: "Room was ready and the projector worked first time. Will book again for our volunteer onboarding.", tags: ["As described", "Clean"] },
  { listingId: "L5", from: "o9", stars: 4, date: PAST.bloomLent, text: "Great space. Parking is tight in the evenings, so plan ahead.", tags: ["As described"] },
  { listingId: "L6", from: "o5", stars: 5, date: demoDate(-26, [6]), text: "Hosted our 100-person volunteer appreciation day here. The AV tech was a lifesaver.", tags: ["Above and beyond"] },
  { listingId: "L7", from: "o4", stars: 4, date: demoDate(-23), text: "Handy for storing our festive hamper stock. Access hours could be longer.", tags: ["Secure"] },
  { listingId: "L10", from: "o1", stars: 5, date: demoDate(-18), text: "Chairs and tables were exactly as listed. Easy self-collect.", tags: ["As described", "Easy pickup"] },
  { listingId: "L10", from: "o6", stars: 4, date: demoDate(-40), text: "A couple of the tables were wobbly, but overall very useful.", tags: ["Good value"] },
  { listingId: "L11", from: "o2", stars: 5, date: demoDate(-24), text: "Mic quality was great for our seniors' karaoke afternoon!", tags: ["As described"] },
  { listingId: "L14", from: "o1", stars: 5, date: demoDate(-34, WEEKDAYS), text: "Our annual report finally looks professional. Fast turnaround too.", tags: ["Professional", "Fast"] },
  { listingId: "L15", from: "o7", stars: 5, date: demoDate(-55, [1, 3]), text: "Took us from a shoebox of receipts to audit-ready in three weeks.", tags: ["Professional"] },
  { listingId: "L12", from: "o3", stars: 5, date: demoDate(-49, WEEKDAYS), text: "15 laptops for our youth coding club. Life-changing for the kids.", tags: ["Above and beyond"] },
];

const CURRENT_ORG_ID = "o1";
const DONOR_ORG_ID = "c2";

// A member of the public (not an organisation). Singpass-verified, buys credits to use resources.
const PUBLIC_USER = { id: "u1", name: "Amelia Tan", short: "AT", type: "public", area: "Bishan", lat: 1.3526, lng: 103.8352, trust: 4.7, exchanges: 2, since: "Aug 2026", color: "#0A7EA4", focus: "Individual member" };

// Initial demo state (persisted to localStorage after first change).
const SEED_STATE = {
  role: "charity",
  bookings: [
    { id: "B1", listingId: "L10", by: "o1", date: demoDate(2), units: 1, status: "confirmed", created: PAST.chairsBooked },
    { id: "B2", listingId: "L1", by: "o1", date: demoDate(3, [2, 4]), units: 1, status: "pending", created: demoDate(-2) },
    { id: "B3", listingId: "L11", by: "o1", date: PAST.paKit, units: 1, status: "completed", created: demoDate(-21), ratedByBorrower: false },
    { id: "B4", listingId: "L14", by: "o1", date: PAST.designDone, units: 6, status: "completed", created: demoDate(-53), ratedByBorrower: true },
    { id: "B5", listingId: "L5", by: "o4", date: demoDate(4, WEEKDAYS), units: 1, status: "pending", created: demoDate(-1), note: "Volunteer briefing for our food-pack drive, about 25 people." },
    // L13 is instant-book, so this booking was confirmed straight away (no approval step).
    { id: "B6", listingId: "L13", by: "o2", date: demoDate(6), units: 3, status: "confirmed", created: demoDate(-1), note: "Three wheelchairs for a seniors' outing to Gardens by the Bay." },
    { id: "B7", listingId: "L5", by: "o7", date: PAST.evergreenLent, units: 1, status: "completed", created: demoDate(-16), ratedBySupplier: false },
  ],
  ledger: [
    { date: "2026-03-14", desc: "Welcome credits - pilot onboarding", amount: 100 },
    { date: PAST.designDone, desc: "Graphic design (6 hrs) - Lighthouse Youth Network", amount: -36 },
    { date: PAST.bloomLent, desc: "Lent training room - Bloom Mental Wellness", amount: 23 },
    { date: PAST.wheelchairsLent, desc: "Lent wheelchairs x4 (3 days) - Northstar Community Services", amount: 24 },
    { date: PAST.paKit, desc: "PA & projector kit - Northstar Community Services", amount: -9 },
    { date: PAST.evergreenLent, desc: "Lent training room - Evergreen Bereavement Care", amount: 23 },
    { date: PAST.chairsBooked, desc: "Stackable chairs & tables - Lighthouse Youth Network", amount: -11 },
  ],
  publicLedger: [],
  pool: { available: 1880, donated: 5600, returned: 180, issued: 3900 },
  donations: [
    { id: "D1", date: demoDate(-62), donor: "Meridian Bank Singapore", kind: "cash", amount: 20000, credits: 2000, dest: "pool" },
    { id: "D2", date: demoDate(-48), donor: "Brightpath Tech", kind: "cash", amount: 12000, credits: 1200, dest: "pool" },
    { id: "D3", date: demoDate(-33), donor: "Anonymous", kind: "cash", amount: 2500, credits: 250, dest: "equipment" },
    { id: "D4", date: demoDate(-20), donor: "Tan Family Foundation", kind: "cash", amount: 21500, credits: 2150, dest: "pool" },
    { id: "D5", date: demoDate(-8), donor: "Silver Threads Eldercare", kind: "return", amount: 0, credits: 180, dest: "pool" },
  ],
  payouts: [
    { id: "P1", orgId: "o2", credits: 120, amount: 1200, date: demoDate(-2), status: "pending" },
    { id: "P2", orgId: "o4", credits: 60, amount: 600, date: demoDate(-12), status: "paid" },
  ],
  myListingStatus: { L5: "live", L13: "live" },
  extraListings: [],
  extraReviews: [],
  pendingOrgs: [
    { id: "p1", name: "Rainbow Bridge Children's Fund", uen: "T22SS0112K", charityNo: "02718", ipc: true, sector: "Children & youth", area: "Sengkang", contact: "Mei Ling Goh", email: "meiling@rainbowbridge.example.sg", submitted: demoDate(-3), docs: ["Charity registration certificate.pdf", "IPC status letter.pdf"] },
    { id: "p2", name: "Pasir Ris Seniors Activity Network", uen: "T24SS0390L", charityNo: "02904", ipc: false, sector: "Seniors", area: "Pasir Ris", contact: "Rajesh Kumar", email: "rajesh@prsan.example.sg", submitted: demoDate(-2), docs: ["Charity registration certificate.pdf"] },
    { id: "p3", name: "MindBridge Youth Counselling", uen: "T20SS0761M", charityNo: "02655", ipc: true, sector: "Mental well-being", area: "Bishan", contact: "Daniel Lim", email: "daniel@mindbridge.example.sg", submitted: demoDate(-1), docs: ["Charity registration certificate.pdf", "IPC status letter.pdf", "Latest annual report.pdf"] },
  ],
  flags: [
    { id: "f1", listingId: "L7", reason: "Access hours listed don't match what we were told at the warehouse.", by: "o4", date: demoDate(-5), open: true },
  ],
};

const PLATFORM_STATS = {
  members: 38, listings: 126, exchanges: 214, savings: 186400, hours: 1340,
  byPool: { space: 71, manpower: 26, equipment: 92, services: 25 },
  monthly: [
    { m: "May", n: 12 }, { m: "Jun", n: 21 }, { m: "Jul", n: 29 }, { m: "Aug", n: 38 }, { m: "Sep", n: 51 }, { m: "Oct", n: 63 },
  ],
};
