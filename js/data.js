// Each entry:
// {
//   title: string,
//   category: string,       // section grouping
//   tags: [string],         // interest tags for filtering
//   desc: string,           // 1-2 sentence description
//   cost: "Free" | "$" | "$$" | "Discount",
//   link: string | null,
//   note: string | null     // access instructions / caveats
// }

const CATEGORY_ORDER = [
  "Campus Rentals & Gear",
  "Recreation & Fitness",
  "Academic & Career Help",
  "Wellness & Basic Needs",
  "Creative & Maker Spaces",
  "Discounts & Deals",
  "Happy Hour (21+)",
  "Transportation",
  "Clubs & Community",
  "Outdoors & Hikes",
  "Hidden Gems (Community Intel)",
  "Food & Local Spots",
  "Local Food Finds (Community Intel)",
  "Day Trips & Traditions",
  "Real Talk: Skip It",
  "Know Before You Register",
  "Freshman Regrets & Underused Benefits"
];

const INTERESTS = [
  "outdoors", "food", "fitness", "arts", "academic", "career",
  "wellness", "free", "tech", "social", "travel", "community"
];

const RESOURCES = [
  // ---------------- Campus Rentals & Gear ----------------
  {
    title: "Poly Escapes Rental Center",
    category: "Campus Rentals & Gear",
    tags: ["outdoors"],
    desc: "ASI's outdoor gear rental shop at the Rec Center — tents, sleeping bags, kayaks, SUPs, surfboards, snowshoes, camp stoves, and more, in 24-hour increments.",
    cost: "$",
    link: "https://www.asi.calpoly.edu/experience/poly-escapes/equipment-rentals/",
    note: "First-come, first-served in person only — no online reservations. Cal Poly ID required."
  },
  {
    title: "Kennedy Library Tech Rentals",
    category: "Campus Rentals & Gear",
    tags: ["tech", "free", "academic"],
    desc: "Free laptop, iPad, Kindle, camera, tripod, projector, 360° camera, and GoPro lending for academic use.",
    cost: "Free",
    link: "https://techrentals.calpoly.edu/",
    note: "Reserve up to 2 weeks ahead. Laptops currently limited to students due to demand. $15/day late fee."
  },
  {
    title: "Rec Center Pro Shop Equipment Checkout",
    category: "Campus Rentals & Gear",
    tags: ["fitness", "free", "social"],
    desc: "Free same-day checkout of basketballs, volleyballs, footballs, Spikeball sets, badminton, frisbees, and more.",
    cost: "Free",
    link: "https://www.asi.calpoly.edu/facilities/recreation-center/the-pro-shop/",
    note: "Requires Rec Center membership (included in your University Union fee)."
  },
  {
    title: "Craft Center Mobile Bike Repair",
    category: "Campus Rentals & Gear",
    tags: ["free", "tech"],
    desc: "Free bike tune-ups, tube/cable changes, and brake bleeds from a mobile repair unit that visits Dexter Lawn and UU Plaza, weeks 2–10 each quarter.",
    cost: "Free",
    link: "https://www.asi.calpoly.edu/asi-now/asi-blog/get-your-bike-fixed-for-free/",
    note: "Just drop by during posted hours — no appointment needed. One r/CalPoly student said this saved them a $60 repair quote in town."
  },

  // ---------------- Recreation & Fitness ----------------
  {
    title: "ASI Recreation Center",
    category: "Recreation & Fitness",
    tags: ["fitness"],
    desc: "Olympic-size 20-lane lap pool, leisure pool, sand volleyball courts, racquetball courts, and full weight/cardio rooms.",
    cost: "Free",
    link: "https://www.asi.calpoly.edu/facilities/recreation-center/",
    note: "Included in your University Union fee. Leisure pool closes seasonally (roughly late Nov–late March)."
  },
  {
    title: "Climbing Park",
    category: "Recreation & Fitness",
    tags: ["fitness", "outdoors", "free"],
    desc: "42-foot outdoor climbing wall plus a bouldering wall — shoes and harnesses provided, no experience needed.",
    cost: "Free",
    link: "https://www.asi.calpoly.edu/get-active/climbing-park/",
    note: "Staff on site to help beginners."
  },
  {
    title: "Group Fitness Classes",
    category: "Recreation & Fitness",
    tags: ["fitness", "free"],
    desc: "Yoga, Pilates, Body Pump, krav maga, and dance-style classes, free with Rec Center access.",
    cost: "Free",
    link: "https://www.asi.calpoly.edu/get-active/fitness/",
    note: "Reserve a pass via ASI Access — popular classes fill up."
  },
  {
    title: "Intramural Sports",
    category: "Recreation & Fitness",
    tags: ["fitness", "social", "community"],
    desc: "Volleyball, pickleball, basketball, flag football, soccer, softball, and ultimate frisbee leagues across three skill divisions.",
    cost: "$",
    link: "https://www.asi.calpoly.edu/get-active/intramural-sports/",
    note: "Buy a Player or Tournament Pass through ASI Access."
  },
  {
    title: "Club Sports",
    category: "Recreation & Fitness",
    tags: ["fitness", "community"],
    desc: "Competitive student-run teams, a step up from intramurals — note a club-sport roster spot can make you ineligible for the same intramural sport that season.",
    cost: "$",
    link: "https://www.asi.calpoly.edu/discover-asi/public-documents/forms-policies/intramural-sports-forms-policies/",
    note: "Managed through ASI Club Services / individual club orgs."
  },
  {
    title: "Mustang Lanes (Bowling)",
    category: "Recreation & Fitness",
    tags: ["social"],
    desc: "The University Union's own bowling alley and billiards room — $4.50/game for Cal Poly students, or $2.50/game for everyone on Tuesdays.",
    cost: "$",
    link: "https://www.mustanglanes.com/",
    note: "Show your Cal Poly ID at the counter."
  },

  // ---------------- Academic & Career Help ----------------
  {
    title: "Tutoring & Learning Center (TLC)",
    category: "Academic & Career Help",
    tags: ["academic", "free"],
    desc: "Free peer tutoring across all six colleges, plus drop-in Help Hubs for math, stats, engineering, and architecture — no appointment needed for Help Hubs.",
    cost: "Free",
    link: "https://writingandlearning.calpoly.edu/tutoring",
    note: "Kennedy Library Room 209, also available over Zoom."
  },
  {
    title: "Writing Support",
    category: "Academic & Career Help",
    tags: ["academic", "free"],
    desc: "Free peer writing tutors for any course or project, at any stage of the writing process.",
    cost: "Free",
    link: "https://writingandlearning.calpoly.edu/writing-support",
    note: "Schedule at calpoly.mywconline.com."
  },
  {
    title: "Academic Coaching",
    category: "Academic & Career Help",
    tags: ["academic", "free"],
    desc: "One-on-one coaching on goal-setting, time management, and study strategies — open to any student, not just those struggling.",
    cost: "Free",
    link: "https://writingandlearning.calpoly.edu/academic-coaching",
    note: null
  },
  {
    title: "CSC/SE Tutoring Center",
    category: "Academic & Career Help",
    tags: ["academic", "tech", "free"],
    desc: "Department-run drop-in tutoring specifically for Computer Science / Software Engineering courses.",
    cost: "Free",
    link: "https://csc.calpoly.edu/tutoring/",
    note: "Building 14, Room 309 — confirm current hours each quarter."
  },
  {
    title: "Math & Stats Department Tutoring",
    category: "Academic & Career Help",
    tags: ["academic", "free"],
    desc: "Department-run tutoring for math and statistics courses, separate from the general TLC Help Hub.",
    cost: "Free",
    link: "https://math.calpoly.edu/tutoring",
    note: null
  },
  {
    title: "Orfalea Business Peer Mentoring",
    category: "Academic & Career Help",
    tags: ["academic", "career"],
    desc: "Upperclassman peer mentors for Business Admin, Econ, and Industrial Tech students on study skills and navigating college resources.",
    cost: "Free",
    link: "https://orfalea.calpoly.edu/peer-mentoring",
    note: "Orfalea College of Business students."
  },
  {
    title: "Big Interview",
    category: "Academic & Career Help",
    tags: ["career", "free"],
    desc: "Virtual mock-interview practice tool with tutorials, free through Career Services.",
    cost: "Free",
    link: "https://careerservices.calpoly.edu/explore-services/resource-toolkit/online-resources",
    note: "Log in at calpoly.biginterview.com with your @calpoly.edu email."
  },
  {
    title: "Big Resume",
    category: "Academic & Career Help",
    tags: ["career", "free", "tech"],
    desc: "AI-assisted resume feedback and ATS optimization, free through Career Services.",
    cost: "Free",
    link: "https://careerservices.calpoly.edu/explore-services/resource-toolkit/online-resources",
    note: null
  },
  {
    title: "1:1 Career Counseling & Mock Interviews",
    category: "Academic & Career Help",
    tags: ["career", "free"],
    desc: "In-person practice interviews and resume review with a career counselor assigned to your college.",
    cost: "Free",
    link: "https://careerservices.calpoly.edu/",
    note: null
  },
  {
    title: "MustangJobs",
    category: "Academic & Career Help",
    tags: ["career", "free"],
    desc: "Cal Poly's job and internship board, including on-campus jobs and career fair sign-ups.",
    cost: "Free",
    link: "https://careerservices.calpoly.edu/",
    note: null
  },
  {
    title: "Career Fairs",
    category: "Academic & Career Help",
    tags: ["career", "social"],
    desc: "About 11 signature career fairs and networking events run each year connecting students directly with employers.",
    cost: "Free",
    link: "https://careerservices.calpoly.edu/",
    note: null
  },
  {
    title: "PathwayU",
    category: "Academic & Career Help",
    tags: ["career", "free"],
    desc: "A free career self-discovery and exploration assessment tool for students still figuring out their direction.",
    cost: "Free",
    link: "https://careerservices.calpoly.edu/explore-services/resource-toolkit/online-resources",
    note: null
  },

  // ---------------- Wellness & Basic Needs ----------------
  {
    title: "Counseling & Psychological Services (CAPS)",
    category: "Wellness & Basic Needs",
    tags: ["wellness", "free"],
    desc: "Free, confidential individual, couples, and group mental health counseling for all enrolled students, plus a 24/7 crisis line.",
    cost: "Free",
    link: "https://chw.calpoly.edu/counseling",
    note: "Building 27. Crisis line: 805-756-2511, available anytime."
  },
  {
    title: "WellTrack Boost App",
    category: "Wellness & Basic Needs",
    tags: ["wellness", "free", "tech"],
    desc: "Free CBT-based self-help app for anxiety, depression, mood tracking, and mindfulness — available to every student.",
    cost: "Free",
    link: "https://chw.calpoly.edu/counseling/apps",
    note: null
  },
  {
    title: "Free Condoms & Safer-Sex Supplies",
    category: "Wellness & Basic Needs",
    tags: ["wellness", "free"],
    desc: "Free condoms in the Health & Wellbeing lobby, plus 24/7 vending machines with emergency contraception and pregnancy tests.",
    cost: "Free",
    link: "https://chw.calpoly.edu/health/sexual-reproductive-health-services",
    note: null
  },
  {
    title: "SAFER",
    category: "Wellness & Basic Needs",
    tags: ["wellness", "free"],
    desc: "Confidential, state-certified prevention education and advocacy for sexual assault, intimate partner violence, stalking, and harassment.",
    cost: "Free",
    link: "https://safer.calpoly.edu/",
    note: "Largest such program in the CSU system."
  },
  {
    title: "Cal Poly Food Pantry",
    category: "Wellness & Basic Needs",
    tags: ["free", "wellness"],
    desc: "Open-access pantry with packaged and fresh food, hygiene items, and menstrual products — no eligibility screening, no proof required.",
    cost: "Free",
    link: "https://basicneeds.calpoly.edu/foodpantry",
    note: "M–F 8:30am–6pm, ground level of the Health Center. It's genuinely for everyone, not just students with financial need — a common misconception on r/CalPoly."
  },
  {
    title: "CalFresh Outreach",
    category: "Wellness & Basic Needs",
    tags: ["free", "wellness"],
    desc: "Free help applying for CalFresh food benefits, which can add up to $150+/month.",
    cost: "Free",
    link: "https://www.calfreshcalpoly.org/student-resources-1",
    note: "Drop-in hours Mon 10–2, Fri 2–4, Building 27 Room 173B."
  },
  {
    title: "Cal Poly Cares Grant",
    category: "Wellness & Basic Needs",
    tags: ["free", "wellness"],
    desc: "Emergency funds for urgent hardship — housing, utilities, medical costs, or replacing essentials lost to fire, flood, or theft.",
    cost: "Free",
    link: "https://deanofstudents.calpoly.edu/cal-poly-cares-grant",
    note: "Online application, ~2 week turnaround."
  },
  {
    title: "The Loop (Free Thrift Store)",
    category: "Wellness & Basic Needs",
    tags: ["free"],
    desc: "Free clothing, kitchenware, household items, and school supplies, run by Green Campus out of Cal Poly Surplus.",
    cost: "Free",
    link: "https://afd.calpoly.edu/sustainability/student/swap-n-shops",
    note: "Building 82, off Mt. Bishop Rd. It's a recurring pop-up rather than a permanent store — 65 visitors showed up by the midpoint of its spring 2026 opening day, per Mustang News. Watch for the next opening announcement."
  },

  // ---------------- Creative & Maker Spaces ----------------
  {
    title: "ASI Craft Center Classes",
    category: "Creative & Maker Spaces",
    tags: ["arts"],
    desc: "6-week classes in pottery, jewelry making, leatherworking, stained glass, woodworking, and glass fusing, at a student-discounted rate.",
    cost: "$$",
    link: "https://www.asi.calpoly.edu/experience/craft-center/",
    note: "Classes start week 3 each quarter — register via ASI Access."
  },
  {
    title: "Mustang Makerspace",
    category: "Creative & Maker Spaces",
    tags: ["tech", "free"],
    desc: "Open-to-all-majors 3D printing and fabrication space — no certification required, staffed by student shop techs.",
    cost: "Free",
    link: "https://ceng.calpoly.edu/news/mustang-makerspace-opens-the-door-to-projects-across-campus",
    note: null
  },
  {
    title: "Innovation Sandbox",
    category: "Creative & Maker Spaces",
    tags: ["tech", "free", "career"],
    desc: "Student-run rapid-prototyping space in Kennedy Library — laser cutters, 3D printers, workshops, and Ideation Grant funding for projects.",
    cost: "Free",
    link: "https://cie.calpoly.edu/learn/innovation-sandbox-2/",
    note: "Open to all majors, hosts ~1,200 student projects a year."
  },
  {
    title: "University Art Gallery",
    category: "Creative & Maker Spaces",
    tags: ["arts", "free"],
    desc: "Rotating exhibitions including student juried shows and BFA thesis shows, free to visit.",
    cost: "Free",
    link: "https://artgallery.calpoly.edu/",
    note: null
  },
  {
    title: "Center for Innovation & Entrepreneurship",
    category: "Creative & Maker Spaces",
    tags: ["career", "community", "free"],
    desc: "Startup support open to any major — the Hatchery, HotHouse Accelerator, and Incubator have helped launch 119+ student businesses since 2010.",
    cost: "Free",
    link: "https://cie.calpoly.edu/",
    note: "Now has a downtown SLO location on Chorro St."
  },

  // ---------------- Discounts & Deals ----------------
  {
    title: "Woodstock's Pizza Student Deals",
    category: "Discounts & Deals",
    tags: ["food"],
    desc: "$6 off any Large or XL pizza with code STUDENT, plus half-price pints (after the first) on Wednesday Pint Night.",
    cost: "Discount",
    link: "https://woodstocksslo.com/deals/",
    note: "Show a valid college ID."
  },
  {
    title: "PAC / Cal Poly Arts Student Tickets",
    category: "Discounts & Deals",
    tags: ["arts"],
    desc: "Performing Arts Center tickets as low as $12, and Cal Poly Arts season tickets starting at $17 for students.",
    cost: "Discount",
    link: "https://www.pacslo.org/online/article/studentdiscounts",
    note: "Log in with your Cal Poly SSO online, or show ID at the box office. Limited quantities per show."
  },
  {
    title: "SLOMA Membership Discount",
    category: "Discounts & Deals",
    tags: ["arts", "free"],
    desc: "General admission to the SLO Museum of Art is free for everyone, and students get 20% off a Standard membership.",
    cost: "Free",
    link: "https://sloma.org/",
    note: null
  },
  {
    title: "SESLOC Student Checking",
    category: "Discounts & Deals",
    tags: [],
    desc: "Free checking with no minimum balance, a Cal Poly-branded debit card, and a branch right in the University Union.",
    cost: "Free",
    link: "https://www.sesloc.org/personal/just-for-students/",
    note: "$5 savings deposit + $5 membership fee to join."
  },
  {
    title: "Amtrak Student Discount",
    category: "Discounts & Deals",
    tags: ["travel"],
    desc: "15% off coach and Acela Business Class fares for ages 17–24, using code V814.",
    cost: "Discount",
    link: "https://www.amtrak.com/student-discounts",
    note: "1-day advance purchase required."
  },
  {
    title: "ParkON Airport Parking Discount",
    category: "Discounts & Deals",
    tags: ["travel"],
    desc: "20% off daily parking rates at SBP and other airports using code CALPOLY, no blackout dates.",
    cost: "Discount",
    link: null,
    note: "Enter code CALPOLY at checkout on ParkON."
  },
  {
    title: "Amazon Prime Student",
    category: "Discounts & Deals",
    tags: ["tech"],
    desc: "6 months free, then about 50% off regular Prime ($7.49/mo) for students 18–24.",
    cost: "Discount",
    link: "https://www.amazon.com/amazonprime",
    note: "Verify with your .edu email."
  },
  {
    title: "Spotify Premium for Students",
    category: "Discounts & Deals",
    tags: [],
    desc: "$6.99/month (vs. $11.99 individual), bundled with Hulu — renewable up to 4 years.",
    cost: "Discount",
    link: "https://www.spotify.com/us/student/",
    note: null
  },
  {
    title: "Apple Music Student",
    category: "Discounts & Deals",
    tags: [],
    desc: "$6.99/month, includes free access to Apple TV+, verified through school enrollment.",
    cost: "Discount",
    link: "https://music.apple.com/us/student",
    note: null
  },
  {
    title: "Adobe Creative Cloud Student Pricing",
    category: "Discounts & Deals",
    tags: ["arts", "tech"],
    desc: "$19.99/month for the first year (vs. $69.99 regular) for the full All Apps plan — about 71% off.",
    cost: "Discount",
    link: "https://www.adobe.com/creativecloud/buy/students.html",
    note: "Verify with .edu email or a student ID/transcript upload."
  },
  {
    title: "GitHub Student Developer Pack",
    category: "Discounts & Deals",
    tags: ["tech", "free"],
    desc: "Free bundle: GitHub Pro, Copilot, Codespaces Pro, a $100 Azure credit, free JetBrains IDEs, and 70+ more partner offers.",
    cost: "Free",
    link: "https://education.github.com/pack",
    note: "Verify with school email or enrollment proof."
  },

  // ---------------- Transportation ----------------
  {
    title: "SLO Transit — Free for Students",
    category: "Transportation",
    tags: ["free", "travel"],
    desc: "The city bus system is 100% free for Cal Poly students, subsidized by the university since 1985.",
    cost: "Free",
    link: "https://afd.calpoly.edu/parking/slo/commuting-to-campus/bus-services/rta-slo-transit",
    note: "Swipe your PolyCard when boarding."
  },
  {
    title: "RTA Regional Transit Passes",
    category: "Transportation",
    tags: ["free", "travel"],
    desc: "Free 1-day regional pass up to 3x/year, plus a heavily subsidized monthly pass for students who log alternative-commute trips.",
    cost: "Free",
    link: "https://afd.calpoly.edu/parking/slo/commuting-to-campus/bus-services/rta-slo-transit",
    note: "Create a free account at iRideshare.org with your @calpoly.edu email."
  },
  {
    title: "Mustang Shuttle",
    category: "Transportation",
    tags: ["free", "travel"],
    desc: "Free on-campus shuttle with day and night loops, recently expanded to two simultaneous routes with more stops.",
    cost: "Free",
    link: "https://afd.calpoly.edu/parking/slo/commuting-to-campus/bus-services/mustang-shuttle",
    note: "Track live via the Mustang Shuttle app. Doesn't run during breaks."
  },
  {
    title: "Grocery Shuttle",
    category: "Transportation",
    tags: ["free", "travel"],
    desc: "Free shuttle from campus to local grocery stores, Fridays and Sundays 10am–4pm during weeks 1–8 of winter/spring quarter.",
    cost: "Free",
    link: null,
    note: "Valid PolyCard required."
  },
  {
    title: "Bike Parking & Lockers",
    category: "Transportation",
    tags: ["free", "outdoors"],
    desc: "Over 7,000 bike rack spaces plus 252 secure lockers across campus.",
    cost: "Free",
    link: "https://afd.calpoly.edu/parking/commutingtocampus/bikeparkingandstorage",
    note: null
  },

  // ---------------- Clubs & Community ----------------
  {
    title: "ASI Club Directory",
    category: "Clubs & Community",
    tags: ["community", "free"],
    desc: "Over 400 recognized student clubs and organizations spanning academic, cultural, recreational, and service interests.",
    cost: "Free",
    link: "https://clubs.calpoly.edu/",
    note: "Searchable by category — check for club fair events each quarter."
  },
  {
    title: "Multicultural Center (MCC)",
    category: "Clubs & Community",
    tags: ["community", "free"],
    desc: "Support for historically underrepresented students — identity exploration, mentorship, and community-building programming.",
    cost: "Free",
    link: "https://multicultural.calpoly.edu/",
    note: null
  },
  {
    title: "Pride Center",
    category: "Clubs & Community",
    tags: ["community", "wellness", "free"],
    desc: "A coalition of spaces and orgs for LGBTQIA2S+ students — affinity groups, gender-affirming care resources, and basic needs support.",
    cost: "Free",
    link: "https://pride.calpoly.edu/",
    note: null
  },
  {
    title: "Gender Equity Center (GEC)",
    category: "Clubs & Community",
    tags: ["community", "wellness", "free"],
    desc: "Support and community space for women-identifying students, with intersectional identity programming.",
    cost: "Free",
    link: "https://gec.calpoly.edu/",
    note: null
  },

  // ---------------- Outdoors & Hikes ----------------
  {
    title: "Bishop Peak",
    category: "Outdoors & Hikes",
    tags: ["outdoors", "free"],
    desc: "3.5 miles round trip, the tallest of the Nine Sisters at 1,559 ft — the hardest of the classic SLO peak hikes.",
    cost: "Free",
    link: "https://www.alltrails.com/trail/us/california/bishop-peak-trail-from-highland-drive-trail",
    note: null
  },
  {
    title: "Madonna Mountain (Cerro San Luis)",
    category: "Outdoors & Hikes",
    tags: ["outdoors", "free"],
    desc: "4 miles round trip up an ancient volcanic plug — steady incline, rocky, almost no shade.",
    cost: "Free",
    link: "https://hikespeak.com/trails/cerro-san-luis-hike/",
    note: null
  },
  {
    title: "The Cal Poly \"P\" (Terrace Hill)",
    category: "Outdoors & Hikes",
    tags: ["outdoors", "free", "community"],
    desc: "A short 0.9-mile climb behind the dorms, built in 1919, to a sunset overlook of campus and the valley.",
    cost: "Free",
    link: "https://www.alltrails.com/trail/us/california/the-p--2",
    note: "A Cal Poly tradition — try it under a full moon."
  },
  {
    title: "Serenity Swing",
    category: "Outdoors & Hikes",
    tags: ["outdoors", "free"],
    desc: "3.8-mile route behind Poly Canyon leading to a literal swing with one of the best views of campus and SLO.",
    cost: "Free",
    link: null,
    note: "A favorite sunset photography spot per r/CalPoly — bring water, the last stretch with gear in hand is a real climb."
  },
  {
    title: "Reservoir Canyon Falls",
    category: "Outdoors & Hikes",
    tags: ["outdoors", "free"],
    desc: "A 2-minute walk from the lot to a seasonal 30-foot waterfall, the tallest in SLO County — best after rain or in spring.",
    cost: "Free",
    link: "https://www.onxmaps.com/hiking/39yz3pollqlk/reservoir-canyon-falls",
    note: "The full canyon loop is 5.5 miles and considerably harder."
  },
  {
    title: "Islay Hill",
    category: "Outdoors & Hikes",
    tags: ["outdoors", "free"],
    desc: "1.8 miles, easy/moderate switchbacks with Edna Valley views — one of the easiest of the volcanic peaks.",
    cost: "Free",
    link: "https://hikespeak.com/trails/islay-hill-san-luis-obispo/",
    note: null
  },
  {
    title: "Pismo Preserve",
    category: "Outdoors & Hikes",
    tags: ["outdoors", "free"],
    desc: "880 acres and 11+ miles of hike/bike/horse trails with ocean views from the Irish Hills to Point Sal.",
    cost: "Free",
    link: "https://www.lcslo.org/pismo-preserve",
    note: null
  },
  {
    title: "Prefumo Canyon Road",
    category: "Outdoors & Hikes",
    tags: ["outdoors", "free", "travel"],
    desc: "A scenic hike, bike, or drive with a summit view stretching all the way to Morro Rock, 10 miles west.",
    cost: "Free",
    link: null,
    note: "Pavement turns to dirt/gravel after about 3 miles."
  },
  {
    title: "Pirates Cove",
    category: "Outdoors & Hikes",
    tags: ["outdoors", "free"],
    desc: "A small beach reached by a dirt trail, with a sea cave and tide pools — clothing-optional, and genuinely dangerous at high tide.",
    cost: "Free",
    link: null,
    note: "No restrooms. Check tide times before you go. Not the move for a private date — r/CalPoly warns the cave gets crowded and smelly; try Shell Beach instead for that."
  },
  {
    title: "Poly Canyon / Architecture Graveyard",
    category: "Outdoors & Hikes",
    tags: ["outdoors", "arts", "free", "community"],
    desc: "A roughly 3-mile round trip into a 9-acre outdoor lab of ~20 decades-old student-built experimental structures, dating to 1964.",
    cost: "Free",
    link: "https://polycanyon.calpoly.edu/history",
    note: "One r/CalPoly student admitted they went their whole time at Cal Poly without visiting — don't be that person. Bring a picnic."
  },
  {
    title: "Avila Beach",
    category: "Outdoors & Hikes",
    tags: ["outdoors", "free"],
    desc: "The warmest, calmest water on the Central Coast, with beginner-friendly surf at the pier.",
    cost: "Free",
    link: null,
    note: null
  },
  {
    title: "Pismo Beach",
    category: "Outdoors & Hikes",
    tags: ["outdoors", "free", "social"],
    desc: "Wide sandy beach for swimming and bonfires — hosts the SLO CAL Open surf competition every January.",
    cost: "Free",
    link: null,
    note: null
  },
  {
    title: "Shell Beach",
    category: "Outdoors & Hikes",
    tags: ["outdoors", "free"],
    desc: "Nine separate coves tucked below bluffs, most with tide pools exposed at low tide — quieter and more dramatic than Pismo.",
    cost: "Free",
    link: null,
    note: null
  },
  {
    title: "Morro Bay & Morro Rock",
    category: "Outdoors & Hikes",
    tags: ["outdoors", "travel", "free"],
    desc: "A 576-foot, 23-million-year-old volcanic plug and protected peregrine falcon nesting site — the last of the Nine Sisters.",
    cost: "Free",
    link: null,
    note: null
  },
  {
    title: "Morro Bay Kayaking",
    category: "Outdoors & Hikes",
    tags: ["outdoors", "social"],
    desc: "A calm, protected estuary good for all skill levels, with reliable sea otter sightings near Target Rock.",
    cost: "$",
    link: null,
    note: null
  },
  {
    title: "Montaña de Oro State Park",
    category: "Outdoors & Hikes",
    tags: ["outdoors", "free"],
    desc: "The Bluff Trail (2.1 miles, flat, coastal), Valencia Peak (4.5 miles round trip), and Hazard Canyon Reef — one of the best tide-pooling spots in the state.",
    cost: "Free",
    link: null,
    note: null
  },
  {
    title: "Pismo Monarch Butterfly Grove",
    category: "Outdoors & Hikes",
    tags: ["outdoors", "free"],
    desc: "One of North America's largest overwintering monarch colonies — 20,000 to 200,000 butterflies, best viewing November through February.",
    cost: "Free",
    link: "https://www.parks.ca.gov/?page_id=30273",
    note: null
  },
  {
    title: "Piedras Blancas Elephant Seal Rookery",
    category: "Outdoors & Hikes",
    tags: ["outdoors", "free", "travel"],
    desc: "A free, year-round colony now exceeding 25,000 elephant seals along 8 miles of coast near San Simeon.",
    cost: "Free",
    link: "https://www.elephantseal.org/",
    note: "Wheelchair-accessible boardwalks."
  },
  {
    title: "Sycamore Mineral Springs",
    category: "Outdoors & Hikes",
    tags: ["outdoors", "wellness"],
    desc: "23 private hillside mineral hot tubs (100–104°F), discovered by oil drillers in 1886.",
    cost: "$$",
    link: "https://www.sycamoresprings.com/",
    note: null
  },
  {
    title: "Oceano Dunes SVRA",
    category: "Outdoors & Hikes",
    tags: ["outdoors", "social"],
    desc: "The only California beach where you can legally drive an ATV or UTV directly on the sand.",
    cost: "$$",
    link: null,
    note: "Rentals available from outfitters in Oceano."
  },

  // ---------------- Food & Local Spots ----------------
  {
    title: "Bubblegum Alley",
    category: "Food & Local Spots",
    tags: ["arts", "free", "social"],
    desc: "A 15-foot-high, 70-foot-long alley covered in chewed gum since the early 1970s — genuinely strange, genuinely SLO.",
    cost: "Free",
    link: null,
    note: "700 block of Higuera St."
  },
  {
    title: "Madonna Inn",
    category: "Food & Local Spots",
    tags: ["social", "arts"],
    desc: "The world's first \"theme\" motel, built in 1958 — 110 individually themed rooms and a famous waterfall urinal, plus swing dancing nights.",
    cost: "$$",
    link: null,
    note: null
  },
  {
    title: "SLO Thursday Night Farmers' Market",
    category: "Food & Local Spots",
    tags: ["food", "free", "social"],
    desc: "Five blocks of downtown SLO shut down every Thursday, 6–9pm, with 100+ vendors, live music, and tri-tip smoke everywhere.",
    cost: "Free",
    link: null,
    note: "Running since 1983."
  },
  {
    title: "Apple Farm Restaurant & Bakery",
    category: "Food & Local Spots",
    tags: ["food"],
    desc: "Legendary oversized, sticky cinnamon rolls baked fresh daily since 1977.",
    cost: "$",
    link: null,
    note: null
  },
  {
    title: "Mission San Luis Obispo de Tolosa",
    category: "Food & Local Spots",
    tags: ["arts", "free", "travel"],
    desc: "The 5th California mission, founded by Junípero Serra in 1772 — free docent-led tours daily at 1:15pm.",
    cost: "Free",
    link: null,
    note: null
  },
  {
    title: "Firestone Grill",
    category: "Food & Local Spots",
    tags: ["food"],
    desc: "The definitive SLO tri-tip sandwich, repeatedly voted the best place to eat in town by student and local press.",
    cost: "$",
    link: null,
    note: null
  },
  {
    title: "Tio Alberto's",
    category: "Food & Local Spots",
    tags: ["food"],
    desc: "Massive carne asada burritos loaded with rice, beans, guac, and sour cream — a late-night staple.",
    cost: "$",
    link: null,
    note: null
  },
  {
    title: "Big Sky Cafe",
    category: "Food & Local Spots",
    tags: ["food"],
    desc: "Under-$10 menu items, wheat pancakes for breakfast — voted best SLO restaurant by New Times readers.",
    cost: "$",
    link: null,
    note: null
  },
  {
    title: "Gus's Grocery and Deli",
    category: "Food & Local Spots",
    tags: ["food"],
    desc: "Build-your-own sandwiches in three sizes, plus homemade hot chips.",
    cost: "$",
    link: null,
    note: null
  },
  {
    title: "Sally Loo's",
    category: "Food & Local Spots",
    tags: ["food", "academic"],
    desc: "Acai bowls and brunch near the train station — doubles as one of the best study spots in town.",
    cost: "$",
    link: null,
    note: "Some r/CalPoly students think it's overpriced for what you get — worth it for the vibe and the study space more than the food, per that discussion."
  },
  {
    title: "SloDoCo",
    category: "Food & Local Spots",
    tags: ["food", "academic", "social"],
    desc: "A 24-hour donut shop that's become a de facto all-night study spot — the maple bacon donut is a local favorite.",
    cost: "$",
    link: null,
    note: null
  },
  {
    title: "Linnaea's",
    category: "Food & Local Spots",
    tags: ["food", "arts"],
    desc: "SLO's first coffee shop — live music and local art on every wall.",
    cost: "$",
    link: null,
    note: "The banana bread latte is the specific student-recommended order — enjoy it in the back garden/porch."
  },

  // ---------------- Day Trips & Traditions ----------------
  {
    title: "Hearst Castle",
    category: "Day Trips & Traditions",
    tags: ["travel", "arts"],
    desc: "William Randolph Hearst's 115-room hilltop estate designed by Julia Morgan — multiple tour tracks starting at $35.",
    cost: "$$",
    link: "https://hearstcastle.org/tour-hearst-castle/tour-tickets-pricing/",
    note: "Book up to 60 days out."
  },
  {
    title: "Big Sur / McWay Falls",
    category: "Day Trips & Traditions",
    tags: ["travel", "outdoors"],
    desc: "A short, flat trail to a waterfall dropping straight onto the beach — about a 1.25-hour drive up Highway 1.",
    cost: "Free",
    link: null,
    note: "Doable as a long day trip if you start early."
  },
  {
    title: "Solvang",
    category: "Day Trips & Traditions",
    tags: ["travel", "food"],
    desc: "A Danish-themed village about 1.25 hours south — windmills, Danish bakeries, and wine-tasting rooms.",
    cost: "$",
    link: null,
    note: null
  },
  {
    title: "Paso Robles / Edna Valley Wine Tasting",
    category: "Day Trips & Traditions",
    tags: ["travel", "social"],
    desc: "Cal Poly's own Cultivate program runs a spring-break wine tour hitting a dozen-plus wineries — some Paso wineries also run discounted student tasting programs.",
    cost: "$$",
    link: null,
    note: null
  },
  {
    title: "Design Village",
    category: "Day Trips & Traditions",
    tags: ["arts", "community", "academic"],
    desc: "A 48-hour student-built-structure competition held in Poly Canyon during Open House weekend each spring, open to ~400 students from 14+ schools.",
    cost: "Free",
    link: null,
    note: null
  },
  {
    title: "The Tri-Tip Challenge",
    category: "Day Trips & Traditions",
    tags: ["outdoors", "food", "community"],
    desc: "A Cal Poly tradition: hike Bishop Peak, Madonna Mountain, and the P all in one day, then reward yourself with tri-tip at Firestone.",
    cost: "$",
    link: null,
    note: null
  },
  {
    title: "Blue-Green Rivalry (Cal Poly vs. UCSB)",
    category: "Day Trips & Traditions",
    tags: ["social", "community"],
    desc: "A football and soccer rivalry dating to 1921 — called one of the greatest rivalries in NCAA soccer history.",
    cost: "$",
    link: null,
    note: null
  },
  {
    title: "Poly Royal Rodeo",
    category: "Day Trips & Traditions",
    tags: ["social", "community", "free"],
    desc: "Cal Poly's rodeo program holds more national collegiate titles than any other school — the rodeo draws 15,000+ spectators each spring during Open House.",
    cost: "Free",
    link: null,
    note: null
  },
  {
    title: "Open House (Poly Royal)",
    category: "Day Trips & Traditions",
    tags: ["social", "community", "free"],
    desc: "Cal Poly's biggest annual event, tracing back to 1904 — booths, a tractor pull, and the rodeo.",
    cost: "Free",
    link: null,
    note: null
  },
  {
    title: "California Festival of Beers",
    category: "Day Trips & Traditions",
    tags: ["social"],
    desc: "A 21+ springtime festival downtown, kicking off Memorial Day weekend.",
    cost: "$$",
    link: null,
    note: null
  },
  {
    title: "Einstein Statue",
    category: "Day Trips & Traditions",
    tags: ["academic", "free", "community"],
    desc: "A statue outside the Baker Center that students rub the head of for good luck before exams.",
    cost: "Free",
    link: null,
    note: null
  },

  // ---------------- Hidden Gems (Reddit Intel) ----------------
  {
    title: "Fischer Computer Lab",
    category: "Hidden Gems (Community Intel)",
    tags: ["academic", "free", "tech"],
    desc: "A quiet, rarely-crowded computer lab — one r/CalPoly regular admitted they're \"loathe to recommend this\" because they're usually the only one there.",
    cost: "Free",
    link: null,
    note: "Classes sometimes use the room — check the schedule posted on the door. (r/CalPoly, Oct 2023)"
  },
  {
    title: "Standing Desks: Building 186 & the UU Counters",
    category: "Hidden Gems (Community Intel)",
    tags: ["academic", "free"],
    desc: "Adjustable-height desks in Construction Innovation (Bldg 186, Room A215) when no class is meeting, plus standing counters throughout the University Union.",
    cost: "Free",
    link: null,
    note: "r/CalPoly standing-desk thread, Oct 2024."
  },
  {
    title: "Empty Classroom Study Rotation",
    category: "Hidden Gems (Community Intel)",
    tags: ["academic", "free"],
    desc: "A finals-week trick from r/CalPoly: rotate through empty classrooms in Engineering IV, Frost, and Baker when you need a quiet room that isn't SloDoCo.",
    cost: "Free",
    link: null,
    note: "\"I study best in an empty classroom.\" (r/CalPoly, March 2025)"
  },
  {
    title: "Front Porch Free Coffee & Tea",
    category: "Hidden Gems (Community Intel)",
    tags: ["academic", "free", "wellness"],
    desc: "A volunteer-run coffee shop just off campus behind the Health Center — free tea, coffee, shared mugs, and quiet study seating.",
    cost: "Free",
    link: null,
    note: "Also reportedly hosts free dinners midweek — confirm the current day before counting on it. (r/CalPoly, Feb 2025)"
  },
  {
    title: "Cal Poly Scholars Study Space",
    category: "Hidden Gems (Community Intel)",
    tags: ["academic", "free"],
    desc: "A quiet study space in the science building available specifically to Cal Poly Scholars.",
    cost: "Free",
    link: null,
    note: "r/CalPoly, Sept 2024."
  },
  {
    title: "Linnaea's Back Patio",
    category: "Hidden Gems (Community Intel)",
    tags: ["academic", "food"],
    desc: "The specific reason to pick Linnaea's over other coffee shops, per r/CalPoly — the back patio, alongside the downtown library and Santa Rosa Park as other quiet off-campus options.",
    cost: "$",
    link: null,
    note: "r/CalPoly, Oct 2021."
  },
  {
    title: "Cal Poly Arboretum",
    category: "Hidden Gems (Community Intel)",
    tags: ["outdoors", "free"],
    desc: "A genuinely overlooked green space on campus — one student posted they'd only just discovered it after years at Cal Poly.",
    cost: "Free",
    link: null,
    note: "r/CalPoly, Feb 2025."
  },
  {
    title: "Kentwood Hill",
    category: "Hidden Gems (Community Intel)",
    tags: ["outdoors", "free"],
    desc: "A small, little-known hill behind the senior-living development off Orcutt Rd, accessed via the Kentwood dead end — recommended by a local photographer for sunset shots.",
    cost: "Free",
    link: null,
    note: "r/CalPoly photography thread, Jan 2024."
  },
  {
    title: "Coon Creek Trail, Montaña de Oro",
    category: "Hidden Gems (Community Intel)",
    tags: ["outdoors", "free"],
    desc: "A hidden-gem trail within Montaña de Oro — six small bridges and very little elevation gain, good for a mellow hike.",
    cost: "Free",
    link: null,
    note: "r/CalPoly, April 2024."
  },
  {
    title: "Los Osos Oaks State Natural Reserve",
    category: "Hidden Gems (Community Intel)",
    tags: ["outdoors", "free"],
    desc: "A mostly-shaded, easier hike — a good pairing or alternative to a Montaña de Oro trip on a hot day.",
    cost: "Free",
    link: null,
    note: "r/CalPoly, July 2025."
  },
  {
    title: "Big Falls & Little Falls (behind Lopez Lake)",
    category: "Hidden Gems (Community Intel)",
    tags: ["outdoors"],
    desc: "Local swimming holes, repeatedly recommended on r/CalPoly — but access is genuinely difficult: creek crossings, poison oak, and a long, rough approach.",
    cost: "Free",
    link: null,
    note: "Check current access conditions before you go — this isn't a casual outing. (r/CalPoly, April 2022 & 2025)"
  },
  {
    title: "Point Buchon Trail",
    category: "Hidden Gems (Community Intel)",
    tags: ["outdoors", "free"],
    desc: "An unusual coastal trail through the old nuclear plant buffer zone, with views of the plant itself.",
    cost: "Free",
    link: null,
    note: "r/CalPoly, June 2025."
  },
  {
    title: "Margo Dodd Park, Shell Beach",
    category: "Hidden Gems (Community Intel)",
    tags: ["outdoors", "free"],
    desc: "A cliffside sunset viewpoint with a gazebo, recommended by a nearby resident as an underrated spot.",
    cost: "Free",
    link: null,
    note: "r/CalPoly, Aug 2024."
  },
  {
    title: "Lampton Cliffs Beach, Cambria",
    category: "Hidden Gems (Community Intel)",
    tags: ["outdoors", "travel", "free"],
    desc: "A small, relatively secluded beach — pair it with a walk at nearby Fiscalini Ranch.",
    cost: "Free",
    link: null,
    note: "r/CalPoly, Aug 2024."
  },
  {
    title: "Santa Margarita Lake Camping",
    category: "Hidden Gems (Community Intel)",
    tags: ["outdoors", "social"],
    desc: "Called a genuine \"hidden gem\" for camping, with good hiking nearby too.",
    cost: "$",
    link: null,
    note: "r/CalPoly, May 2025."
  },
  {
    title: "Rancho El Chorro Camping",
    category: "Hidden Gems (Community Intel)",
    tags: ["outdoors", "social"],
    desc: "A pleasant, less-crowded camping spot recommended as an alternative to the busier sites.",
    cost: "$",
    link: null,
    note: "r/CalPoly, May 2025."
  },
  {
    title: "Through Eyes of Glass (Stained Glass Classes)",
    category: "Hidden Gems (Community Intel)",
    tags: ["arts", "social"],
    desc: "A stained-glass studio on South Street offering date-night classes, and occasional brewery classes too.",
    cost: "$$",
    link: null,
    note: "r/CalPoly date-ideas thread, Nov 2024."
  },
  {
    title: "Morro Bay Batting Cages",
    category: "Hidden Gems (Community Intel)",
    tags: ["social"],
    desc: "An unusual, genuinely enjoyed date-night pick according to r/CalPoly — cheap, active, and different from the usual dinner-and-a-movie.",
    cost: "$",
    link: null,
    note: "r/CalPoly, Nov 2024."
  },

  // ---------------- Local Food Finds (Reddit) ----------------
  {
    title: "Ebony Ethiopian Cuisine",
    category: "Local Food Finds (Community Intel)",
    tags: ["food"],
    desc: "Airport-area Ethiopian food, praised on r/CalPoly for vegan/gluten-free options and a lighter, less oily meal than most SLO food.",
    cost: "$",
    link: null,
    note: "Limited opening days reported — call ahead. (r/CalPoly, Jan 2024)"
  },
  {
    title: "Nautical Bean — Kitchen Sink Burrito",
    category: "Local Food Finds (Community Intel)",
    tags: ["food"],
    desc: "A specific breakfast burrito order the r/CalPoly food thread repeatedly points to.",
    cost: "$",
    link: null,
    note: "r/CalPoly, Jan 2024."
  },
  {
    title: "Shalimar",
    category: "Local Food Finds (Community Intel)",
    tags: ["food"],
    desc: "Tandoori chicken recommended as good but somewhat pricey — the Monday-night buffet takeout is the better value, per multiple commenters.",
    cost: "$$",
    link: null,
    note: "A packed takeout container reportedly covers multiple meals. (r/CalPoly, Jan 2024 & Feb 2026)"
  },
  {
    title: "My Friend Mike's / Thai Boat / Goshi",
    category: "Local Food Finds (Community Intel)",
    tags: ["food"],
    desc: "A local's grouped recommendation for pizza, Thai, and Japanese respectively.",
    cost: "$",
    link: null,
    note: "r/CalPoly, Jan 2024."
  },
  {
    title: "Spoon Trade / Sister Thai Food Truck (Grover Beach)",
    category: "Local Food Finds (Community Intel)",
    tags: ["food", "travel"],
    desc: "Two Grover Beach spots students say are worth the short drive out of SLO.",
    cost: "$$",
    link: null,
    note: "r/CalPoly, Jan 2024."
  },
  {
    title: "Las Comadres, Santa Maria",
    category: "Local Food Finds (Community Intel)",
    tags: ["food", "travel"],
    desc: "Salvadoran pupusas, praised as both excellent and inexpensive.",
    cost: "$",
    link: null,
    note: "r/CalPoly, Jan 2024."
  },
  {
    title: "Petra / Del's (Pismo) — Gluten-Free Pizza",
    category: "Local Food Finds (Community Intel)",
    tags: ["food"],
    desc: "Specific gluten-free pizza recommendations from students who actually need the option, not just a generic \"they probably have it.\"",
    cost: "$",
    link: null,
    note: "r/CalPoly, Jan 2024."
  },
  {
    title: "G Brothers BBQ",
    category: "Local Food Finds (Community Intel)",
    tags: ["food"],
    desc: "BBQ sandwiches and chicken-fried steak, recommended in the same local food-finds thread.",
    cost: "$",
    link: null,
    note: "r/CalPoly, Jan 2024."
  },
  {
    title: "Noi's 2nd Street Café → Spooner's Cove",
    category: "Local Food Finds (Community Intel)",
    tags: ["food", "outdoors", "social"],
    desc: "A specific, repeatable outing students recommend: grab Thai food from Noi's, then eat it at Spooner's Cove in Montaña de Oro.",
    cost: "$",
    link: null,
    note: "r/CalPoly visitor-itinerary thread, July 2025."
  },

  // ---------------- Happy Hour (21+) ----------------
  {
    title: "There Does Not Exist — Sunday Kölsch",
    category: "Happy Hour (21+)",
    tags: ["social"],
    desc: "$3.50 Kölsch, all day Sunday. No food available per reports, so eat first.",
    cost: "Discount",
    link: null,
    note: "r/SLO happy hour thread, Aug 2026."
  },
  {
    title: "Petra Happy Hour",
    category: "Happy Hour (21+)",
    tags: ["social", "food"],
    desc: "$3–4 drafts, reportedly 3–6pm daily.",
    cost: "Discount",
    link: null,
    note: "r/SLO, Aug 2026."
  },
  {
    title: "Firestone Grill — $4 Pints",
    category: "Happy Hour (21+)",
    tags: ["social", "food"],
    desc: "$4 pints, Monday–Friday, 2–6pm.",
    cost: "Discount",
    link: null,
    note: "r/SLO, Aug 2026."
  },
  {
    title: "Hoagies — $5 Beers",
    category: "Happy Hour (21+)",
    tags: ["social"],
    desc: "$5 beers all day, every day — no happy-hour window needed.",
    cost: "Discount",
    link: null,
    note: "r/SLO, Aug 2026."
  },
  {
    title: "SLO Cider Happy Hour",
    category: "Happy Hour (21+)",
    tags: ["social"],
    desc: "$6 happy-hour pints.",
    cost: "Discount",
    link: null,
    note: "r/SLO, Aug 2026."
  },
  {
    title: "Beda's — 20% Off Beer",
    category: "Happy Hour (21+)",
    tags: ["social", "food"],
    desc: "20% off beer 2–6pm, plus a dedicated happy-hour food menu.",
    cost: "Discount",
    link: null,
    note: "r/SLO, Aug 2026."
  },
  {
    title: "Green Bottle — $2 Off Brews",
    category: "Happy Hour (21+)",
    tags: ["social"],
    desc: "$2 off brews, 3–5pm.",
    cost: "Discount",
    link: null,
    note: "r/SLO, Aug 2026."
  },
  {
    title: "Libertine — $1 Taco Tuesday",
    category: "Happy Hour (21+)",
    tags: ["social", "food"],
    desc: "$1 tacos on Tuesdays.",
    cost: "Discount",
    link: null,
    note: "r/SLO, Aug 2026."
  },
  {
    title: "Oak and Otter Happy Hour",
    category: "Happy Hour (21+)",
    tags: ["social"],
    desc: "Happy hour Monday–Friday 2–5pm, plus all day Sunday.",
    cost: "Discount",
    link: null,
    note: "r/SLO, Aug 2026."
  },

  // ---------------- More Discounts (Reddit-Reported — verify before relying on) ----------------
  {
    title: "Old SLO BBQ — Student Discount",
    category: "Discounts & Deals",
    tags: ["food"],
    desc: "10% off with a student ID, per a recent r/CalPoly report.",
    cost: "Discount",
    link: null,
    note: "Reported Aug 2025 — worth confirming it's still running before you count on it."
  },
  {
    title: "High Street Deli — After 4:20pm",
    category: "Discounts & Deals",
    tags: ["food"],
    desc: "Discounted sandwiches late in the day — one commenter called it close to half off.",
    cost: "Discount",
    link: null,
    note: "The daily special is reportedly excluded, and the window before closing is short — order ahead. (r/CalPoly, Feb 2026)"
  },
  {
    title: "Sprouts — $5 Sandwiches & Wednesday Sushi",
    category: "Discounts & Deals",
    tags: ["food"],
    desc: "$5 sandwiches, plus a Wednesday sushi deal.",
    cost: "Discount",
    link: null,
    note: "r/CalPoly, Feb 2026."
  },
  {
    title: "Fatte's — Two-for-One Pizza",
    category: "Discounts & Deals",
    tags: ["food"],
    desc: "A reported two-for-one pizza deal.",
    cost: "Discount",
    link: null,
    note: "r/CalPoly, Feb 2026 — confirm current terms."
  },
  {
    title: "Eureka — Kids' Meal & Happy Hour",
    category: "Discounts & Deals",
    tags: ["food"],
    desc: "A $10 kids' burger/fries/drink combo ordered online, and separately a $13 burger-and-fries happy hour with $8.50 cocktails.",
    cost: "Discount",
    link: null,
    note: "r/CalPoly, Aug 2025 & Feb 2026."
  },
  {
    title: "Piadina / Hotel SLO Rooftop — Monday Pizza",
    category: "Discounts & Deals",
    tags: ["food", "social"],
    desc: "A reported half-price (possibly BOGO) Monday pizza deal on the rooftop.",
    cost: "Discount",
    link: null,
    note: "Reports differ on exact format between 2025 and 2026 — verify when you go. (r/CalPoly, Sept 2026)"
  },
  {
    title: "SLOeats App Referral Code",
    category: "Discounts & Deals",
    tags: ["food", "tech"],
    desc: "A student-shared referral code (FARMERS) reportedly unlocked a free month of premium and BOGO deals on the local food-ordering app SLOeats.",
    cost: "Discount",
    link: null,
    note: "⚠️ Reported by students in 2023 — current validity unverified. Try it, but don't count on it."
  },

  // ---------------- Real Talk: Skip It ----------------
  {
    title: "Rib Line (Grover Beach)",
    category: "Real Talk: Skip It",
    tags: ["food"],
    desc: "One of the most-agreed-on \"overrated\" call-outs on r/CalPoly — small portions, underwhelming sides, high prices, specifically at the Grover Beach location.",
    cost: "$$",
    link: null,
    note: "r/CalPoly \"worst restaurants\" thread, Oct 2024 — strong agreement in the comments."
  },
  {
    title: "Madonna Inn Dining",
    category: "Real Talk: Skip It",
    tags: ["food"],
    desc: "The rooms and photo-ops are worth it, but the food gets real criticism — steaks called too salty and overpriced, cake called dry.",
    cost: "$$",
    link: null,
    note: "r/CalPoly, Oct 2024. Go for the vibe, not the menu."
  },
  {
    title: "House of Bagels",
    category: "Real Talk: Skip It",
    tags: ["food"],
    desc: "Good taste, but reported high prices, 20–30 minute waits, and order mistakes.",
    cost: "$",
    link: null,
    note: "One account, Oct 2024 — take as one data point, not consensus."
  },
  {
    title: "Flour House",
    category: "Real Talk: Skip It",
    tags: ["food"],
    desc: "Called overpriced and bland by at least one r/CalPoly commenter.",
    cost: "$$",
    link: null,
    note: "r/CalPoly, May 2024."
  },
  {
    title: "Ox + Anchor for a Special Occasion",
    category: "Real Talk: Skip It",
    tags: ["food"],
    desc: "Genuinely mixed — one thread calls it a bad pick for an expensive night out, another recommends it highly and a reply says they loved it. Manage expectations either way.",
    cost: "$$$",
    link: null,
    note: "r/CalPoly fine-dining discussion, April 2025."
  },
  {
    title: "Firestone Grill — the Other Side of the Story",
    category: "Real Talk: Skip It",
    tags: ["food"],
    desc: "Firestone is beloved (see Food & Local Spots) — but it's also been called SLO's most overrated restaurant by some, even as others strongly defend the tri-tip sandwich and fries.",
    cost: "$",
    link: null,
    note: "r/CalPoly \"best/worst\" thread, April 2024 — read both sides and judge for yourself."
  },
  {
    title: "Pismo Beach as \"The\" Beach Trip",
    category: "Real Talk: Skip It",
    tags: ["outdoors", "travel"],
    desc: "Strong \"overrated\" sentiment as the default beach destination — parking and crowds are the main complaints. Shell Beach or Avila get suggested instead.",
    cost: "Free",
    link: null,
    note: "r/CalPoly, April 2024 — one of the more strongly-agreed takes in that thread."
  },
  {
    title: "Local Creek Swimming — Water Quality",
    category: "Real Talk: Skip It",
    tags: ["outdoors", "wellness"],
    desc: "A commenter claiming experience measuring SLO Creek bacteria said they personally avoid local streams; others pushed back on how bad specific creeks actually are.",
    cost: "Free",
    link: null,
    note: "A concern worth being aware of, not a confirmed water-quality finding. (r/CalPoly, April 2022)"
  },

  // ---------------- Know Before You Register ----------------
  {
    title: "Degree Planner's Auto-Rearrange Problem",
    category: "Know Before You Register",
    tags: ["academic"],
    desc: "Editing one course can trigger the whole plan to auto-reorganize, moving classes you'd already placed in other quarters.",
    cost: "Free",
    link: null,
    note: "\"It also attempts to auto reorganize everything around every single change...\" — r/CalPoly, May 2024. Some students prefer sketching their plan on a printed flowchart first."
  },
  {
    title: "Semester Conversion Registration Snags",
    category: "Know Before You Register",
    tags: ["academic"],
    desc: "With Cal Poly's brand-new semester system this year, some students have hit real friction — e.g. one transfer needing the new EE3306 was blocked because they'd already passed the old quarter-system equivalent.",
    cost: "Free",
    link: null,
    note: "If something looks wrong on your plan post-conversion, don't assume it's you — ask your advisor early. (r/CalPoly, May 2026)"
  },
  {
    title: "Technical Elective Prerequisites Outside the Flowchart",
    category: "Know Before You Register",
    tags: ["academic"],
    desc: "Some majors' technical electives carry prerequisites that aren't obvious from the printed flowchart, leading to registration trouble almost every quarter for some students.",
    cost: "Free",
    link: null,
    note: "r/CalPoly, Feb 2021 — check actual course prerequisites in the catalog, not just the flowchart."
  },
  {
    title: "Senior Year Doesn't Fix Sequencing Problems",
    category: "Know Before You Register",
    tags: ["academic"],
    desc: "Missing a once-a-year elective as an underclassman can push a much heavier course load into your final year — priority registration alone doesn't undo bad sequencing.",
    cost: "Free",
    link: null,
    note: "r/CalPoly, May 2024. Plan multi-quarter-out, not just next quarter."
  },
  {
    title: "Figuring Out Who Your Advisor Is",
    category: "Know Before You Register",
    tags: ["academic"],
    desc: "Some official forms require your advisor's email, but with multiple advisors listed for a program, it isn't always obvious which one is actually yours.",
    cost: "Free",
    link: null,
    note: "r/CalPoly, Sept 2020 — if unsure, ask your department office directly rather than guessing."
  },
  {
    title: "Roommate Search Is Hard to Find",
    category: "Know Before You Register",
    tags: ["community"],
    desc: "Cal Poly's housing portal has a roommate-search feature, but it's reportedly not obvious how to find it — some students only learn it exists when someone else finds them through it.",
    cost: "Free",
    link: null,
    note: "r/CalPoly, May 2026 — check your housing portal's account/profile settings if you're hunting for a roommate."
  },
  {
    title: "Housing Cancellation Is Not Straightforward",
    category: "Know Before You Register",
    tags: ["community"],
    desc: "Students report conflicting information from Housing, Financial Aid, and the DRC about what's actually allowed when trying to cancel a housing contract.",
    cost: "Free",
    link: null,
    note: "r/CalPoly, July 2026 — get any cancellation approval in writing, and start the conversation as early as possible."
  },
  {
    title: "Dining Dollars ≠ Meal Swipes",
    category: "Know Before You Register",
    tags: ["academic", "free"],
    desc: "Dining Dollars work like a cash balance, not a per-meal swipe — easy to misunderstand as an incoming student.",
    cost: "Free",
    link: null,
    note: "r/CalPoly, May 2024."
  },
  {
    title: "Dining Dollars Rollover Cap",
    category: "Know Before You Register",
    tags: ["academic"],
    desc: "A quarterly rollover cap was reported starting fall 2025 — meaning unused Dining Dollars past a certain amount can be forfeited at quarter's end instead of carrying over.",
    cost: "Free",
    link: null,
    note: "This was reported under the old quarter system (r/CalPoly, March 2025) — confirm how it applies under semesters before assuming your balance is safe."
  },
  {
    title: "Grand Avenue Deli Price Increases",
    category: "Know Before You Register",
    tags: ["food"],
    desc: "Returning students have flagged noticeable price increases and fewer customization options at on-campus dining spots like Grand Avenue Deli.",
    cost: "Free",
    link: null,
    note: "r/CalPoly, Jan 2025 — worth factoring into your meal plan budget expectations."
  },

  // ---------------- Freshman Regrets & Underused Benefits ----------------
  {
    title: "Free Campus Printing Spots",
    category: "Freshman Regrets & Underused Benefits",
    tags: ["free", "academic"],
    desc: "Several offices offer free printing most students never think to use: the MCC, Pride Center, the Scholars office (Bldg 52), and the Multicultural Engineering Program office (Bldg 40). The Transfer Center also offers a small free print allowance.",
    cost: "Free",
    link: null,
    note: "r/CalPoly, 2023 reports — confirm current page limits in person."
  },
  {
    title: "Library Textbook Reserves",
    category: "Freshman Regrets & Underused Benefits",
    tags: ["free", "academic"],
    desc: "Some assigned textbooks are available free through the library's course reserves — worth checking before buying.",
    cost: "Free",
    link: null,
    note: "r/CalPoly underused-benefits thread, Feb 2025."
  },
  {
    title: "Library Equipment & Interlibrary Loan",
    category: "Freshman Regrets & Underused Benefits",
    tags: ["free", "academic"],
    desc: "Scantrons, calculators, and phone/laptop chargers are available at the library, and interlibrary loan can get you physical books even during on-campus construction disruptions.",
    cost: "Free",
    link: null,
    note: "Confirm loan vs. giveaway for consumables like scantrons. (r/CalPoly, Feb 2025)"
  },
  {
    title: "Free/Discounted Software (SPSS, ArcGIS Pro)",
    category: "Freshman Regrets & Underused Benefits",
    tags: ["free", "tech", "academic"],
    desc: "Some departments provide free licenses for expensive software like SPSS and ArcGIS Pro that students often don't realize they're entitled to.",
    cost: "Free",
    link: null,
    note: "r/CalPoly, Feb 2025 — ask your department about software access before paying for a license."
  },
  {
    title: "Free Campus Yoga",
    category: "Freshman Regrets & Underused Benefits",
    tags: ["free", "fitness", "wellness"],
    desc: "Free yoga classes flagged by students as a genuinely underused benefit, separate from the general Rec Center group fitness schedule.",
    cost: "Free",
    link: null,
    note: "r/CalPoly, Feb 2025."
  },
  {
    title: "EOP Deadline Awareness",
    category: "Freshman Regrets & Underused Benefits",
    tags: ["academic", "free"],
    desc: "One incoming student estimated missing the EOP (Educational Opportunity Program) application deadline cost them roughly $1,000 in potential support.",
    cost: "Free",
    link: null,
    note: "r/CalPoly, July 2024 — mark EOP deadlines early if you might qualify."
  },
  {
    title: "SHPE, TRIO & Cultural Community Groups",
    category: "Freshman Regrets & Underused Benefits",
    tags: ["community", "free"],
    desc: "Students specifically credit groups like SHPE, TRIO, and Polycultural WOW with making Cal Poly feel like home — recommended especially for students unsure where they fit.",
    cost: "Free",
    link: null,
    note: "r/CalPoly freshman-regrets thread, July 2024."
  },
  {
    title: "What Seniors Wish They Knew as Freshmen",
    category: "Freshman Regrets & Underused Benefits",
    tags: ["community", "academic"],
    desc: "The most common regrets from a big r/CalPoly thread: join something early, protect your GPA if you might need to change majors (ICMA eligibility), reconsider your major early if you're not enjoying the classes, try an internship in your field before senior year, and use counseling services before things get bad — not after.",
    cost: "Free",
    link: null,
    note: "\"I wish I went [to] counseling services much sooner.\" — r/CalPoly, July 2019."
  },

  // ---------------- More Hidden Gems (Instagram / LocalWiki / KCPR) ----------------
  {
    title: "@slo.underground — Free All-Ages Local Shows",
    category: "Hidden Gems (Community Intel)",
    tags: ["arts", "social", "free"],
    desc: "An Instagram account posting free, all-ages local music shows around SLO — a real option for students who can't get into 21+ venues.",
    cost: "Free",
    link: null,
    note: "This account reportedly took over after @slo.diy shut down — if an older guide points you to slo.diy, it's stale."
  },
  {
    title: "The Bunker / MPU Underground Shows",
    category: "Hidden Gems (Community Intel)",
    tags: ["arts", "social"],
    desc: "A student-run underground music scene (Music Production Union) hosting small, cheap local shows — a different vibe from the mainstream campus events calendar.",
    cost: "$",
    link: null,
    note: "Watch @slo.underground and campus club Instagram accounts for current show listings — dates rotate."
  },
  {
    title: "Club Fundraiser House Shows",
    category: "Hidden Gems (Community Intel)",
    tags: ["arts", "social", "community"],
    desc: "Cal Poly clubs like Engineers Without Borders occasionally run house-show fundraisers with live bands, cash or Venmo entry, and snacks — proceeds go straight to the club.",
    cost: "$",
    link: null,
    note: "Follow club Instagram accounts directly — these aren't listed anywhere central."
  },
  {
    title: "Cal Poly Unicycle Club",
    category: "Hidden Gems (Community Intel)",
    tags: ["community", "fitness", "free"],
    desc: "Yes, this is a real, active club (@cpunicycle) that hosts flatland competitions — about as niche and unexpected as Cal Poly clubs get.",
    cost: "Free",
    link: null,
    note: null
  },
  {
    title: "CPSalsa Beginner Dance Nights",
    category: "Hidden Gems (Community Intel)",
    tags: ["social", "fitness"],
    desc: "Weekly bachata and salsa nights in Building 5, Room 225 — no experience or partner required, mixer included.",
    cost: "$",
    link: null,
    note: "⚠️ One flyer showed conflicting student prices ($4 in the caption vs $7 on the image) — confirm the actual price with organizers before assuming either."
  },
  {
    title: "Lemon Grove–Rock Garden Loop",
    category: "Outdoors & Hikes",
    tags: ["outdoors", "free"],
    desc: "A roughly 4-mile loop starting at the Lemon Grove trailhead on Fernandez Lane, with an alternate approach from the Madonna Mountain side.",
    cost: "Free",
    link: null,
    note: "Recommended in Her Campus Cal Poly's student-written hiking guide."
  },
  {
    title: "Community Fruit Tree Maps",
    category: "Hidden Gems (Community Intel)",
    tags: ["free", "food", "outdoors"],
    desc: "SLO's community LocalWiki maintains maps of public fruit trees around town — loquats, figs, pineapple guava, persimmons, kumquats, avocados, and apples.",
    cost: "Free",
    link: null,
    note: "Genuinely unique local knowledge — individual trees' access and ripeness will vary, so check before a special trip."
  },
  {
    title: "Neighborhood Little Free Libraries",
    category: "Hidden Gems (Community Intel)",
    tags: ["free", "academic"],
    desc: "Community-run book boxes around town, including ones at Mill & Toro, Broad & Pacific, and near Grand & Monterey.",
    cost: "Free",
    link: null,
    note: "Based on an older community inventory — locations can change."
  },
  {
    title: "Bike Night (First Thursday)",
    category: "Day Trips & Traditions",
    tags: ["social", "outdoors", "free"],
    desc: "A monthly community bike ride on the first Thursday of the month, right after the Farmers' Market wraps up — a free, low-key social alternative to bar-hopping.",
    cost: "Free",
    link: null,
    note: "Reported on by KCPR, Cal Poly's student radio station."
  },
  {
    title: "\"Deep Dark\" Creek Tunnel",
    category: "Hidden Gems (Community Intel)",
    tags: ["community"],
    desc: "A creek tunnel running under downtown SLO with its own graffiti and local lore, documented on SLO's community LocalWiki.",
    cost: "Free",
    link: null,
    note: "This is local folklore, not a vetted hiking spot — current permitted access is unconfirmed, so treat it as a story to know, not an itinerary to follow."
  },

  // ---------------- More Local Food Finds ----------------
  {
    title: "Honeymoon Cafe (Pismo)",
    category: "Local Food Finds (Community Intel)",
    tags: ["food", "travel"],
    desc: "A Pismo cafe on Price Street — the cowboy burrito and jackfruit banh mi bowl are the specific student-recommended orders.",
    cost: "$",
    link: null,
    note: null
  },
  {
    title: "Cal Poly Creamery Friday Drive-Through",
    category: "Local Food Finds (Community Intel)",
    tags: ["food"],
    desc: "Most Fridays, noon–4pm: student-made ice cream (single scoop $6, double $8, pints $9), a $12 cheese \"Odds & Ends\" box, plus student-made summer sausage and chocolate.",
    cost: "$",
    link: null,
    note: "Check the Creamery's current page before going — hours are \"most Fridays,\" not guaranteed every week."
  },

  // ---------------- More Underused Resources ----------------
  {
    title: "SLO County Library Card → Free MakerSpace Hours",
    category: "Creative & Maker Spaces",
    tags: ["free", "tech", "arts"],
    desc: "A free SLO County library card unlocks up to 15 free hours a week at SLO MakerSpace — woodworking, metalworking, pottery, electronics, and 3D printing.",
    cost: "Free",
    link: null,
    note: "Materials aren't included, and some equipment needs a separate paid certification — confirm current hours with the library FAQ."
  },
  {
    title: "Library of Things",
    category: "Creative & Maker Spaces",
    tags: ["free", "tech"],
    desc: "SLO County Library lends more than books: tool kits (via SLO MakerSpace), board games, sewing/craft supplies, museum passes, and parks passes. The Shandon branch has its own separate power-tool collection.",
    cost: "Free",
    link: null,
    note: "Different items have different pickup requirements — check per item."
  },
  {
    title: "Sharing SLO Community Directory",
    category: "Hidden Gems (Community Intel)",
    tags: ["free", "community"],
    desc: "A community-maintained directory of niche local resources: Table Ware Share (borrow event flatware), the SLO Seed Exchange, the SLO Produce Exchange, slacklining at Meadow Park, and lunchtime bocce at Emerson Park.",
    cost: "Free",
    link: null,
    note: "Community-maintained leads — freshness varies, so double-check before counting on any one of them."
  },
  {
    title: "SLO Little 500",
    category: "Day Trips & Traditions",
    tags: ["community", "social"],
    desc: "A local underground bicycle relay tradition — four-person teams sharing one bicycle, in costume, competing for a trophy teams add to year after year. Announcements are deliberately scattered across social media rather than centrally listed.",
    cost: "Free",
    link: null,
    note: "Documented by New Times SLO as a genuine local subculture worth knowing about."
  },

  // ---------------- Campus Life Reality Check ----------------
  {
    title: "Communal Laundry Frustrations (PCV)",
    category: "Know Before You Register",
    tags: ["community"],
    desc: "A recurring complaint in campus social media: clothes pulled out of shared dryers by other residents while still wet, sometimes with real time left on the cycle.",
    cost: "Free",
    link: null,
    note: "Set a phone timer and try to be back right when your cycle ends — a common workaround students mention."
  }
];
