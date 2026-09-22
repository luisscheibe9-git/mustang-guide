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
  "Transportation",
  "Clubs & Community",
  "Outdoors & Hikes",
  "Food & Local Spots",
  "Day Trips & Traditions"
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
    note: "Just drop by during posted hours — no appointment needed."
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
    note: "M–F 8:30am–6pm, ground level of the Health Center."
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
    note: "Building 82. Genuinely underused per student press coverage."
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
    note: null
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
    note: "No restrooms. Check tide times before you go."
  },
  {
    title: "Poly Canyon / Architecture Graveyard",
    category: "Outdoors & Hikes",
    tags: ["outdoors", "arts", "free", "community"],
    desc: "A roughly 3-mile round trip into a 9-acre outdoor lab of ~20 decades-old student-built experimental structures, dating to 1964.",
    cost: "Free",
    link: "https://polycanyon.calpoly.edu/history",
    note: null
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
    note: null
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
    note: null
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
  }
];
