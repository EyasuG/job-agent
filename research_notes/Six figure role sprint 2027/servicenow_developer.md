# ServiceNow Developer as a Target Role (mid-level JS full-stack engineer, no clearance, by April 2027)

Research date: 2026-11-16. All posting counts are point-in-time snapshots taken today via public (logged-out) pages and are noisy; see caveats on each.

## Q1. Posting volume: national, US-remote, DMV, and the non-clearance share

### Takeaway
ServiceNow developer demand is large and DMV-heavy: LinkedIn shows 4,000+ active US "ServiceNow Developer" postings and 727 in the DC-Baltimore area, while ClearanceJobs alone lists 1,660 "servicenow developer" jobs. A meaningful minority of DMV listings need a clearance, but many DMV postings from federal integrators (ICF, Booz Allen, Capgemini, Deloitte, CACI, GDIT) carry no clearance in the title. True same-day counts were mostly unobtainable (Indeed returned 403; LinkedIn guest pages ignore date/remote filters).

### Cited Findings
- LinkedIn (logged-out) reports "4,000+ ServiceNow Developer jobs in United States" (active postings; the 24-hour filter `f_TPR=r86400` appeared not to be applied for guest view, so this is NOT a same-day count) — [LinkedIn search](https://www.linkedin.com/jobs/search?keywords=ServiceNow%20Developer&location=United%20States&f_TPR=r86400)
- Adding the remote filter (`f_WT=2`) returned the identical "4,000+" header and identical top listings, so the remote filter was also ignored for guests; no reliable US-remote count was obtained — [LinkedIn remote search](https://www.linkedin.com/jobs/search?keywords=ServiceNow%20Developer&location=United%20States&f_WT=2)
- LinkedIn reports 727 "ServiceNow Developer" jobs in the Washington DC-Baltimore Area (all active, not same-day) — [LinkedIn DMV search](https://www.linkedin.com/jobs/search?keywords=ServiceNow%20Developer&location=Washington%20DC-Baltimore%20Area)
- Of the first 20 DMV LinkedIn results, 3 explicitly require clearance in the title (Intact Technology TS x2; Deloitte TS/SCI w/ Poly); others further down mention Secret and Public Trust (Ares Enterprise, LightFeather). Non-clearance-titled DMV listings include Capgemini (McLean), MetroStar (DC), ICF (Reston, incl. a "Senior ServiceNow Developer - Remote"), Conviso, Dev Technology Group, Booz Allen (DC, x2), HII Mission Technologies (Springfield), LightFeather, Centennial Technologies ("ServiceNow Developer – Mid Level", Tysons), CACI (Bethesda), Acuity, GDIT (Falls Church), DirectViz — [LinkedIn DMV search](https://www.linkedin.com/jobs/search?keywords=ServiceNow%20Developer&location=Washington%20DC-Baltimore%20Area)
- ClearanceJobs reports 1,660 jobs for "servicenow developer"; sample shows clearances from Public Trust through Confidential, Secret, TS/SCI (TEKsystems at Fort Meade, The Judge Group at Lorton TS/SCI, IntelliDyne DC Secret, ManTech Lexington Park/remote Secret); one (Conviso, remote/hybrid) listed clearance "unspecified" — [ClearanceJobs](https://www.clearancejobs.com/jobs?keywords=servicenow%20developer)
- Dice "posted today" filter for "servicenow developer" (US) showed 11 results at time of fetch (early in the day; mixes developer, BA, architect titles). Examples: General Dynamics "ServiceNow Developer Sr Principal" Remote, $136K–$184K; System One (Columbia SC); several third-party contract roles — [Dice today](https://www.dice.com/jobs?q=servicenow%20developer&filters.postedDate=ONE&countryCode=US)
- Dice sample listings (search-indexed, undated) include remote full-time ServiceNow Developer at $114K–$140K, and W2 contracts at $40–$45/hr and $45–$50/hr (latter requires CAD) — [Dice listing 1](https://www.dice.com/job-detail/ea7106dd-524a-453a-8964-a01d2c346268); [Dice listing 2](https://www.dice.com/job-detail/100f9ceb-733a-4e89-ba73-4db975609497)
- LinkedIn search for the phrase "Now Assist" returned 740 results, but the top listings were irrelevant (home care aides), i.e. the keyword matched noise; no usable "Now Assist developer" count — [LinkedIn "Now Assist"](https://www.linkedin.com/jobs/search?keywords=%22Now%20Assist%22&location=United%20States)
- Indeed blocked automated fetch (HTTP 403); no Indeed counts obtained — [Indeed](https://www.indeed.com/jobs?q=servicenow+developer&l=Washington%2C+DC&fromage=1)

### Inferences
- DMV is roughly 15–20% of all US LinkedIn ServiceNow developer postings (727 of 4,000+), a heavy concentration driven by federal integrators.
- In the LinkedIn DMV first page, ~15% of titles explicitly require clearance; the real share needing clearance or Public Trust is higher because many requirements live only in the description. Public Trust (obtainable after hire, not a prerequisite clearance) is common in civilian-agency work and is generally accessible to a US citizen without a prior clearance. A rough working estimate: 50–65% of DMV ServiceNow dev postings are open to non-cleared candidates (Public Trust-after-hire included). This is an inference, not a measured figure.
- ClearanceJobs' 1,660 count shows cleared ServiceNow work is a large, separate market; the non-cleared candidate competes in the remainder.
- Same-day national volume on Dice appears low (tens per day) versus a large active stock; the market is "deep but slow-turning."

### Gaps
- No reliable same-day counts for LinkedIn/Indeed, no US-remote count, and no counts for "ServiceNow engineer" or "ServiceNow AI agent" (logged-out boards ignore filters; Indeed 403). User should run these logged-in: LinkedIn `keywords=ServiceNow%20Developer&f_TPR=r86400&f_WT=2`, Indeed `q=servicenow+developer&fromage=1&sc=0kf%3Aattr(DSQF7)%3B` (remote).
- No measured non-clearance share; would require parsing full descriptions.

## Q2. How much of ServiceNow development is JavaScript; transferability of a JS full-stack background

### Takeaway
ServiceNow development is substantially JavaScript: server-side Glide API scripting (Business Rules, Script Includes), client scripts, and now the ServiceNow SDK with "Fluent," a TypeScript-based DSL, plus TypeScript in JS modules. A full-stack JS engineer's language skills transfer directly; the gap is platform knowledge (data model, ACLs, Flow Designer vs scripts, ITSM processes).

### Cited Findings
- ServiceNow Fluent is officially described as a declarative, domain-specific language based on TypeScript for defining application metadata, written in `.now.ts` files — [ServiceNow docs: Fluent](https://www.servicenow.com/docs/r/zurich/application-development/building-applications/servicenow-fluent.html)
- Beginning with ServiceNow SDK 3.0, apps support TypeScript in JavaScript modules by default — [ServiceNow docs: Using TypeScript](https://www.servicenow.com/docs/r/de-DE/application-development/servicenow-sdk/using-typescript.html)
- SDK v4.3.0 release notes mention a Flow API (MVP) and full TypeScript type safety; SDK 4.7.1 guide shows server-side logic as functions in `src/server/` — [SDK v4.3.0 release](https://newreleases.io/project/github/ServiceNow/sdk/release/v4.3.0); [SDK 4.7.1 guide](https://app.unpkg.com/@servicenow/sdk@4.7.1/files/docs/guides/developing-apps-guide.md)
- 2026 community material on external IDEs says developers can write code to run in ServiceNow using JavaScript ES Modules or TypeScript — [ServiceNow Community SDK/CLI knowledge](https://www.servicenow.com/community/servicenow-ide-sdk-and-fluent/development-servicenow-sdk-amp-cli-knowledge-amp-troubleshooting/ta-p/3512341)
- Caveat: some third-party guidance says inline Glide scripts are still ES5-style, conflicting with guidance favoring typed TS imports — [Fluent MCP prompt (third-party)](https://cdn.jsdelivr.net/npm/@iflow-mcp/modesty_fluent-mcp@0.1.0/res/prompt/coding_in_fluent.md)
- A ServiceNow practitioner (May 2026) replying to a 4-yr React/Python full-stack dev: prior experience is not treated as fresher-level; integrations and architecture skills add value; suggests building a portfolio app with the SDK (e.g. AI-driven) on a PDI; key skill is knowing when to configure out-of-box vs customize — [ServiceNow Community thread](https://www.servicenow.com/community/developer-forum/seeking-guidance-transition-from-full-stack-developer-to/m-p/3538050)
- Recruiter guide: platform is "learnable within months" for someone with solid JS; screens include "when does a Business Rule beat a Flow" and "what does an ACL evaluate" — [KORE1 salary guide, Jul 2026](https://www.kore1.com/servicenow-developer-salary-guide/)
- PayScale mid-career ServiceNow Developer with JavaScript skills is tracked as its own category — [PayScale JS skill](https://www.payscale.com/research/US/Job=ServiceNow_Developer/Salary/af57137b/Mid-Career-JavaScript)

### Inferences
- The JS full-stack background is a genuine differentiator, especially for SDK/Fluent, UI Builder/Next Experience components, REST integrations, and AI-agent integration work, where many admin-turned-developers are weaker.
- The SDK/TypeScript direction raises the value of mainstream-engineer skills over time (source control, CI, typed code).

### Gaps
- No quantitative split of how much day-to-day ServiceNow dev work is code vs low-code configuration (Flow Designer, UI policies). UI Builder/Next Experience specifics not researched in depth.

## Q3. Entry path and timeline: CSA, CAD, PDI, RiseUp; do employers hire certified-but-inexperienced devs at mid-level?

### Takeaway
2026 rules: no vouchers; you unlock exam eligibility by completing the required ServiceNow University course, then pay ~$300 per exam (retake $150) through Pearson VUE. CSA + CAD in ~8–12 weeks is plausible for a working JS engineer, but certs alone are widely described as insufficient; hiring at $100K+ without platform experience is uncertain and most realistic via (a) leveraging prior engineering years, (b) partner/integrator roles, or (c) contract.

### Cited Findings
- 2026 changes: exam vouchers no longer exist; eligibility is unlocked by completing the correct course (usually the Implementation/Advanced course) and doesn't expire; exams moved from Kryterion/Webassessor to Pearson VUE via ServiceNow University; exam must be taken within 90 days of registering; fees non-refundable — [ServiceNow Community, 2026 exam changes (Mark Roethof)](https://www.servicenow.com/community/training-and-certifications/2026-exam-vouchers-courses-exams-amp-retakes-major-changes/ba-p/3464930)
- Fees (USD, excl. tax): CSA first attempt $300, CAD $300, retakes $150; on-demand courses free but don't include an attempt; ILT courses include first attempt; retake waits 3 days, 30 days, then 6 months — [same source](https://www.servicenow.com/community/training-and-certifications/2026-exam-vouchers-courses-exams-amp-retakes-major-changes/ba-p/3464930)
- Conflicting price data: another 2026 community reply cites $354; third-party sites give $210–$450; Knowledge 2026 on-site pricing was $75 (75% off) — [Community CAD cost thread](https://www.servicenow.com/community/training-and-certifications/query-about-cad-exam-cost/m-p/3519480); [Knowledge26 certification](https://servicenow.swoogo.com/Knowledge26Certification)
- RiseUp: described in community replies as a 10–14 week academy-style program, often region-specific, with exam vouchers issued through it — [Community CSA/CAD thread](https://www.servicenow.com/community/servicenow-university-community/servicenow-csa-and-cad-certification-exam/m-p/3511970)
- Community advice: CSA first, then Application Development Fundamentals, then PDI scripting practice; CAD blueprint for syllabus. Views on cert value conflict: one trainer says without CSA and no SN experience "you will have no chance," another says CSA standalone is "meaningless" for hiring — [Community career transition thread](https://www.servicenow.com/community/sysadmin-forum/career-transition-to-servicenow-system-administrator-from-non-it/m-p/3551964)
- A non-SN dev with 2+ yrs experience "would likely be treated as a fresher with a bonus" (one community opinion) — conflicting with the May 2026 reply saying full-stack experience isn't treated as fresher-level — [Community thread](https://www.servicenow.com/community/sysadmin-forum/career-transition-to-servicenow-system-administrator-from-non-it/m-p/3552209); [Full-stack transition thread](https://www.servicenow.com/community/developer-forum/seeking-guidance-transition-from-full-stack-developer-to/m-p/3538050)
- An April 2026 CSA+CAD holder seeking entry-level developer roles had no replies showing an outcome; no documented 2026 cert-only hires found — [Community post](https://www.servicenow.com/community/virtual-agent-forum/certified-servicenow-developer-seeking-guidance-amp-opportunity/m-p/3535992)
- Recruiter view: junior band ($80K–$105K) suits "a fresh CSA plus solid JavaScript"; warns about candidates with six weeks of admin-UI clicking; mid-level band assumes CSA + CAD and 3–5 yrs — [KORE1, Jul 2026](https://www.kore1.com/servicenow-developer-salary-guide/)
- PDI availability caveat: community pages showed a banner "Some PDIs are currently unavailable, and PDI actions are paused" during 2026 — [Community page banner](https://www.servicenow.com/community/training-and-certifications/servicenow-certified-system-administrator-csa/m-p/3579592)
- Job listings commonly require CSA; some require CAD; experience asks range 2 to 5+ years — [Dice sample listings](https://www.dice.com/job-detail/ea7106dd-524a-453a-8964-a01d2c346268)

### Inferences
- Realistic prep: CSA ~3–5 weeks, CAD ~4–6 weeks for an experienced JS engineer studying part-time, so both by ~Feb 2027 leaves ~2 months of searching before April 2027. Tight but feasible.
- The most credible pitch is "X years professional JS/full-stack + CSA + CAD + PDI/SDK portfolio (integrations, Fluent app, an AI agent)", which can land in the junior-to-mid band ($90K–$120K). Clearing $100K on the first ServiceNow job is plausible in DMV/consulting, less certain elsewhere.
- Partner/integrator firms (which bill clients for certified headcount) are the likeliest first employers.

### Gaps
- Exact 2026 names of required unlock courses for CSA/CAD and whether CAD still exists under that exact name were not confirmed from an official ServiceNow University page.
- No hard data on hire rates for cert-only career switchers.

## Q4. Pay: mid-level national and DMV; contract rates

### Takeaway
Mid-level (CSA+CAD, 3–5 yrs) US base is about $105K–$140K; DC/NoVA runs ~10% above national. Contract: $80–$115/hr for mid-level per a recruiter, but low-end W2 contracts on Dice go as low as $40–$50/hr, reflecting offshore/vendor-chain pressure.

### Cited Findings
- KORE1 (Jul 2026): Junior (CSA, 0–2 yrs) $80K–$105K; Mid (CSA+CAD, 3–5 yrs) $105K–$140K ($120K–$160K with premium module/clearance/consulting); Senior $140K–$180K; overall median base ~$125K. Metro: DC/Northern Virginia typical base $148K (+11% vs national) — [KORE1](https://www.kore1.com/servicenow-developer-salary-guide/) (note: staffing firm; blended estimates)
- KORE1 contract rates: mid-level dev (CAD) $80–$115/hr; senior/CIS $115–$165/hr; architect/cleared federal $150–$225/hr — [KORE1](https://www.kore1.com/servicenow-developer-salary-guide/)
- PayScale mid-career US ServiceNow Developer average base $115,616 (10–90%: $53K–$146K); with application-development skills $133,592 — [PayScale mid-career](https://www.payscale.com/research/US/Job=ServiceNow_Developer/Salary/05376481/Mid-Career); [PayScale app dev](https://www.payscale.com/research/US/Job=ServiceNow_Developer/Salary/370024a1/Mid-Career-Application-Development)
- ZipRecruiter national average $129,281 (all levels) — [ZipRecruiter](https://www.ziprecruiter.com/Salaries/Service-Now-Developer-Salary)
- Search summary attributed to Salary.com: mid-level DC $114,352–$140,202; Arlington VA $99,436–$122,684 (not directly fetched; verify) — via search results, [Salary.com not fetched]; treat as unverified
- Live postings: remote FT $114K–$140K; GD Sr Principal remote $136K–$184K; W2 contracts $40–$45/hr and $45–$50/hr — [Dice listing](https://www.dice.com/job-detail/ea7106dd-524a-453a-8964-a01d2c346268); [Dice today](https://www.dice.com/jobs?q=servicenow%20developer&filters.postedDate=ONE&countryCode=US); [Dice W2 listing](https://www.dice.com/job-detail/100f9ceb-733a-4e89-ba73-4db975609497)

### Inferences
- $100K+ is the norm at mid-level and attainable in DMV even near the bottom of the mid band; a first-ServiceNow-job candidate might land ~$95K–$120K FTE. Contract roles under $55/hr W2 fall below $100K annualized and should be avoided.

### Gaps
- No Maryland-specific data; Salary.com DC/Arlington figures unverified.

## Q5. Outlook to 2031: company growth, AI agents, partners, offshore, state/local & federal civilian adoption

### Takeaway
ServiceNow is still growing subscription revenue ~21% YoY (Q3 2026) and is pushing agentic AI (Now Assist, AI Agents, Action Fabric/MCP, AI Control Tower) that needs integration and governance work. Public-sector adoption is broad (nearly all 50 states). Main risks: offshore delivery scale (Infosys alone ~3,800 SN resources, ~2,400 offshore/nearshore), AI automating routine config/scripting, and recent margin/stock pressure.

### Cited Findings
- Q3 2026: subscription revenue $3.988B, +21% YoY (20.5% cc); total revenue $4.106B; FY2026 subscription guidance raised to $15.785B (~21% cc); Q4 sub guidance $4.245–4.255B — [SEC 8-K Q3 FY26](https://www.sec.gov/Archives/edgar/data/0001373715/000137371526000092/erq3fy26.htm); [ServiceNow newsroom](https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-Reports-Third-Quarter-2026-Financial-Results/default.aspx)
- Caveats: Armis acquisition adds ~125 bps to FY subscription growth; GAAP net income fell to $277M from $502M; stock fell after report — [Quartr summary](https://quartr.com/events/servicenow-now-q3-2026_3gnKPsN5); [diginomica](https://diginomica.com/node/31392)
- Knowledge 2026 (May): launched Action Fabric, letting the platform run headless so any MCP-capable AI agent can act on it; Anthropic a launch partner (Claude Cowork); also AI Control Tower and "Autonomous Workforce" — [ServiceNow press release](https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-opens-its-full-system-of-action-to-every-AI-Agent-in-the-enterprise/); [Constellation Research](https://www.constellationr.com/insights/news/servicenow-knowledge-2026-ai-control-tower-action-fabric-autonomous-workforce-and)
- AI Agent Fabric was launched at Knowledge 2025 with partners incl. Accenture, Google Cloud, IBM, Microsoft (2025 data) — [destinationCRM, 2025](https://www.destinationcrm.com/Articles/CRM-News/CRM-Across-the-Wire/ServiceNow-Launches-AI-Control-Tower-and-AI-Agent-Fabric-at-Knowledge-2025-169399.aspx)
- Analyst framing: "the UI is dead, long live the agent" — ServiceNow going headless — [Techzine](https://www.techzine.eu/blogs/analytics/141272/the-ui-is-dead-long-live-the-agent-servicenow-goes-headless-and-opens-its-platform/)
- Practitioner: platform heavily AI-focused; developers need AI skills though direction uncertain — [Community thread, May 2026](https://www.servicenow.com/community/developer-forum/seeking-guidance-transition-from-full-stack-developer-to/m-p/3538050)
- Public sector (Jul 22 2026): ServiceNow in "nearly all 50 U.S. states"; Hawaii statewide ITSM launched in six weeks; City of Raleigh AI agents resolve ~half of IT requests, service-desk costs down 66%; DC OCTO consolidating contact center/workflow and extending to grants management; CalHFA AI case resolution (vendor marketing) — [ServiceNow press release](https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-accelerates-AI-powered-government-reinvention-across-nearly-all-50-U-S--states-with-new-customer-wins/default.aspx)
- State procurement: Massachusetts EOTSS statewide ServiceNow RFQ awarded Apr 14 2026; NY ITS ServiceNow ITSM license renewal bid (due May 4 2026); Minnesota MNIT ServiceNow program; Missouri DSS planning ServiceNow case-management hub — [Govly award](https://app.govly.com/public/awards/cf1a4ac5a348db761982efa58b41f01e); [Govly NY opp](https://app.govly.com/public/opportunities/16566574); [MNIT](https://mn.gov/mnit/about-mnit/tmf/servicenow.jsp); [Missouri DSS](https://www.pulse.bot/govtech/news/missouri-department-of-social-services-uses-servicenow-to-boost-citizen-experience-6bee89b2-7df5-40ca-b91c-18961b5e5657/)
- Offshore: Infosys reports ~3,800 ServiceNow resources (~2,400 offshore/nearshore, ~1,400 onshore), 500+ engagements for 200+ clients (2025 doc) — [Infosys NEAT 2025](https://www.infosys.com/services/experience-transformation/documents/services-neat-assessment-2025.pdf)
- Big IT services firms (TCS, Accenture, HCLTech, Infosys) expanding reliance on global delivery centers; TCS and Accenture had headcount declines in 4Q25 — [TBR](https://tbri.com/blog/infosys-cognizant-tcs-and-wipro-its-double-down-on-competitive-pricing-strategy-while-trying-to-enhance-client-engagement/)
- Low W2 contract rates ($40–$50/hr) on Dice reflect vendor-chain/offshore-heavy pricing — [Dice W2 listing](https://www.dice.com/job-detail/100f9ceb-733a-4e89-ba73-4db975609497)

### Inferences
- Through 2031 the platform looks durable (20%+ growth, public sector entrenchment, agentic positioning). Developer demand likely shifts from routine scripting/config (most exposed to AI and offshore) toward integrations, SDK/TypeScript apps, AI agent design/governance, and US-person/onshore federal work — areas that favor a JS engineer.
- Onshore federal civilian and state work (data residency, US-citizen/Public Trust requirements) is partially insulated from offshoring.

### Gaps
- No primary data quantifying AI's effect on ServiceNow developer headcount, or ServiceNow-specific offshore share across the ecosystem. No federal civilian revenue breakout found (10-K not fetched). BLS has no ServiceNow-specific category.

## Q6. Employers hiring non-cleared ServiceNow developers in the DMV and remotely

### Takeaway
Federal integrators and SN partners dominate DMV postings; many list roles without clearance in the title (often Public Trust). Remote openings come from partners, staffing firms, and end-customers.

### Cited Findings
- DMV LinkedIn listings without clearance in title: Capgemini (McLean), MetroStar (DC), ICF (Reston; incl. remote senior role and "DC, VA, MD"), Conviso, Dev Technology Group (Reston), Booz Allen (DC), Deloitte (Arlington; note Deloitte also posts TS/SCI-poly SN roles), HII Mission Technologies (Springfield), LightFeather (Alexandria; some Public Trust), Centennial Technologies (Mid Level, Tysons), CACI (Bethesda), Acuity (Reston), GDIT (Falls Church), DirectViz (Alexandria) — [LinkedIn DMV](https://www.linkedin.com/jobs/search?keywords=ServiceNow%20Developer&location=Washington%20DC-Baltimore%20Area)
- Clearance-required DMV examples to avoid: Intact Technology (TS), Deloitte McLean (TS/SCI poly), The Judge Group Lorton (TS/SCI), IntelliDyne (Secret), ManTech (Secret), TEKsystems Fort Meade (Secret) — [LinkedIn DMV](https://www.linkedin.com/jobs/search?keywords=ServiceNow%20Developer&location=Washington%20DC-Baltimore%20Area); [ClearanceJobs](https://www.clearancejobs.com/jobs?keywords=servicenow%20developer)
- National/remote examples: SchoolsFirst FCU (CA), E-Logic (San Diego), Gainwell Technologies (CA, Medicaid), Spatial Front (Austin), Homecare Homebase (Dallas), Via Logic (Remote), Avance Consulting (TX), General Dynamics (remote, $136K–$184K), K&K Global Talent (remote) — [LinkedIn US](https://www.linkedin.com/jobs/search?keywords=ServiceNow%20Developer&location=United%20States&f_TPR=r86400); [Dice today](https://www.dice.com/jobs?q=servicenow%20developer&filters.postedDate=ONE&countryCode=US)
- Global Elite partners include Infosys and Accenture (2025 Global Elite Partner of the Year per a competitor's article) — [ServiceNow partner finder: Infosys](https://www.servicenow.com/de/partners/partner-finder/infosys-limited.html); [Hexaware](https://hexaware.com/?p=238037)
- DC government (OCTO) is itself expanding ServiceNow use — [ServiceNow press release](https://newsroom.servicenow.com/press-releases/details/2026/ServiceNow-accelerates-AI-powered-government-reinvention-across-nearly-all-50-U-S--states-with-new-customer-wins/default.aspx)

### Inferences
- Best targets for a non-cleared JS engineer: ICF, Booz Allen, Capgemini, MetroStar, Deloitte (non-cleared reqs), CACI/GDIT civilian programs (Public Trust), LightFeather, Dev Technology, Acuity, plus commercial end-customers (credit unions, healthcare SaaS) for remote roles.

### Gaps
- Did not verify each listing's full description for clearance/Public Trust requirements, or check partner careers pages directly.
