# Salesforce vs Microsoft Power Platform: US and DMV Job Posting Counts (snapshot 2026-11-09)

Method note: All live counts below were collected on **2026-11-09** by loading each site's public search-results page and reading the count it shows. Indeed, ZipRecruiter and LinkedIn were not retried because earlier attempts returned 403/429. A direct call to Dice's JSON search API was blocked by this session's permission system (it needed an embedded API key), so the Dice numbers come from the public dice.com search page instead. Each Dice query was entered as an unquoted keyword string, exactly as shown.

## Q1. What do alternative job boards report for each query × geography?

### Takeaway
On Dice, the same day and the same query syntax produce a usable comparable table. Nationally, Power Platform-family postings roughly equal Salesforce developer postings ("Power Platform" 925 vs "Salesforce developer" 800). "Salesforce developer" and "Salesforce administrator" combined come to about 2x "Power Platform". "Power BI" is far larger (4,037) but is inflated by analyst roles. Dice's "DMV" (Washington DC, 50-mile radius) counts include remote-eligible jobs, so they **overstate** jobs that are actually located in the DMV.

### Cited Findings

**Main comparable table: Dice.com, 2026-11-09, unquoted keyword query**

US = `https://www.dice.com/jobs?q=<query>&countryCode=US`
DMV = `...&location=Washington, DC, USA&latitude=38.9072&longitude=-77.0369&radius=50&radiusUnit=mi` (page confirmed "Up to 50 miles")

| Query | US (Dice) | DMV 50 mi of DC (Dice) | DMV as % of US |
|---|---|---|---|
| Salesforce developer | 800 ("800 results (46 new)") | 246 ("246 results (17 new)") | 30.8% |
| Salesforce administrator | 1,047 ("1047 results (57 new)") | 302 ("302 results (21 new)") | 28.8% |
| Agentforce | 249 ("249 results (6 new)") | 78 ("78 results (2 new)") | 31.3% |
| Power Platform | 925 ("925 results (41 new)") | 301 ("301 results (19 new)") | 32.5% |
| Power Apps | 608 ("608 results (22 new)") | 210 ("210 results (14 new)") | 34.5% |
| Copilot Studio | 382 ("382 results (17 new)") | 94 ("94 results (8 new)") | 24.6% |
| Power BI | 4,037 ("4037 results (231 new)") | 915 ("915 results (50 new)") | 22.7% |

Sources:
- US: [Dice SF developer](https://www.dice.com/jobs?q=Salesforce%20developer&countryCode=US), [Dice SF administrator](https://www.dice.com/jobs?q=Salesforce%20administrator&countryCode=US), [Dice Agentforce](https://www.dice.com/jobs?q=Agentforce&countryCode=US), [Dice Power Platform](https://www.dice.com/jobs?q=Power%20Platform&countryCode=US), [Dice Power Apps](https://www.dice.com/jobs?q=Power%20Apps&countryCode=US), [Dice Copilot Studio](https://www.dice.com/jobs?q=Copilot%20Studio&countryCode=US), [Dice Power BI](https://www.dice.com/jobs?q=Power%20BI&countryCode=US)
- DMV: [Dice SF developer DC](https://www.dice.com/jobs?q=Salesforce%20developer&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi), [Dice SF admin DC](https://www.dice.com/jobs?q=Salesforce%20administrator&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi), [Dice Agentforce DC](https://www.dice.com/jobs?q=Agentforce&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi), [Dice Power Platform DC](https://www.dice.com/jobs?q=Power%20Platform&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi), [Dice Power Apps DC](https://www.dice.com/jobs?q=Power%20Apps&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi), [Dice Copilot Studio DC](https://www.dice.com/jobs?q=Copilot%20Studio&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi), [Dice Power BI DC](https://www.dice.com/jobs?q=Power%20BI&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi)

**Remote contamination check: first page (30 cards) of each Dice DMV search, 2026-11-09**
- "Salesforce administrator", DMV: 17 of 30 cards were remote (including "Remote or Reston, VA"-type listings) and 13 were onsite/hybrid in DC/MD/VA. — [Dice](https://www.dice.com/jobs?q=Salesforce%20administrator&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi)
- "Agentforce", DMV: 20 of 30 remote, 10 in VA, none in DC or MD only. — [Dice](https://www.dice.com/jobs?q=Agentforce&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi)
- "Power Platform", DMV: 28 of 30 located in DC/MD/VA and 2 remote (both also listed a DC/VA site). Employers included SAIC, CACI, Booz Allen Hamilton and Redhorse. — [Dice](https://www.dice.com/jobs?q=Power%20Platform&location=Washington,%20DC,%20USA&latitude=38.9072&longitude=-77.0369&countryCode=US&locationPrecision=City&radius=50&radiusUnit=mi)
- Clearance: the "Power Platform" DMV first-page cards did not mention clearance in their visible text. However, the featured national listing (SAIC Senior Power Platform Developer, Arlington VA, $120,001–$160,000) required Secret minimum with ability to obtain TS/SCI. — [Dice](https://www.dice.com/jobs?q=Power%20Platform&countryCode=US)
- "Salesforce developer", US first page: no visible mention of clearance on the cards (descriptions were truncated). — [Dice](https://www.dice.com/jobs?q=Salesforce%20developer&countryCode=US)

**ClearanceJobs.com, nationwide, 2026-11-09.** Every ClearanceJobs posting requires a clearance, so these counts approximate clearance-required postings.

| Query (as entered) | Count |
|---|---|
| Salesforce (unquoted) | "Showing 502 Jobs" — [ClearanceJobs](https://www.clearancejobs.com/jobs?keywords=Salesforce) |
| "Power Platform" (quoted) | "Showing 458 Jobs" — [ClearanceJobs](https://www.clearancejobs.com/jobs?keywords=%22Power%20Platform%22) |
| Power Platform (unquoted) | "Showing 5,197 Jobs". **Unusable**: it evidently matches "power" OR "platform". — [ClearanceJobs](https://www.clearancejobs.com/jobs?keywords=Power%20Platform) |
| "Power Apps" (quoted) | "Showing 344 Jobs" — [ClearanceJobs](https://www.clearancejobs.com/jobs?keywords=%22Power%20Apps%22) |
| "Power BI" (quoted) | "Showing 1,512 Jobs" — [ClearanceJobs](https://www.clearancejobs.com/jobs?keywords=%22Power%20BI%22) |

**SimplyHired, US, 2026-11-09**
- "Salesforce developer", all US: 2,753 jobs (page title "Top 2753 Salesforce developer Jobs"). — [SimplyHired](https://www.simplyhired.com/search?q=Salesforce+developer&l=)

### Inferences
- **Salesforce:Power Platform ratio, using Dice like-for-like:**
  - Developer roles only ("Salesforce developer" 800 vs "Power Platform" 925): **0.86:1 US** and **0.82:1 DMV** (246 vs 301). Power Platform slightly leads on these terms.
  - Developer + admin (1,847 vs 925): **2.0:1 US** and **1.82:1 DMV** (548 vs 301).
  - AI-agent products ("Agentforce" 249 vs "Copilot Studio" 382): **0.65:1 US** and **0.83:1 DMV** (78 vs 94). Copilot Studio is mentioned in more postings nationally.
  - The ratios are query-sensitive. "Salesforce developer" is a role phrase, while "Power Platform" is a platform phrase that also matches Power BI, SharePoint and Dynamics roles. Treat any single ratio as rough.
- **The DMV share of US (23–35%) is implausibly high** for one metro, which normally holds about 3% of US tech jobs. Dice's radius search evidently includes remote-eligible postings: 17/30 and 20/30 of the Salesforce/Agentforce DMV first pages were remote. So the DMV column means "DMV-located + remote-open", not "located in DMV".
- **On the "located in the DMV" basis, Power Platform likely has the larger advantage.** The Power Platform DMV results were 28/30 local and dominated by federal contractors. The Salesforce/Agentforce DMV results were mostly remote. A rough local-only adjustment from the first-page samples:
  - Salesforce admin: about 302 × 13/30 ≈ 130.
  - Agentforce: about 78 × 10/30 ≈ 26.
  - Power Platform: about 301 × 28/30 ≈ 280.
  - That suggests a DMV local Salesforce admin : Power Platform ratio of roughly 0.5:1. These are extrapolations from one page of 30 cards each, not measured counts.
- **Clearance share (rough).** ClearanceJobs "Power Platform" (458) is about 50% of Dice US "Power Platform" (925), while ClearanceJobs "Salesforce" (502) is about 27% of Dice "Salesforce developer" + "administrator" (1,847). The two sites and their query syntax differ, and Dice may itself contain cleared jobs, so these are directional only. They suggest Power Platform demand is more clearance- and federal-skewed than Salesforce demand.
- **Keyword overcounting.** "Power BI" (4,037 US; 1,512 on ClearanceJobs) is heavily inflated by data/business analyst, reporting, and even Salesforce admin roles. One Dice Salesforce admin listing itself named Power BI integrations. Do not read Power BI counts as Power Platform developer demand. "Power Apps" and "Copilot Studio" also appear as nice-to-haves in SharePoint, M365 and help-desk roles. "Salesforce developer" may match Salesforce-adjacent marketing or ops jobs.
- **Absolute levels differ by board.** SimplyHired shows 2,753 for "Salesforce developer" vs Dice's 800. Dice is a tech/contract-heavy subset (many C2C and recruiter postings), so Dice counts are best used for ratios, not market totals.

### Gaps
- **Glassdoor, Built In DC, Monster, CareerBuilder, Google Jobs, the LinkedIn guest endpoint and USAJobs** were not queried within the tool-call budget. SimplyHired was queried for only one term. Only Dice gives a full 7×2 table.
- **Dice JSON API** (job-search-api.svc.dhigroupinc.com) was not used: the call was denied by the session's permission classifier. The public page counts should match it.
- **Exact clearance share per query on Dice** was not measured; it would require a "clearance" keyword or filter on each query. ClearanceJobs DMV-only counts were not collected.
- Dice's "800" for Salesforce developer is a suspiciously round number; it was not re-verified.
- **Remote-vs-local split** comes from first-page samples (n=30) for only three DMV queries.

## Q2. Published 2025–2026 third-party counts and DMV rankings

### Takeaway
Third-party Salesforce figures exist only at a coarse level, roughly 31k–33k US listings on Glassdoor/Indeed in 2025, and they are secondhand. No published US Power Platform posting counts or DMV metro rankings for either skill were found.

### Cited Findings
- Salesforce job listings on Glassdoor rose from about 14,000 (May 2024) to about 31,200 (September 2025), a 120%+ increase. SalesforceBen (Aug 26, 2026) cites this from a 360 Degree Cloud blog post; the geography is not stated. In the same article, recruiter Mat Roche warns that Glassdoor/LinkedIn counts include roles that merely mention Salesforce as a keyword. — [SalesforceBen](https://www.salesforceben.com/salesforce-job-postings-more-than-doubled-in-16-months-what-changed/)
- The same article cites a "330% saturation rate" from the 10K report (a talent supply-vs-demand measure, not a posting count), and 1,531 jobs on Salesforce's own careers site (undated). — [SalesforceBen](https://www.salesforceben.com/salesforce-job-postings-more-than-doubled-in-16-months-what-changed/)
- K2 University reportedly put Indeed at about 33,000 US Salesforce jobs in May 2025, and a later figure of 32,000. This comes from a search-result summary only and was not fetched or verified. — [K2 University Q4 2025](https://k2university.com/news/salesforce-job-market-trends-q4-2025/)
- Other possibly relevant reports were found but not fetched: [SalesforceBen 10K report 2025–26](https://salesforceben.com/the-state-of-the-salesforce-job-market-in-2025-26-according-to-the-10k-report), [Focus on Force Q2 2025](https://focusonforce.com/?p=893912)
- Power Platform: the only posting-count tracker found was ITJobsWatch, which is **UK-only**: 119 permanent UK "Power Platform Developer" ads in the period to 14 May 2025. It is not usable for the US. — [ITJobsWatch](https://www.itjobswatch.co.uk/jobs/uk/power%20platform%20developer.do)

### Inferences
- The board-level national Salesforce count (about 31–33k on Glassdoor/Indeed in 2025) is about 10–40x the Dice role-phrase counts. That gap reflects broad keyword matching and board coverage, not a contradiction.

### Gaps
- No Lightcast, Indeed Hiring Lab or CompTIA figures were found that break out Salesforce or Power Platform specifically.
- No DMV metro ranking for either skill was found.
- The Revelio Labs "3,934 active postings in 2025" figure surfaced in search appears to be Salesforce Inc.'s own corporate postings, not Salesforce-skill demand. It was excluded and not verified. — [Revelio Labs](https://reveliolabs.com/companies/salesforce/employees/)
