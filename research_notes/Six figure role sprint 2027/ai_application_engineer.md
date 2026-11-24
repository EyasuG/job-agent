# AI Application / Agent Engineer (TypeScript/JavaScript track): market fact base for a mid-level JS full-stack engineer

Research date: 2026-11-16. Scope: US, non-clearance, DMV first, then US-remote and national. Snapshot counts are same-day (2026-11-16) and were taken through LinkedIn's public guest job search. Dice (domain blocked for the fetch tool), Indeed (HTTP 403) and Wellfound could not be retrieved programmatically. Built In returned a near-empty page. Those boards are listed as gaps.

## Q1. How many current US postings (non-clearance) match AI engineer / LLM engineer / agent engineer with TypeScript/Node, nationally, US-remote and in the DMV?

### Takeaway
LinkedIn's headline counts are large: 11,000+ for `"AI Engineer" TypeScript` across the US and 6,000+ in the Washington DC-Baltimore Area. Those numbers are badly inflated. LinkedIn's guest search matches loosely, and one employer (FullStack) posted the same "Forward Deployed Engineer (TypeScript + AI)" role once per state. The genuinely TS-centric AI-application roles visible are probably in the hundreds to low thousands nationally, not 11,000. In the DMV, about a third of visible generic "AI Engineer" postings come from defense or intelligence primes.

### Cited Findings
**Snapshot counts (2026-11-16, LinkedIn guest search, past-30-days or past-7-days filter)**
- Query `keywords="AI Engineer" TypeScript`, `location=United States`, `f_TPR=r604800` (past week). Header: "11,000+ Ai Engineer Typescript Jobs in United States". Of the 60 visible cards, about 35 were the same FullStack posting, "Forward Deployed Engineer (TypeScript + AI) - Remote - USA", repeated under different state capitals. Other titles included Riot Games (Staff SWE, Enterprise AI), 11x (Forward Deployed Engineer; Software Engineer, Agents, both remote-US), Distru (Senior/Staff AI Product Engineer, remote), Sift (Software Engineer, Frontend (Agentic AI)), Vercel (Forward-Deployed Engineer, SF), Raft (Software Engineer, AI Focus), Deloitte (Agentic Data Engineering Developer), Stord (Staff SWE, AI) and Eloquent AI (Senior Full-Stack). — [LinkedIn search URL](https://www.linkedin.com/jobs/search?keywords=%22AI%20Engineer%22%20TypeScript&location=United%20States&f_TPR=r604800)
- The same query with `f_WT=2` (remote) and `f_TPR=r2592000` (past month) returned the identical "11,000+" header and identical first 30 cards. The guest view ignores the remote filter, so there is no clean US-remote count. — [LinkedIn search URL](https://www.linkedin.com/jobs/search?keywords=%22AI%20Engineer%22%20TypeScript&location=United%20States&f_WT=2&f_TPR=r2592000)
- The same query with `f_E=3` (experience-level filter) also returned "11,000+", so guest view ignores that filter too. — [LinkedIn search URL](https://www.linkedin.com/jobs/search?keywords=%22AI%20Engineer%22%20TypeScript&location=United%20States&f_TPR=r2592000&f_E=3)
- DMV query `keywords="AI Engineer" TypeScript`, `location=Washington DC-Baltimore Area`, `f_TPR=r2592000`. Header: "6,000+ Ai Engineer Typescript Jobs in Washington DC-Baltimore Area".
  - 25 of the 60 visible cards were AWS (Sr.) Forward Deployed Engineer roles, several labeled "US Government" (Arlington/Herndon VA, Jessup MD).
  - EY had 8 (AI Advanced Forward Engineering; GenAI Developer, Government & Infrastructure). Deloitte had 5, including "Software Engineer III - Full-stack Developer with Anthropic Experience" (McLean) and "Senior Anthropic Forward Deployed Engineer - GPS".
  - Kaizen had 4 in DC, 2 of them explicitly TS/SCI.
  - Non-government options included X-energy (Rockville), Xometry (N. Bethesda), Capital One ("Full Stack Engineer 5 - ... AI Automation", McLean), Charles River Associates ("Full Stack Agentic Developer", DC), Brivo (Bethesda), ID.me (McLean), Fantom ("Full Stack Software Engineer, AI", Chantilly), Global Dimensions ("Mid-Level AI Engineer", DC) and TribalScale (Forward Deployed Engineer, DC).
  - Only 2 of 60 explicitly said clearance in the title. — [LinkedIn search URL](https://www.linkedin.com/jobs/search?keywords=%22AI%20Engineer%22%20TypeScript&location=Washington%20DC-Baltimore%20Area&f_TPR=r2592000)
- DMV generic query `keywords="AI Engineer"`, `location=Washington DC-Baltimore Area`, `f_TPR=r2592000`. Header: "7,000+ Ai Engineer Jobs in Washington DC-Baltimore Area".
  - 20 to 22 of the 60 visible cards (33 to 37%) were defense/IC primes or explicit clearance roles: Booz Allen 8, Lockheed 6, Leidos 3, SAIC 2, one "US Security Clearance" title (webAI), plus Parsons and Noblis.
  - Capital One had about 18 (AI Engineer 3/4/5, AI Foundations, LLM Core, Agentic AI). Deloitte Federal Health / State & Local "Generative AI Engineer II", "Agentic AI Engineer, Healthcare AI" and Navy Federal Credit Union "AI Engineer (Agentic AI)" also appeared.
  - There was one "AI Engineer, Entry Level" (Centennial Technologies) and one "AI/ML Engineer, Mid" (Booz Allen). — [LinkedIn search URL](https://www.linkedin.com/jobs/search?keywords=%22AI%20Engineer%22&location=Washington%20DC-Baltimore%20Area&f_TPR=r2592000)
- Built In remote search `builtin.com/jobs/remote/dev-engineering/search/ai-engineer-typescript` returned a single listing: G2i, "TypeScript Senior Software Engineer, AI Training", remote USA, $100 to $200/hr contract. This is a "train the model" contract role, not product engineering. — [Built In](https://builtin.com/jobs/remote/dev-engineering/search/ai-engineer-typescript)

**Third-party national volume context**
- Broadbean reports AI/ML engineer was the top AI-related title in Q1 2026, with 19,297 US vacancies, up about 94.5% from Q1 2025. This is a vendor source. — [Broadbean](https://www.broadbean.com/resources/blog/recruitment/the-state-of-ai-recruitment-in-2026-us-salaries-job-titles-and-year-on-year-growth/)
- Lightcast counts 86,000+ postings mentioning agentic-AI skills in 2025 ("nearly 90,000" by skill count), with skill mentions up more than 280% year over year. Published 2026-07-08. — [Lightcast](https://lightcast.io/blog/tracking-the-agentic-ai-explosion-in-jobs)

### Inferences
- The FullStack per-state duplication alone accounts for more than half of the first page nationally. Treat LinkedIn "11,000+" as an upper bound on keyword hits, not distinct TS-AI roles.
- The "AI Engineer + TypeScript" DMV page has a low explicit-clearance share (about 3% of visible titles). Many AWS "US Government" FDE roles likely need clearance or a public-trust investigation that the title doesn't state. A reasonable working estimate is that 30 to 40% of DMV generic "AI Engineer" postings are clearance-gated or prime-contractor roles, and 10 to 25% of the TS-filtered set are.
- "Forward Deployed Engineer" has become the dominant title carrying TypeScript + AI in late 2026 (FullStack, 11x, Vercel, AWS, Deloitte, EY, TribalScale). Search it alongside "AI engineer".

### Gaps
- No reproducible Dice, Indeed, Wellfound or Glassdoor counts: those boards were blocked or returned 403 to automated fetch. Repeat manually in a browser with the same strings (`"AI engineer" typescript`, `"LLM engineer"`, `"agent engineer"`, `"AI application engineer"`, each with `-clearance -"TS/SCI" -secret`).
- No clean US-remote LinkedIn count, because guest view ignores the `f_WT` filter. A logged-in session is required.
- I ran no separate counts for "LLM engineer", "AI application engineer" or "agent engineer" (tool-call budget). Those titles are expected to be far smaller than "AI engineer".

## Q2. What do these postings require of mid-level candidates? Is "full-stack + AI" (product engineer) more accessible than pure "AI engineer"?

### Takeaway
TS-centric AI postings ask for strong TypeScript/React plus Node backend skills, LLM SDK usage (Vercel AI SDK, OpenAI/Anthropic SDKs), tool calling/streaming chat UX, and above all evals. LangChain/LangGraph show up as "frameworks we use", rarely as requirements. Generic "AI Engineer" titles, especially in the DMV (Capital One, Booz Allen, Lockheed), lean Python/ML. The "full-stack/product engineer building AI features" variant is the better fit for a JS engineer.

### Cited Findings
- Vercel "Software Engineer, AI SDK" asks for strong proficiency in JavaScript/TypeScript and modern frontend tooling, plus open-source contributions. Posted pay is $192K to $294K depending on listing. Experience asks run 3+ to 5+ years. — [Vercel careers](https://vercel.com/careers/software-engineer-ai-sdk-5474915004)
- A Durable "AI Engineer" posting wants deep TypeScript and React fluency plus backend ownership. Another posting asks for Vercel AI SDK (Core + UI) experience for streaming, tool calling and chat UX. — [Gravityer: AI Engineer, Durable](https://www.gravityer.com/jobs/ai-engineer-durable)
- Evals are the most consistent "AI engineer" signal: designing and improving AI behavior with evals, metrics and user feedback, and building or owning an eval harness. MCP appears as "tool interfaces / MCP-style capability layers". StackBlitz lists Vercel AI SDK and LangGraph among frameworks to evaluate. No posting found lists LangChain.js as a hard requirement. — [StackBlitz Senior Applied AI Engineer (hotfix.jobs)](https://hotfix.jobs/jobs/senior-applied-ai-engineer-at-stackblitz-faaece1a-5d37-4330-9845-c9c5ae6d7d94); [relanto posting](https://relanto.keka.com/careers/jobdetails/129188)
- Product-engineer-style titles appear in the 2026-11-16 snapshot:
  - "Senior AI Product Engineer | REMOTE" (Distru)
  - "Software Engineer, Frontend (Agentic AI)" (Sift)
  - "Full Stack AI Engineer" (raphie)
  - "Software Engineer III - Full-stack Developer with Anthropic Experience" (Deloitte, McLean)
  - "Full Stack Agentic Developer" (Charles River Associates, DC)
  - "Full Stack Engineer 5 - AI Automation" (Capital One)
  - [LinkedIn US](https://www.linkedin.com/jobs/search?keywords=%22AI%20Engineer%22%20TypeScript&location=United%20States&f_TPR=r604800); [LinkedIn DMV](https://www.linkedin.com/jobs/search?keywords=%22AI%20Engineer%22%20TypeScript&location=Washington%20DC-Baltimore%20Area&f_TPR=r2592000)
- Python use rose 7 percentage points from 2024 to 2025 in the Stack Overflow survey, while JavaScript remains the most-used language. — [Stack Overflow 2025 survey](https://survey.stackoverflow.co/2025/)
- Lightcast: in Q1 2026, AI occupations were only 0.3% of postings and 7% of "AI adoption". The other 93% came from existing occupations (e.g., software developers) adding AI skills. — [Lightcast](https://lightcast.io/blog/tracking-the-agentic-ai-explosion-in-jobs)

### Inferences
- The Lightcast 93% figure strongly supports the "software/full-stack engineer + AI skills" route over chasing the narrow "AI Engineer" title.
- Many visible TS-AI postings are Senior/Staff. The mid-level entry point is more likely titles like "Software Engineer (AI focus)", "Full Stack Engineer – AI", "Forward Deployed Engineer" and "AI Product Engineer".
- DMV "AI Engineer N" roles at Capital One and the primes skew Python/ML. A JS candidate should filter for TypeScript/React in the description.

### Gaps
- I did not systematically code a sample of postings for years of experience or Python-vs-TS share. Only individual postings were inspected.
- No source quantified the share of AI-engineer postings requiring Python vs. accepting TypeScript.

## Q3. Mid-level pay: national and DMV. Is $100K+ realistic?

### Takeaway
Yes. Every source puts mid-level AI/LLM engineering pay well above $100K. Base for mid-level is roughly $130K to $200K nationally, and DMV aggregators show a median around $217K to $219K total for "AI Engineer". The $100K floor is clearly met even for "junior" AI titles and for software developers adding AI skills.

### Cited Findings
- Lightcast puts the median posted salary at $153,000 for agentic-AI postings, $141,000 for all AI postings and $125,000 for IT postings generally (2026-07). — [Lightcast](https://lightcast.io/blog/tracking-the-agentic-ai-explosion-in-jobs)
- Lightcast "Beyond the Buzz" (July 2025, older) found postings with AI skills pay 28% (about $18K) more. — [finanzen.net press release](https://www.finanzen.net/nachricht/aktien/new-lightcast-report-ai-skills-command-28-salary-premium-as-demand-shifts-beyond-tech-industry-14650396)
- Robert Half, as cited by an aggregator, gives an AI/ML engineer base of $134,000 to $193,250. Mid-level (3 to 5 years) guides show $140K to $200K base and $180K to $260K total comp. These are secondary sources. — [Kore1 salary guide](https://www.kore1.com/ai-engineer-salary-guide/); [HeroHunt comp bands](https://www.herohunt.ai/blog/ai-engineer-salary-2026-real-comp-bands-by-level/)
- A TypeScript-specific agentic-engineering job tracker reports mid-level $161,952 to $251,606 across 70 USD listings (updated April 2026). The sample is small and the tracker is niche. — [agentic-engineering-jobs.com](https://agentic-engineering-jobs.com/agentic-engineer-salaries/typescript)
- Levels.fyi figures are only available via aggregators and conflict: a $211K median versus $293K average TC for "AI engineer" (9,500+ profiles). Total comp includes equity, so it runs higher than base. — [Interview Kickstart](https://interviewkickstart.com/blogs/articles/ai-engineer-salary)
- DMV (Orbyt aggregator, 2026): AI Engineer median $219K (P25 $163K, P75 $288K), described as 25% above national. Junior AI Engineer median is $165K. Methodology is undisclosed and the site's own pages vary ($217K vs. $219K). — [Orbyt DC AI engineer](https://www.orbytjobs.ai/salary/ai-engineer/washington-dc); [Orbyt junior](https://www.orbytjobs.ai/salaries/junior-ai-engineer/washington-dc)
- US Tech Force (OPM) fellowships pay $150K to $200K at mostly GS-13/14 per Fortune. Other reports say $130K to $195K. — [Fortune](https://fortune.com/2025/12/16/trump-tech-force-fellow-salary-range-experience-skills-requirement-companies-partners/)

### Inferences
- $100K+ is realistic at mid level. The binding constraint is getting hired, not the pay level. Even the P25 DMV figure (about $163K) and Lightcast's all-IT median ($125K) clear $100K.
- Aggregator figures likely skew toward big tech and senior roles. Government contractors and mid-size DMV firms will likely post lower, around $110K to $150K. This is an inference and is unverified.

### Gaps
- No direct Glassdoor or Levels.fyi pull filtered to mid-level and the DMV. Those sites were not reached directly.
- No count of DMV postings with posted salary ranges (Maryland and DC pay-transparency laws make this feasible manually).

## Q4. Hireability: time-to-hire, competition, portfolio evidence, and what gap closes in 6 to 8 weeks

### Takeaway
Hiring data is thin and mostly vendor-sourced. Mid-level AI roles reportedly fill in about 25 to 45 days, but engineering application-to-hire rates are very low (about 0.2%). Employers weight shipped, deployed AI work over credentials. A JS engineer can plausibly close the "applied LLM" gap in 6 to 8 weeks: SDK tool calling, RAG, an MCP server, and an eval harness. The ML/Python-depth gap for generic "AI Engineer" roles does not close that fast.

### Cited Findings
- A staffing firm reports mid-level AI roles fill in 25 to 45 days, while senior production-LLM/RAG roles take a 90 to 120 day median. Another recruiter cites a 29-day average versus a 49-day industry average. These are vendor sources with an incentive to portray a tight market. — [Axial Search](https://axialsearch.com/insights/ai-engineering-jobs); [Recruiting from Scratch](https://www.recruitingfromscratch.com/blog/how-to-hire-a-ai-engineer-what-actually-works-in-2026)
- Gem's 2026 report gives an engineering application-to-hire rate of 0.2% (versus 0.5% across all functions) and about 35 to 36 interviews per engineering hire. It does not isolate AI roles. — [Gem 2026 report](https://www.gem.com/resource/tech-hiring-guide)
- Recruiter guidance: deployed work beats credentials. Recruiters source from GitHub and Hugging Face. Senior AI roles reportedly get 40% fewer qualified applicants than comparable senior SWE roles, though many applicants lack applied-AI experience. — [futureproofing.dev](https://www.futureproofing.dev/resources/ai-talent-gap/ai-engineer-talent-shortage-2026-stats); [Qureos](https://www.qureos.com/hiring-guide/hire-ai-engineers-in-a-competitive-market)
- Indeed Hiring Lab (April 2026): job-seeker searches for AI roles have grown about 11x since ChatGPT's release, and demand for AI skills outpaces candidate interest per secondary coverage. This signals rising competition. — [Hiring Lab](https://www.hiringlab.org/2026/04/28/job-seeker-searches-for-ai-roles-have-grown/); [PropertyCasualty360](https://www.propertycasualty360.com/amp/2026/05/04/hiring-demand-for-ai-skills-outpaces-candidate-interest/)
- Evals, Vercel AI SDK tool calling/streaming and MCP capability layers are the recurring concrete asks (see Q2). — [Vercel careers](https://vercel.com/careers/software-engineer-ai-sdk-5474915004)

### Inferences
- With a 0.2% application-to-hire rate, about 500 cold applications per hire is implied. Referrals, recruiter outreach and targeted applications are necessary to hit an April 2027 deadline. At 25 to 45 days per process, the pipeline needs to be active by about February 2027.
- A 6 to 8 week closable portfolio set: (1) a deployed TS app with Vercel AI SDK or Anthropic/OpenAI SDK, streaming and tool calling; (2) RAG over real documents with a vector store (pgvector, for example); (3) a published MCP server; (4) an eval harness with tracked metrics in CI; (5) a write-up with cost and latency numbers. The user's existing job-agent project (LLM tailoring with a keyword-coverage score, multi-provider fallback) already maps to items 1 and 4. Adding formal evals and an MCP endpoint would strengthen it.

### Gaps
- No primary data on success rates of full-stack-to-AI transitions, or on applicant volume per TS-AI posting. LinkedIn "applicants" counts require login.

## Q5. Outlook to 2031: demand trends, AI-coding automation risk, offshore pressure

### Takeaway
Demand for AI-skilled engineering is growing fast from a small base, and software development postings recovered in 2026. Growth is concentrated in senior roles and existing occupations adding AI. BLS still projects software developers growing about 15% from 2024 to 2034. The automation risk is real for routine coding. Integration, evals and forward-deployed/customer-facing work look more durable, but no source quantifies risk specifically for this role.

### Cited Findings
- Indeed Hiring Lab: the share of US postings mentioning AI hit 4.2% at the end of 2025 (AI Tracker). Total US postings were only about 6% above the pre-pandemic baseline. — [Hiring Lab, Jan 2026](https://www.hiringlab.org/2026/01/22/january-labor-market-update-jobs-mentioning-ai-are-growing-amid-broader-hiring-weakness)
- A secondary summary of a July 2026 Hiring Lab analysis says software development postings were about 15% above February 2025 while overall postings fell about 7%. It says 71% of gains were in senior roles and 37% in AI-titled postings. This is unverified against the primary source. — [FourWeekMBA summary](https://fourweekmba.com/ai-indeed-claude-code-developer-jobs-recovery/)
- Hiring Lab data cited secondarily: AI/ML engineer demand is up 334% since the start of 2020. — [HeroHunt summary](https://www.herohunt.ai/blog/fastest-growing-ai-roles-2026-data-and-rankings)
- Lightcast / Stanford AI Index 2026: AI skills appear in 2.5% of US postings, up 55% year over year. Agentic-AI mentions within AI postings went from 0.69% to 18.9% in one year (via KDnuggets). Fortune 1000 firms hold about 30% of agentic postings. — [Lightcast blog](https://lightcast.io/resources/blog/stanford-ai-2026); [KDnuggets](https://kdnuggets.com/the-ai-skills-that-actually-show-up-in-job-postings-right-now)
- BLS 2024-34 projections (released 2025-08-28): computer and math occupations get strong growth fueled by AI adoption, and data scientists grow +33.5%. Software developers grow about 15 to 16% with about 115K openings per year, per secondary sources; check the OOH directly. BLS states that AI's 10-year labor impact cannot be predicted precisely. — [BLS TED 2026](https://www.bls.gov/opub/ted/2026/artificial-intelligence-information-technology-and-employment-2024-34.htm); [BLS MLR on AI impacts](https://www.bls.gov/opub/mlr/2025/article/incorporating-ai-impacts-in-bls-employment-projections.htm)
- Stack Overflow 2025 survey: 14.1% of developers use AI agents at work daily and 9% weekly. 69% of agent users report higher productivity, but only 38% report better code quality. — [Stack Overflow 2025](https://survey.stackoverflow.co/2025/)

### Inferences
- Through 2031 the AI-application layer (integrating models into products, evals, guardrails, MCP/tool integration, customer deployment) looks more durable than generic CRUD full-stack work. Coding agents reduce implementation time, but someone still has to own behavior, quality and integration. The quality gap (38%) supports demand for eval and reliability skills.
- The tilt toward senior roles is the main risk for a mid-level candidate. Entry and mid-level openings are growing slower than senior ones.
- Offshore pressure: not directly sourced (see Gaps). Forward-deployed and government-adjacent work (US-person, onsite or hybrid in the DMV) is structurally less offshorable. This is an inference.

### Gaps
- No primary CompTIA Tech Jobs Report or LinkedIn Economic Graph figure retrieved for 2026.
- No quantitative source on offshoring of AI-application engineering roles.
- No source quantifying AI-coding-agent displacement risk specifically for AI application engineers.

## Q6. Federal-civilian and state/local demand for AI application engineers without clearance

### Takeaway
Federal AI use is expanding (3,611 inventoried use cases in 2025, up from about 2,100 in 2024), but in-house digital-service capacity was cut in 2025 (18F eliminated). Hiring channels are now OPM's US Tech Force fellowships ($150K to $200K, no degree required) and contractors/consultancies. Deloitte Federal Health / State & Local, EY Government & Infrastructure and AWS US Government all showed in today's DMV snapshot, often without stated clearance.

### Cited Findings
- 2025 Federal AI Use Case Inventory: 3,611 use cases across 56 submitting agencies (Brookings counts 41 agencies). The 2024 baseline is either 2,133 (CDT) or 1,757 (GGF), and sources conflict. HHS had 447, NASA 425, VA 367, DOE 340 and DOJ 314. 445 (12.3%) are high-impact. OMB added a category for commercial AI tools, which inflates growth. — [Nextgov](https://www.nextgov.com/artificial-intelligence/2026/04/agencies-report-over-3000-ai-use-cases-2025/412898/); [OMB GitHub inventory](https://github.com/ombegov/2025-Federal-Agency-AI-Use-Case-Inventory); [Brookings](https://www.brookings.edu/articles/assessing-the-state-of-ai-adoption-across-the-federal-government/)
- GSA eliminated 18F in March 2025. USDS was converted to DOGE. A GSA memo called for ending contracts with top consulting firms (Deloitte, Accenture Federal, GDIT, Booz Allen, Leidos, Guidehouse, SAIC, CGI Federal, IBM and others). By September 2025 the acting USDS administrator said "we need to hire" tech talent. — [Nextgov](https://www.nextgov.com/people/2025/03/gsa-eliminates-18f/403400/); [Maryland Matters](https://marylandmatters.org/2025/09/04/after-federal-workforce-cuts-doge-chief-says-we-need-to-hire/)
- OPM's US Tech Force (announced 2025-12-15) targets up to 1,000 fellows in AI, software, data and cyber for 1 to 2 year terms, mostly at GS-13/14 paying $150K to $200K. No degree or minimum experience is required. There are 29 private partners (AWS, Microsoft, Nvidia, OpenAI and others), and the first cohort was targeted for about March 2026. — [Fortune](https://fortune.com/2025/12/16/trump-tech-force-fellow-salary-range-experience-skills-requirement-companies-partners/); [CNN via ABC17](https://abc17news.com/money/cnn-business-consumer/2025/12/15/us-government-launches-tech-force-to-hire-ai-talent/)
- DMV snapshot (2026-11-16) government-adjacent AI roles with no clearance in the title:
  - Deloitte "Generative AI Engineer II, Federal Health & State & Local"
  - Deloitte "Agentic AI Engineer, Healthcare AI"
  - EY "Government and Infrastructure - AI & Data GenAI Developer"
  - AWS "Forward Deployed Engineer ... US Government"
  - REI Systems "AI/ML & LLM Engineer"
  - Noblis "Artificial Intelligence Engineer (Multiple Levels)"
  - [LinkedIn DMV](https://www.linkedin.com/jobs/search?keywords=%22AI%20Engineer%22&location=Washington%20DC-Baltimore%20Area&f_TPR=r2592000)

### Inferences
- Civilian-agency AI work (HHS, VA, NASA, DOE) is mostly reached through contractors and consultancies. Those roles often require public-trust background checks, not clearances. That is feasible for a US-authorized, non-cleared candidate, but onboarding can add weeks.
- The 2025 contractor-cut memo and 18F's elimination add volatility. The Big-4/consultancy federal AI practices were still posting heavily in the DMV as of today's snapshot.
- US Tech Force is a non-clearance, $150K+ federal path that fits the April 2027 window if a 2027 cohort opens. Its current status is unverified.

### Gaps
- Current (late-2026) status of US Tech Force cohorts and application windows not found.
- No data found on state/local (MD, VA, DC) government AI engineering hiring volumes.
- Text of OMB M-25-21/M-25-22 (April 2025 AI use and acquisition memos) was not retrieved. The workforce implications are unsourced here.
- No count of DMV postings requiring public trust vs. clearance.
