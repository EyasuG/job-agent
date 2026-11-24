# Contracting Bridge Value of Five IT Role Tracks (small non-cleared gov IT firm, ~2031)

Scope: (1) AI application/agent engineer (TypeScript), (2) full-stack web/software developer (govtech/digital services), (3) ServiceNow developer, (4) Microsoft Power Platform/Copilot Studio developer, (5) Salesforce developer. Focus: federal civilian plus DMV state/local, no clearance. Research date 2026-11-16.

## Q1. GSA labor categories and ceiling rates (CALC+)

### Takeaway
All five tracks have labor categories on GSA MAS, but the depth varies a lot. "Software Developer" is a huge, commoditized category (about 2,950 rates, 847 vendors, median about $136/hr). AI/ML titles carry the highest ceilings (median $171 to $194, mid-level about $180 to $200). ServiceNow (median $164) is a niche premium over generic dev. Salesforce (median $140) is roughly at parity with generic dev. Power Platform is thin (13 rates, median $145). No GSA-defined platform categories exist: vendors write their own free-text titles, so "ServiceNow Developer" and similar exist only because individual vendors created them.

### Cited Findings
Primary data: live pull from the GSA CALC ceiling-rates API (index `ceilingrates-2026-11-16`). Rates are current-year fully burdened not-to-exceed ceilings, matched on the labor-category title. Experience bands use each row's `min_years_experience`. Source: [GSA CALC API](https://api.gsa.gov/acquisition/calc/v3/api/ceilingrates/?keyword=ServiceNow).

| Title keyword (matched in labor category) | n rates / vendors | p25 | Median | p75 | p90 | 0-4 yr median | 5-9 yr (mid) median | 10+ yr (senior) median |
|---|---|---|---|---|---|---|---|---|
| Software Developer | 2,954 / 847 | $110 | $136 | $168 | $198 | $117 | $147 | $173 |
| Full Stack | 235 / 115 | $94 | $133 | $161 | $183 | $123 | $136 | $165 (n=16) |
| AI Engineer (title "AI ... Engineer" / "Artificial Intelligence") | 99 / 33 | $144 | $175 | $210 | $257 | $154 | $198 | $203 |
| Artificial Intelligence / AI (any) | 184 / 55 | $143 | $194 | $258 | $302 | $153 | $201 | $258 |
| Machine Learning | 120 / 46 | $143 | $171 | $225 | $265 | $144 | $179 | $198 |
| ServiceNow | 88 / 26 | $117 | $164 | $194 | $216 | $153 | $170 | $197 (n=5) |
| Salesforce | 154 / 50 | $117 | $140 | $174 | $218 | $129 | $143 | $188 (n=18) |
| Power Platform | 13 / 10 | $124 | $145 | $169 | $292 | $128 | $154 | $284 (n=2) |
| Power Apps | 1 / 1 | — | $99 | — | — | — | $99 | — |
| (comparators) Pega | 54 / 11 | $133 | $166 | $184 | $232 | | | |
| Appian | 21 / 5 | $113 | $151 | $248 | $338 | | | |

- Of the ServiceNow rows, 87 of 88 come from small businesses (25 of 26 vendors). Salesforce: 136 of 154 rows from 47 small vendors. This suggests these niche titles live mainly on small-business schedules. Example titles include "Sr ServiceNow Developer" (AlgebraIT, $67.71, a deliberately low-priced small-business schedule) and "Jr. ServiceNow Administrator". — [GSA CALC API](https://api.gsa.gov/acquisition/calc/v3/api/ceilingrates/?keyword=ServiceNow)
- Small-business-only medians: Software Developer $135, Full Stack $132, ServiceNow $165, Salesforce $138, Power Platform $128, ML $155, AI Engineer $173. — [GSA CALC API](https://api.gsa.gov/acquisition/calc/v3/api/ceilingrates/?keyword=Salesforce)
- Most rows in every track are marked `security_clearance: false` (for example, 2,721 of 2,954 Software Developer rows and 80 of 88 ServiceNow rows), so non-cleared ceilings are essentially the same as the overall numbers. — [GSA CALC API](https://api.gsa.gov/acquisition/calc/v3/api/ceilingrates/?keyword=Software%20Developer)
- A "Dynamics" keyword search is dominated by General Dynamics IT titles, so I could not isolate Dynamics 365 rates. Treat this as a gap. — [GSA CALC API](https://api.gsa.gov/acquisition/calc/v3/api/ceilingrates/?keyword=Dynamics)
- Cross-checks from third parties: one guide reports a Salesforce title-match median of $147 (146 rates, p25 $119, p75 $175, read 2026-11-03). — [Hyperresearch](https://hyperresearch.ai/guides/it-consulting-rates). Another reports Software Engineer median $139 (p25 $110, p75 $172, about 3,400 rates) and Data Scientist $168. It gives experience-band medians across all categories: 0-2 yr $88, 3-5 yr $120, 6-10 yr $156, 11-20 yr $206. It also notes that task-order rates are typically 10 to 20% below ceilings (about 317k rates from 6,500 vendors as of 2026-10-17). — [GovConAPI](https://govconapi.com/gsa-labor-rates)
- Commercial (not GSA) ServiceNow contractor ranges: mid $75–120/hr, senior $120–180/hr. — [SNPro.jobs](https://snpro.jobs/resources/salary-and-rates/contractor-rates)

### Inferences
- The AI track has the highest ceilings, about $25–50/hr above generic dev at mid level. AI titles are still scarce (about 100–180 rates against about 3,000 for Software Developer), so pricing has not commoditized yet. That window may narrow by 2031.
- ServiceNow carries a real premium (about +$20–30/hr at median over generic dev) with few vendors (26). Salesforce is near parity with generic dev, so the platform cert alone does not buy pricing power on GSA.
- Power Platform has very little GSA rate depth (13 rates). A firm would be early, but could also find little demand defined that way. Most Power Platform work is likely billed under generic "Developer" or "SharePoint" categories.
- A new firm would write its own categories (for example "AI Application Engineer", "ServiceNow Developer III"). Pricing near the p25–median band is typical for small-business entrants.

### Gaps
- Could not isolate Dynamics 365/Power Platform rates within the "Dynamics" keyword noise.
- CALC shows ceilings, not prices paid. I found no public dataset of actual task-order labor rates by platform.

## Q2. Federal civilian spend signals by track (2024–2026)

### Takeaway
2025–2026 shifted platform license buying toward GSA-negotiated OneGov deals (Microsoft, ServiceNow, Salesforce and others), with deep discounts and free Copilot. Big custom consulting and digital-services work was cut: DOGE cancellations, and 18F was eliminated. Platform implementation awards (ServiceNow at VA, FDA, DOI; Salesforce Agentforce at VA for $1.6B; Power Platform at DOI) and AI modernization BPAs are the visible growth signals. Generic "digital services" custom development is the most disrupted.

### Cited Findings
- EO 14240 (March 20, 2025) moves common goods/services procurement to GSA and names GSA executive agent for governmentwide IT acquisition contracts (GWACs). — [Inside Government Contracts](https://www.insidegovernmentcontracts.com/2025/03/executive-order-issued-to-expand-gsas-role-in-acquisition-of-common-goods-and-services-and-information-technology/); [FedScoop](https://fedscoop.com/trump-executive-order-consolidates-federal-it-contracting-under-gsa/)
- Commentators warn consolidation means "larger delivery orders going to fewer contractors" and possibly fewer small-business opportunities. — [PilieroMazza](https://www.pilieromazza.com/gsa-to-oversee-federal-purchasing-a-step-toward-efficiency-or-a-challenge-for-agencies-and-contractors/); [Cooley](https://www.cooley.com/news/insight/2025/2025-03-25-new-executive-order-will-consolidate-federal-agency-procurement-functions-in-the-general-services-administration)
- OneGov / ServiceNow (Sept 2025): up to 70% off ITSM Pro / Pro Plus bundles, plus 40% off standalone ITSM Pro upgrades, running through Sept 2028. ServiceNow pitches itself as "connective tissue" across govtech. — [Nextgov](https://nextgov.com/acquisition/2025/09/servicenow-gsa-strike-onegov-deal-drive-government-ai-adoption/407844); [FedScoop](https://fedscoop.com/servicenow-gsa-general-services-administration-govtech-artificial-intelligence-agentic-ai/); [The Register](https://www.theregister.com/2025/09/03/servicenow_us_ai_deal/)
- OneGov / Microsoft (Sept 2025): covers M365, Azure, Dynamics 365, Power Platform, GitHub and the Copilot portfolio. M365 Copilot is free for up to 12 months. Agencies can opt in through Sept 2026, with discounted pricing for up to 36 months. — [GSA news release](https://www.gsa.gov/about-gsa/newsroom/news-releases/multibillion-dollar-gsa-onegov-agreement-with-microsoft-brings-steep-discounts-09022025); [Microsoft blog](https://blogs.microsoft.com/blog/2025/09/02/accelerating-ai-adoption-for-the-us-government/)
- OneGov also secured terms with Salesforce, Oracle and Google; more than a dozen deals since April 2025. Lock-in concerns have been raised. — [CIO.com](https://www.cio.com/article/4051014/why-are-tech-firms-offering-the-feds-such-deep-discounts.html); [The Register](https://www.theregister.com/2025/09/03/servicenow_us_ai_deal/)
- Salesforce: VA awarded Salesforce up to $1.6B over 3 years (1 base year plus 2 option years, announced July 2026) for an Agentforce virtual contact center, triage, benefits verification and scheduling. — [Washington Technology](https://washingtontechnology.com/contracts/2026/07/va-awards-salesforce-16b-contract-veteran-care-and-services/414981/); [Salesforce press](https://www.salesforce.com/news/press-releases/2026/07/23/missionforce-transforms-veteran-care/). Its other big 2026 deals are DoD (Army $5.6B 10-year IDIQ, Jan 2026), which is not civilian. — [Futurum](https://futurumgroup.com/insights/will-the-u-s-armys-5-6b-salesforce-deal-set-the-standard-for-modernization/)
- ServiceNow civilian awards: VA task order to METGreen Solutions for ServiceNow SaaS licenses, potential $527.6M over 5 years via SEWP V. — [GovConWire](https://www.govconwire.com/articles/metgreen-solutions-wins-5276m-va-task-order-for-servicenow-saas-license-entitlements). FDA ServiceNow Fulfiller renewal of about $9.17M (reported June 2026). DOI HR ServiceNow licenses (Oct 2025). GSA OHRM FY26 ServiceNow development support forecast at up to about $2M. — [HigherGov forecast](https://www.highergov.com/contract-forecast/ohrm-fy26-task-6-servicenow-development-support-1146683/) (aggregator data; verify on USAspending)
- Power Platform / AI: DOI AI Modernization multiple-award BPA ($70M), with more than $125M in tasks. Power Platform business apps task went to Nuvitek (about $8.2M, 3 years) and Power Platform support to St. Moritz Enterprises (about $3.2M). One bidder was reported for each. — [OrangeSlices](https://orangeslices.ai/doi-awards-70m-doi-ai-modernization-multiple-award-bpa/) (aggregator)
- DOGE: trackers list more than $16.2B TCV (8,373 contracts) as canceled, with HHS and VA the largest civilian sources. Deloitte lost more than $473M, Accenture Federal more than $193M. — [TBR](https://tbri.com/blog/doge-federal-it-vendor-impact-series-cgi-federal/). Business Insider found "IT and digital services" were standout themes in the cuts. GSA eliminated 18F. — [Consulting.us](https://www.consulting.us/news/11538/doge-crusade-against-consultancies-continues); [FedScoop](https://fedscoop.com/radio/general-services-administration-eliminated-the-18f-program/)
- FAR overhaul (RFO, EO 14275): proposed rules were issued in batches in 2026, and the Rule of Two survives for contracts but stays discretionary for orders. Part 19's final status is unclear. — [GovExec](https://www.govexec.com/management/2026/06/federal-acquisition-overhaul-proposed-rules/414348/); [The Bid Lab](https://thebidlab.com/learning-center/far-overhaul-benefits-small-businesses/); [GSA presentation via NationalVIP](https://nationalvip.org/assets/pdf/session-2-gsa-perspectives-on-the-far-overhaul.pdf)

### Inferences
- License spend is being centralized and discounted, which pushes value toward implementation and configuration services on already-owned platforms. That favors ServiceNow, Salesforce and Power Platform implementers, and AI-agent builders on top of those platforms.
- Microsoft's free or cheap Copilot plus Power Platform under OneGov will likely create a broad base of agencies wanting Copilot Studio agents and Power Apps. Task orders tend to be small (low single-digit $M), which suits small businesses (see the DOI tasks).
- Custom digital services (the 18F/USDS-style model) lost internal champions and big-consultancy budget in 2025. Demand still exists, but the federal civilian "custom build" market is weaker than in 2021–2024. Generic full-stack sits in the most competitive and most cut segment.
- "AI implementation" is the headline growth category, but it is delivered increasingly through platform agents (Agentforce, Now Assist, Copilot Studio). A TypeScript AI engineer who can also deliver on one platform is strongest.

### Gaps
- I did not pull USAspending obligation totals by PSC/NAICS or by platform keyword for FY24 to FY26. A quantitative growth/shrink comparison is not established.
- Actual realized OneGov savings and post-discount renewal behavior are unknown.
- How far EO 14240 has actually moved agency-specific GWACs to GSA by late 2026 is unverified.

## Q3. DMV state and local vehicles (VA, MD, DC)

### Takeaway
All three jurisdictions push IT staff augmentation through managed-service-provider staffing programs with strong small/minority/local-business preferences: VITA ITCL via CAI, DC STaR2 via CAI with a 95% CBE requirement, and Maryland CATS+. These are the most accessible entry points for a new micro-firm, as a subcontractor supplying named developers. Maryland's main IT services vehicle (CATS+) is closed to new master contractors until its April 2028 expiration, so a 2031 firm would target its successor. Platform licenses (Microsoft, ServiceNow, Salesforce) are mostly bought through resellers (SHI, Carahsoft) at the agency level, not as statewide services contracts.

### Cited Findings
**Virginia**
- Only VITA can establish statewide IT contracts, and use of VITA statewide contracts is mandatory for executive-branch IT acquisitions. — [VITA BUY IT Manual](https://vita.ar.virginia.gov/media/vitavirginiagov/supply-chain/pdf/BUY-IT-Manual.pdf)
- IT Contingent Labor (ITCL): MSP contract VA-210625-CAI (Computer Aid Inc.), mandatory use for IT contingent labor by executive agencies and higher ed under VITA authority. Renewal effective June 26, 2026. — [VITA ITCL](https://www.vita.virginia.gov/procurement/it-contingent-labor); [CAI SOW Addendum 2026](https://www.cai.io/media/documents/msp/va/CAI-CWS-SOW-Addendum-VA-Final-2026-04-20.pdf)
- At the 2021 award, SWaM firms were 35% of the subcontractor network and had won 50% of contract spend. — [VITA press release](https://www.vita.virginia.gov/about/newsroom/press-releases/press-releases-archive/virginia-it-agency-awards-new-contract-for-it-contingent-labor-program.html)
- The 2026 CAI supplier agreement lowers cyber-liability insurance for SWaM-certified subs: $1M per occurrence against $5M for non-SWaM. That is a concrete cost advantage of SWaM certification. — [CAI VA Supplier FAQ](https://www.cai.io/media/documents/msp/va/VA_Supplier_FAQ_V2.pdf)
- Microsoft: VITA Microsoft LSP contract VA-200114-SHI (SHI, SWaM minority-owned designation; listed end Jan 13, 2026, status since then unverified). M365 licenses must be bought via SHI's LAR contract. Accenture holds VA-220601-ACCN for M365 integration services. — [VITA contract record](https://vita.cobblestonesystems.com/public/ContractDetails.aspx?cid=1931)
- ServiceNow: a "ServiceNow – Employee Unified Experience" project appears on VITA's major IT projects list. VDOT bought ServiceNow renewals and Salesforce services (FY26) via Carahsoft at the agency level. — [VITA Feb 2025 Major IT Projects](https://vita.am.virginia.gov/media/vitavirginiagov/it-governance/quarterly-list-of-major-it-projects/pdf/Feb-2025-Quarterly-List-of-Major-IT-Projects.pdf)

**Maryland**
- CATS+ (060B2490023) covers IT consulting in 17 functional areas, runs Apr 22, 2013 to Apr 21, 2028, and the State is not currently accepting new master contractor proposals. Existing masters can add functional areas, and labor rates cannot be revised. — [MD DoIT](https://doit.maryland.gov/contracts/Pages/How-to-Get-a-Contract.aspx); [CATS+ functional areas](https://doit.maryland.gov:443/contracts/Documents/CATSPlus2020/060B2490023-CATS_FunctionalAreas.pdf)
- Task-order examples on CATS+ include Agile Team Resources and senior EPMO project managers (Functional Area 10). — [DoIT TORFP](https://doitcontracts.maryland.gov/Documents/catsPlus_torfp_status/F50B0600045-Agile-Team-Resources.pdf)
- Small Business Reserve (SBR) solicitations are restricted to certified small businesses and are posted on eMMA. Many DoIT SBR buys also require being a master contractor on a specific DoIT master contract. 2026 examples were mostly hardware and software renewals (Cisco, Pure Storage, Acquia hosting). — [SamSearch SBR listing](https://samsearch.co/gov-explore/sled/fc0002375-pure-storage-for-dr-nas-replacement/BPM056613) (aggregator)
- Maryland Procurement Reform Act of 2025 took effect Oct 1, 2025. — [MD DGS](https://news.maryland.gov/dgs/2025/10/01/marylands-landmark-procurement-reform-act-takes-effect-october-1/)

**DC**
- OCTO IT staffing moved from the Pipeline contract to DC STaR2, run by CAI. Pipeline carried a 95% CBE subcontracting requirement, and CAI reported 96.32% contract-to-date CBE commitment in Feb 2025. — [OCP letter](https://ocp.dc.gov/release/letter-cbe-community-regarding-award-octos-pipeline-contract); [CAI DC STaR2 presentation](https://www.cai.io/media/documents/msp/dc/DC_Supplier_STaR2_2-19-2025_Presentation_FINAL.pdf)
- OCTO publishes its own labor-category list. — [OCTO labor categories](https://octo.dc.gov/page/labor-categories)
- OCTO has recruited a ServiceNow Architect for ITSM, ITAM and change management across DC. — [Paylocity posting](https://recruiting.paylocity.com/Recruiting/Jobs/Details/4126961) (undated)

### Inferences
- The fastest DMV path for a 1-person firm is to become a vetted supplier or subcontractor in CAI's VA ITCL and DC STaR2 supplier networks. Get SWaM (VA) and CBE (DC; requires a DC principal office) certifications. CBE's 95% local requirement on DC staffing is a large structural advantage if the firm is DC-based.
- State and local agencies in the DMV are confirmed buyers of ServiceNow (VITA project, VDOT, DC OCTO), Salesforce (VDOT), and Microsoft (statewide M365). Platform-skilled staff augmentation is therefore sellable through these MSPs. Generic full-stack and AI roles also flow through the same staffing pipes.
- Maryland's CATS+ successor (expected around 2028) is a key on-ramp to time. A firm formed by 2027–2028 with past performance could be ready to bid.

### Gaps
- I found no Maryland or DC statewide services contracts specific to ServiceNow, Salesforce or Power Platform, and could not confirm the current VITA Microsoft/ServiceNow/Salesforce statewide contract status for 2026.
- The CATS+ recompete timeline and the full CATS+ labor-category list were not found.
- VITA's "Spring 2026" statewide contracts announcement was not read.

## Q4. Small-business path (1099 to sub to prime) and federal entry requirements

### Takeaway
The standard path is: W-2 or 1099 delivery, then subcontractor to an established prime (or to MSP staffing networks), then GSA MAS (possible early via Startup Springboard), then small set-aside primes. Polaris SB is effectively closed to newcomers for now: its awards are frozen by court order (Sept 2026) and it is not open to new entrants on demand. GSA MAS is the realistic federal prime vehicle for a 2031 firm.

### Cited Findings
- GSA MAS normally requires 2 years of corporate experience. Startup Springboard lets firms substitute the professional experience of owners and key personnel for corporate experience and past performance, waives the three-reference minimum, and allows alternative financial documentation. As of Refresh #33 it is no longer limited to the IT Large Category. — [Winvale](https://info.winvale.com/blog/what-gsa-startup-springboard-program); [Price Reporter](https://pricereporter.com/startup-springboard-how-startups-can-qualify-for-a-gsa-schedule-contract/)
- Polaris SB pool: 102 awards in Jan 2025. SDVOSB, WOSB and HUBZone pools have been awarded in phases (SDVOSB reached 44 awardees in June 2026). — [ExecutiveGov](https://executivegov.com/2025/01/gsa-selects-small-business-vendors-polaris-it-gwac/); [GSA blog Dec 2025](https://gsablogs.gsa.gov/technology/2025/12/15/polaris-contract-awards-support-governmentwide-it-transformation/)
- On Sept 10, 2026 the Court of Federal Claims blocked further Polaris awards until GSA fixes "prejudicial errors" of unequal treatment. It sustained protests by OM Partners and DevTech. — [Washington Technology](https://www.washingtontechnology.com/contracts/2026/09/judge-halts-new-polaris-awards-over-gsas-unequal-treatment-bidders/415978/)
- Rule of Two set-asides continue under the FAR overhaul, and stay discretionary for task orders. — [The Bid Lab](https://thebidlab.com/learning-center/far-overhaul-benefits-small-businesses/); [Greenberg Traurig](https://www.gtlaw.com/en/insights/2025/10/far-part-19-overhaul-considerations-for-government-contractors)
- MSP staffing programs (VITA ITCL, DC STaR2) fulfill requests through large subcontractor networks, an entry route for micro-firms. — [VITA ITCL](https://www.vita.virginia.gov/procurement/it-contingent-labor)
- Subcontracting demand signals: ServiceNow and Salesforce CALC titles are held overwhelmingly by small firms (25 of 26 ServiceNow vendors and 47 of 50 Salesforce vendors are small). Single-bidder DOI Power Platform tasks suggest thin competition. — [GSA CALC API](https://api.gsa.gov/acquisition/calc/v3/api/ceilingrates/?keyword=ServiceNow); [OrangeSlices](https://orangeslices.ai/doi-awards-70m-doi-ai-modernization-multiple-award-bpa/)

### Inferences
- Platform tracks (ServiceNow especially, then Salesforce and Power Platform) give the clearest subcontracting demand: primes holding big license or implementation awards (VA ServiceNow, VA Salesforce) need certified implementers, and platform certs are checkable résumé discriminators in proposals.
- By 2031, Startup Springboard lets a firm get on MAS largely on the founder's individual experience. What matters most is building named, referenceable federal or state past performance between 2027 and 2030, even as a subcontractor or an MSP-placed contractor.
- Consolidation (EO 14240) plus fewer, bigger vehicles makes teaming as a sub to a vehicle holder more important than chasing own vehicles early.

### Gaps
- No quantitative data found on subcontracting volume by platform (SBA SubNet or eSRS analysis not done).
- SBA 8(a)/WOSB/SDVOSB eligibility for the user is unknown; these drastically change the path.
- Current GSA new-offeror checklist (Aug 2025 version) not read directly.

## Q5. Ranking the five tracks on bridge value

### Takeaway
Overall ranking for a non-cleared small firm targeting federal civilian plus DMV state/local around 2031:
1. ServiceNow
2. AI application/agent engineer (TypeScript), strongest when paired with a platform
3. Power Platform/Copilot Studio
4. Salesforce
5. Generic full-stack/govtech

### Cited Findings (basis for ranking)
- ServiceNow: rate premium (median $164 against $136 for generic dev), few GSA vendors (26), OneGov discounts through 2028 driving adoption, civilian implementation demand (VA, FDA, DOI, GSA OHRM), and DMV demand (VITA project, VDOT, DC OCTO). — [GSA CALC API](https://api.gsa.gov/acquisition/calc/v3/api/ceilingrates/?keyword=ServiceNow); [Nextgov](https://nextgov.com/acquisition/2025/09/servicenow-gsa-strike-onegov-deal-drive-government-ai-adoption/407844); [GovConWire](https://www.govconwire.com/articles/metgreen-solutions-wins-5276m-va-task-order-for-servicenow-saas-license-entitlements)
- AI engineer: highest ceilings (AI Engineer median $175, mid $198). AI modernization BPAs exist (DOI $70M). But many agency AI deliveries run through platform agents, and the titles are newer and less proven. — [GSA CALC API](https://api.gsa.gov/acquisition/calc/v3/api/ceilingrates/?keyword=AI%20Engineer); [OrangeSlices](https://orangeslices.ai/doi-awards-70m-doi-ai-modernization-multiple-award-bpa/)
- Power Platform: Microsoft OneGov covers Power Platform and Copilot, statewide M365 exists in VA, DOI task orders had single bidders, and GSA has only 13 rates (thin market). — [GSA](https://www.gsa.gov/about-gsa/newsroom/news-releases/multibillion-dollar-gsa-onegov-agreement-with-microsoft-brings-steep-discounts-09022025); [GSA CALC API](https://api.gsa.gov/acquisition/calc/v3/api/ceilingrates/?keyword=Power%20Platform)
- Salesforce: big civilian award (VA $1.6B Agentforce), but its 2026 ceilings sit at parity with generic dev (median $140), it has more GSA vendors (50), and much of its 2026 momentum is DoD. — [Washington Technology](https://washingtontechnology.com/contracts/2026/07/va-awards-salesforce-16b-contract-veteran-care-and-services/414981/); [GSA CALC API](https://api.gsa.gov/acquisition/calc/v3/api/ceilingrates/?keyword=Salesforce)
- Full-stack/govtech: the most commoditized category (2,954 Software Developer rates, 847 vendors; Full Stack median $133). Digital-services work was hit by DOGE cuts and 18F's elimination. — [GSA CALC API](https://api.gsa.gov/acquisition/calc/v3/api/ceilingrates/?keyword=Full%20Stack); [FedScoop](https://fedscoop.com/radio/general-services-administration-eliminated-the-18f-program/)

### Inferences
- **1. ServiceNow:** best mix of rate premium, few competitors, cert-checkable differentiation, and confirmed demand in both federal civilian and DMV. ITSM is a horizontal need at every agency and survives budget cuts better than greenfield builds.
- **2. AI agent engineer (TypeScript):** highest ceilings and biggest policy tailwind. It is ranked second only because the category is unsettled and much AI spending flows through platforms. As a combination (AI engineer plus one platform, for example Now Assist or Copilot Studio agents), it would likely rank first.
- **3. Power Platform/Copilot Studio:** strong adoption tailwind from free or discounted Copilot and M365 ubiquity in VA/MD/DC, and small task sizes suit micro-firms. Lower rates and a thin GSA presence mean less pricing power, but entry is easy.
- **4. Salesforce:** real civilian demand (VA), but no rate premium on GSA and heavy competition from established Salesforce SIs. It is a decent bridge, not a differentiator.
- **5. Full-stack/govtech:** a portable foundation, but undifferentiated in proposals, and federal digital-services demand is shrinking. Its value comes as the base skill under tracks 1 to 4, not as a standalone bridge.
- Caveat: these rankings rest on ceiling rates, award anecdotes and policy direction, not on measured obligation trends. The USAspending gap (Q2) is the biggest uncertainty.

### Gaps
- No USAspending/FPDS time series by platform to quantify growth.
- 2031 conditions (OneGov expirations around 2026 to 2028, the CATS+ successor, Polaris resolution) are unknowable. The ranking assumes 2025–2026 trends persist.
