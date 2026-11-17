# Govtech / Digital-Services vs Commercial Full-Stack JS Job Market (mid-level, no clearance) — notes as of 2026-11-16

Method note: Company openings below were pulled live on 2026-11-16 from public ATS APIs (Greenhouse `boards-api.greenhouse.io/v1/boards/{slug}/jobs?content=true`, Ashby `api.ashbyhq.com/posting-api/job-board/{slug}`, Lever `api.lever.co/v0/postings/{slug}`). "Clearance" flags come from a keyword scan of posting text, then manual reading of the engineering roles. Dice counts were read from dice.com search result pages on the same date. Budget limits meant several firms and the Indeed/LinkedIn counts could not be checked (see Gaps).

## 1. Which govtech/digital-services firms hire full-stack JS engineers without clearance; open roles, pay, remote/DMV, clearance/Public Trust, agencies

### Takeaway
As of 2026-11-16, the founder-led "digital services coalition" firms have very few open IC engineering roles that fit a mid-level JS profile. The best direct matches are Oddball's **Front End Engineer** (React/TS, VA.gov design system, remote, $100K–$130K) and **Senior Full Stack Engineer** (DC area, $130K–$175K). Both require **U.S. citizenship plus a federal background investigation** (Public Trust-type), not a security clearance. Nava's engineering openings are senior Ruby (12+ yrs) or Java backend. Skylight's are senior/staff and mostly Air Force. Code for America's are staff/principal. CivicPlus (local-gov SaaS) has no clearance language but no mid-level JS role open today. Public-Trust-style suitability checks are the norm at federal digital-services firms. Commercial-style govtech SaaS (CivicPlus, Code for America) does not ask for them.

### Cited Findings
**Nava PBC** (Greenhouse slug `navapbc`): 20 open postings on 2026-11-16, all Remote. Engineering ICs are only "Senior Software Engineer (Ruby)" ($135,900–$153,000; Ruby on Rails + TypeScript; "At least 12 years" full-stack experience) and "Software Engineer (Backend-Java)" (5+ yrs agile/cloud). Every role says it "May be subject to a government background check or security clearance, depending on the contract" and requires U.S. work authorization without sponsorship. There is also an always-open "Engineering Resume Drop Off." — [Nava Greenhouse board](https://job-boards.greenhouse.io/navapbc), [Senior SWE Ruby](https://job-boards.greenhouse.io/navapbc/jobs/4473996009), [SWE Backend-Java](https://job-boards.greenhouse.io/navapbc/jobs/4482367009)
- Nava reportedly won a **$139M GSA Digital Services BPA** (Sept 2026 market brief). This is a growth signal. — [G2X Daily Federal Market Brief 2026-09-11](https://g2x.com/blog/daily-government-market-intelligence-09-11-2026)

**Oddball** (Greenhouse slug `oddball`): 11 open postings on 2026-11-16.
- **Front End Engineer**, Remote, **$100,000–$130,000**, posted/updated 2026-11-10. Builds React + JavaScript/TypeScript + web components for the **VA Design System and Forms Library on VA.gov**. Must "Meet Section 508 and WCAG 2.2 AA". USWDS, Stencil, Storybook, and "AI-assisted development tools" are listed as pluses. Requires "U.S. citizenship and the ability to obtain and maintain a federal background investigation and/or a security clearance." Bachelor's required. — [Oddball Front End Engineer](https://job-boards.greenhouse.io/oddball/jobs/8200470003)
- **Senior Full Stack Engineer**, Washington DC area, **$130,000–$175,000**, same citizenship/background-investigation language. — [Oddball Senior Full Stack](https://job-boards.greenhouse.io/oddball/jobs/8012571003)
- Other Oddball roles: Power Platform Developer $100K–$135K, Platform Administrator $100K–$145K, Lead Data Engineer $110K–$145K, DevSecOps $110K–$145K (mentions Secret), Applied AI/ML Engineer (DC) $150K–$200K. — [Oddball board](https://job-boards.greenhouse.io/oddball)
- Oddball reportedly acquired a Salesforce delivery business and won an SEC Cloud Services Support task in Sept 2026. This is a growth signal. — [Govly signal](https://app.govly.com/public/signals/105606) (aggregator; not verified against a primary source)

**Skylight** (Greenhouse slug `skylighthq`): 17 open postings, all "United States" (remote). Engineering roles are senior or above and mostly U.S. Air Force: Principal SWE Lead, Senior/Staff DevOps, Security, and SDET. They list two pay bands, **$90,000–$125,000 and $120,000–$140,000** (band by level). HHS/ACF roles mention Public Trust or a background investigation. The Air Force engineering postings did not match on clearance keywords. No mid-level full-stack JS role was open. — [Skylight board](https://job-boards.greenhouse.io/skylighthq), [Principal SWE Lead (USAF)](https://job-boards.greenhouse.io/skylighthq/jobs/4754355005)
- Skylight holds a 2026 HHS/CMS delivery order running to June 2027. — [USAspending award](https://www.usaspending.gov/award/CONT_AWD_75FCMC26F0036_7530_47QTCA18D00D0_4732)

**Code for America** (Greenhouse slug `codeforamerica`): 10 open postings, all "Remote (in the U.S.)". Engineering roles are Staff Software Engineer **$128,945–$157,850** (7+ yrs), Principal Software Engineer $143,884–$176,138, Engineering Manager $128,945–$157,850, and Staff Data Engineer. There is no clearance requirement because it is a nonprofit working with state and local governments. The posting states "you can expect a 1–2 month, or longer, hiring process." — [CfA Staff SWE](https://job-boards.greenhouse.io/codeforamerica/jobs/8165204), [CfA board](https://job-boards.greenhouse.io/codeforamerica)

**CivicPlus** (Greenhouse slug `civicplus`, local-government SaaS): 8 open postings, Remote USA, no clearance language. The only engineering role is Principal Platform Engineer at $155,100–$241,900. There is no mid-level JS role. — [CivicPlus board](https://job-boards.greenhouse.io/civicplus)

**Agile Six** (Greenhouse `agilesix`): 1 opening on 2026-11-16 (BD Director, CMS/HHS, $182,767–$250,460, DMV preferred). There were no engineering roles. — [Agile Six board](https://job-boards.greenhouse.io/agilesix)

**Ad Hoc** (Ashby slug `ad-hoc`): the board exists but returned **0 open postings** on 2026-11-16. Ad Hoc's 2025 capabilities sheet positions it as a decade-long federal digital-services firm (VA, CMS). — [Ad Hoc Capabilities Sheet 2025](https://adhoc.team/downloads/Ad-Hoc-Capabilities-Sheet-2025.pdf), [adhoc.team insights](https://www.adhoc.team/insights/digital-services)

**Truss**: SBA 8(a), GSA IT-70 schedule. It reportedly won an $8M SEC Semantic Layer Support task on a Digital Services BPA (date not shown). — [OrangeSlices](https://orangeslices.ai/truss-beats-out-3-to-win-8m-sec-semantic-layer-support-task-on-digital-services-bpa/), [Truss capabilities statement](https://pepper-gazelle-jpgm.squarespace.com/s/Truss-Capabilities-Statement-11123.pdf)

**Coforma**: about 160+ staff, with IRS Direct File and CMS work. It was hiring a Healthcare Growth Leader in Jan 2026. — [Keyhole ranking](https://keyholesoftware.com/top-custom-government-software-development-services/), [G2X 2026-01-16](https://g2xchange.com/blog/daily-government-market-intelligence-01-16-2026)

**Flexion**: a social-impact digital services firm (healthcare, benefits, learning). — [Keyhole ranking](https://keyholesoftware.com/top-custom-government-software-development-services/)

**DMV contractor market on Dice** (Washington, DC +50 mi, query "full stack react node", posted last 7 days, 2026-11-16): **135 results**. Of the first 20, only 2 mentioned clearance: a Pikesville MD W2 contract citing Public Trust at $55–$60/hr, and a Reston TS/SCI role. Examples with listed pay include Booz Allen Full Stack Developer, Bethesda hybrid, $69,400–$158,000; SteerBridge Software Engineer, Vienna VA, $125K–$140K; Brandywine Full Stack Developer, Gaithersburg, up to $115K; and a Rockville/remote Global Health Full Stack Developer at $81,499–$138,549. Many Baltimore-area listings are W2 hourly contracts ($45–$75/hr). — [Dice search](https://www.dice.com/jobs?q=full%20stack%20react%20node&location=Washington,%20DC,%20USA&radius=50&radiusUnit=mi&page=1&pageSize=20&filters.postedDate=SEVEN&language=en)

### Inferences
- The likeliest $100K+, no-clearance, JS-centric federal digital-services roles are Oddball-type VA.gov front-end and full-stack work (VA.gov is React/TS). That work requires **U.S. citizenship plus a background investigation** (Public Trust), not a Secret clearance. A U.S.-citizen candidate is eligible. A work-authorized non-citizen generally is not, for VA-type contracts.
- Coalition firms publish few roles at a time. Their 2026 boards skew senior, staff, PM, and capture/BD, which suggests they are bidding new work, not scaling delivery headcount. A mid-level candidate should watch the boards weekly and use "resume drop-off" postings (Nava) rather than expect several matching openings at once.
- The Dice DMV sample suggests most DMV "full stack" listings do **not** require clearance, but many are W2/C2C hourly staffing contracts. Large integrators (Booz Allen) post wide bands that straddle $100K.

### Gaps
- Not checked, because their ATS slugs were not found or budget ran out: **Truss, Fearless, Bixal, Flexion, Coforma, Kin + Carta Government, Tyler Technologies, Maximus, Granicus**, and state-government IT firms. Their current open full-stack counts and pay bands are unknown.
- Ad Hoc showed 0 Ashby postings. It may also use another careers channel; this was not verified.

## 2. Impact of 2025 federal cuts (DOGE, 18F shutdown, USDS) on these firms; growing vs shrinking in 2026

### Takeaway
18F was eliminated in March 2025, and USDS was repurposed into DOGE. Several coalition firms nonetheless show 2026 contract wins: Nava's $139M GSA Digital Services BPA, Oddball's SEC task and acquisition, Truss's SEC task, and Skylight's HHS/NARA awards. Their 2026 boards are thin and senior-heavy. Firm-specific layoff data for 2025–26 was not found.

### Cited Findings
- GSA eliminated 18F in early March 2025, labeling it "non-critical". Estimates of affected staff vary (one source says all ~85 employees). — [Nextgov, Mar 2025](https://nextgov.com/people/2025/03/gsa-eliminates-18f/403400); [CBS News](https://cbsnews.com/news/general-services-administration-shutters-technology-unit-trump-doge)
- USDS "has since been transformed into" DOGE. — [Nextgov](https://nextgov.com/people/2025/03/gsa-eliminates-18f/403400)
- A 2025 year-in-review describes cuts and consolidation, including 18F. — [MeriTalk](https://www.meritalk.com/articles/cuts-and-consolidation-trumps-federal-reset-in-2025/)
- One analysis says terminations and cancellations are typically under 3% of contract actions per year. A 2026 BD field report argues new obligations have not collapsed and frames 2026 as a "recompete reset". Both are vendor blogs and should be treated cautiously. — [fed-spend.com](https://fed-spend.com/blog/why-are-government-contracts-being-cancelled), [fed-spend.com recompete](https://fed-spend.com/blog/2026-recompete-reset-bd-field-report)
- Growth signals: Nava's $139M GSA Digital Services BPA (Sept 2026) — [G2X](https://g2x.com/blog/daily-government-market-intelligence-09-11-2026); Skylight's NARA ERA task and HHS order to June 2027 — [USAspending](https://www.usaspending.gov/award/CONT_AWD_75FCMC26F0036_7530_47QTCA18D00D0_4732); Oddball's SEC Cloud task and Salesforce-business acquisition — [Govly](https://app.govly.com/public/signals/105606).

### Inferences
- The award activity points to "consolidating, not collapsing." Firms holding GSA Digital Services BPA, VA, CMS, and SEC vehicles (Nava, Oddball, Truss, Skylight) look relatively stable to growing. Firms with no current postings (Ad Hoc) look flat or shrinking. The hiring signals are weak in both directions.

### Gaps
- No primary-source layoff or headcount numbers were found for Ad Hoc, Nava, Coforma, Truss, Fearless, Bixal, or Flexion in 2025–26. No FedScoop or Washington Technology firm-level coverage was surfaced.

## 3. Commercial mid-level full-stack JS market: postings, pay, time-to-hire, competition

### Takeaway
On 2026-11-16, Dice showed **41** full-time "full stack react node" postings nationally from the past 24 hours, and **135** in the DC+50mi area over the past 7 days. Indeed data shows software postings recovering in 2025–26 (+~15% since Feb 2025) but still about 27.5% below Feb 2020. The recovery is driven by senior roles, and mid-level postings fell 6.7% since Jan 2025.

### Cited Findings
- Dice, query "full stack react node", US, full-time, posted last 1 day, 2026-11-16: **"41 results (41 new)"**. — [Dice search](https://www.dice.com/jobs?q=full%20stack%20react%20node&countryCode=US&radius=30&radiusUnit=mi&page=1&pageSize=20&filters.postedDate=ONE&filters.employmentType=FULLTIME&language=en)
- Dice, same query, Washington DC +50 mi, last 7 days, all employment types: **"135 results (30 new)"** (details in §1). — [Dice DMV search](https://www.dice.com/jobs?q=full%20stack%20react%20node&location=Washington,%20DC,%20USA&radius=50&radiusUnit=mi&page=1&pageSize=20&filters.postedDate=SEVEN&language=en)
- Indeed Hiring Lab (Jul 23, 2026), software development, Q1 2026:
  - Senior roles were **69.3%** of postings and entry-level **4.5%**, which implies about 26% mid-level (my calculation).
  - Across all sectors since Jan 2025, senior postings were +13.5%, **mid-level −6.7%**, and entry −6.3% (through May 2026).
  - In tech from 2019 to 2025, the mid-level share fell 7.7 points and the senior share rose 9 points.
  - [Hiring Lab, "The labor market is tilting toward seniority"](https://hiringlab.indeed.com/2026/07/23/the-labor-market-is-tilting-toward-seniority/)
- U.S. software postings are up about 15% since late Feb 2025 while overall postings are down about 7%. About 71% of the May 2025–May 2026 net increase came from senior roles, and about 37% from AI-titled roles. These figures come from secondary coverage of Indeed data. — [OfficeChai](https://officechai.com/ai/us-software-job-postings-are-up-15-since-launch-of-claude-code-while-overall-job-postings-are-down-7-indeed-data/), [CIO](https://www.cio.com/article/4195780/it-hiring-sees-a-boost-as-software-development-jobs-slowly-bounce-back.html)
- Software postings are about 27.5% below Feb 2020 (mid-2026). — [Hiring Lab](https://hiringlab.indeed.com/?p=20778) (via search summary)
- BLS median pay for software developers is **$135,980** (May 2025). For web developers and digital designers it is **$99,520** (May 2025). — [BLS OOH Software Developers](https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm), [BLS OOH Web Developers](https://www.bls.gov/ooh/computer-and-information-technology/web-developers.htm)
- Time-to-hire datum: Code for America states a "1–2 month, or longer" process. — [CfA posting](https://job-boards.greenhouse.io/codeforamerica/jobs/8165204)
- Govtech pay bands for comparison (2026-11-16): Oddball FE $100K–$130K, Oddball Sr Full Stack $130K–$175K, Nava Sr SWE $135.9K–$153K, Skylight $90K–$140K. DMV integrators: Booz Allen $69.4K–$158K, SteerBridge $125K–$140K (§1 sources).

### Inferences
- The $100K floor sits at or below the midpoint of most posted DMV/remote full-stack bands, so it is attainable at mid-level. A title labeled "web developer" anchors near the $99.5K BLS median, so targeting "software engineer" or "full-stack engineer" titles matters.
- Mid-level is the squeezed tier: postings are falling while senior postings rise. Within a 5-month window, a candidate who can credibly present at the senior or "SWE II/III" level, with accessibility, design-system, or AI-tooling evidence, has better odds.

### Gaps
- Indeed and LinkedIn same-day counts were **not retrieved** (not attempted within the tool budget; those sites typically block automated fetches). There is no national US-remote-only Dice count.
- No reliable 2026 data was found on applicants per posting or median time-to-hire for mid-level full-stack roles. There is no Levels.fyi or Glassdoor DMV mid-level percentile data.

## 4. Outlook to 2031: BLS projections, AI-agent impact, offshore pressure

### Takeaway
BLS still projects growth. In the 2024–34 cycle, software developers grow +15.8% (+267,700). The OOH page now shows the newer **2025–35** projections: software developers **+10%** and web developers/digital designers **+5%**. Payroll and postings data show AI pressure concentrated on early-career workers, with experienced workers flat or rising.

### Cited Findings
- BLS TED (2026): software developers are projected to grow **15.8% (+267,700 jobs) over 2024–34**, the largest numeric gain among AI/IT occupations. AI adoption is expected to drive growth in computer occupations. — [BLS TED 2026](https://www.bls.gov/opub/ted/2026/artificial-intelligence-information-technology-and-employment-2024-34.htm)
- BLS OOH, current page (2025–35):
  - Software developers: 1,717,800 → 1,892,600, **+10%**.
  - Software developers + QA combined: +10%, about **106,100 openings/yr**.
  - Demand is attributed partly to AI software development.
  - [BLS OOH Software Developers](https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm)
- Web developers and digital designers (2025–35): 220,100 → 231,400, **+5%**, about 13,600 openings/yr. — [BLS OOH Web Developers](https://www.bls.gov/ooh/computer-and-information-technology/web-developers.htm)
- Source discrepancy: a search summary of the earlier OOH (2024–34) cited about 15% for software devs+QA and 7% for web devs and digital designers. The live page now shows 2025–35 figures. Both are BLS; they differ because of the projection cycle. — [BLS OOH](https://www.bls.gov/ooh/computer-and-information-technology/web-developers.htm)
- Stanford Digital Economy Lab, "Canaries in the Coal Mine" (Brynjolfsson, Chandar, Chen), ADP payroll data:
  - The **Aug 2026 update** finds employment of workers aged 22–25 in AI-exposed jobs **19% below** what it would be had it kept pace with less-exposed peers.
  - The 2025 version found young software developer employment down nearly 20% from its late-2022 peak by July 2025.
  - Declines are concentrated where AI automates tasks; experienced workers are flat or rising.
  - There is no economy-wide displacement, and the authors describe the results as descriptive, not causal.
  - [Stanford Canaries Aug 2026 PDF](https://digitaleconomy.stanford.edu/app/uploads/2026/08/Canaries_August2026.pdf), [LeadDev](https://leaddev.com/hiring/young-devs-steepest-losses-exposed-roles-stanford-study-finds), [GCN](https://gcn.com/?p=20887)
- Indeed: software entry-level share is 4.5% (Q1 2026), and Indeed notes "a growing belief that AI is reducing demand for junior workers" without quantifying it. — [Hiring Lab Jul 2026](https://hiringlab.indeed.com/2026/07/23/the-labor-market-is-tilting-toward-seniority/)

### Inferences
- Through 2031, demand for experienced software engineers looks durable. The squeeze falls hardest on entry-level and generic mid-level "web developer" roles. Federal digital-services roles carry a contract-cycle risk (recompetes, administration priorities) but are insulated from offshoring by citizenship and background-investigation requirements.

### Gaps
- No quantitative 2025–26 source was found on offshore or nearshore substitution for U.S. mid-level full-stack roles.

## 5. What differentiates a mid-level JS candidate in govtech hiring

### Takeaway
Live postings name the differentiators explicitly: **Section 508 / WCAG 2.2 AA** accessibility, **USWDS / agency design systems** (the VA Design System), component libraries with Storybook and tests, agile multidisciplinary teamwork, AI-assisted development, and, for federal work, U.S. citizenship and background-investigation eligibility.

### Cited Findings
- Oddball FE (VA.gov) requires React and JS/TS, accessible semantic HTML/CSS, WCAG/ARIA knowledge, and building to "Section 508 and WCAG 2.2 AA". USWDS, Stencil/web components, Storybook, design systems and form-heavy apps, and AI-assisted tools are listed as pluses. — [Oddball FE posting](https://job-boards.greenhouse.io/oddball/jobs/8200470003)
- Nava asks for experience "in an agile, multidisciplinary team environment" and full-stack TS. — [Nava SWE Backend-Java](https://job-boards.greenhouse.io/navapbc/jobs/4482367009), [Nava Sr SWE Ruby](https://job-boards.greenhouse.io/navapbc/jobs/4473996009)
- Code for America offers training and guidance for staff "required to utilize AI as part of their role". — [CfA Staff SWE](https://job-boards.greenhouse.io/codeforamerica/jobs/8165204)
- CivicPlus is hiring around PDF accessibility (an "Account Executive – PDF Accessibility" role), which shows demand for accessibility at the local-government level. — [CivicPlus board](https://job-boards.greenhouse.io/civicplus)

### Inferences
- A portfolio piece built on USWDS with documented 508/WCAG 2.2 AA conformance (axe/Lighthouse results, screen-reader testing) plus Storybook would map directly onto the Oddball/VA-style postings.

### Gaps
- No 2026 source was gathered on govtech take-home or pairing exercise formats, or on how much plain-language skill is weighted. These were not verified.
