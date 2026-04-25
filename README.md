<div align="center">

# 🧠 graphifychat

**Turn any conversation into a portable knowledge graph.**  
Captures what you said, what the AI produced, how you felt, and who you psychologically are —  
compressed into a single `.md` file any LLM can read cold.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Format: Markdown](https://img.shields.io/badge/Format-Markdown-blue.svg)]()
[![Works with: Claude · ChatGPT · Gemini · Any LLM](https://img.shields.io/badge/Works%20with-Claude%20·%20ChatGPT%20·%20Gemini%20·%20Any%20LLM-purple.svg)]()
[![Token cost: Minimal](https://img.shields.io/badge/Token%20cost-Minimal-orange.svg)]()
[![Psychology: 18 archetypes](https://img.shields.io/badge/Psychology-18%20archetypes-red.svg)]()

</div>

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
│  what user asked · what AI produced · files · emotions ·         │
│  character archetypes · intent · thread · confidence flags       │
├──────────────────────────────────────────────────────────────────┤
│  Sparse6  — relational graph pass, every turn                    │
│  8 named layers: turns · concepts · emotions · files ·           │
│  entities · characters · communities · hyperedges                │
│  every edge tagged EXTRACTED / INFERRED / AMBIGUOUS + score      │
├──────────────────────────────────────────────────────────────────┤
│  GRAPH_REPORT  — human-readable summary                          │
│  god nodes · emotional arc · character profile · 4-5 bullets     │
│  auto turns 1–3, then on-demand only                             │
└──────────────────────────────────────────────────────────────────┘
```

| Section | Updated | Token cost |
|---|---|---|
| **TRON** | Every call | ~40–60 tokens/turn |
| **Sparse6** | Every call | ~30–50 tokens/turn |
| **GRAPH_REPORT** | Auto T1–T3, then on-demand | 0 unless requested |

---

## Quick start

### 1. Install
Add [`SKILL.md`](SKILL.md) to your Claude skill library, or paste its contents as a system prompt.

### 2. Call it

**At the start of a conversation** — always-on mode:
```
/graphifychat
```
TRON + Sparse6 update automatically every turn. GRAPH_REPORT auto turns 1–3, then on demand.

**Mid-conversation** — snapshot mode:
```
/graphifychat
```
Generates the full file for all turns so far. Only updates again when you call it again.

### 3. Resume anywhere
Copy the memory file. Paste at the top of any new conversation:
```
Here is my session memory. Please resume from this context:
[paste file]
```
Any LLM — Claude, ChatGPT, Gemini, Mistral — picks up exactly where you left off.

---

## The TRON format

One line per turn. Every exchange — user input AND AI output — compressed to keywords.

```
T<N>|U:<user keywords>|O:<output keywords>|F:<files>|A:<attachments>|IMG:<images>
    |EMO:<e1>:<i>,<e2>:<i>,<e3>:<i>|BEH:<pattern>|INT:<type>|THR:<thread>
    |CHG:<delta>|CONF:<tag>|OPEN:<y/n>|SHIFT:<y/n>|GOD:<concept>
    |CHAR:<arch>:<i>,<arch>:<i>|CHARSHIFT:<y/n>
```

### What each field captures

| Field | What it tracks |
|---|---|
| `U:` | User prompt → intent keywords (not just topic — captures emphasis, corrections, pushback) |
| `O:` | Claude output → result type + key decisions + artifacts produced |
| `EMO:` | Top 3 user emotions + intensity 1–5 (from 171-emotion model) |
| `BEH:` | Behavioral pattern: `deep_dive` · `co_designing` · `pressure_testing` · `delegating`… |
| `INT:` | Intent: `create` · `debug` · `explain` · `refine` · `decide` · `explore` |
| `THR:` | Topic thread `a/b/c` — groups related turns across the session |
| `CHG:` | Delta: `+` new · `~` refined · `!` corrected/reversed |
| `CONF:` | Confidence: `EXTRACTED` · `INFERRED` · `AMBIGUOUS` |
| `OPEN:` | Was a question or task left unresolved? |
| `SHIFT:` | Auto-fires when dominant emotion changes by intensity ≥ 2 |
| `GOD:` | Concept introduced here that becomes central (4+ Sparse6 connections) |
| `CHAR:` | Top 2 user character archetypes + intensity — **persistent across session** |
| `CHARSHIFT:` | Dominant archetype shifted this turn |

### Real example — coding session

```tron
T1|U:react dashboard,sales data,recharts,typescript,tailwind|O:questions asked,scope clarified|INT:explore|THR:a|CHG:+|CONF:EXTRACTED|OPEN:yes|EMO:excited:4,ambitious:3,curious:3|BEH:co_designing|CHAR:visionary:4,perfectionistic:3
T2|U:confirm tech stack,3 charts,responsive,dark mode|O:component structure proposed|INT:decide|THR:a|CHG:~|CONF:EXTRACTED|OPEN:no|EMO:decisive:4,focused:4|BEH:clarifying|CHAR:visionary:4,perfectionistic:3
T3|U:write RevenueChart first|O:RevenueChart.tsx complete,responsive,dark mode|F:RevenueChart.tsx|INT:create|THR:a|CHG:+|CONF:EXTRACTED|OPEN:no|EMO:determined:5,satisfied:3|BEH:delegating|CHAR:visionary:4,perfectionistic:3|GOD:dashboard
T4|U:bars not rendering mobile|O:fixed ResponsiveContainer,re-exported|F:RevenueChart.tsx|INT:debug|THR:a|CHG:!|CONF:EXTRACTED|OPEN:no|EMO:frustrated:3,focused:4,analytical:3|BEH:course_correcting|CHAR:perfectionistic:5,visionary:3
T5|U:UserGrowth chart,area,animated|O:UserGrowth.tsx complete,framer-motion|F:UserGrowth.tsx|INT:create|THR:b|CHG:+|CONF:EXTRACTED|OPEN:no|SHIFT:yes|EMO:satisfied:4,proud:3,excited:3|BEH:building_on_prior|CHAR:visionary:4,perfectionistic:3|CHARSHIFT:yes
```

---

## The Sparse6 graph

8 named layers. Adjacency description format. Every edge confidence-tagged.

```sparse6
## LAYER:TURNS          — how turns connect: builds_on, clarifies, branches_from
## LAYER:CONCEPTS       — concept dependency graph: enables, requires, bridges
## LAYER:EMOTIONS       — emotional arcs: escalates_to, resolves_to, suppresses
## LAYER:FILES          — file provenance: created_at, modified_at, produces
## LAYER:ENTITIES       — named people, tools, systems, orgs
## LAYER:CHARACTERS     — archetype lifecycle + character×emotion patterns
## LAYER:COMMUNITIES    — Leiden-style topic clusters by edge density
## LAYER:HYPEREDGES     — 3+ node patterns beyond pairwise edges
```

Every edge carries a confidence score:

```sparse6
T1 -> T2 : builds_on [EXTRACTED:1.0]
T2[DEC] -> tech_stack : decided [EXTRACTED:1.0]
T3.EMO:determined -> T4.EMO:frustrated : triggers [INFERRED:0.75]
COMMUNITY:core_design -> [T1,T2,T3,tron_block] : comprises [INFERRED:0.9]
HYPEREDGE:refinement_arc -> [T2,T4,T6] : iterate_on [INFERRED:0.8]
```

This means a cold LLM reading the file immediately knows:
- **What's fact** vs what's inference
- **Which concepts are central** (god nodes)
- **How topics cluster** (communities)
- **Multi-turn patterns** (hyperedges) invisible in pairwise edges

---

## Psychology layer — 18 character archetypes

graphifychat detects the user's **persistent psychological character** — not momentary mood.  
These archetypes are detected from interaction patterns and persist until contradicted.

| Archetype | Core pattern | Signal in conversation |
|---|---|---|
| `pessimistic` | Focuses on downside | "but what if it fails" — worst-case first |
| `perfectionistic` | Needs ideal conditions | "not quite right" — one more tweak, hesitates |
| `optimistic` | Skips downside | Minimal risk language, "let's just go" |
| `dogmatic` | Rigid single system | "that's not how it works" — resists alternatives |
| `egotistic` | Own view > evidence | Rejects corrections; rephrases as Claude's error |
| `visionary` | Sees big picture | Rapid scope expansion, ambitious framing |
| `skeptical` | Doubts every signal | Slow to commit; repeated requests for sources |
| `opportunistic` | Jumps every chance | Many parallel threads; FOMO language |
| `realistic` | Accepts tradeoffs | Updates beliefs when shown evidence (**goal state**) |
| `idealistic` | Things *should* work | Frustrated by pragmatic constraints |
| `cynical` | Manipulation everywhere | Distrusts outputs; seeks hidden flaws |
| `fatalistic` | Outcomes predetermined | Passive; "whatever happens" |
| `masochistic` | Unconsciously seeks failure | Repeats patterns that previously failed |
| `hedonistic` | Immediate reward | Takes small wins; avoids discussing blockers |
| `narcissistic` | Uniquely superior | Dismisses alternatives without engagement |
| `legalistic` | Rules over intent | Applies rules mechanically even when absurd |
| `academicistic` | Theory over reality | Over-relies on models; ignores real signals |
| `egocentric` | Only own position | "It's great because I own it" |

### Character × Emotion interaction patterns

When archetype + emotion co-occur at high intensity, graphifychat names the interaction:

| Pattern | Triggers when... |
|---|---|
| `scope_escalation` | visionary + excited |
| `analysis_paralysis` | perfectionistic + anxious |
| `deep_refinement` | perfectionistic + analytical |
| `doubles_down` | dogmatic + frustrated |
| `blame_displacement` | egotistic + frustrated |
| `calibrated_decision` | realistic + analytical |
| `decision_freeze` | skeptical + overwhelmed |
| `overcommitment` | optimistic + excited |
| `rapid_lock_in` | perfectionistic + decisive |
| `context_switching` | opportunistic + ambitious |

These patterns appear in `LAYER:CHARACTERS` and help a cold LLM predict behavior.

---

## GRAPH_REPORT

Replaces the old long summary. 4–5 bullets max. Always fresh from TRON + Sparse6.

```
## GRAPH_REPORT

**God nodes:** `tron_block`, `sparse6_block`
**Open threads:** none
**Emotional arc:** curious → decisive → determined → analytical → visionary → ambitious
**Character profile:** visionary:5 + perfectionistic:4 — scope_escalation + deep_refinement active

- T1–T2: Established portable memory concept; locked in two-tier design
- T3: SKILL.md v1 written; tron_block became first god node
- T4–T5: Sparse6 added; major emotional shift analytical→visionary
- T6: Full rewrite with 6 new fields, character+community layers
- Files: 📁 SKILL.md — skill definition · 📁 conv-memory-v3.skill — packaged
```

---

## Resumability score

File header includes `RES: 1–10` — how much a cold LLM can recover.

```
_Turns: 14 | Files: 6 | Open: 0 | Gods: 2 | RES: 10 | Mode: A | Updated: 2026-04-25_
```

| Score | Meaning |
|---|---|
| 8–10 | Resume instantly, minimal context loss |
| 5–7 | Read TRON carefully — some gaps |
| 1–4 | Export GRAPH_REPORT before switching AI |

---

## Examples

See [`examples/`](examples/) for complete session files:

- [`examples/coding-session.md`](examples/coding-session.md) — React dashboard, 8 turns, bug fix, emotional arc
- [`examples/research-session.md`](examples/research-session.md) — Literature review, attachments, community detection
- [`examples/creative-session.md`](examples/creative-session.md) — Story writing, archetype shift, hyperedges

---

## Compatibility

| Model | Works? | Notes |
|---|---|---|
| Claude (all versions) | ✅ Native | Best with SKILL.md installed |
| ChatGPT (GPT-4o, o1) | ✅ Full | Paste memory file first |
| Gemini (1.5, 2.0) | ✅ Full | Long context handles large files well |
| Mistral / Llama / local | ✅ Full | Any instruction-following model |
| Custom system prompt | ✅ Full | Paste SKILL.md as system prompt |

---

## Why not RAG / embeddings / memory plugins?

Those are infrastructure. **graphifychat is a format.**

- No server, no database, no API key, no setup
- Works offline and in air-gapped environments
- Human-readable AND machine-readable
- Version-controlled like any text file
- Portable to every AI tool that exists or will exist
- Captures psychology and emotion — not just facts

---

## File size reference

| Turns | TRON | Sparse6 | Total |
|---|---|---|---|
| 5 | ~700 bytes | ~500 bytes | ~1.2 KB |
| 20 | ~2.8 KB | ~2 KB | ~4.8 KB |
| 50 | ~7 KB | ~5 KB | ~12 KB |
| 100 | ~14 KB | ~10 KB | ~24 KB |

At 100 turns: ~6,000 tokens — less than most system prompts.

---

## Contributing

- **Share examples** — add anonymised `.md` memory files to `examples/`
- **Suggest TRON fields** — use the issue template
- **Build parsers** — Python/JS/Rust parsers for TRON format
- **Build validators** — lint TRON completeness and Sparse6 edge consistency
- **Integrations** — Claude Projects, VS Code extension, Obsidian plugin

See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

**v4** — CHAR/CHARSHIFT · 18 archetypes · LAYER:CHARACTERS · interaction patterns  
**v3** — INT/THR/CHG/OPEN/SHIFT · LAYER:ENTITIES · RES score · decision anchors  
**v2** — EMO/BEH · Sparse6 graph · 4 layers  
**v1** — TRON format · GRAPH_REPORT · portable export

---

## License

[MIT](LICENSE)

---

<div align="center">

**Keywords:** `llm-memory` · `context-window` · `prompt-engineering` · `ai-memory` · `token-efficiency` · `claude-skill` · `chatgpt-memory` · `knowledge-graph` · `conversation-state` · `llm-context` · `ai-portability` · `sparse6` · `tron-format` · `emotion-tracking` · `psychology` · `character-archetypes` · `graphify` · `llm-tools` · `context-compression` · `ai-productivity`

</div>
