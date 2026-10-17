# References check

Independent re-check of all 18 entries in `references.md`, done 2026-10-17. Each field was compared against the primary record: the arXiv API (`export.arxiv.org/api/query`) for titles and author lists, the publisher or proceedings record for the venue, pages and DOI (ACL Anthology BibTeX, NeurIPS proceedings BibTeX, AAAI OJS, JMLR, the OpenReview API, and Crossref for DOI metadata), and the live page for software and documentation. "Use:" claims were checked against the abstract and, where the abstract was not enough, against the full text of the PDF.

No fabricated citations were found. All 18 works exist, and every title, URL and DOI resolves to the work cited.

## Summary table

| Ref | Status | Evidence fetched | Field differences / notes |
|---|---|---|---|
| [1] | VERIFIED | arXiv API 2306.05685; proceedings.neurips.cc …91f18a12…-Abstract-Datasets_and_Benchmarks.html and its BibTeX; Crossref 10.52202/075280-2020 | Title, all 13 authors, NeurIPS 36 D&B track, pp. 46595–46623 all match. The proceedings DOI 10.52202/075280-2020 exists but is not in the entry; leaving it out is not an error. |
| [2] | CORRECTED (fields added) | arXiv API 2404.13076; papers.nips.cc …7f1f0218…-Abstract-Conference.html and its BibTeX; Crossref 10.52202/079017-2197 | Title, 3 authors, NeurIPS 37 Main Conference Track match. Missing pages and DOI were added. Old: "…(NeurIPS 2024)*, 2024." New: "…(NeurIPS 2024)*, 2024, pp. 68772–68802, doi: 10.52202/079017-2197." The "oral" status in the Verified note was not confirmed; the proceedings page shows only "Main Conference Track". |
| [3] | VERIFIED | aclanthology.org/2023.emnlp-main.153/ and .bib; arXiv API 2303.16634 | Title, 6 authors, EMNLP 2023, Singapore, pp. 2511–2522, DOI all match. |
| [4] | VERIFIED | arXiv API 2310.06770; OpenReview API (forum VTF8yNQM66: "ICLR 2024 oral") | Title and 7 authors match; ICLR 2024 confirmed. |
| [5] | VERIFIED | arXiv API 2308.03688; OpenReview API (zAdUB0aCTQ: "ICLR 2024 poster") | Title matches. The first 10 listed authors match in order, and "et al." covers the other 12 of 22. ICLR 2024 confirmed. |
| [6] | VERIFIED | arXiv API 2210.03629; OpenReview API (WE_vluYUL-X: "ICLR 2023 notable top 5%") | Title, 7 authors, ICLR 2023 match. |
| [7] | VERIFIED | arXiv API 2305.18323; arXiv PDF (Fig. 1) | Title and 6 authors match. Correctly cited as an arXiv preprint. |
| [8] | VERIFIED | doi.org/10.1609/aaai.v36i1.19943 → ojs.aaai.org/index.php/AAAI/article/view/19943; Crossref; arXiv API 2101.11796 | Title, 4 authors, AAAI vol. 36 no. 1, pp. 634–642, 2022, DOI all match. |
| [9] | CORRECTED (authors) | aclanthology.org/2025.emnlp-main.728/, its .bib and the PDF first page; arXiv API 2501.03936 | Title, venue, Suzhou, pp. 14402–14418 and DOI match. **Author list was wrong for the EMNLP version cited.** Old: "H. Zheng, X. Guan, H. Kong, J. Zheng, W. Zhou, H. Lin, Y. Lu, B. He, X. Han, and L. Sun". New: "H. Zheng, X. Guan, H. Kong, W. Zhang, J. Zheng, W. Zhou, H. Lin, Y. Lu, X. Han, and L. Sun". The old list is the arXiv v3 list; the published EMNLP paper adds Wenkai Zhang and drops Ben He. |
| [10] | CORRECTED (field added) | arXiv API 2501.00912; Crossref 10.1109/CVPR52734.2025.00276 (resolves to IEEE Xplore 11093760) | Title, 11 authors, CVPR 2025, DOI match. Missing pages were added: pp. 2902–2911. |
| [11] | CORRECTED (fields added) | arXiv API 2311.05232; doi.org/10.1145/3703155 → dl.acm.org (403 to the fetcher, so used Crossref metadata for the same DOI); arXiv PDF §2 | Title, 11 authors, TOIS 2025, DOI match. Missing volume, issue and pages were added. Old: "*ACM Trans. Inf. Syst.*, 2025," New: "*ACM Trans. Inf. Syst.*, vol. 43, no. 2, pp. 1–55, 2025,". |
| [12] | VERIFIED | jmlr.org/papers/v23/21-0998.html; arXiv API 2101.03961 | Title, 3 authors, JMLR vol. 23, no. 120, pp. 1–39, 2022 match. |
| [13] | VERIFIED | github.com/ml-explore/mlx (README BibTeX) | Authors, title and year match the repository's own `@software{mlx2023}` entry. The BibTeX url is github.com/ml-explore; the entry's /mlx URL is the repository itself, which is fine. |
| [14] | VERIFIED | docs.ollama.com/api/anthropic-compatibility | Page title "Anthropic compatibility". It says "Ollama supports a subset of the Anthropic Messages API" and gives `ANTHROPIC_BASE_URL=http://localhost:11434`. Note: the page also lists streaming and tool calling as supported (tool_choice only partly), so the paper's "may affect local tool use and streaming" must stay a hedge. |
| [15] | VERIFIED | code.claude.com/docs/en/headless | H1 is "Run Claude Code programmatically". It documents `-p`/`--print`, `--output-format json`, `--json-schema` (`structured_output` field), and `total_cost_usd`, which it calls a "client-side estimate". |
| [16] | VERIFIED | anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills; code.claude.com/docs/en/skills | Title, date (Oct. 16, 2025) and authors (Barry Zhang, Keith Lazuka, Mahesh Murag) match. The definition (directory with SKILL.md, scripts and resources, progressive disclosure) matches. The companion page's H1 is "Extend Claude with skills". |
| [17] | VERIFIED (citation); claim overstated, see below | arXiv API 2406.10229; arXiv PDF §3, §4 and Table 7 | Title and 8 authors match. The "Use:" line says "Variance across seeds can be large enough to change model rankings". The paper's seed variance is **training** seed variance (initialisation and data order across pretraining runs), not variance between inference runs. The only ranking-flip result (Table 7, up to 12% of pairwise comparisons flip) compares IRT subsets with the full benchmark. The paper does support a general version of the claim: differences smaller than benchmark variance are not meaningful, and practitioners should factor variance into model comparisons. |
| [18] | VERIFIED | arXiv API 2408.04667; arXiv PDF §1, §3 | Title and 13 authors match. The paper sets temperature 0, top-p 1 and a fixed seed and still finds accuracy varying by up to 15% across runs, so the "Use:" claim is supported. |

Status counts: 13 VERIFIED, 5 CORRECTED ([2], [9], [10], [11] in `references.md`; [9] is the only error, and the other three gained missing fields), 0 NOT FOUND.

**Note for the paper.md auditor:** the reference list at the end of `paper.md` (lines ~292–326) copies `references.md`. The same changes are needed there, at minimum the [9] author list. `paper.md` was not edited.

## In-text uses in paper.md

| Line | Citation | Sentence (short) | Supported? |
|---|---|---|---|
| 18 | [16] | Agentic tools are guided by a packaged Agent Skill | Yes |
| 20 | [5] | Prior benchmarks report a gap between commercial and open-weight models in multi-turn tool use | Yes. AgentBench: "significant disparity… between [top commercial LLMs] and many OSS competitors that are no larger than 70B". Its environments are multi-round and include tool-style interfaces (OS, DB, KG). |
| 24 | [15], [14] | Harness runs Claude Code headless with local models through Ollama's Anthropic-compatible endpoint | Yes |
| 33 | [8] | DOC2PPT framed document-to-slide generation as a task | Yes ("We present a novel task and approach for document-to-slide generation") |
| 33 | [9] | PPTAgent edits reference slides and evaluates with an LLM-based rubric covering content, design, coherence | Yes. It edits selected reference slides; PPTEval "adopts the MLLM-as-a-judge paradigm" across Content, Design, Coherence. |
| 33 | [10] | AutoPresent generates slides as programs and benchmarks small open models against frontier models | Yes (8B Llama-based model vs GPT-4o on SlidesBench) |
| 35 | [6] | ReAct describes the interleaved reason–act–observe loop | Yes |
| 35 | [4] | SWE-bench evaluates agents on long, multi-step software tasks | Yes. Issues need coordinated changes across functions and files, long contexts, and interaction with execution environments. |
| 35 | [5] | AgentBench: API models lead open-weight models in agentic settings | Yes |
| 35 | [16] | Skills package instructions, scripts, resources, loaded on demand | Yes (progressive disclosure) |
| 37 | [1] | Strong LLM judges agree with humans; position, verbosity, self-enhancement biases | Yes (abstract, verbatim bias list) |
| 37 | [3] | G-Eval scores against explicit criteria; notes possible preference for LLM-written text | Yes (CoT + form-filling; "bias towards the LLM-generated texts") |
| 37 | [2] | LLM evaluators recognise and favour their own generations | Yes |
| 37 | [11] | Faithfulness and factual hallucination | Yes (taxonomy: factuality vs faithfulness hallucination) |
| 39 | [7] | ReWOO separates planner from workers; planning ability passed from large to smaller model | Yes (Planner/Worker/Solver; "offloads reasoning ability from 175B GPT3.5 into 7B LLaMA") |
| 41 | [12] | Sparse MoE activates a subset of parameters per token, lowering compute vs dense model of similar size | Yes |
| 41 | [13] | Models run in MLX format on Apple silicon | Yes |
| 41 | [14] | Ollama implements only a subset of the Anthropic Messages API | Yes (verbatim) |
| 53 | [14] | Claude Code pointed at Ollama's Anthropic-compatible endpoint | Yes |
| 78 | [15] | The CLI runs headless | Yes. The flags listed in the same sentence (`--setting-sources`, `--strict-mcp-config`, `--plugin-dir`) are not documented on this page; they belong to the CLI reference. The citation is attached to "runs headless", so this is fine. |
| 92 | [1], [3] | Blind judge "in the spirit of rubric-based LLM evaluation" | Yes for [3]. [1] supports it loosely: MT-Bench uses single-answer grading on a scale and pairwise comparison, not an explicit multi-criterion rubric. Acceptable. |
| 92 | [15] | Judge returns structured output | Yes (`--json-schema` → `structured_output`) |
| 94 | [15] | `total_cost_usd` is a client-side estimate | Yes |
| 98 | [18] | LLM outputs vary between runs even with fixed settings | Yes |
| 98 | [17] | "run-to-run variance can change rankings" | **Partly supported / overstated.** [17] measures training-seed variance, not variance between repeated inference runs. Its ranking flips come from IRT subsets, not reruns. Suggested wording: "and benchmark variance must be taken into account before score differences are treated as meaningful [17]". |
| 99 | [2], [1] | LLM judges can favour their own outputs | Yes ([2] self-preference; [1] self-enhancement bias) |
| 100 | [15] | Cloud costs are a client-side estimate | Yes |
| 104 | [14] | Partial API may affect local tool use and streaming | Supported as a hedge. The page confirms "subset" but lists streaming and tool calling as supported (tool_choice only partly). Keep "may". |
| 136 | [12] | Sparse 3B-active model expected to generate faster than dense 27B on same hardware | Mostly. [12] supports lower compute per token at constant cost. It does not discuss on-device decoding speed, which is mostly bound by memory bandwidth. "Fits the expectation" is a fair framing. |
| 195 | [14] | Stream failure may relate to Ollama's partial API support | Supported as a hedge (speculative; the paper says so) |
| 217 | [18] | Outputs vary between runs under fixed settings | Yes |
| 217 | [17] | "benchmark variance can be large enough to change model rankings" | **Partly supported / overstated** (same issue as line 98). Closer to the source than line 98 because it says "benchmark variance", but [17] does not show ranking changes from seed or run variance. |
| 225 | [17], [18] | Repeat runs; report means with confidence intervals | Yes. [17] recommends factoring variance into comparisons and uses 95% CIs; [18] measures repeated-run variation. |
| 227 | [1], [2] | Use a cross-family or several judges, or humans, and measure agreement | Yes. [1] measures judge–human agreement; [2] motivates avoiding a self-judge. |

### Unsupported or overstated uses

1. Line 98, [17]: "run-to-run variance can change rankings". [17] is about training-seed and benchmark variance, not repeated inference runs, and it does not show seed variance flipping rankings.
2. Line 217, [17]: "benchmark variance can be large enough to change model rankings". Same issue, milder.
3. The "Use:" line of [17] in `references.md` makes the same overstatement ("Variance across seeds can be large enough to change model rankings"). It was left unchanged for the authors to reword.

The other 33 in-text uses (table rows) are supported. Lines 104, 136 and 195 are supported only as hedged statements.
