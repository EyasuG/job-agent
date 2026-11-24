# DMV (DC / Maryland / Northern Virginia) Job Market: Microsoft Power Platform vs Salesforce, 2026–2031 Outlook

Research date: 2026-11-09. Scope: DC–Baltimore–NoVA, with emphasis on federal and contractor demand. Older data is labeled with its date. Live job-board counts were only partly retrievable: Indeed and ZipRecruiter returned HTTP 403, and LinkedIn returned 429 on the Salesforce query. Those gaps are flagged below.

## Q1. Job posting counts in the DMV, DMV share of national postings, and clearance-required share

### Takeaway
LinkedIn's Washington DC–Baltimore Area search for "Power Platform" reported **3,000+** results (Nov 2026). The first 60 visible cards were almost all federal contractors clustered in Arlington, McLean, Reston/Ashburn, Quantico/Fort Belvoir, and DC. About 12% (7 of 60) put a clearance in the title. The true clearance-required share is almost certainly higher, because many postings state the requirement only in the body. A comparable Salesforce count could not be retrieved, so no head-to-head posting ratio is available from this session.

### Cited Findings
- LinkedIn search "Power Platform", location "Washington DC-Baltimore Area" (fetched 2026-11-09): header shows "3,000+ Power Platform Jobs". This is LinkedIn's broad keyword match, so it includes Dynamics, Power BI, data-analyst and similar roles, not only Power Platform developer roles — [LinkedIn search](https://www.linkedin.com/jobs/search?keywords=%22Power%20Platform%22&location=Washington%20DC-Baltimore%20Area)
- Of the first 60 visible cards in that search:
  - **7 had an explicit clearance in the title** (about 12%): CGI "Secret Clearance Required" (Arlington), Redhorse (Alexandria), PingWind (Quantico), Diné Development (Quantico), Bow Wave "TS required to apply" (DC), HyerTek "Secret Cleared" (Brookeville MD), InDev "Active Top Secret or DHS Clearance" (Springfield).
  - Other cards were at sites that typically require a clearance, such as the Pentagon, Quantico, Fort Belvoir, and Aberdeen.
  - — [LinkedIn search](https://www.linkedin.com/jobs/search?keywords=%22Power%20Platform%22&location=Washington%20DC-Baltimore%20Area)
- Employers with multiple cards in those 60 results:
  - **Guidehouse**: about 11 cards, including five "Microsoft Copilot Studio & Power Platform Solution Engineer" in McLean, Arlington, and DC.
  - **Booz Allen**: 4 cards (DC, Bethesda).
  - **Accenture Federal Services**: 4 cards (DC), including "Power Platform Developer - TO4", "Power Apps SME", and "Microsoft Power Platform Technical Architect".
  - **SAIC**: 3 cards (Arlington).
  - **CACI**: 3 cards (Ashburn, Reston), including "Power Platform & Copilot Studio Developer".
  - **Deloitte**: 4 cards (Arlington, McLean, Baltimore).
  - **Koniag Government Services**: 3 cards.
  - Also present: SOSi, CGI, Planet Technologies, Serco, Cherokee Federal, and others.
  - — [LinkedIn search](https://www.linkedin.com/jobs/search?keywords=%22Power%20Platform%22&location=Washington%20DC-Baltimore%20Area)
- **Copilot Studio** now appears explicitly in DMV contractor job titles (Guidehouse x5, CACI). This is a sign that Power Platform demand is shifting toward agent-building — [LinkedIn search](https://www.linkedin.com/jobs/search?keywords=%22Power%20Platform%22&location=Washington%20DC-Baltimore%20Area)
- Example cleared postings that exist:
  - ClearanceJobs: "Top Secret Power Platform Developer" — [ClearanceJobs](https://www.clearancejobs.com/jobs/9005071/top-secret-power-platform-developer)
  - ClearanceJobs: "Salesforce Developer" — [ClearanceJobs](https://clearancejobs.com/jobs/8151276/salesforce-developer)
  - Dice: "Senior Power Platform Developer with DOD Clearance" — [Dice](https://www.dice.com/job-detail/7f53091d-c725-49fa-abbd-59b60ef94667)
- Regional context: CompTIA-attributed data said the DC region had the **second-most tech job postings** of any US region in May (year per a Technical.ly/Datawrapper chart, likely 2026). Technical.ly also reported that "new tech employment overall more than doubled" in the DC region after a slow 2025 — [Datawrapper/Technical.ly chart](https://datawrapper.dwcdn.net/AMYdo/1/); [Technical.ly](https://technical.ly/workforce/appian-software-hires-100-dc-workers-power-moves.md)

### Inferences
- Power Platform demand in the DMV is **dominated by federal systems integrators and small or 8(a) contractors**. Commercial employers barely appear in the top 60 results. That is consistent with Microsoft 365/GCC being the default productivity stack across federal agencies.
- Because the user's tool filters out clearance-required jobs, the non-clearance pool is real but smaller than the headline count. Contractors such as Guidehouse, Deloitte, Booz Allen, AFS, and Planet Technologies list non-cleared or Public Trust roles in DC, McLean, and Arlington. Remote roles such as Koniag's "Developer – Power Platform (REMOTE)" also exist.
- A reasonable working assumption, unverified, is that about 30–50% of DMV Power Platform contractor roles need a Secret, TS, or DHS suitability clearance. Title-level tagging (12%) understates this.

### Gaps
- **Salesforce DMV posting count was not retrieved** (LinkedIn 429 on retry; Indeed 403). Recommended manual check: LinkedIn "Salesforce" plus "Power Platform" for "Washington DC-Baltimore Area" versus "United States", and ClearanceJobs keyword counts for each.
- No DMV-share-of-national figure was obtained for either platform.
- No reliable clearance-required percentage was obtained from ClearanceJobs/Indeed facets.
- Dice and ZipRecruiter counts were not retrievable (403 or JS-rendered pages).

## Q2. Federal adoption, contract vehicles and awards, FedRAMP/IL status, and GSA OneGov deals

### Takeaway
Salesforce has landed two very large 2026 federal awards, both run through its national-security subsidiary and branded "Missionforce":
- **Army**: a $5.6B ceiling 10-year IDIQ, January 2026.
- **VA**: a $1.6B ceiling Agentic ELA, July 2026.

Salesforce also says it holds FedRAMP High for Agentforce and Data Cloud, with IL4/IL5 available via Government Cloud Plus – Defense.

Microsoft's federal position is broader. Power Platform rides on the M365 government clouds and on the September 2025 GSA OneGov deal: an estimated $3.1B in first-year savings and 12 months of free M365 Copilot for G5 customers. M365 Copilot reached GCC High in December 2025, but Copilot Studio availability in GCC High and DoD still lags.

### Cited Findings
**Salesforce**
- **US Army (Jan 26, 2026):** 10-year IDIQ, **$5.6B ceiling** (5-year base plus 5-year option). Awarded to Computable Insights LLC, Salesforce's wholly owned national-security subsidiary, under the "Missionforce National Security" brand. Scope includes equipping the Army's **28,000-person recruiting enterprise** with Salesforce CRM, Slack, and MuleSoft (Accessions Information Environment). Earlier work: an Army-wide ELA through ACC–Rock Island, awarded the previous August; Army HRC service-center modernization — [Salesforce IR](https://investor.salesforce.com/news/news-details/2026/U-S--Army-Awards-Salesforce-5-6B-Contract-to-Accelerate-Military-Modernization-and-Department-of-War-Readiness); [BusinessWire](https://www.businesswire.com/news/home/20260126988741/en)
- **Veterans Affairs (Jul 24, 2026):** "Agentic Enterprise License Agreement", 1 year plus two 1-year options, **$1.6B ceiling**. Runs on the Missionforce platform for patient triage, benefits verification, and care scheduling. It extends a relationship of more than a decade — [Salesforce press release](https://www.salesforce.com/news/press-releases/2026/07/24/missionforce-transforms-veteran-care/); [Futurum](https://futurumgroup.com/insights/salesforces-1-6b-win-signals-a-new-era-in-veteran-care-technology/)
- Both figures are ceilings, not guaranteed spend. Salesforce's own releases are the primary source.
- **FedRAMP High:** Salesforce says Agentforce, Data Cloud, Marketing Cloud, and Tableau Next achieved FedRAMP High (reported June 2025) — [Cloud Wars](https://cloudwars.com/ai/agentic-ai-in-government-salesforce-achieves-fedramp-high-for-agentforce-and-more/); [Salesforce Government Cloud](https://www.salesforce.com/government/cloud/)
- **Government Cloud tiers:** Government Cloud Plus covers up to FedRAMP High plus DoD IL2. Government Cloud Plus – Defense covers **IL4 and IL5**. GC Plus holds a JAB FedRAMP High P-ATO — [Salesforce FedRAMP](https://www.salesforce.com/fedramp/); [Salesforce Government Cloud](https://www.salesforce.com/government/cloud/)
- **GSA OneGov with Salesforce (May 19, 2025):** covered **Slack only**: 90% off Slack Enterprise Grid and about 70% off Slack AI, through Nov 30, 2025. No Agentforce-specific OneGov deal was found — [GSA](https://www.gsa.gov/about-gsa/newsroom/news-releases/gsa-salesforce-reach-agreement-to-cut-costs-for-government-05192025); [FedScoop](https://fedscoop.com/gsa-salesforce-agreement-to-lower-price-of-slack-90-for-agencies/)
- Agentforce was added to reseller Emergent's GSA schedule effective Aug 7, 2025 — [TechIntelPro](https://techintelpro.com/news/ai/enterprise-ai/emergent-brings-salesforce-and-agentforce-to-federal-agencies-via-gsa-contract)

**Microsoft**
- **GSA OneGov with Microsoft (Sep 2, 2025):**
  - An estimated **$3.1B in first-year savings**; Microsoft-side coverage cites about $6B over 3 years.
  - **M365 Copilot free for up to 12 months for G5 customers.**
  - Discounts on M365, Azure, Dynamics 365, Entra, and Sentinel, with pricing for up to 36 months.
  - It extends the January 2025 GSA Microsoft acquisition strategy agreement.
  - — [GSA](https://www.gsa.gov/about-gsa/newsroom/news-releases/multibillion-dollar-gsa-onegov-agreement-with-microsoft-brings-steep-discounts-09022025); [Nextgov](https://www.nextgov.com/acquisition/2025/09/microsoft-offers-major-discounts-government-customers-latest-onegov-deal/407812/)
- **M365 Copilot in GCC High:** generally available December 2025 — [Microsoft Tech Community](https://techcommunity.microsoft.com/blog/publicsectorblog/microsoft-365-copilot-is-now-available-in-gcc-high/4473310); [Nextgov](https://www.nextgov.com/acquisition/2025/12/microsoft-makes-copilot-available-secure-cloud-customers/409912)
- **Copilot Studio:**
  - Publishing agents to Teams/M365 is available in GCC — [Microsoft Tech Community](https://techcommunity.microsoft.com/t5/public-sector-blog/continuing-our-momentum-expanding-microsoft-365-copilot/ba-p/4506954)
  - GCC High availability is "delayed/partial" — [copilotconsulting.com](https://copilotconsulting.com/insights/microsoft-copilot-gcc-high-dod-sovereign-cloud-deployment-2026)
  - DoD (IL5) GA is "expected 2H 2026" — consultant blogs, not authoritative.
- **Power Apps GCC:** supports FedRAMP High and DoD DISA IL2. GCC High and DoD tenants exist, and features lag commercial — [Microsoft Learn](https://learn.microsoft.com/power-platform/admin/powerapps-us-government)
- Example of a federal Power Platform build: ASSYST delivered an unnamed agency's personnel and facility access tracking system on Power Platform GCC in 6 months — [ASSYST](https://www.assyst.net/OnPoint/Microsoft-Power-Platform-GCC-Federal)
- A July 2026 MeriTalk item lists OneGov deals with Oracle, Google, Adobe, Salesforce, DocuSign, OpenAI, Microsoft, ServiceNow, Meta, xAI, Palo Alto, and others — [MeriTalk](https://www.meritalk.com/?p=208644)

### Inferences
- **Salesforce = concentrated, high-dollar enterprise deals** (Army recruiting/HR, VA patient and benefits). These generate dense clusters of Salesforce developer, architect, and Agentforce roles at the primes and at Salesforce's own Missionforce/Computable Insights arm, mostly in NoVA.
- **Power Platform = diffuse, ubiquitous demand.** Nearly every agency on GCC, GCC High, or DoD M365 has Power Apps, Power Automate, and Power BI entitlements. Free Copilot for G5 users plus Copilot Studio maturing in GCC and GCC High drives many smaller task-order roles (SharePoint/Power Platform/Copilot Studio developers).
- DoD IL5 lag for Copilot Studio means cleared DoD Power Platform work in 2026 is still mostly classic Power Apps and Power Automate. Agent-building demand may accelerate from 2027 if IL5 GA lands.

### Gaps
- No Microsoft-confirmed Copilot Studio GCC High/DoD GA date was found.
- No FedRAMP Marketplace entry was verified directly.
- Other Salesforce agencies (HHS, CMS, USDA, SBA, State) were not verified in this session.
- No agency-specific Power Platform awards were verified (Army, Air Force, State); USAspending/SAM search is needed.
- No information on whether the Slack OneGov pricing was renewed after Nov 2025.

## Q3. Impact of 2025–2026 federal changes (DOGE, workforce cuts, consulting terminations) and any rebound

### Takeaway
2025 was a sharp contraction:
- The DC metro lost **62,100 federal jobs** (−16.5%) and about **103,900 total jobs** from Jan 2025 to Jan 2026.
- DOGE and DoD cut or modified hundreds of consulting contracts at Deloitte, Booz Allen, and Accenture.
- Unemployment rose to 4.4% in January 2026.

By mid-2026 there are rebound signals in tech postings, and the large 2026 Salesforce awards point the same way.

### Cited Findings
- **COG economic trends report** (via Patch, Apr 28, 2026):
  - The Washington MSA lost **62,100 federal jobs** Jan 2025–Jan 2026, its lowest federal workforce since 1990.
  - Federal job declines: **16.5%** for the Washington area and **20.5%** for Baltimore.
  - The Washington MSA lost about **103,900** jobs in total.
  - Unemployment went from 3.8% (Dec 2025) to **4.4%** (Jan 2026).
  - — [Patch](https://patch.com/virginia/mclean/dc-region-lost-62-100-federal-jobs-year-cog-report-finds)
- DC alone lost 26,100 federal jobs, a 13.7% decline — [Datawrapper](https://datawrapper.dwcdn.net/ZNYxs/1/)
- **DoD cuts (April 2025):** Hegseth memo framed $5.1B in cuts, including about $1.8B on a Defense Health Agency consulting contract (Accenture, Deloitte, Booz Allen) and a $1.4B Air Force contract held by Accenture — [Washington Technology](https://washingtontechnology.com/contracts/2025/04/pentagon-hits-accenture-booz-allen-and-deloitte-contract-cancellations/404500/); [Bloomberg Law](https://news.bloomberglaw.com/tech-and-telecom-law/hegseth-plans-to-cut-5-billion-in-contracts-after-doge-review)
- **DOGE cancellations (as of about April 2025):**
  - Deloitte: at least 124 contracts cut or modified (other counts 127–129).
  - Booz Allen: 61 contracts, about $207.1M claimed savings.
  - Accenture: 30 contracts, about $240.2M.
  - Deloitte announced "modest personnel actions".
  - — [Fortune](https://www.fortune.com/2025/04/03/doge-private-contract-crackdown-deloitte-consultancies); [eMarketer](https://www.emarketer.com/content/government-cuts-5-billion-consulting-contracts-firms-face-commercial-pivot)
- Estimated DC-area headcounts: Accenture Federal over 15,000, Booz Allen about 15,000, and Deloitte about 8,000 — [So What](https://sowhat.beehiiv.com/p/deloitte-accenture-booz-lose-government-contracts) (secondary source)
- DC-metro contractor headcount contracted by an estimated **8–12% since late 2024**. This is a single advisory-firm estimate with no named primary source — [Kitalent](https://kitalent.com/articles/dc-development-finance-talent-bifurcation.md)
- Technical.ly (Jan 5, 2026): DC-region tech jobs "notably decreased" 2024→2025, with no figures given. Over 20% of civilian federal workers lived in DC/MD/VA (OPM, Sept 2024) — [Technical.ly](https://technical.ly/workforce/dc-tech-jobs-2025-downturn/)
- **Rebound signals (2026):**
  - The DC region ranked #2 nationally in tech postings in May (CompTIA via Datawrapper).
  - "New tech employment overall more than doubled."
  - Appian hired about 200 globally, more than half local in McLean.
  - — [Datawrapper](https://datawrapper.dwcdn.net/AMYdo/1/); [Technical.ly](https://technical.ly/workforce/appian-software-hires-100-dc-workers-power-moves.md)

### Inferences
- The cuts hit **advisory/management consulting** hardest (DHA, Air Force consulting). Platform implementation work on SaaS the government is consolidating onto has been comparatively resilient: Salesforce ELAs, M365/OneGov. Consolidation toward fewer, larger SaaS enterprise agreements favors platform-specific developers over generalist consultants.
- The 2025 workforce cuts plus OMB pressure to "do more with less" increase demand for automation (Power Automate, Agentforce, Copilot Studio) to backfill lost federal staff capacity.

### Gaps
- No platform-specific DMV hiring trend data was found (e.g., Power Platform postings 2024 vs 2026).
- No Fall 2025 shutdown impact data specific to DMV tech hiring was found.
- No firm-level 2026 DMV layoff or rehiring counts were found.

## Q4. Key DMV employers for each platform

### Takeaway
On the Power Platform side, the visible DMV hiring is led by Guidehouse, Booz Allen, Accenture Federal, Deloitte, SAIC, and CACI, plus a long tail of small and Alaska Native–owned contractors. For Salesforce, the employer base is Salesforce's own Missionforce/Computable Insights arm plus the primes and partners on the Army and VA programs. Specific Salesforce DMV employer counts were not retrieved.

### Cited Findings
- **Power Platform (LinkedIn DMV sample, Nov 2026):**
  - Primes: Guidehouse (McLean, Arlington, DC, Springfield, Alexandria), Booz Allen (DC, Bethesda), Accenture Federal Services (DC), Deloitte (Arlington, McLean, Baltimore), SAIC (Arlington), CACI (Ashburn, Reston), CGI (Arlington).
  - Also: SOSi (Fort Belvoir), Koniag Government Services (DC, Chantilly), Planet Technologies (DC; a Microsoft partner), Serco (Alexandria), Cherokee Federal (Fort Belvoir), Redhorse (Alexandria), PingWind (Quantico), Bowhead/UICGS (Aberdeen MD), i4DM (Millersville MD), Avanza (Arlington), Prometheus Federal Services (Fairfax).
  - — [LinkedIn search](https://www.linkedin.com/jobs/search?keywords=%22Power%20Platform%22&location=Washington%20DC-Baltimore%20Area)
- **Salesforce federal:**
  - Computable Insights LLC / Missionforce National Security (Salesforce subsidiary), prime on the Army IDIQ — [Salesforce IR](https://investor.salesforce.com/news/news-details/2026/U-S--Army-Awards-Salesforce-5-6B-Contract-to-Accelerate-Military-Modernization-and-Department-of-War-Readiness)
  - Thunder: "Salesforce Developer (Cleared) – Salesforce Federal Delivery" — [career.com](https://www.career.com/job/thunder/salesforce-developer-cleared-salesforce-federal-delivery/j202509242010561349997)
  - Cleared Salesforce developer roles are posted on ClearanceJobs — [ClearanceJobs](https://api.clearancejobs.com/jobs/8785939/salesforce-developer)

### Inferences
- Many of the same primes (AFS, Deloitte, Booz Allen, Guidehouse) run both Salesforce and Microsoft practices. A candidate with both skill sets is marketable to the same employer set.
- Commercial DMV employers named in the brief (Capital One, Marriott, Freddie Mac, Fannie Mae, universities, health systems) were **not verified** in this session.

### Gaps
- Salesforce DMV employer list from live postings: LinkedIn rate-limited.
- Commercial employer demand for each platform was not checked.
- Acumen Solutions (acquired by Salesforce in 2021) was not checked for its current DMV presence.

## Q5. DMV salaries vs national, and the clearance premium

### Takeaway
DMV salaries for both platforms cluster around $115K–$135K average base, but estimates vary widely by source:
- **Salesforce developer, DC:** Indeed average $129.7K; BLS-derived median about $154.9K.
- **Power Platform developer, DC:** Salary.com average $120.4K.
- **Cleared senior Power Platform postings:** $135K–$175K.

No source isolates a clean clearance premium.

### Cited Findings
- **Salesforce Developer, DC:**
  - Indeed: average **$129,739** (28 salaries; range $105.6K–$159.4K) — [Indeed](https://www.indeed.com/salaries/salesforce-developer-Salaries,-Washington-DC)
  - Built In: **$121,250** — [Built In](https://builtin.com/salaries/engineering/salesforce-developer/washington-dc)
  - Payscale: **$92,253** — [Payscale](https://www.payscale.com/research/US/Job=Salesforce_Developer/Salary/cf2a4569/Washington-DC)
  - Hyring, citing BLS OEWS 2025: median **$154,930** — [Hyring](https://hyring.com/jobseeker-toolkit/salary/salesforce-developer-salary-in-washington-dc)
- **Cleared Salesforce:** an onsite DC role requiring Secret lists **$115K–$130K** — [ClearanceJobs](https://clearancejobs.com/jobs/8151276/salesforce-developer)
- **Power Platform Developer, DC:**
  - Salary.com: average **$120,353**, typical range $107.3K–$133.6K — [Salary.com](https://www.salary.com/research/salary/position/power-platform-developer-salary/dc)
  - Senior role requiring DoD clearance: **$135K–$175K** — [Dice](https://www.dice.com/job-detail/7f53091d-c725-49fa-abbd-59b60ef94667)
  - Contract rate for a Power Platform Developer IV in DC: **$61.75–$81.50/hr** — [Squires Group](https://careers-squiresgroup.icims.com/jobs/12613/power-platform-developer/job)
- National Power Platform developer salary benchmark — [ZipRecruiter](https://www.ziprecruiter.com/Salaries/Microsoft-Power-Platform-Developer-Salary) (figure not extracted)

### Inferences
- At mid level, DMV pay for the two platforms is roughly at parity. Salesforce may have a modest edge at the architect and Agentforce level, though that is unverified. Clearance appears to add roughly $10K–$40K at senior levels, inferred from cleared Power Platform postings ($135K–$175K) vs the non-cleared average (about $120K). This is not a controlled comparison.

### Gaps
- No direct DMV-vs-national ratio from a single consistent source.
- No architect-level or Agentforce/Data Cloud DMV salary data.
- No ClearanceJobs compensation survey figures were retrieved.

## Q6. 5-year outlook (2026–2031): federal AI mandates and platform trajectory

### Takeaway
Two federal policy signals point toward more low-code and agentic tooling inside existing enterprise platforms:
- **OMB M-25-21 and M-25-22** (April 2025) push agencies to accelerate AI adoption and buy commercial AI.
- **GSA OneGov** consolidates purchasing into vendor-wide deals.

Both favor Microsoft (Copilot plus Copilot Studio on the M365 the government already runs) and Salesforce (Agentforce via ELAs). Salesforce's 2026 Army and VA wins give it multi-year, high-dollar anchors in the DMV through roughly 2031–2036. Power Platform's base is broader but its roles are lower-dollar.

### Cited Findings
- **OMB M-25-21 (Apr 3, 2025):**
  - Directs agencies to accelerate AI use.
  - Agencies must designate a Chief AI Officer (within 60 days) and set up AI governance boards.
  - Agencies must publish AI strategies within 180 days.
  - Some requirements apply only to the 24 CFO Act agencies; National Security Systems are exempt.
  - The companion **M-25-22** covers AI procurement.
  - — [OMB M-25-21 PDF](https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf); [Jones Day](https://www.jonesday.com/en/insights/2025/05/omb-directs-agencies-to-accelerate-ai-adoption-and-devise-governance-strategy)
  - Sources conflict on the CAIO deadline (60 days vs July 2, 2025).
- **Salesforce contract horizons:** the Army IDIQ runs 10 years, roughly 2026–2036; the VA ELA runs 1 + 2 option years, roughly 2026–2029 — [Salesforce IR](https://investor.salesforce.com/news/news-details/2026/U-S--Army-Awards-Salesforce-5-6B-Contract-to-Accelerate-Military-Modernization-and-Department-of-War-Readiness); [Salesforce press release](https://www.salesforce.com/news/press-releases/2026/07/24/missionforce-transforms-veteran-care/)
- **Microsoft OneGov:** pricing runs up to 36 months (roughly through late 2028); free Copilot for G5 lasts 12 months — [GSA](https://www.gsa.gov/about-gsa/newsroom/news-releases/multibillion-dollar-gsa-onegov-agreement-with-microsoft-brings-steep-discounts-09022025)
- Copilot features in GCC High/DoD are listed "In development" on the 2026 roadmap — [mc.merill.net roadmap mirror](https://mc.merill.net/message/RM567120)

### Inferences
- **Power Platform trajectory (DMV):** likely steady-to-growing volume through 2031.
  - Free and discounted Copilot under OneGov will push agencies to build Copilot Studio agents on Dataverse and Power Automate.
  - If DoD IL5 GA arrives, cleared Copilot Studio demand should grow.
  - Risk: the end of OneGov discounting around 2028 could slow uptake, and low-code "citizen developer" adoption may limit pay growth.
- **Salesforce trajectory (DMV):** likely spikier but higher-value.
  - The Army (28k-user recruiting) and VA (agentic scheduling and benefits) programs should drive sustained Salesforce developer, architect, Agentforce, and Data Cloud hiring in NoVA.
  - Risks: concentration in a few programs, plus the VA option years not being exercised.
- For the user's tool (non-clearance, JS/full-stack), the most accessible lanes are:
  - Civilian-agency and Public Trust Power Platform/Copilot Studio roles at Guidehouse, Deloitte, Booz Allen, and AFS.
  - VA Salesforce work, which is civilian, so more of it may need only Public Trust.
  - This is unverified and should be confirmed by sampling postings.

### Gaps
- No independent forecast (CompTIA, Lightcast, BLS projections) specific to Power Platform or Salesforce roles in the DMV through 2031.
- No GSA AI initiative details (e.g., USAi) were collected.
- No information on whether the FY2026–2027 budget or shutdown dynamics changed contractor hiring after mid-2026.
