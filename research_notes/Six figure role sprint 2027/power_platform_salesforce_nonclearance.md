# Non-clearance Power Platform / Copilot Studio vs Salesforce developer market: 5-month hireability check for a JS full-stack engineer (snapshot 2026-11-16)

Scope and method: this note updates the 2026-11-09 work in `reports/Power Platform vs Salesforce jobs.md` and `research_notes/Power Platform vs Salesforce jobs/`. It does not repeat the national trend, 10K-report, earnings or AI-variant material covered there. All live counts were read from Dice's public search pages on **2026-11-16**. Indeed, LinkedIn and ZipRecruiter were not retried because they returned 403/429 on 11-09. Dice boolean queries (AND/OR, quotes) returned HTTP 403 this session. ClearanceJobs with a location parameter returned "0 jobs" (the parameter appears unsupported). Dice **cards** almost never show clearance text, so per-posting classification needs the detail page, and most Dice detail pages fetched returned HTTP 410 (expired). Clearance classification below therefore combines (a) card text, (b) Dice keyword co-occurrence with "clearance", (c) the few detail pages that loaded, and (d) other boards' copies of the same employers' postings.

DMV Dice URL template: `https://www.dice.com/jobs?q=<query>&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi` (50-mile radius; this includes remote-open postings, as established on 11-09).

## Q1. What share of DMV and US-remote postings require no clearance, Public Trust, or a clearance?

### Takeaway
Postings in the two ecosystems differ in structure. About 80% of DMV "Power Platform" postings come from federal contractors (SAIC, CACI, Accenture Federal, Booz Allen, Guidehouse), and the detail pages that could be checked required either Public Trust or Secret. DMV "Salesforce developer" results are majority commercial, state, or university employers and remote roles, with ICF as the main federal exception (Public Trust). Copilot Studio results nationally and in the DMV are mostly remote commercial and staffing roles: only 1 of 30 national cards named a clearance. For a candidate who cannot get a clearance, the open pool is therefore commercial Copilot Studio work, commercial or public-sector-non-federal Salesforce work, and federal-civilian roles that need only Public Trust, if the candidate can pass a Public Trust suitability check.

### Cited Findings

**Headline counts, Dice, 2026-11-16, compared with 11-09**

| Query (unquoted) | Geography | 11-09 | 11-16 | Source |
|---|---|---|---|---|
| Power Platform | DMV 50 mi | 301 | **297** (5 new) | [Dice](https://www.dice.com/jobs?q=Power%20Platform&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi) |
| Salesforce developer | DMV 50 mi | 246 | **249** (14 new) | [Dice](https://www.dice.com/jobs?q=Salesforce%20developer&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi) |
| Copilot Studio | DMV 50 mi | 94 | **102** (5 new) | [Dice](https://www.dice.com/jobs?q=Copilot%20Studio&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi) |
| Copilot Studio | US (remote filter param in URL, but page did not show it as applied) | 382 (US, no filter) | **430** (15 new) | [Dice](https://www.dice.com/jobs?q=Copilot%20Studio&countryCode=US&filters.isRemote=true) |
| Power Platform clearance | DMV 50 mi | — | **33** | [Dice](https://www.dice.com/jobs?q=Power%20Platform%20clearance&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi) |
| Salesforce developer clearance | DMV 50 mi | — | **72** | [Dice](https://www.dice.com/jobs?q=Salesforce%20developer%20clearance&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi) |

**Sample 1: DMV "Power Platform", first 30 cards, 2026-11-16** ([Dice](https://www.dice.com/jobs?q=Power%20Platform&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi))
- None of the 30 cards showed clearance text. Employers: SAIC ×3 (Arlington; $120,001–$160,000), Accenture LLP ×5 (DC; Power Platform App Developer $70.2K–$130.5K, Power Platform Developer $94K–$178.7K, Senior Developer $106.3K–$206.2K, .NET & Power Platform App Dev $91.3K–$184.9K, D365 Technical Architect Lead $109.5K–$224.2K), Booz Allen ×2 (DC hybrid $77.6K–$176K; Bethesda hybrid $62K–$141K), Navigant Consulting/Guidehouse ×2 (Alexandria $113K–$188K; McLean Copilot Studio Solution Engineer $113K–$188K), CACI ×2 (Ashburn; Lead SME $113.2K–$237.8K; Power Platform & Copilot Studio Developer $90.3K–$189.6K), Andworx ×2, Redhorse, BBNC (Fort Belvoir), DNI Delaware Nation Industries (Dahlgren, $180K–$190K), JCS Solutions ($120K–$150K), Koniag (Remote or Chantilly, $110K), Procentrix (DC hybrid, $100K–$125K), Dynanet (remote), CompQsoft (remote, $140K–$160K), and staffing firms Mindlance, Advent Global, Brillfy ($60/hr), Dignify ($75/hr) and IT Gig.
- Verified clearance on detail or panel text:
  - SAIC Senior Power Platform Developer, Arlington: Secret minimum with ability to obtain TS/SCI, verified 11-09 (see `posting_counts.md`).
  - CACI Power Platform & Copilot Studio Developer: "Ability to obtain a minimum Secret security clearance" ([Dice Copilot Studio DMV detail pane](https://www.dice.com/jobs?q=Copilot%20Studio&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi)).
  - CACI Lead Power Platform Developer SME: Secret, per the Similar Jobs panel (same page).
  - Andworx Power Platform Solutions Architect: "Active DOD Secret Clearance" ([Dice](https://www.dice.com/jobs?q=Power%20Platform%20clearance&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi)).
  - Guidehouse (listed as Navigant Consulting) Microsoft Copilot Studio & Power Platform Solution Engineer, McLean, on-site, $113K–$188K, minimum 3 years of experience plus a bachelor's degree: "Clearance Required: Ability to Obtain Public Trust" ([Dice detail](https://www.dice.com/job-detail/0ca4cb2e-1250-4a96-bb79-61a12085f576)).
- Accenture Federal Services Power Platform postings vary. Some require only "eligibility to obtain a Public Trust clearance", others an active Secret, and a Power Platforms Development Lead requires active Top Secret ([Greenhouse AFS Power Platform Developer – TO4](https://job-boards.greenhouse.io/accenturefederalservices/jobs/4699169006); [Greenhouse AFS MS Power Apps Developer](https://job-boards.greenhouse.io/accenturefederalservices/jobs/4681951006); [Dice AFS Development Lead](https://www.dice.com/job-detail/9c9edaf9-e0ea-4d17-9243-04f074e12c20); [ClearanceJobs AFS Power Platform Analytics Engineer](https://www.clearancejobs.com/jobs/9072108/power-platform-analytics-engineer)). This is a search-summary synthesis across aggregator copies; individual postings were not each opened.
- Guidehouse also posts Power Platform Developer roles on ClearanceJobs ([ClearanceJobs 9026316](https://www.clearancejobs.com/jobs/9026316/power-platform-developer); [ClearanceJobs 9042138](https://www.clearancejobs.com/jobs/9042138/power-platform-developer-sr-consultant)), and other Guidehouse McLean roles require "approved adjudication of their public trust prior to onboarding" (search snippet, [Built In](https://builtin.com/job/power-platform-developer-sr-consultant/9724315)).
- Keyword co-occurrence: "Power Platform clearance" in the DMV returned 33 results. About 22–25 of them were genuine Power Platform roles, including Booz Allen, Navigant/Guidehouse ×4, Procentrix ×2, Koniag ×2, Technomics ($85K–$150K), Deloitte "Power Platforms Developer" Arlington ($88.6K–$147.6K) and General Dynamics (Remote or DC, $107.7K–$143.8K). The rest were "Platform Engineer" noise ([Dice](https://www.dice.com/jobs?q=Power%20Platform%20clearance&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi)).

**Sample 2: DMV "Salesforce developer", first 30 cards, 2026-11-16** ([Dice](https://www.dice.com/jobs?q=Salesforce%20developer&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi))
- None of the 30 cards showed clearance text.
- Federal contractors:
  - ICF ×8 (Reston or remote, $81,499–$167,644 or $81,499–$138,549).
  - Leidos (Remote or Gaithersburg, Senior Developer/Solution Architect, $150K).
  - Cherokee Federal (remote, $120K–$135K).
  - ELYON International (DC, $50–$75/hr).
  - Computer Merchant (DC).
- Non-federal employers:
  - UMBC/Hilltop Institute (College Park, on-site, $105,680–$126,816).
  - OneZero (Herndon, $90K–$105K).
  - Judge Group (Baltimore contract, $140K–$150K).
  - Spire Energy (DC, $90K–$110K).
  - Universities of Wisconsin (remote, $90K–$105K).
  - System One (remote, $185K).
  - About 9 offshore-style staffing and C2C posts (NexTurn "60000", Secure RPO $60–65, and others).
- The "Salesforce developer clearance" query returned 72 results. Only 5 of its first 30 cards named a clearance in the title, and only 2 were Salesforce roles: both Connexions Data "Secret Clearance" (Salesforce Developer – Omni, and MuleSoft). The rest of page 1 were ICF, CACI Senior Salesforce Developer (remote, $98.5K–$206.8K), Navigant/Guidehouse (remote, $113K–$188K and $92K–$153K), Republic Services (remote, $109.5K–$150.6K) and others ([Dice](https://www.dice.com/jobs?q=Salesforce%20developer%20clearance&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi)).
- ICF Salesforce developer postings consistently require the ability to obtain and maintain a Public Trust, some accept active Secret instead, many require US citizenship or 3 of the last 5 years of US residency, and they commonly ask for 3+ years of Salesforce experience plus Platform Developer I ([Dice ICF Salesforce Developer (Public Trust)](https://www.dice.com/job-detail/c709b659-c106-469a-90df-1c363bda604a) (now 410 Gone); [career.com ICF](https://www.career.com/job/icf/salesforce-developer-public-trust-remote-tr/j202511140202135851216); [ClearanceJobs 9032581](https://www.clearancejobs.com/jobs/9032581/salesforce-developer-public-trust)). This comes from a search summary of aggregator copies.

**Sample 3: DMV "Copilot Studio", first 30 cards, 2026-11-16** ([Dice](https://www.dice.com/jobs?q=Copilot%20Studio&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi))
- About 19 of 30 were remote and mostly commercial or staffing. Examples:
  - Michael Baker (Senior Microsoft AI Developer, Copilot Studio & Azure AI, Remote/PA, $120,179–$170,000).
  - SHI (Solutions Engineer – M365 Copilot & Agents, remote, $150K–$200K).
  - Netwoven (remote, $215K–$225K).
  - EPAM ×2 (D365 CE engineers with Copilot, remote).
  - Connection, Saksoft, Newgen.
  - CompQsoft ($140K–$160K).
- Local DMV: CACI (Secret), Guidehouse (Public Trust), Microsoft "Cloud Solution Architect – Copilot/AI Business Solutions – CTJ – Poly" (Reston, $106.4K–$203.6K; the title indicates a polygraph clearance), SAIC, Leidos, JCS Solutions (AI & Automation Solutions Engineer, Bethesda, $100K–$135K), Marriott (Bethesda), ANALYTICA, GDH.

**Sample 4: US "Copilot Studio", first 30 cards, 2026-11-16** ([Dice](https://www.dice.com/jobs?q=Copilot%20Studio&countryCode=US&filters.isRemote=true))
- Only 1 of 30 cards named a clearance (Microsoft "Cloud Solution Architect – PowerApps/Copilot Studio – CTJ – Top Secret", Honolulu).
- About 18 of 30 were contract or third-party (Apex Systems Richmond, $67–$69/hr; Houston AI Engineer contracts, $70–$75/hr; Canvendor, $70–$80/hr).

**Earlier directional ratio, unchanged:** ClearanceJobs listed 458 quoted "Power Platform" jobs and 502 "Salesforce" jobs nationally on 11-09 (see `posting_counts.md`).

### Inferences
- **DMV Power Platform, first-page sample (n=30), classified by employer type and verified text:**
  - About 24 of 30 come from federal contractors.
  - 5 are verified as Secret or higher (SAIC ×2 Senior, CACI ×2, Andworx) and 1 as Public Trust (Guidehouse).
  - The remaining contractor roles (Accenture Federal ×5, Booz Allen ×2, Redhorse, BBNC at Fort Belvoir, DNI at Dahlgren, Koniag, Procentrix, Dynanet, JCS) are likely Public Trust or Secret, given what AFS, Guidehouse and ICF peers require and their federal sites. They were not individually verified.
  - About 5–6 of 30 (roughly 20%) are staffing or commercial roles with no federal signal.
  - Working estimate: **~15–25% genuinely no-clearance, ~30–45% Public Trust only, ~35–50% Secret or higher** for DMV-located Power Platform roles. This is a judgment from one page, not a measurement.
- **DMV Salesforce developer (n=30):**
  - About 13 of 30 come from federal contractors; ICF ×8 is Public Trust and Leidos and Cherokee Federal are unverified.
  - About 17 of 30 (roughly 55–60%) are non-federal, from commercial, utility, university or state employers or remote staffing, and plausibly need no clearance or Public Trust.
  - Only 1 of the 30 (plus 1 MuleSoft) carried a Secret title in the "clearance" query.
  - Working estimate: **~55–65% no clearance, ~25–35% Public Trust, ≤10% Secret+**.
- **Copilot Studio** (US and DMV remote): **~85–95% no clearance** on card evidence, but a large share is contract or C2C staffing, where many postings ask for years of hands-on Copilot Studio work.
- **The Public Trust question decides most of the DMV federal lane.** Public Trust is a suitability or background investigation for moderate- and high-risk positions, not a national-security clearance. Whether a candidate who "cannot hold a clearance" can pass it depends on the reason, such as citizenship or residency (ICF requires 3 of the last 5 years of US residency), adjudicable history, or a personal choice. The answer moves roughly a third of DMV opportunities in or out of reach. This is an inference, and the reason should be confirmed with the user.
- **Card-level "no clearance" is unreliable.** All 90 DMV cards showed no clearance text, yet every federal-contractor detail page that loaded required at least Public Trust. Any automated filter, including this repo's `requiresClearance()`, must read full descriptions, not titles or cards.
- **Pool size, rough:**
  - Salesforce developer, DMV + remote-open, non-cleared: about 249 × 0.6 ≈ 150 postings.
  - Power Platform, DMV, non-cleared: about 297 × 0.2 ≈ 60, or about 150 if Public Trust is acceptable.
  - Copilot Studio, US: about 430 × 0.9 ≈ 390, but heavily contract.
  - These are extrapolations from n=30 samples.

### Gaps
- Exact per-posting classification of 30–60 results per query was not possible. Dice cards omit clearance text, most detail pages returned 410, and LinkedIn and Indeed were blocked (403/429 on 11-09, not retried). Dice boolean queries were 403 this session.
- ClearanceJobs DMV-only counts were not obtained, because its location parameter returned 0 results.
- Salesforce "Agentforce" and US-remote "Salesforce developer" were not re-sampled on 11-16. The 11-09 notes found 20 of 30 DMV Agentforce results remote.
- No Public Trust-specific counts exist on any board.

## Q2. Non-clearance mid-level pay: do non-cleared roles still clear $100K?

### Takeaway
Yes, but only at the posted midpoint or above, and usually with 3+ years of platform experience. Non-cleared and Public Trust DMV and remote postings in both ecosystems commonly show ranges whose midpoint is above $100K. Their floors often sit at $62K–$95K, which is where a newly converted developer with no platform experience would likely be placed. Commercial remote Salesforce roles and remote Copilot Studio solution roles show the cleanest above-$100K floors.

### Cited Findings

**Power Platform and Copilot Studio postings without clearance in the title or card, 2026-11-16**
- Guidehouse Copilot Studio & Power Platform Solution Engineer, McLean (Public Trust): $113K–$188K, 3+ years of experience ([Dice](https://www.dice.com/job-detail/0ca4cb2e-1250-4a96-bb79-61a12085f576)).
- Procentrix Power Platform Consultant/BA, DC hybrid: $100K–$125K. Procentrix Power Platform Developer, remote: $100K–$120K ([Dice](https://www.dice.com/jobs?q=Power%20Platform%20clearance&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi)).
- Koniag Developer – Power Platform (remote): $110K. Deloitte Power Platforms Developer, Arlington: $88.6K–$147.6K. Technomics, Arlington: $85K–$150K. General Dynamics Power Platform Application Developer (Remote or DC): $107,744–$143,750. Navigant/Guidehouse Power Platform Developer (remote): $74K–$124K. Same source as above.
- Accenture DC: Power Platform App Developer $70.2K–$130.5K; Power Platform Developer $94K–$178.7K ([Dice](https://www.dice.com/jobs?q=Power%20Platform&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi)).
- Booz Allen Power Platform Developer: DC $77.6K–$176K; Bethesda $62K–$141K (same source).
- Remote commercial Copilot Studio roles:
  - Michael Baker: $120,179–$170,000.
  - SHI: $150K–$200K.
  - CompQsoft Power Platform Architect: $140K–$160K.
  - JCS AI & Automation Solutions Engineer, Bethesda: $100K–$135K.
  - Source: [Dice](https://www.dice.com/jobs?q=Copilot%20Studio&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi).
- Contract: Apex Systems Copilot Studio Agent Engineer, Richmond, $67–$69/hr. Staffing posts range $55–$80/hr ([Dice US](https://www.dice.com/jobs?q=Copilot%20Studio&countryCode=US&filters.isRemote=true)).
- A SkyePoint Decisions Power Platform and Copilot Studio Developer role in Laurel, MD is listed at $140K–$160K with 3+ years of Copilot Studio required ([DreamWork HQ](https://www.dreamworkhq.com/job/2937f022-91de-4f60-a89c-36a6a63df934)). Clearance status is not stated in the snippet.

**Salesforce developer postings without clearance in the title or card, 2026-11-16** ([Dice DMV](https://www.dice.com/jobs?q=Salesforce%20developer&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi); [Dice DMV + clearance](https://www.dice.com/jobs?q=Salesforce%20developer%20clearance&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi))
- ICF (Public Trust): $81,499–$167,644 (developer) and $81,499–$138,549 (senior, remote).
- UMBC/Hilltop: $105,680–$126,816. OneZero, Herndon: $90K–$105K. Spire Energy Admin & Developer, DC: $90K–$110K.
- Republic Services Sr Salesforce Developer (remote, commercial): $109,500–$150,600.
- CACI Senior Salesforce Developer (remote): $98.5K–$206.8K. Cherokee Federal (remote): $120K–$135K. Leidos Senior/Solution Architect: $150K.
- Navigant/Guidehouse (remote): $113K–$188K and $92K–$153K.
- Universities of Wisconsin (remote): $90K–$105K. Judge Group contract, Baltimore: $140K–$150K. System One senior (remote): $185K.
- National aggregates from 11-16 search snippets (not verified): ZipRecruiter shows "$75k–$135k Salesforce Engineer Jobs" for Nov 2026, and Glassdoor shows about 2,544 open US Salesforce developer jobs ([ZipRecruiter](https://www.ziprecruiter.com/Jobs/Salesforce-Engineer); [Glassdoor](https://www.glassdoor.com/Job/us-salesforce-developer-jobs-SRCH_IL.0,2_IN1_KO3,23.htm)). General Dynamics IT also has a remote Salesforce role at $93,500–$126,500 (Indeed snippet, [Indeed](https://www.indeed.com/q-salesforce-developer-usa-jobs.html)).
- Earlier national and DMV salary averages (Power Platform developer about $120K–$129K; Salesforce developer about $120K–$150K; cleared DMV premium about $10K–$40K) are in the 11-09 report and were not re-collected.

### Inferences
- **$100K is reachable without a clearance in both ecosystems**, but most ranges straddle it. Large federal-civilian contractors (Accenture, Booz Allen, ICF, Deloitte, Guidehouse) post bands of roughly $62K–$95K at the bottom to $140K–$200K at the top. Mid-level placement around the midpoint ($105K–$130K) is plausible for someone with prior professional engineering years. A "newly certified, no platform experience" hire would likely land near the bottom third unless total experience is credited.
- **Cleanest above-$100K non-cleared floors:** commercial remote Salesforce roles (Republic Services $109.5K floor; Cherokee Federal $120K floor, though Cherokee Federal is a federal contractor with clearance status unverified) and commercial Copilot Studio solution or AI roles (Michael Baker $120K floor, SHI $150K floor). These ask for prior platform or AI years.
- Contract Copilot Studio rates of $55–$80/hr annualize to roughly $114K–$166K at 2,080 hours, but they are C2C/W2 and usually require demonstrated platform delivery.

### Gaps
- No salary-site figure (Glassdoor, Levels, Salary.com) split by cleared vs non-cleared was found for either ecosystem.
- No data on where newly certified career-switchers actually land inside posted bands.

## Q3. Realistic entry timeline: certifications, prep time, and whether employers hire newly certified developers at mid level

### Takeaway
On the Microsoft side, the developer exam a JS engineer would have taken (PL-400) retired on 2026-10-30. The live replacement aimed at a pro developer is **AB-620, AI Agent Builder Associate**, an intermediate exam that explicitly assumes REST APIs, MCP, A2A and Copilot Studio familiarity, which suits a JS dev. Microsoft notes it is being updated by Dec 18, 2026. On the Salesforce side, Platform Developer I is still the core developer credential, and it is **not** on the Feb 1, 2027 retirement list or the July 2026 rename list. Neither ecosystem's postings hire on certification alone: the sampled mid-level postings ask for 3+ years of platform experience (Guidehouse, ICF, SkyePoint). Five months is enough to get certified and build a portfolio. Landing a $100K+ mid-level role in that window depends on employers crediting general full-stack years, which happens most at consultancies and SIs that bench-train, and at roles framed as "AI/integration engineer" rather than "X-years Power Platform developer."

### Cited Findings

**Microsoft**
- The Microsoft Certified: AI Agent Builder Associate (exam **AB-620**) is "Intermediate", for "a professional developer or advanced builder who builds, extends, and integrates custom agents". It expects familiarity with Power Fx, Dataverse, Power Platform, M365 Copilot, Microsoft Foundry and adaptive cards, plus "intermediate knowledge of generative AI concepts, including ... RAG, Model Context Protocol (MCP), Agent2Agent (A2A)" and "experience with prompt engineering and with REST APIs and integration patterns" ([Microsoft Learn](https://learn.microsoft.com/en-us/credentials/certifications/ai-agent-builder-associate/), page updated 2026-11-09).
- AB-620 covers three domains (Plan and configure agent solutions; Integrate and extend agents in Copilot Studio; Test and manage agents) in a 120-minute proctored exam. Microsoft says it "is in the process of being updated to the GHCP harness. It should be updated by December 18", while the original self-paced content remains searchable on Learn ([Microsoft Learn](https://learn.microsoft.com/en-us/credentials/certifications/ai-agent-builder-associate/)).
- Third-party domain weights: Plan and configure 30–35%; Integrate and extend 40–45%; Test and manage 20–25%. These sources also give a 700/1000 pass mark ([Trainocate](https://trainocate.com.my/campaigns/malaysia-ai-data-driven-workforce-skills-for-the-future/microsoft-certified-ai-agent-builder-associate/); [open-exam-prep](https://open-exam-prep.com/study-guides/ab-620/introduction/exam-facts); [Examinotion](https://examinotion.com/blog/ab-620-exam-guide)).
- Status conflict: Examinotion says AB-620 has been GA since June 2026, while some listings still label it beta ([Examinotion](https://examinotion.com/blog/ab-620-exam-guide); [Fast Lane UK](https://www.flane.co.uk/certification/ms-aiaba)). The official page shows no beta label as of 11-16.
- From prior notes: PL-400 retired 2026-10-30 and PL-200 2026-08-31. AB-620, AB-410 or AI-103 each satisfy the AB-100 (expert) prerequisite ([Microsoft Learn retirements](https://learn.microsoft.com/en-us/credentials/support/retired-certification-exams); [AB-100](https://learn.microsoft.com/en-us/credentials/certifications/exams/ab-100/)).

**Salesforce**
- 24 credentials retire on Feb 1, 2027 and 16 were renamed on Jul 24, 2026, mostly adding "Agentforce" to consultant and accredited-professional titles. Neither list includes Platform Developer I, Platform Developer II, JavaScript Developer, Platform App Builder or Agentforce Specialist ([Salesforce Time, 2026-06-10](https://salesforcetime.com/2026/06/10/salesforce-certification-retirements-and-renames-explained/)). A separate exam-prep site states that "core, high-volume certifications (Administrator, Platform App Builder, Platform Developer I/II)" are not retiring ([dumpsgate, unverified secondary](https://dumpsgate.com/salesforce-2027-certification-retirements/)). The Salesforce Ben article on the retirements returned 403.
- The Trailhead credential page title now reads "Salesforce Certified Platform Developer" without the "I". Exam details did not render, so whether the credential was renamed is **unconfirmed** ([Trailhead](https://trailhead.salesforce.com/credentials/platformdeveloperi)).

**Employer requirements in sampled postings**
- Guidehouse Copilot Studio Solution Engineer: minimum 3 years of professional experience plus a bachelor's degree, no certification required, with Copilot Studio and Copilot Agents experience asked for ([Dice](https://www.dice.com/job-detail/0ca4cb2e-1250-4a96-bb79-61a12085f576)).
- ICF Salesforce Developer: commonly "3+ years of experience supporting Salesforce development ..." plus Platform Developer I (search summary of [career.com](https://www.career.com/job/icf/salesforce-developer-public-trust-remote-tr/j202511140202135851216) and [ClearanceJobs](https://www.clearancejobs.com/jobs/9032581/salesforce-developer-public-trust)).
- SkyePoint (Laurel, MD) Power Platform and Copilot Studio Developer: 3+ years of Copilot Studio experience ([DreamWork HQ](https://www.dreamworkhq.com/job/2937f022-91de-4f60-a89c-36a6a63df934)).
- A ZipRecruiter page (Sep 2026) lists 3–5 years of app development, Power Platform, automation or AI solution experience as typical. Junior AI Developer listings also exist ([ZipRecruiter](https://www.ziprecruiter.com/Jobs/Copilot-Developer)).
- An "Associate Salesforce Developer (Public Trust, Remote)" posting exists on ClearanceJobs, so associate-tier federal-civilian entry roles do occur ([ClearanceJobs 8644775](https://www.clearancejobs.com/jobs/8644775/associate-salesforce-developer-public-trust-remote-do)).
- 2026 career guides say Administrator and Platform Developer certifications are now baseline expectations, not differentiators. They advise pairing PD1 with projects or case studies, a GitHub/Trailhead profile and referrals, and using bridge roles such as associate consultant or junior developer ([Apex Hours](https://www.apexhours.com/whats-really-happening-to-salesforce-careers-in-2026-its-not-what-you-think/); [salesforceinsider, Feb 2026](https://salesforceinsider.blogspot.com/2026/02/how-referrals-help-certified-salesforce.html); [Instahyre](https://resources.instahyre.com/blog/how-to-switch-to-an-enterprise-software-career/)). These are secondary or blog sources.
- From prior notes: Salesforce developer demand fell 12% while supply rose 20% in 2025, and Salesforce Ben calls traditional entry paths "the weakest" (see `reports/Power Platform vs Salesforce jobs.md`).

### Inferences
- **Microsoft path:** AB-620 is the best-fitting credential for a JS engineer. It tests MCP, REST and custom connectors, and integration skills make up about 40–45% of the exam. The Dec 18 exam update means candidates should study against the updated skills outline. A plausible schedule is AB-620 by about Feb 2027, then a portfolio of 2–3 Copilot Studio agents with MCP and custom-connector integrations, with applications running from about Jan–Feb 2027. AB-100 (expert) is probably out of reach as a hiring lever by April 2027.
- **Salesforce path:** PD1 needs new Apex and SOQL knowledge on top of LWC, which is JS. The developer tier is the most oversupplied segment, and postings want 3+ years plus PD1, so a 5-month conversion to a *mid-level* $100K Salesforce developer role is the harder bet. Associate or bridge roles are likelier, but they often pay below $100K.
- **Mid-level hireability:** Neither ecosystem showed postings that hire "newly certified, zero platform years" at mid level. The most realistic $100K+ entries are:
  - (a) SI and consulting roles (Accenture, Deloitte, Booz Allen, Guidehouse) where "3 years professional experience" can be met with general full-stack years. Guidehouse's requirement is generic professional experience, not 3 years of Copilot Studio.
  - (b) Commercial AI/agent engineer roles that value TypeScript, APIs and MCP and list Copilot Studio as one tool.
- Prep-time figures were not sourced (see Gaps). A working assumption of 6–10 weeks per associate exam for an experienced developer is unverified.

### Gaps
- No authoritative prep-time data (hours or weeks) for AB-620 or PD1 was found.
- No data on hiring outcomes for newly certified career-switchers, such as time-to-offer or levels.
- PD1 exam details and the possible rename to "Platform Developer" are unconfirmed, because the Trailhead page did not render.
- AB-620's exact exam price and post-Dec-18 skills outline are not captured.

## Q4. Which non-clearance employers hire these roles in the DMV or remotely?

### Takeaway
Non-clearance and Public Trust hiring in the DMV clusters at federal-civilian systems integrators and consultancies. Fully commercial demand comes from Microsoft partners and staffing firms for Copilot Studio, and from commercial, utility, university and state employers for Salesforce.

### Cited Findings

**Public Trust, or mixed with some Public Trust postings, in the DMV**
- Guidehouse (McLean, Alexandria, Springfield, remote; Power Platform, Copilot Studio and Salesforce) ([Dice](https://www.dice.com/job-detail/0ca4cb2e-1250-4a96-bb79-61a12085f576)).
- ICF (Reston or remote; Salesforce developer, all levels) ([career.com](https://www.career.com/job/icf/salesforce-developer-public-trust-remote-tr/j202511140202135851216)).
- Accenture Federal Services (DC; some Power Platform roles Public Trust-eligible, others Secret or TS) ([Greenhouse AFS](https://job-boards.greenhouse.io/accenturefederalservices/jobs/4699169006)).

**Federal contractors with mostly cleared Power Platform roles (avoid or verify)**
- SAIC (Arlington), CACI (Ashburn, Secret), Andworx (Secret), and Microsoft's own "CTJ – Poly/Top Secret" Copilot architect roles ([Dice](https://www.dice.com/jobs?q=Copilot%20Studio&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi)).

**Status unverified, federal-adjacent DMV Power Platform employers**
- Booz Allen (DC/Bethesda), Deloitte (Arlington), Procentrix (DC/remote), Koniag (remote), Technomics (Arlington), General Dynamics (remote/DC), Redhorse (Alexandria), JCS Solutions (Fairfax/Bethesda), Dynanet (remote), SkyePoint Decisions (Laurel) ([Dice](https://www.dice.com/jobs?q=Power%20Platform%20clearance&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi)).

**Commercial or non-federal, Salesforce**
- UMBC/Hilltop Institute (College Park; state university health-policy center), Spire Energy (DC), OneZero (Herndon), Republic Services (remote), Universities of Wisconsin (remote), System One and Judge Group (staffing) ([Dice](https://www.dice.com/jobs?q=Salesforce%20developer&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi)).
- Remote US examples on 11-09/11-16 boards: Huntress Labs Senior Salesforce Developer (remote) ([sForce Jobs](https://sforcejobs.com/)), and Robert Half placements including a remote role at $170K–$200K ([Robert Half](https://www.roberthalf.com/us/en/jobs/all/salesforce-developer)).

**Commercial, Copilot Studio and Microsoft partners**
- Michael Baker International, SHI International, Netwoven, EPAM, Connection, Saksoft, CompQsoft, Marriott (Bethesda, AI application engineering director), Apex Systems (Richmond contract) ([Dice DMV](https://www.dice.com/jobs?q=Copilot%20Studio&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi); [Dice US](https://www.dice.com/jobs?q=Copilot%20Studio&countryCode=US&filters.isRemote=true)).
- From prior notes: Planet Technologies (Microsoft partner, DMV).

### Inferences
- **For `ATS_BOARDS` / `JOB_QUERIES`:**
  - Seed Accenture Federal Services, which posts on Greenhouse (slug `accenturefederalservices`, per the job-boards.greenhouse.io URLs above).
  - Guidehouse, ICF, Booz Allen and Deloitte use Workday or iCIMS, not Greenhouse, Lever or Ashby. This is an inference that was not verified, and if correct the repo's ATS fetcher cannot read them.
- **Filter logic:** "Public Trust" postings are the largest non-cleared DMV lane. If the user can pass suitability, the `requiresClearance()` filter (which per the 11-09 report drops "public trust clearance required") would hide most Guidehouse, ICF and AFS opportunities. The user's eligibility should decide whether Public Trust is filtered.

### Gaps
- The Microsoft Solutions Partner directory and Salesforce AppExchange consulting-partner listings for the DMV were not queried within budget.
- State and local government (Virginia VITA, Maryland DoIT, DC OCTO, counties) Power Platform and Salesforce openings were not sampled. Only UMBC appeared organically.
- USAJobs (federal civilian direct-hire, which often requires Public Trust) was not queried.

## Q5. Updates since 2026-11-09 that change earlier conclusions

### Takeaway
No material change. Counts moved by only a few percent in a week, with Copilot Studio slightly up. AB-620 is confirmed as the live pro-developer Copilot Studio credential and is getting a refresh by Dec 18. Salesforce's core developer certs are not being retired. One unverified report says Microsoft cut part of its Copilot Studio engineering team in Israel in October.

### Cited Findings
- Dice DMV counts changed from 11-09 to 11-16 as follows: Power Platform 301→297, Salesforce developer 246→249, Copilot Studio 94→102 ([Dice](https://www.dice.com/jobs?q=Copilot%20Studio&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi)). The US Copilot Studio count was 382 on 11-09 (unfiltered) and 430 on 11-16 (URL carried a remote-filter parameter that did not appear applied), so the two are not strictly comparable ([Dice](https://www.dice.com/jobs?q=Copilot%20Studio&countryCode=US&filters.isRemote=true)).
- The AB-620 page was updated 2026-11-09, and the exam is being moved to the "GHCP harness" by Dec 18 ([Microsoft Learn](https://learn.microsoft.com/en-us/credentials/certifications/ai-agent-builder-associate/)).
- A FinalRoundAI blog reports that Microsoft's Oct 12, 2026 layoffs reached the Copilot Studio team in Israel, with most affected staff reportedly moved internally. This comes from a single secondary source and is unverified ([FinalRoundAI](https://www.finalroundai.com/blog/microsoft-layoffs)). It does not bear on customer-side demand for Copilot Studio developers.
- No Salesforce Ben article dated after 11-09 that changes the demand picture was found (search, 11-16).

### Inferences
- The earlier recommendation (Microsoft pro-code agent engineer first, Salesforce as a hedge) holds and is reinforced for a no-clearance candidate. The Copilot Studio pool is the least clearance-bound and most remote-friendly, and AB-620 directly tests the candidate's existing JS, API and MCP strengths. The DMV Power Platform volume advantage cited on 11-09 mostly disappears for a no-clearance candidate (about 80% federal contractor). It partly returns only if Public Trust is acceptable. The DMV Salesforce lane is more non-federal than Power Platform but sits in the most oversupplied tier (developer).

### Gaps
- No week-over-week data beyond Dice. Salesforce Ben's site returned 403 to direct fetch, so newer articles may exist unseen.
- Copilot Studio's FedRAMP High, GCC High or DoD status changes since 11-09 were not checked.
