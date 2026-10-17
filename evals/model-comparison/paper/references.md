# References

All entries checked on 2026-10-17. Bibliographic data for arXiv papers comes from the arXiv API (export.arxiv.org/api/query). Venue data comes from the official proceedings pages listed under each entry.

## LLM-as-a-judge and its biases

[1] L. Zheng, W.-L. Chiang, Y. Sheng, S. Zhuang, Z. Wu, Y. Zhuang, Z. Lin, Z. Li, D. Li, E. P. Xing, H. Zhang, J. E. Gonzalez, and I. Stoica, "Judging LLM-as-a-judge with MT-Bench and Chatbot Arena," in *Advances in Neural Information Processing Systems 36 (NeurIPS 2023), Datasets and Benchmarks Track*, 2023, pp. 46595–46623. [Online]. Available: https://arxiv.org/abs/2306.05685
- Use: We use an LLM as the judge. This paper shows that strong LLM judges agree well with human preferences, and it names the judge's biases (position, verbosity, self-enhancement) that our blind rubric is meant to reduce.
- Verified: arXiv API (2306.05685, 13 authors). The NeurIPS proceedings page (proceedings.neurips.cc, …91f18a1287b398d378ef22505bf41832-Abstract-Datasets_and_Benchmarks.html) gives pp. 46595–46623 and DOI 10.52202/075280-2020.

[2] A. Panickssery, S. R. Bowman, and S. Feng, "LLM evaluators recognize and favor their own generations," in *Advances in Neural Information Processing Systems 37 (NeurIPS 2024)*, 2024, pp. 68772–68802, doi: 10.52202/079017-2197. [Online]. Available: https://arxiv.org/abs/2404.13076
- Use: Supports the caveat about self-preference bias. A Claude judge may score Claude-written decks higher, which is why we blind the judge to the model name.
- Verified: arXiv API (2404.13076). Web search found the NeurIPS 2024 proceedings page (papers.nips.cc …7f1f0218e45f5414c79c0679633e47bc-Abstract-Conference.html), which lists it as a Main Conference Track oral.

[3] Y. Liu, D. Iter, Y. Xu, S. Wang, R. Xu, and C. Zhu, "G-Eval: NLG evaluation using GPT-4 with better human alignment," in *Proc. 2023 Conf. Empirical Methods in Natural Language Processing (EMNLP)*, Singapore, 2023, pp. 2511–2522, doi: 10.18653/v1/2023.emnlp-main.153.
- Use: Supports scoring with an LLM against a rubric of explicit criteria, which is how our judge prompt with structured output works. It also notes that LLM evaluators may favor LLM-generated text.
- Verified: Fetched https://aclanthology.org/2023.emnlp-main.153/ (title, authors, pages and DOI match). arXiv API (2303.16634).

## Agent benchmarks (tool use, coding agents)

[4] C. E. Jimenez, J. Yang, A. Wettig, S. Yao, K. Pei, O. Press, and K. Narasimhan, "SWE-bench: Can language models resolve real-world GitHub issues?" in *Proc. Int. Conf. Learning Representations (ICLR)*, 2024. [Online]. Available: https://arxiv.org/abs/2310.06770
- Use: Earlier work on evaluating coding agents on long, multi-step software tasks. It motivates our task-based (rather than single-prompt) evaluation of agentic models.
- Verified: arXiv API (2310.06770). The arXiv comment states "ICLR 2024, https://openreview.net/forum?id=VTF8yNQM66".

[5] X. Liu, H. Yu, H. Zhang, Y. Xu, X. Lei, H. Lai, Y. Gu, H. Ding, K. Men, K. Yang *et al.*, "AgentBench: Evaluating LLMs as agents," in *Proc. Int. Conf. Learning Representations (ICLR)*, 2024. [Online]. Available: https://arxiv.org/abs/2308.03688
- Use: Supports the claim that commercial API models are clearly ahead of open-weight models in agentic, multi-turn settings, which is the gap our cloud vs. local comparison measures.
- Verified: arXiv API (2308.03688, 22 authors; comment "Published in ICLR 2024").

## Reasoning/acting and planner/executor splits

[6] S. Yao, J. Zhao, D. Yu, N. Du, I. Shafran, K. Narasimhan, and Y. Cao, "ReAct: Synergizing reasoning and acting in language models," in *Proc. Int. Conf. Learning Representations (ICLR)*, 2023. [Online]. Available: https://arxiv.org/abs/2210.03629
- Use: Background on the interleaved reason–act–observe loop that Claude Code-style agents (and our runs) follow when they call tools.
- Verified: arXiv API (2210.03629, 7 authors; comment "v3 is the ICLR camera ready version").

[7] B. Xu, Z. Peng, B. Lei, S. Mukherjee, Y. Liu, and D. Xu, "ReWOO: Decoupling reasoning from observations for efficient augmented language models," arXiv preprint arXiv:2305.18323, 2023. [Online]. Available: https://arxiv.org/abs/2305.18323
- Use: Prior work for our planner/executor experiment. ReWOO separates a planner from workers and shows that planning ability can be passed from a large model to a much smaller one, as our Opus-plans / local-model-executes setup does.
- Verified: arXiv API (2305.18323; title and 6 authors match).

## Automatic slide/presentation generation

[8] T.-J. Fu, W. Y. Wang, D. McDuff, and Y. Song, "DOC2PPT: Automatic presentation slides generation from scientific documents," in *Proc. AAAI Conf. Artificial Intelligence*, vol. 36, no. 1, 2022, pp. 634–642, doi: 10.1609/aaai.v36i1.19943.
- Use: Defines document-to-slide generation as a task. This is earlier work on our setting (course module to lecture deck).
- Verified: arXiv API (2101.11796; comment "AAAI'22"). The official page https://ojs.aaai.org/index.php/AAAI/article/view/19943 was found by web search, and the search result gave the DOI and pages.

[9] H. Zheng, X. Guan, H. Kong, W. Zhang, J. Zheng, W. Zhou, H. Lin, Y. Lu, X. Han, and L. Sun, "PPTAgent: Generating and evaluating presentations beyond text-to-slides," in *Proc. 2025 Conf. Empirical Methods in Natural Language Processing (EMNLP)*, Suzhou, China, 2025, pp. 14402–14418, doi: 10.18653/v1/2025.emnlp-main.728.
- Use: Recent agentic slide generation work. Its PPTEval scores Content, Design and Coherence with an LLM judge, which is close to our rubric dimensions.
- Verified: arXiv API (2501.03936, 10 authors). Fetched https://aclanthology.org/2025.emnlp-main.728/ (title matches; pages 14402–14418).
- Corrected 2026-10-17: author list now follows the EMNLP version (ACL Anthology BibTeX and PDF first page): "W. Zhang" added after H. Kong, "B. He" removed. B. He appears only on the arXiv version.

[10] J. Ge, Z. Z. Wang, X. Zhou, Y.-H. Peng, S. Subramanian, Q. Tan, M. Sap, A. Suhr, D. Fried, G. Neubig, and T. Darrell, "AutoPresent: Designing structured visuals from scratch," in *Proc. IEEE/CVF Conf. Computer Vision and Pattern Recognition (CVPR)*, 2025, pp. 2902–2911, doi: 10.1109/CVPR52734.2025.00276. [Online]. Available: https://arxiv.org/abs/2501.00912
- Use: Generates slides as code (programs that render slides) and benchmarks them with SlidesBench. This is the closest prior work to our HTML-as-code decks and to comparing a small open model with a frontier model.
- Verified: arXiv API (2501.00912, 11 authors). Web search found the CVF open-access PDF (openaccess.thecvf.com/content/CVPR2025/…/Ge_AutoPresent_…_CVPR_2025_paper.pdf); the DOI comes from the mlanthology listing in the same search.

## Hallucination / factual consistency

[11] L. Huang, W. Yu, W. Ma, W. Zhong, Z. Feng, H. Wang, Q. Chen, W. Peng, X. Feng, B. Qin, and T. Liu, "A survey on hallucination in large language models: Principles, taxonomy, challenges, and open questions," *ACM Trans. Inf. Syst.*, vol. 43, no. 2, pp. 1–55, 2025, doi: 10.1145/3703155. [Online]. Available: https://arxiv.org/abs/2311.05232
- Use: Defines faithfulness to the source and factual hallucination. Our judge criterion "deck content is faithful to the course module" depends on these definitions.
- Verified: arXiv API (2311.05232, 11 authors; comment "Accepted by ACM Transactions on Information Systems (TOIS)"; DOI field 10.1145/3703155).

## Mixture-of-experts and on-device inference

[12] W. Fedus, B. Zoph, and N. Shazeer, "Switch Transformers: Scaling to trillion parameter models with simple and efficient sparsity," *J. Mach. Learn. Res.*, vol. 23, no. 120, pp. 1–39, 2022. [Online]. Available: https://jmlr.org/papers/v23/21-0998.html
- Use: Explains sparse MoE routing. Only a subset of parameters is active per token, which is why the 35B-total / 3B-active Qwen MoE runs much faster than the dense 27B model on the same laptop.
- Verified: Fetched https://jmlr.org/papers/v23/21-0998.html (vol. 23, no. 120, pp. 1–39, 2022). arXiv API (2101.03961).

[13] A. Hannun, J. Digani, A. Katharopoulos, and R. Collobert, "MLX: Efficient and flexible machine learning on Apple silicon," GitHub repository, 2023. [Online]. Available: https://github.com/ml-explore/mlx
- Use: The array framework that runs the local models on the M4 Max's unified memory.
- Verified: Fetched https://github.com/ml-explore/mlx; authors, title and year are from the BibTeX entry in the README.

[14] Ollama, "Anthropic compatibility," Ollama documentation. Accessed: Oct. 17, 2026. [Online]. Available: https://docs.ollama.com/api/anthropic-compatibility
- Use: Documents how Claude Code connects to local Ollama models (ANTHROPIC_BASE_URL=http://localhost:11434). Note that Ollama supports only "a subset of the Anthropic Messages API", which may limit local-model tool use.
- Verified: Fetched the URL (HTTP 200). The page names Claude Code as a client and gives the base-URL setup.

## Claude Code and Agent Skills

[15] Anthropic, "Run Claude Code programmatically," Claude Code documentation. Accessed: Oct. 17, 2026. [Online]. Available: https://code.claude.com/docs/en/headless
- Use: Describes headless runs with `claude -p` / `--print`, `--output-format json` (which reports `total_cost_usd`; the docs call it a client-side estimate) and `--json-schema` structured output. Our run harness, cost figures and structured judge output all rely on these.
- Verified: Fetched the URL (HTTP 200). The page title is now "Run Claude Code programmatically"; older versions called it "headless mode".

[16] B. Zhang, K. Lazuka, and M. Murag, "Equipping agents for the real world with Agent Skills," Anthropic Engineering Blog, Oct. 16, 2025. [Online]. Available: https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills
- Use: Defines Agent Skills (a folder with a SKILL.md plus scripts and resources, loaded by progressive disclosure). Our present-in-html skill follows this format. Companion docs: https://code.claude.com/docs/en/skills ("Extend Claude with skills"; fetched, HTTP 200).
- Verified: Fetched the URL; title, authors and date confirmed on the page.

## Run-to-run variance / single-run unreliability

[17] L. Madaan, A. K. Singh, R. Schaeffer, A. Poulton, S. Koyejo, P. Stenetorp, S. Narang, and D. Hupkes, "Quantifying variance in evaluation benchmarks," arXiv preprint arXiv:2406.10229, 2024. [Online]. Available: https://arxiv.org/abs/2406.10229
- Use: Supports our disclaimer that results from one run per model per task are not statistically robust. Variance across seeds can be large enough to change model rankings.
- Verified: arXiv API (2406.10229, 8 authors).

[18] B. Atil, S. Aykent, A. Chittams, L. Fu, R. J. Passonneau, E. Radcliffe, G. R. Rajagopal, A. Sloan, T. Tudrej, F. Ture, Z. Wu, L. Xu, and B. Baldwin, "Non-determinism of 'deterministic' LLM settings," arXiv preprint arXiv:2408.04667, 2024. [Online]. Available: https://arxiv.org/abs/2408.04667
- Use: Shows that LLM outputs vary across runs with the same input even at temperature 0. A single run of an agent can therefore over- or under-state a model's typical quality and time.
- Verified: arXiv API (2408.04667, 13 authors; title as given).

[19] Apple, "Mac Studio (2025) - Tech Specs," Apple Support. Accessed: Oct. 17, 2026. [Online]. Available: https://support.apple.com/en-us/122211
- Use: Official specifications of the test machine (Mac Studio, Apple M4 Max, 16-core CPU, 40-core GPU, up to 64 GB and 1 TB options); measured details are in Appendix A.
- Verified: page fetched; lists the M4 Max with 16-core CPU and 40-core GPU. The 12+4 core split comes from system_profiler, not this page.
