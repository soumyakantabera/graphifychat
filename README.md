<div align="center">

# 🧠 graphifychat

**Turn any conversation into a portable knowledge graph.**  
Captures what you said, what the AI produced, how you felt, and who you psychologically are —  
compressed into a single `.md` file any LLM can read cold.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Format: Markdown](https://img.shields.io/badge/Format-Markdown-blue.svg)]()
[![Works with: Claude · ChatGPT · Gemini · Any LLM](https://img.shields.io/badge/Works%20with-Claude%20·%20ChatGPT%20·%20Gemini%20·%20Any%20LLM-purple.svg)]()
[![Compression: 88%](https://img.shields.io/badge/Compression-88%25%20token%20savings-orange.svg)]()
[![Psychology: 18 archetypes](https://img.shields.io/badge/Psychology-18%20archetypes-red.svg)]()

</div>

---

## 💸 Why this exists — the long-chat token problem

Every message in a long conversation re-sends the **entire history** as input tokens.  
That cost compounds fast. graphifychat compresses your full conversation into a tiny memory file — paste it into a fresh chat and resume instantly at a fraction of the cost.

**Real numbers — Claude Sonnet 4.6 · $3 / MTok input**

| Conversation length | Full context tokens | graphifychat tokens | Tokens saved | Cost/msg (full) | Cost/msg (GC) | Savings |
|---|---|---|---|---|---|---|
| 5 turns | 4,150 | 500 | 3,650 | $0.0125 | $0.0015 | **88%** |
| 10 turns | 8,300 | 1,000 | 7,300 | $0.0249 | $0.0030 | **88%** |
| 20 turns | 16,600 | 2,000 | 14,600 | $0.0498 | $0.0060 | **88%** |
| 50 turns | 41,500 | 5,000 | 36,500 | $0.1245 | $0.0150 | **88%** |
| 100 turns | 83,000 | 10,000 | 73,000 | $0.2490 | $0.0300 | **88%** |
| 200 turns | 166,000 | 20,000 | 146,000 | $0.4980 | $0.0600 | **88%** |

> **88% input token reduction** on every resumed session, at any length.  
> A 200-turn project costs **$0.498/message** to resume with full context vs **$0.060** with graphifychat.  
> Over 20 resumed messages: **~$8.76 saved** — on a single project.

---

## 📊 What graphifychat actually captures

Verified on a real 18-turn session — [building this very skill](examples/graphifychat-own-session.md):

| Category | Captured |
|---|---|
| Turns tracked | 18 full turns (user input + AI output, all 17 fields) |
| Sparse6 layers | 8 layers — turns · concepts · emotions · files · entities · characters · communities · hyperedges |
| Emotion data points | 54 (top 3 per turn × 18, with intensity scores 1–5) |
| Character archetypes | 3 detected: `visionary` · `perfectionistic` · `opportunistic` |
| Archetype shift events | 4 `CHARSHIFT` arcs tracked |
| God nodes | 3: `tron_block` · `sparse6_block` · `graphifychat` |
| Topic communities | 5 Leiden-style clusters |
| Hyperedges | 4 multi-turn patterns beyond pairwise edges |
| Decision anchors | 5 `[DEC]` turns where direction was locked |
| Open threads | 0 — RES score: **10 / 10** |
| Files tracked | 13 files with full provenance chains |
| **Memory file size** | **13.2 KB · ~3,400 tokens** |
| Full chat size (est.) | ~14,900 tokens |
| **Compression ratio** | **4.4× smaller than the original conversation** |

---

## The problem

Every long conversation is a knowledge graph you lose when you close the tab.  
Switching AI tools means starting over.  
No standard way to carry memory, context, decisions, or emotional state across sessions.

**graphifychat solves all of this** — in one `.md` file, paste-portable into any AI.

---

## How it works

Three passes. One file. Updated on every call.

```
┌──────────────────────────────────────────────────────────────────┐
│  TRON  — structural pass, every turn                             │
│  user asked · AI produced · files · emotions ·                   │
│  character archetypes · intent · thread · confidence flags       │
├──────────────────────────────────────────────────────────────────┤
│  Sparse6  — relational graph pass, every turn                    │
│  8 layers: turns · concepts · emotions · files ·                 │
│  entities · characters · communities · hyperedges                │
│  every edge tagged EXTRACTED/INFERRED/AMBIGUOUS + score 0–1      │
├──────────────────────────────────────────────────────────────────┤
│  GRAPH_REPORT  — on-demand summary                               │
│  god nodes · emotional arc · character profile · 4-5 bullets     │
│  auto turns 1–3, then only when you ask for it                   │
└──────────────────────────────────────────────────────────────────┘
```

| Section | Updated | Token cost |
|---|---|---|
| **TRON** | Every call | ~50 tokens / turn |
| **Sparse6** | Every call | ~40 tokens / turn |
| **GRAPH_REPORT** | Auto T1–T3, then on-demand | 0 unless requested |

---

## Quick start

### 1. Install
Add [`SKILL.md`](SKILL.md) to your Claude skill library, or paste its contents as a system prompt.

### 2. Call it

**At the start — always-on (Mode A):**
```
/graphifychat
```
TRON + Sparse6 update every turn automatically. GRAPH_REPORT auto turns 1–3, then on demand.

**Mid-conversation — snapshot (Mode B):**
```
/graphifychat
```
Generates the full file for all turns so far. Only updates again when you call it again.

### 3. Resume anywhere
```
Here is my session memory. Please resume from this context:
[paste .md file]
```
Any LLM picks up exactly where you left off — with full context, emotions, and decision history.

---

## The TRON format

One line per turn. 17 fields. User input AND AI output, both compressed.

```
T<N>|U:<keywords>|O:<keywords>|F:<files>|A:<attachments>|IMG:<images>
    |EMO:<e>:<i>,<e>:<i>,<e>:<i>|BEH:<pattern>|INT:<type>|THR:<thread>
    |CHG:<+/~/!>|CONF:<tag>|OPEN:<y/n>|SHIFT:<y/n>|GOD:<concept>
    |CHAR:<arch>:<i>,<arch>:<i>|CHARSHIFT:<y/n>
```

| Field | What it captures |
|---|---|
| `U:` | User prompt → intent keywords, emphasis, corrections |
| `O:` | AI output → result type, decisions made, artifacts produced |
| `EMO:` | Top 3 user emotions + intensity 1–5 (171-emotion model) |
| `BEH:` | Behavioral pattern: `deep_dive` · `co_designing` · `pressure_testing`… |
| `INT:` | Intent: `create` · `debug` · `explain` · `refine` · `decide` · `explore` |
| `THR:` | Topic thread `a/b/c` — groups related turns |
| `CHG:` | Delta: `+` new · `~` refined · `!` corrected/reversed |
| `CONF:` | Confidence: `EXTRACTED` (1.0) · `INFERRED` (0.6–0.9) · `AMBIGUOUS` (<0.3) |
| `OPEN:` | Unresolved question or task left this turn |
| `SHIFT:` | Auto — dominant emotion changed by ≥2 intensity |
| `GOD:` | Concept introduced here that becomes central (4+ Sparse6 edges) |
| `CHAR:` | Top 2 user archetypes + intensity — **persists across entire session** |
| `CHARSHIFT:` | Auto — dominant archetype shifted this turn |

### Real example — from our own session

```tron
T6|U:add sparse6 network graph,visible to hidden,emotional+behavioral,layered nodes,no info loss|O:sparse6 design questions,4 layers proposed|INT:explore|THR:a|CHG:+|CONF:EXTRACTED|OPEN:yes|SHIFT:yes|EMO:visionary:5,ambitious:4,excited:3|BEH:abstracting|CHAR:visionary:5,perfectionistic:3|CHARSHIFT:yes
T15|U:summary too long 4-5 bullets,push context to tron+sparse6,rename graphifychat,research graphify repo|O:graphify researched,redesign diagram shown,6 concepts mapped|INT:refine|THR:a|CHG:~|CONF:EXTRACTED|OPEN:yes|EMO:strategic:5,analytical:4,ambitious:4|BEH:course_correcting|CHAR:visionary:5,perfectionistic:4
```

---

## The Sparse6 graph

8 named layers. Confidence-tagged. Append-only.

```sparse6
## LAYER:TURNS          — T2[DEC] -> two_tier_design : decided [EXTRACTED:1.0]
## LAYER:CONCEPTS       — tron_block -> sparse6_block : complements [EXTRACTED:1.0]
## LAYER:EMOTIONS       — T5.EMO:analytical -> T6.EMO:visionary : resolves_to [INFERRED:0.85]
## LAYER:FILES          — SKILL.md -> T16 : created_at [EXTRACTED:1.0]
## LAYER:ENTITIES       — graphify[repo] -> graphifychat : inspired [INFERRED:0.9]
## LAYER:CHARACTERS     — visionary+ambitious -> scope_escalation : triggers [INFERRED:0.9]
## LAYER:COMMUNITIES    — COMMUNITY:psychology_layer -> [T11,T12,T13,char_archetypes] : comprises
## LAYER:HYPEREDGES     — HYPEREDGE:skill_rewrites -> [T3,T8,T13,T16] : iterate_on [EXTRACTED:1.0]
```

---

## Psychology layer — 18 character archetypes

Persistent psychological character detection. Persists until contradicted. Top 2 per turn.

| Archetype | Signal |
|---|---|
| `perfectionistic` | "not quite right" — one more tweak, hesitates before committing |
| `visionary` | Rapid scope expansion, ambitious framing, big-picture focus |
| `dogmatic` | "that's not how it works" — resists alternatives |
| `skeptical` | Slow to commit; repeated requests for sources |
| `opportunistic` | Many parallel threads; FOMO language |
| `egotistic` | Rejects corrections; rephrases as AI's error |
| `optimistic` | Skips validation; minimal risk language |
| `realistic` | Accepts tradeoffs; updates beliefs on evidence (**goal state**) |
| `pessimistic` | Worst-case first; "but what if it fails" |
| `idealistic` | Frustrated by pragmatic constraints |
| `cynical` | Distrusts outputs; seeks hidden flaws |
| `masochistic` | Repeats patterns that previously failed |
| `hedonistic` | Celebrates small wins; avoids discussing blockers |
| `fatalistic` | Passive; "whatever happens" |
| `narcissistic` | Dismisses alternatives without engagement |
| `legalistic` | Applies rules mechanically even when absurd |
| `academicistic` | Over-relies on models; ignores real signals |
| `egocentric` | "It's great because I own it" |

**10 interaction patterns** fire automatically when archetype + emotion co-occur:
`scope_escalation` · `analysis_paralysis` · `deep_refinement` · `doubles_down` · `blame_displacement` · `calibrated_decision` · `decision_freeze` · `overcommitment` · `rapid_lock_in` · `context_switching`

---

## GRAPH_REPORT — what a cold LLM sees first

```
## GRAPH_REPORT

**God nodes:** `tron_block` · `sparse6_block` · `graphifychat`
**Open threads:** none
**Emotional arc:** visionary → decisive → analytical → ambitious → strategic → satisfied
**Character profile:** visionary:5 + perfectionistic:4 — scope_escalation + deep_refinement active

- T1–T5: Established two-tier TRON+Sparse6 design; locked update protocol
- T6–T13: Sparse6 8 layers; 6 new TRON fields; 18 archetypes; github v1–v4
- T14–T16: graphify concepts integrated; renamed graphifychat; SKILL.md final
- T17–T18: Final GitHub repo packaged; README rewritten with cost table
- Files: 📁 graphifychat/SKILL.md · 📁 graphifychat-github.zip
```

---

## Examples

| File | What it shows |
|---|---|
| [`coding-session.md`](examples/coding-session.md) | React dashboard, 8 turns, bug fix (`CHG:!`), frustrated→satisfied arc |
| [`research-session.md`](examples/research-session.md) | Literature review, 2 attachments, open thread, archetype shift |
| [`creative-session.md`](examples/creative-session.md) | Story writing, god node tracking, ambiguous ending decision |
| [`graphifychat-own-session.md`](examples/graphifychat-own-session.md) | **Real 18-turn session building this skill** — all 8 layers live |

---

## Compatibility

| Model | Status |
|---|---|
| Claude (all versions) | ✅ Native — best with SKILL.md installed |
| ChatGPT (GPT-4o, o1) | ✅ Full — paste memory file in first message |
| Gemini (1.5, 2.0) | ✅ Full — long context handles large files well |
| Mistral / Llama / local | ✅ Full — any instruction-following model |
| Custom system prompt | ✅ Full — paste SKILL.md as system prompt |

---

## Why not RAG / embeddings / memory plugins?

| | RAG / Embeddings | Memory plugins | **graphifychat** |
|---|---|---|---|
| Setup required | Server + DB + API | Platform-specific | **None** |
| Works offline | ❌ | ❌ | **✅** |
| Portable across AI tools | ❌ | ❌ | **✅** |
| Human-readable | ❌ | Partial | **✅** |
| Captures emotions | ❌ | ❌ | **✅** |
| Captures psychology | ❌ | ❌ | **✅** |
| Version-controllable | ❌ | ❌ | **✅** |
| Token cost | High (retrieval) | Hidden | **~90 tokens/turn** |

---

## Contributing

- **Share examples** — anonymised `.md` memory files in `examples/`
- **Suggest TRON fields** — use the issue template
- **Build parsers** — Python/JS/Rust TRON line parsers
- **Build validators** — lint field completeness + Sparse6 edge consistency
- **Integrations** — Claude Projects, VS Code, Obsidian

See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

**v4 (graphifychat)** — 18 archetypes · CONF/GOD fields · 8 Sparse6 layers · edge confidence scores · Mode A/B · GRAPH_REPORT 4-5 bullets  
**v3** — INT/THR/CHG/OPEN/SHIFT · LAYER:ENTITIES · RES score  
**v2** — EMO/BEH · Sparse6 · 4 layers  
**v1** — TRON format · portable export

---

## License

[MIT](LICENSE)

---

<div align="center">

**Keywords:** `llm-memory` · `context-window` · `prompt-engineering` · `ai-memory` · `token-efficiency` · `claude-skill` · `chatgpt-memory` · `knowledge-graph` · `conversation-state` · `llm-context` · `ai-portability` · `sparse6` · `tron-format` · `emotion-tracking` · `character-archetypes` · `psychology` · `graphify` · `llm-tools` · `context-compression` · `ai-productivity`

</div>
