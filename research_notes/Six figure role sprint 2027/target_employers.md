# Target Employers: Mid-Level JS/TS Full-Stack (no clearance), DMV or US-Remote

Method note (applies to every section): unless marked otherwise, "open role" evidence below was collected on **2026-11-16** by calling each employer's public ATS JSON feed directly (the same endpoints `src/fetchers/ats.js` polls): `boards-api.greenhouse.io/v1/boards/<slug>/jobs`, `api.lever.co/v0/postings/<slug>`, `api.ashbyhq.com/posting-api/job-board/<slug>`. Dates shown are the ATS `updated_at` / `publishedAt` / `createdAt` for the posting. Pay ranges are only those printed in the posting (Ashby compensation summary, Lever `salaryRange`, or a range in the Greenhouse description). Employers without a public Greenhouse/Lever/Ashby board were checked by web search only, and those results come from aggregators (Built In, The Muse, Dice, arc.dev, ClearanceJobs) whose freshness could not be confirmed. Clearance stance was judged by scanning posting text for "clearance", "public trust", "TS/SCI", "U.S. citizen".

## Q1. Which employers fit, and what is the evidence of open relevant roles, pay, location, and track?

### Takeaway
About 35 employers had a verifiable, currently open (Oct–Nov 2026) JS/TS-relevant role on their own ATS feed on 2026-11-16; the strongest no-clearance, $100K+, DMV-or-remote fits for a mid-level engineer are Oddball, Excella, Bellese, Nava, Ad Hoc, Fearless (govtech), Capital One, Fannie Mae, Freddie Mac, Appian, ID.me, Alarm.com, Aledade (DMV commercial), and Temporal, Netlify, Dscout, Writer, Linear (remote-US commercial/AI). Most venture-backed AI startups post $150K–$300K+ but list "Senior" titles and SF/NYC hubs, so they are stretch targets for a mid-level candidate.

### Cited Findings

#### A. Govtech / digital services (federal civilian, non-cleared practice)
| Employer | Location model | Open relevant role(s) on 2026-11-16 | Posted pay | Clearance stance | Tracks | ATS slug |
|---|---|---|---|---|---|---|
| Oddball | Remote-US; DC-area for some roles | Front End Engineer (Remote, upd. 2026-11-10); **Power Platform Developer** (Remote, 2026-11-03); Senior Full Stack Engineer (Washington DC area, 2026-11-03) | FE $100,000–$130,000; Power Platform $100,000–$135,000; Sr FS $130,000–$175,000 | Boilerplate: "certain roles may also require U.S. citizenship and ... a federal background investigation and/or a security clearance" → Public Trust sometimes | Full-stack, Power Platform | `greenhouse:oddball` — [board](https://job-boards.greenhouse.io/oddball) / [FE role](https://job-boards.greenhouse.io/oddball/jobs/8200470003), [Power Platform role](https://job-boards.greenhouse.io/oddball/jobs/8015174003) |
| Excella | Arlington VA, "Remote Flexible" | Senior JavaScript Engineer; Lead JavaScript Engineer (both upd. 2026-10-28) | Not shown in feed | No clearance/public-trust text in these postings | Full-stack | `greenhouse:excella` — [Senior JS Engineer](https://www.excella.com/careers/apply/?gh_jid=4748632005) |
| Bellese | Remote-US | Engineer II, Full Stack (created 2026-08-25, still listed) | $108,700–$125,300 | "Able to meet the requirements to hold a position of Public Trust" → Public Trust required | Full-stack | `lever:bellese` — [role](https://jobs.lever.co/bellese/06f71894-60f4-4119-9f48-b37d81f89ab3) |
| Nava PBC | Remote-US | Software Engineer (Backend-Java) (2026-11-09); Senior SWE (Ruby) (2026-10-30); Engineering Resume Drop Off; **Senior Product Manager (Salesforce)** signals a Salesforce practice | Not shown in feed | "May be subject to a government background check or security clearance, depending on the contract" → Public Trust sometimes | Full-stack (backend-leaning), Salesforce-adjacent | `greenhouse:navapbc` — [board](https://job-boards.greenhouse.io/navapbc) |
| Ad Hoc LLC | Remote-first | Aggregators list Software Engineer III Front End/Back End, Staff SWE Full Stack, Library of Congress full-stack roles; freshness unconfirmed | Not found | Postings ask for ability to obtain DHS Public Trust; one Staff role requires Tier 4 Public Trust → Public Trust common | Full-stack | No GH/Lever/Ashby board found (`adhoc`, `adhocteam` returned nothing); careers: adhocteam.us/join — [Dice](https://www.dice.com/job-detail/cd34adbd-9fc2-4fc5-8ad0-ca6cb24ffb08), [Built In](https://builtin.com/job/software-engineer-iii-front-end-back-end/9547218) |
| Fearless (Baltimore) | Baltimore / hybrid / remote | Aggregators list Senior Full-Stack SWE (House Digital Service), Front End Engineer, **Senior Salesforce Engineer** (remote), Software Engineer II | SWE II $91,554–$123,500 (Baltimore); a DC-resident range of $122,643–$196,229 reported | Mixed; many listings carried on ClearanceJobs → check per role | Full-stack, Salesforce | No public board found (`fearless`, `fearlessdigital`) — [ClearanceJobs listing](https://www.clearancejobs.com/jobs/9024737/senior-full-stack-engineer-senior-consultant-engineering-te), [Breezy listing](https://city-of-baltimore-mayor-s-office-of-employment-development.breezy.hr/p/99e645b18d79-software-engineer-ii-iii-fearless-tech-up-to-180k-usd) |
| Skylight | Remote-US | Only senior/staff/principal eng roles (e.g., Principal SWE Lead, U.S. Air Force, 2026-11-13); no mid-level JS role open | Not shown | 7 of 17 postings mention clearance (USAF work) | Full-stack (later) | `greenhouse:skylighthq` — [board](https://job-boards.greenhouse.io/skylighthq) |
| Code for America | Remote (in the U.S.) | Only Staff/Principal SWE open (2026-11-04) | Not shown | No clearance text | Full-stack (later) | `greenhouse:codeforamerica` |
| GovDash (govcon SaaS) | New York | Software Engineer (2026-11-13) | $160K–$200K + equity | None in posting | Full-stack, AI app | `ashby:govdash` — [role](https://jobs.ashbyhq.com/govdash/911b41b3-c74a-44db-88ea-96cafb957466) |

#### B. State/local gov IT vendors
| Employer | Location model | Open relevant role(s) | Posted pay | Clearance | Tracks | ATS slug |
|---|---|---|---|---|---|---|
| OpenGov | US (Boston listed); many India roles | Sr Software Engineer – Full Stack (Boston, 2026-11-11); Sr. Product Engineer (2026-10-01) | $178K–$197K; $165K–$183K | None found in eng postings | Full-stack | `ashby:opengov` — [role](https://jobs.ashbyhq.com/opengov/e5208e44-f32c-439b-a511-b83a0f0c739e) |
| Mark43 (public-safety SaaS) | Open eng roles seen were UK/Manchester only | Full Stack Engineer, AI-Enabled SWE (UK) | — | 10 of 38 postings mention clearance | Full-stack | `greenhouse:mark43` — US eng roles not open on check date |
| CivicPlus | Remote-USA | No mid-level dev role (Principal Platform Engineer, Tech Support Eng III only) | — | None | — | `greenhouse:civicplus` |
| Tyler Technologies, Granicus | — | Not verified this session (no GH/Lever/Ashby board found under `tylertech`, `tylertechnologies`, `granicus`) | — | — | Full-stack | Gap |

#### C. DMV commercial employers
| Employer | DMV office | Open relevant role(s) | Posted pay | Clearance | Tracks | ATS slug |
|---|---|---|---|---|---|---|
| Capital One | McLean VA HQ | Full Stack Engineer 4; Lead SWE Full Stack; Software Engineer (Intelligent Foundations & Experiences, 2–5 yrs) | FS Eng 4 / Lead: $197,300–$225,100 (McLean); SWE (2–5 yrs): $135,600–$154,800 | Commercial bank; no clearance | Full-stack, AI app | Own site (no GH board) — [capitalonecareers.com FS Eng 4](https://www.capitalonecareers.com/job/mclean/full-stack-engineer-4/1732/100950228464), [Software Engineer listing](https://hw.glich.co/jobboard/jobs/software-engineer-full-stack-intelligent-foundations-and-experiences-at-capital-one-juu24a) |
| Fannie Mae | Reston VA / DC | Full Stack Software Engineer (posted Apr 2026); Software Engineer Sr. Associate (2026-07-23); Sr Full Stack Engineer (AWS) | FS SWE $123,000–$161,000; Sr. Associate $96,000–$124,000; Sr SWE $121,000–$158,000 | Commercial (GSE); no clearance | Full-stack | SmartRecruiters `FannieMae` — [The Muse](https://www.themuse.com/jobs/fanniemae/sr-full-stack-engineer-aws), [SmartRecruiters](https://smartrecruiters.com/FannieMae/744000006620917) |
| Freddie Mac | McLean VA | Senior Software Engineer, Full Stack (reposted ~Nov 2026 per Built In) | $127K–$191K | No clearance | Full-stack | Own site — [Built In](https://builtin.com/job/senior-software-engineer/7346522) |
| Appian | McLean VA HQ | Product Engineer (McLean, 2026-11-13); Lead Applied AI Engineer (McLean and "United States", 2026-11-13); Senior SWE (McLean) | Not shown in feed | Mixed: one Senior SWE requires "Ability to obtain or maintain an active Secret-level clearance" (IL environment); 17 of 154 postings mention clearance | Full-stack, AI app, low-code | `greenhouse:appian` — [Product Engineer](https://job-boards.greenhouse.io/appian/jobs/8264454), [Lead Applied AI Eng](https://job-boards.greenhouse.io/appian/jobs/8204996) |
| ID.me | McLean VA (+ Mountain View) | Senior SDE – Fullstack (McLean, 2026-11-12); Software Engineer – Developer Experience & AI Platform (McLean, 2026-11-06) | Not shown | 0 of 48 postings mention clearance | Full-stack, AI app | `greenhouse:idme` — [Fullstack](https://job-boards.greenhouse.io/idme/jobs/7849712003), [Dev Exp & AI](https://job-boards.greenhouse.io/idme/jobs/8039485003) |
| Alarm.com | Tysons VA HQ | Senior Software Engineer (Tysons, 2026-10-30); 12 eng matches total | Not shown | 0 of 91 postings mention clearance | Full-stack | `greenhouse:alarmcom` — [role](https://job-boards.greenhouse.io/alarmcom/jobs/8771191002) |
| Aledade | Bethesda MD (remote roles) | Senior Software Engineer I – Fullstack (Remote US, 2026-09-03) | $134,000–$182,000 | None | Full-stack | `lever:aledade` — [role](https://jobs.lever.co/aledade/c727d84a-427d-4bcf-bfa5-63f8743ac829) |
| Mapbox | DC office historically | Senior AI Engineer, MapGPT (Mapbox US, 2026-09-22) | $175,100–$236,900 | None | AI app | `ashby:Mapbox` — [role](https://jobs.ashbyhq.com/Mapbox/6f44da03-b4ee-4706-aa8c-da6dbca4063d) |
| Axios | DC (remote, DC preferred) | Salesforce Business Analyst (2026-11-12) — below target pay | $65,000–$75,000 | None | Salesforce (entry) | `greenhouse:axios` — [role](https://job-boards.greenhouse.io/axios/jobs/8164656) |
| Morning Consult | DC | Software Engineer II, DevOps (Remote US, 2026-10-23) — DevOps, not JS | $93,300–$150,100 | None | — (watch) | `ashby:morningconsult` |
| Quorum, EAB, 2U, FiscalNote, Fundrise, Arcadia, Upside, Higher Logic | DC/MD | Boards exist but **no US JS/full-stack role open** on 2026-11-16 (Quorum's only eng role is in Brazil) | — | None | — | `ashby:quorum`, `greenhouse:eab`, `greenhouse:2u`, `lever:fiscalnote`, `lever:fundrise`, `lever:arcadia`, `ashby:upside`, `greenhouse:higherlogic` |
| Marriott, Navy Federal, GEICO, Cvent, AWS/Amazon HQ2, Booz Allen (commercial), Hilton | DMV HQs | Not verified: no GH/Lever/Ashby board (Cvent slug returned nothing) and a web search for Navy Federal/GEICO/Cvent full-stack postings returned only staffing/aggregator pages | — | — | Full-stack | Gap — [search result page sample](https://www.resume-library.com/full-stack-developer-jobs-in-vienna-virginia) |

#### D. AI companies / remote-US TypeScript-heavy commercial
| Employer | Location model | Open relevant role(s) | Posted pay | Clearance | Tracks | ATS slug |
|---|---|---|---|---|---|---|
| Temporal | Remote-US | Software Engineer II, Open Source Server (2026-09-29); several Senior SWE (remote US) | SWE II $118,400–$194,250; Senior $140.8K–$231K | None | Full-stack (backend-leaning) | `ashby:temporal` — [SWE II](https://jobs.ashbyhq.com/temporal/81cc8698-59f8-418a-85fd-1fc154b33ee4) |
| Netlify | Remote | Senior Software Engineer (2026-11-16) | $148,000–$180,000 | None | Full-stack | `greenhouse:netlify` — [role](https://job-boards.greenhouse.io/netlify/jobs/8519325002) |
| Dscout | Remote-US | Senior Forward Deployed Engineer (Full-Stack) (2026-11-02) | Not shown | None | Full-stack, AI app/FDE | `greenhouse:dscout` — [role](https://job-boards.greenhouse.io/dscout/jobs/4472803009) |
| Writer | Remote (NYC/SF) | Software engineer, agents; Software engineer, generative AI (2026-11-03) | $132K–$240K + equity | None | AI app | `ashby:writer` — [role](https://jobs.ashbyhq.com/WRITER/ce86adec-e8ce-4bbf-a706-43795a982de6) |
| Linear | North America remote | Product Engineer (2026-06-09) | $174K–$245K + equity | None | Full-stack (TS) | `ashby:linear` — [role](https://jobs.ashbyhq.com/linear/0c7c2e26-0a98-42cf-a47c-9a3999fb513b) |
| LangChain | Remote-US / SF | Senior Frontend Engineer, LangSmith (Remote US, 2026-08-13); FullStack Engineer (SF, 2026-10-14) | $180K–$240K; $145K–$180K | None | AI app, full-stack | `ashby:langchain` — [FS role](https://jobs.ashbyhq.com/langchain/ddf92275-1cc3-49c0-9f25-e8ded43b07f6) |
| Hex | Remote-US | Software Engineer, Fullstack (remote, 2026-02-19 still listed) | $198,750–$295,000 | None | Full-stack | `ashby:hex` — [role](https://jobs.ashbyhq.com/hex/996c38fd-0a7a-4df9-a5c3-4234b20b7b71) |
| Sanity | Remote-US | Senior SWE, AI Developer Experience (2026-02-14) | Not shown | None | AI app, TS | `ashby:sanity` |
| Supabase | Remote global | SWE – Storage (2026-10-24), Auth, Functions, Branching | Not shown | None | Full-stack (TS/Postgres) | `ashby:supabase` (already in default list) |
| Vercel | Hybrid SF/NYC | Software Engineer, AI Gateway; Agent Auth; Agentic Infrastructure (Nov 2026) | $196,000–$294,000 | None | AI app, TS | `greenhouse:vercel` (default list) |
| Harvey | NYC/SF (some remote) | Senior SWE, Full Stack – NYC (2026-02-09) | $200K–$260K | None | AI app | `ashby:harvey` |
| Ramp | NYC HQ (remote-flagged) | Software Engineer, Growth Platform; Security roles | $168K–$275.1K (Growth) | None | Full-stack | `ashby:ramp` (default list) |
| Stripe | US hubs + "Remote in the US" | AI Engineer (Chicago, 2026-11-02); Forward Deployed roles | Not shown in feed | None | AI app, FDE | `greenhouse:stripe` (default) |
| Anthropic | SF/NYC | 83 eng-matching titles, e.g., Applied AI Engineer (2026-11-12) | Not shown in feed | 22 of 661 postings mention clearance (public-sector team) | AI app | `greenhouse:anthropic` (default) |
| Cohere | United States remote | Forward Deployed Engineer, Agentic Platform (US remote, 2026-09-01) | CA$175K–CA$385K | 11 of 122 postings mention clearance | AI app, FDE | `ashby:cohere` |
| Decagon, Sierra, Gamma, Modal | SF/NYC onsite | Multiple SWE/AI Engineer/FDE roles | $180K–$400K ranges | None | AI app | `ashby:decagon`, `ashby:Sierra`, `ashby:gamma`, `ashby:modal` |
| Cardata | Canada remote only | Senior Full-Stack SWE (2026-11-13) — not US-eligible | $150K–$175K (CAD presumed) | None | — | `greenhouse:cardata` (exclude: Canada) |

#### E. Platform partners (ServiceNow / Microsoft / Salesforce)
| Employer | Location model | Evidence | Clearance | Tracks | ATS slug |
|---|---|---|---|---|---|
| NewRocket (Elite ServiceNow partner) | Remote (US/Canada team) | Aggregators list ServiceNow Senior Software Engineer (CSM/FSM, HRSD, AI, Platform Integrations) and Lead Engineer roles; CSA + CAD certifications commonly required | None mentioned | ServiceNow | No GH/Lever/Ashby board found — [arc.dev](https://arc.dev/remote-jobs/j/newrocket-servicenow-senior-software-engineer-ai-pl4os91g26), [Built In Colorado](https://www.builtincolorado.com/job/servicenow-lead-engineer-platform-custom-apps-integration/10200911) |
| Thirdera (now Cognizant) | Remote | Only a Spain ServiceNow Technical Consultant listing found; described as acquired by Cognizant | — | ServiceNow | [remoterocketship](https://remoterocketship.com/company/thirdera/jobs/servicenow-technical-consultant-spain) |
| Oddball | Remote | Power Platform Developer $100K–$135K (see A) | Public Trust sometimes | Power Platform | `greenhouse:oddball` |
| Fearless, Nava | Remote / Baltimore | Senior Salesforce Engineer (Fearless); Senior PM (Salesforce) (Nava) | Public Trust sometimes | Salesforce | see A |
| Crossfuze, Coastal Cloud, Cloud for Good, Slalom, Quisitive, Plat4mation, Silverline, 7Summits, Carahsoft | — | No GH/Lever/Ashby board found under obvious slugs; not verified | — | ServiceNow / Salesforce / Microsoft | Gap |

#### F. Probed and excluded / flagged (predominantly cleared)
- Scale AI: public-sector Forward Deployed SWE (incl. Washington, DC) requires "An active TS/SCI clearance, or eligibility to obtain one"; 36 of 170 postings mention clearance → flag; only commercial (SF) roles fit — `greenhouse:scaleai`.
- Raft: Forward Deployed Engineer (Huntsville, $110,000–$200,000); 27 of 32 postings mention clearance → exclude — `greenhouse:raft`.
- Shift5: 7 of 8 postings mention clearance → exclude — `greenhouse:shift5`.
- Dragos: 0 JS roles and 4 of 50 mention clearance → low fit.

### Inferences
- The highest-probability mid-level, no-clearance, $100K+ DMV targets are the GSE/bank cluster (Capital One, Fannie Mae, Freddie Mac): their posted ranges ($96K–$225K) clear $100K at Sr. Associate/SWE level and require no clearance.
- Oddball is the single best fit for a JS engineer who wants a govcon on-ramp: it simultaneously posts Front End, Full Stack, and Power Platform roles at $100K+ remote.
- Govtech firms (Nava, Skylight, Code for America) currently skew to senior/staff hiring and resume drop-offs; expect mid-level openings to appear intermittently, which is exactly what polling their feeds catches.
- Venture AI companies pay most but their open titles are almost all "Senior" and SF/NYC-centric; Temporal SWE II, Netlify, Writer, Dscout, and Linear are the most realistic remote-US entries.

### Gaps
- No open-role verification for Marriott, Navy Federal, GEICO, Cvent, AWS/Amazon HQ2, Booz Allen commercial, Hilton, Tyler Technologies, Granicus, Bixal, Truss, Carahsoft, Salesforce, ServiceNow, Microsoft, ICF, Guidehouse, Maximus, Slalom, Coastal Cloud — they use Workday/iCIMS/SmartRecruiters/own sites not polled here, and web search returned only aggregator pages.
- Greenhouse feeds for Excella, Appian, ID.me, Alarm.com, Nava, Stripe, Anthropic, Dscout did not include a pay range in the content field; pay unknown for those.
- Aggregator-sourced rows (Ad Hoc, Fearless, Capital One, Fannie Mae, Freddie Mac, NewRocket) could not be date-confirmed as open on 2026-11-16.

## Q2. What is each employer's clearance stance, and which should be excluded?

### Takeaway
Commercial DMV employers (Capital One, Fannie/Freddie, ID.me, Alarm.com, Aledade) and remote AI/TS companies show no clearance language; digital-services govtech firms typically use contract-dependent Public Trust language rather than Secret/TS; Raft, Shift5, and Scale AI public-sector should be excluded or flagged.

### Cited Findings
- Oddball: "certain roles may also require U.S. citizenship and ... a federal background investigation and/or a security clearance" (boilerplate on all 11 postings) — [Oddball FE posting](https://job-boards.greenhouse.io/oddball/jobs/8200470003)
- Nava: "May be subject to a government background check or security clearance, depending on the contract" — [Nava board](https://job-boards.greenhouse.io/navapbc)
- Bellese: must be "Able to meet the requirements to hold a position of Public Trust" — [Bellese role](https://jobs.lever.co/bellese/06f71894-60f4-4119-9f48-b37d81f89ab3)
- Ad Hoc: a SWE III posting asks for ability to obtain and maintain a DHS Public Trust; a Staff role requires Tier 4 Public Trust; some roles require 3 of last 5 years U.S. residency — [Dice](https://www.dice.com/job-detail/cd34adbd-9fc2-4fc5-8ad0-ca6cb24ffb08), [Built In](https://builtin.com/job/software-engineer-iii-front-end-back-end/9547218)
- Excella JavaScript roles: no clearance or public-trust text found in posting content (0 of 9 board postings) — [Excella role](https://www.excella.com/careers/apply/?gh_jid=4748632005)
- Appian: one Senior SWE requires "Ability to obtain or maintain an active Secret-level clearance (DoD Tier 3 investigation)"; 17 of 154 postings mention clearance → mixed; target its commercial product/AI roles — [Appian board](https://job-boards.greenhouse.io/appian)
- Scale AI public sector FDSE: "An active TS/SCI clearance, or eligibility to obtain one" — [Scale AI role](https://job-boards.greenhouse.io/scaleai/jobs/4481921005)
- Raft: 27 of 32 postings mention clearance; Shift5: 7 of 8 — ATS feeds `greenhouse:raft`, `greenhouse:shift5` (counts from 2026-11-16 probe)

### Inferences
- "Public Trust" is a background investigation, not a clearance; a US-work-authorized candidate without a clearance can usually be hired into these roles, though some contracts (e.g., DHS) add U.S.-citizenship or residency rules.
- The job agent's `requiresClearance()` filter should not drop Oddball/Nava-style boilerplate ("may ... depending on the contract"), or it will discard the best govtech fits.

### Gaps
- Clearance counts are keyword hits, which include boilerplate; per-role reading was done only for the rows quoted above.

## Q3. Which employers build toward a future government-contracting career?

### Takeaway
Oddball, Nava, Ad Hoc, Bellese, Skylight, Excella, Fearless, and Appian all have federal-agency work visible in their postings, making them the best bridges into govcon; state/local SaaS vendors (OpenGov, CivicPlus, Mark43) build public-sector domain experience without federal clearance overhead.

### Cited Findings
- Skylight postings are tagged by federal customer: U.S. Air Force, HHS, ACF — [Skylight board](https://job-boards.greenhouse.io/skylighthq)
- Nava posts a "General Resume Drop Off - Federal/GovCon Experience" and a "Capture Engineer" role (proposal/capture function) — [Nava board](https://job-boards.greenhouse.io/navapbc)
- Ad Hoc describes itself as a digital services company serving the federal government; postings reference DHS Public Trust and Library of Congress work — [Built In](https://builtin.com/job/software-engineer-iii-front-end-back-end/9547218), [code4lib](https://jobs.code4lib.org/jobs/58985-senior-software-engineer-full-stack-library-of-congress)
- Fearless lists a Senior Full-Stack SWE supporting the House Digital Service — [ClearanceJobs](https://www.clearancejobs.com/jobs/9024737/senior-full-stack-engineer-senior-consultant-engineering-te)
- Appian's Secret-cleared role references IL (DoD Impact Level) environments, showing a federal practice — [Appian board](https://job-boards.greenhouse.io/appian)
- GovDash builds SaaS for government contractors — [GovDash role](https://jobs.ashbyhq.com/govdash/911b41b3-c74a-44db-88ea-96cafb957466)

### Inferences
- Commercial DMV employers (Capital One, Fannie/Freddie) offer the best pay-to-risk ratio but little direct govcon credential; a govtech stint at Oddball/Nava/Ad Hoc/Excella earns Public Trust history and agency references that matter later.

### Gaps
- GSA MAS schedule holdings, state contract vehicles, and prime/sub relationships were not verified for any employer in this session (would require GSA eLibrary / SAM.gov lookups).

## Q4. Which ATS board slugs can the job agent poll directly?

### Takeaway
26 relevant slugs were confirmed live on 2026-11-16 and are not yet in `DEFAULT_ATS_BOARDS` in `src/config.js`; adding them to `ATS_BOARDS` lets the agent catch DMV/govtech mid-level openings as they post.

### Cited Findings (confirmed live via each provider's public API on 2026-11-16)
- Govtech: `greenhouse:oddball`, `greenhouse:navapbc`, `greenhouse:excella`, `lever:bellese`, `greenhouse:skylighthq`, `greenhouse:codeforamerica`, `ashby:govdash`, `ashby:opengov`, `greenhouse:mark43`, `greenhouse:civicplus`
- DMV commercial: `greenhouse:appian`, `greenhouse:idme`, `greenhouse:alarmcom`, `lever:aledade`, `ashby:mapbox`, `greenhouse:axios`, `ashby:morningconsult`, `ashby:quorum`, `greenhouse:eab`
- Remote TS/AI: `ashby:temporal`, `greenhouse:netlify`, `greenhouse:dscout`, `ashby:writer`, `ashby:langchain`, `ashby:hex`, `ashby:sanity`, `ashby:harvey`, `ashby:cohere`
- Suggested `.env` line: `ATS_BOARDS=greenhouse:oddball,greenhouse:navapbc,greenhouse:excella,lever:bellese,greenhouse:skylighthq,greenhouse:codeforamerica,ashby:govdash,ashby:opengov,greenhouse:appian,greenhouse:idme,greenhouse:alarmcom,lever:aledade,ashby:mapbox,greenhouse:axios,ashby:morningconsult,ashby:temporal,greenhouse:netlify,greenhouse:dscout,ashby:writer,ashby:langchain,ashby:hex,ashby:sanity,ashby:linear,ashby:supabase,greenhouse:vercel,ashby:ramp,greenhouse:stripe,greenhouse:anthropic`

### Inferences
- `ashby:opengov` and `greenhouse:alarmcom` include many non-US roles; the agent's location filter must handle India/Poland/UK postings.
- Capital One, Fannie Mae (SmartRecruiters), Freddie Mac, GEICO, Navy Federal, Marriott, Tyler, ServiceNow/Salesforce partners are not reachable via these three ATS feeds; they need the JSearch/Adzuna/SerpApi sources or a new Workday/SmartRecruiters fetcher.

### Gaps
- Slugs tried with no board found: adhoc, adhocteam, bixal, truss, trussworks, fearless, coforma, flexion, bloomworks, granicus, tylertech, polco, zencity, softrams, aquia, kalvara, cvent, bluelabs, newrocket, crossfuze, coastalcloud, cloudforgood, slalom, quisitive, carahsoft, thirdera — they may use other ATSs or non-obvious slugs.
