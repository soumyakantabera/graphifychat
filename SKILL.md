---
name: graphifychat
description: >
  Turn any conversation into a queryable knowledge graph. Three-layer portable memory file:
  TRON (structured input+output capture with emotion, psychology, intent — every turn),
  Sparse6 (layered relational graph with community detection, hyperedges, confidence scores — every turn),
  GRAPH_REPORT (god nodes + surprising connections + 4-5 bullet summary — auto T1-T3, on demand after).
  Trigger on: "/graphifychat", "save context", "update memory", "track conversation", "export for
  another AI", "show memory", "export session", or proactively on complex multi-step conversations.
  CALLING RULE: if invoked at start of chat → TRON+Sparse6 update every turn automatically.
  If invoked mid-conversation → update only when explicitly called again.
  Always output as raw fenced code block — never rendered Markdown.
---

# graphifychat

Turn any conversation into a queryable, portable knowledge graph.
Three layers. Every turn captured. Cold-pasteable into any AI.

```
┌─────────────────────────────────────────────────────────────────┐
│  TRON      — one compressed line per turn, always live          │
│  input + output · emotions · psychology · intent · thread       │
├─────────────────────────────────────────────────────────────────┤
│  SPARSE6   — layered relational graph, never loses edges        │
│  turns · concepts · emotions · files · entities · characters    │
│  communities · hyperedges · confidence scores                   │
├─────────────────────────────────────────────────────────────────┤
│  GRAPH_REPORT — god nodes · connections · 4-5 bullet summary    │
│  auto T1-T3 · on demand after                                   │
└─────────────────────────────────────────────────────────────────┘
```

| Layer | Updated | Token cost | Purpose |
|---|---|---|---|
| TRON | Every turn | ~40 tokens/turn | Structured facts: I/O, emotions, psychology, flags |
| Sparse6 | Every turn | ~30 tokens/turn | Relationships TRON can't express as rows |
| GRAPH_REPORT | Auto T1–T3, then on-demand | 0 unless requested | Human + AI readable arc |

---

## Calling Rule

```
/graphifychat [start]     → TRON + Sparse6 update every turn automatically
/graphifychat [mid-conv]  → update only when /graphifychat called again
/graphifychat report      → generate or refresh GRAPH_REPORT now
/graphifychat export      → output full file for copy-paste into another AI
```

If called at the very start of a conversation (T1 or T2), enter **auto mode** — update silently every turn. If called later, enter **manual mode** — update only on explicit call.

---

## File Structure

```
# graphifychat: <topic>
_Turns: <N> | Files: <count> | Open: <count> | Gods: <count> | RES: <1-10> | Updated: <date>_

---

## TRON
\```tron
<one line per turn, T1 → TN>
\```

---

## Sparse6
\```sparse6
<layered adjacency block, 8 layers>
\```

---

## GRAPH_REPORT
<present only if turn ≤ 3 or explicitly requested>
```

Always output the full file as:
````
```md
<file contents>
```
````
Never render. Never outside a code fence. Never partial.

---

## TRON — Full Field Specification

One compressed line per turn. All fields pipe-separated. Omit optional fields only if truly empty.

```
T<N>|U:<keywords>|O:<keywords>|F:<created>|A:<attachments>|IMG:<images>|EMO:<e1>:<i>,<e2>:<i>,<e3>:<i>|BEH:<pattern>|INT:<type>|THR:<id>|CHG:<flag>|OPEN:<yes/no>|SHIFT:<yes/no>|CHAR:<arch>:<i>,<arch>:<i>|CHARSHIFT:<yes/no>|CONF:<tag>|GOD:<concept>
```

### Complete Field Reference

| Field | Required | Auto-trigger | Format | Description |
|---|---|---|---|---|
| `T<N>` | yes | always | `T1`, `T2`… | Turn number |
| `U:` | yes | always | keywords, phrases | **User input** compressed — what they asked, tone, framing |
| `O:` | yes | always | keywords, phrases | **Claude output** compressed — what was produced, result type |
| `F:` | if files created | always | `file.ext` | Files Claude created this turn |
| `A:` | if user attached | always | `doc.pdf` | Docs/files user attached |
| `IMG:` | if images attached | always | `img.png` | Images user attached |
| `EMO:` | yes | always | `emotion:1-5,emotion:1-5,emotion:1-5` | Top 3 user emotions + intensity (from 171-emotion model) |
| `BEH:` | yes | always | single phrase | Dominant behavioral pattern this turn |
| `INT:` | yes | always | see types below | User's intent type this turn |
| `THR:` | yes | always | `a`,`b`,`c`… | Topic thread — groups related turns across the session |
| `CHG:` | yes | always | `+` `~` `!` | Delta type: new / refined / corrected |
| `OPEN:` | yes | always | `yes`/`no` | Was a question or task left unresolved? |
| `SHIFT:` | if EMO delta ≥ 2 | auto | `yes` | Dominant emotion shifted significantly this turn |
| `CHAR:` | yes | always | `archetype:1-5,archetype:1-5` | Top 2 active user character archetypes + intensity |
| `CHARSHIFT:` | if archetype changes | auto | `yes` | Dominant character archetype changed this turn |
| `CONF:` | yes | always | `EXT`/`INF`/`AMB` | Confidence in TRON extraction: Extracted / Inferred / Ambiguous |
| `GOD:` | if god node detected | auto | `concept_name` | A concept introduced this turn that becomes central to the session |

---

### U: and O: — Input/Output Capture

**U: (user input)** — compress the full prompt into keywords and intent phrases. Capture:
- The core ask (what they want done)
- The framing (how they asked — tone, urgency, constraints)
- Any implicit needs (what they didn't say but clearly need)
- Domain keywords, named entities, specific terms they used

**O: (output)** — compress Claude's response into result keywords. Capture:
- What type of output was produced (questions_asked / analysis / code_written / design_confirmed / etc.)
- Key concepts introduced or resolved
- Whether the turn advanced, refined, or corrected prior work

Example:
```
U:compact conv memory,portable,md+tron,track prompts+files+attachments,usable other AIs
O:questions asked,format options presented,two-tier layout proposed
```

---

### EMO: — Emotion Capture (171-emotion model)

Capture the **user's** emotional state from: prompt tone, word choice, urgency, punctuation, what they emphasize, what they avoid. Always top 3, intensity 1 (subtle) to 5 (dominant).

**Cognitive cluster:** `curious`, `analytical`, `confused`, `focused`, `overwhelmed`, `certain`, `uncertain`, `concentrated`

**Creative cluster:** `imaginative`, `experimental`, `playful`, `visionary`, `inventive`, `inspired`

**Relational cluster:** `collaborative`, `trusting`, `skeptical`, `seeking_validation`, `defensive`, `open`

**Drive cluster:** `determined`, `impatient`, `cautious`, `ambitious`, `perfectionistic`, `urgent`, `patient`

**Affective cluster:** `excited`, `frustrated`, `satisfied`, `anxious`, `hopeful`, `proud`, `disappointed`, `relieved`

**Meta cluster:** `reflective`, `strategic`, `iterative`, `exploratory`, `decisive`, `deliberate`, `spontaneous`

**Social cluster:** `assertive`, `deferential`, `persuasive`, `receptive`, `competitive`, `cooperative`

---

### BEH: — Behavioral Pattern

Single phrase capturing the user's interaction style this turn:

`deep_dive` · `rapid_iteration` · `clarifying` · `building_on_prior` · `validating`
`course_correcting` · `delegating` · `co_designing` · `pressure_testing` · `abstracting`
`narrowing` · `expanding` · `anchoring` · `pivoting` · `consolidating`

---

### INT: — Intent Type

`create` — building something new (file, skill, code, artifact, plan)
`debug` — fixing, correcting, troubleshooting an existing thing
`explain` — seeking understanding; how/why questions
`refine` — iterating on something already made
`decide` — choosing between options, confirming direction, locking in
`explore` — open-ended ideation, brainstorming, discovery, what-if

---

### THR: — Thread ID

Assign `a` to the first topic thread. When a genuinely new unrelated topic begins, use `b`, then `c`, etc. When a thread resumes after interruption, reuse its original letter. Thread IDs let a cold LLM reconstruct the topic structure without reading every turn in detail.

---

### CHG: — Delta Flag

`+` — new: information, concept, file, or direction introduced that didn't exist before
`~` — refined: existing concept clarified, extended, or iterated
`!` — corrected: user reversed direction, Claude fixed an error, prior output replaced

---

### OPEN: — Unresolved Flag

Set `OPEN:yes` when:
- A question was raised but not fully answered this turn
- A task was scoped but not completed
- User said "we'll do X later", "come back to this", "remind me about Y"
- Output was partial or incomplete

Set `OPEN:no` when the turn's output fully resolved the prompt.

---

### SHIFT: — Emotion Shift (auto)

Compare current turn's dominant EMO intensity against previous turn's dominant EMO.
If top emotion changed AND intensity delta ≥ 2 → set `SHIFT:yes`.
Also add arc to Sparse6 LAYER:EMOTIONS automatically.

---

### CHAR: — User Character Archetypes

Detect the user's **persistent psychological character** from interaction patterns. These are stable traits that color every prompt — not momentary states (those are EMO). Top 2, intensity 1–5.

**Persistence rule:** Once detected, carry forward silently every turn. Only update when behavior clearly contradicts the archetype. Set `CHARSHIFT:yes` when dominant archetype changes.

| Archetype | Core pattern | Detection signals |
|---|---|---|
| `pessimistic` | Expects negative outcomes; focuses on downside | "but what if it fails", always asks worst case first, qualifies every positive |
| `optimistic` | Expects positive outcomes; ignores downside | Minimal risk language, skips validation, "let's just go for it" |
| `fatalistic` | Outcomes feel predetermined or uncontrollable | Ignores risk management suggestions, "whatever happens, happens" |
| `perfectionistic` | Requires ideal conditions or flawless execution | "not quite right", asks for one more tweak, hesitates before committing |
| `narcissistic` | Overestimates own insight; feels uniquely special | Rejects corrections as Claude misunderstanding, "I know better" signals |
| `idealistic` | Believes things *should* work rationally or fairly | "it *should* work this way", frustrated by pragmatic constraints |
| `opportunistic` | Jumps on every perceived chance without filtering | Rapidly shifts topics, many parallel threads, FOMO language |
| `cynical` | Assumes manipulation, fraud, or hidden motives | Questions motives behind recommendations, "who benefits from this?" |
| `egocentric` | Views world only through own position or perspective | "This is great because I use it" — ignores contrary perspectives |
| `realistic` | Assesses probabilities without emotional distortion | Accepts tradeoffs without drama, updates beliefs on evidence — goal state |
| `simplistic` | Reduces complexity to single-cause explanations | "It's just X" — ignores multi-factor reality |
| `dogmatic` | Clings rigidly to one rule or belief system | "that's not how it works", resists alternatives, cites single authority |
| `skeptical` | Doubts every signal (useful until extreme) | Asks for sources repeatedly, slow to commit, many clarifying questions |
| `egotistic` | Overvalues own opinion vs evidence | Doubles down to prove "I was right", treats corrections as attacks |
| `masochistic` | Unconsciously seeks pain through self-sabotage | Repeats patterns that failed, ignores own stated goals |
| `hedonistic` | Seeks immediate pleasure; avoids short-term pain | Celebrates small wins loudly, avoids discussing blockers |
| `legalistic` | Follows rules too literally without understanding intent | Applies systems mechanically even when context makes them absurd |
| `academicistic` | Over-relies on theory vs lived reality | Cites models/frameworks over practical evidence, frustrated when theory doesn't hold |

### CHAR × EMO interaction patterns (add to Sparse6 LAYER:CHARACTERS)

| Archetype | + Emotion | → Named pattern |
|---|---|---|
| `dogmatic` | `frustrated` | `doubles_down` |
| `perfectionistic` | `anxious` | `analysis_paralysis` |
| `egotistic` | `frustrated` | `blame_shift` |
| `opportunistic` | `excited` | `impulse_overload` |
| `masochistic` | `satisfied` | `sabotage_risk` |
| `pessimistic` | `determined` | `productive_tension` |
| `realistic` | any | `calibrated_action` |
| `idealistic` | `frustrated` | `reality_collision` |
| `cynical` | `analytical` | `pattern_seeking` |
| `dogmatic` | `analytical` | `confirmation_loop` |

---

### CONF: — Extraction Confidence (from graphify)

`EXT` — Extracted: turn data is explicit and unambiguous. Clear prompt, clear output.
`INF` — Inferred: reasonable interpretation. Prompt was ambiguous or output was complex.
`AMB` — Ambiguous: uncertain. Prompt unclear, output experimental, or context missing.

---

### GOD: — God Node Detection (from graphify)

When a concept introduced in a turn becomes a central hub — referenced repeatedly across later turns, connected to many Sparse6 nodes — flag it retroactively or on detection.

Detection triggers: concept appears in 3+ turn U: or O: fields, OR concept has 5+ Sparse6 edges across layers.

Format: `GOD:concept_name` (snake_case). Multiple: `GOD:tron_format,sparse6_block`

---

### TRON Example — Full Fields

```tron
T1|U:portable conv memory,md+tron,track prompts+files+attachments,usable other AIs|O:questions asked,format options,two-tier layout proposed|INT:explore|THR:a|CHG:+|OPEN:yes|EMO:visionary:4,curious:3,pragmatic:3|BEH:co_designing|CHAR:visionary:4,perfectionistic:3|CONF:EXT
T2|U:tron keywords,md on demand,single file,begin to end,no rendering|O:two-tier confirmed,tron source of truth,calling protocol|INT:decide|THR:a|CHG:~|OPEN:no|EMO:decisive:4,focused:4,analytical:2|BEH:clarifying|CHAR:visionary:4,perfectionistic:3|CONF:EXT
T3|U:write skill now,full spec|O:SKILL.md written,all fields,update protocol|F:SKILL.md|INT:create|THR:a|CHG:+|OPEN:no|EMO:determined:5,satisfied:3,impatient:2|BEH:delegating|CHAR:visionary:4,perfectionistic:3|CONF:EXT|GOD:tron_format
T4|U:suggest improvements,token efficiency,credit usage,10 ideas|O:diagram shown,6 improvements,tier ranking|INT:explore|THR:a|CHG:~|OPEN:yes|EMO:analytical:5,pragmatic:4,perfectionistic:3|BEH:pressure_testing|CHAR:perfectionistic:5,visionary:3|CONF:EXT|GOD:token_efficiency
T5|U:add sparse6 graph,visible to hidden,emotional+behavioral,layered nodes|O:sparse6 designed,4 layers,adjacency format|INT:create|THR:a|CHG:+|OPEN:no|SHIFT:yes|EMO:visionary:5,ambitious:4,excited:3|BEH:abstracting|CHAR:visionary:5,perfectionistic:3|CHARSHIFT:yes|CONF:EXT|GOD:sparse6_block
```

---

## Sparse6 — Full Specification

Captures **relational and contextual data** that TRON cannot express as rows.
8 named layers. Adjacency description format. Updated every turn — never removes edges.

### What Sparse6 captures that TRON cannot:
- Concept-to-concept bridges across turns and threads
- Emotional arcs and shift trajectories across the session
- File and decision dependency chains
- Cross-turn inheritance (T3 builds on T1's decision)
- Named entities and their relationship to session concepts
- User character arcs — how archetypes evolve and interact
- Topic community clusters — which concepts belong to the same cluster
- Hyperedges — 3+ nodes sharing a pattern no pairwise edge can express
- Confidence level of every relationship (EXTRACTED / INFERRED / AMBIGUOUS)

### Layer Structure

```sparse6
## LAYER:TURNS
T<N> -> T<M> : <edge_label>
T<N>[DEC] -> <concept> : decided          ← decision anchor turn
T<N> -> open_thread : unresolved          ← OPEN:yes turns

## LAYER:CONCEPTS
<concept_a> -> <concept_b> : <edge_label>
<concept_a> -> [<b>, <c>] : <shared_label>   ← multiple targets

## LAYER:EMOTIONS
T<N>.EMO:<emotion> -> T<M>.EMO:<emotion> : <transition>
SHIFT:T<N>-T<M> : <from_emotion> -> <to_emotion>

## LAYER:FILES
<file> -> T<N> : created_at
<file> -> <concept> : defines|enables|produces

## LAYER:ENTITIES
<entity>[<type>] -> T<N> : first_mentioned
<entity>[<type>] -> <concept> : relates_to

## LAYER:CHARACTERS
<archetype> -> T<N> : established_at
<archetype> -> T<N> : active_through
T<N>.CHAR:<arch> -> T<M>.CHAR:<arch2> : shifted_to
<archetype>+<emotion> -> <pattern> : triggers
<archetype_a> -> <archetype_b> : reinforces|conflicts_with

## LAYER:COMMUNITIES
COMMUNITY:<name> -> [T<N>, T<M>, <concept>, <concept>] : comprises
COMMUNITY:<name> -> COMMUNITY:<name2> : bridges           ← cross-community link
<concept> -> COMMUNITY:<name> : central_to                ← god node in community

## LAYER:HYPEREDGES
HYPER:<name> -> [T<N>, T<M>, T<K>] : <shared_pattern>    ← turns sharing a pattern
HYPER:<name> -> [<c1>, <c2>, <c3>] : <shared_relation>   ← concepts sharing a relation
```

### Edge Confidence Format

Every edge should carry a confidence tag when not obvious:

```sparse6
T3 -> T5 : builds_on [EXT:1.0]
conv_memory -> tron_block : requires [EXT:1.0]
sparse6_block -> emotion_tracking : relates_to [INF:0.8]
user_archetype -> output_quality : influences [INF:0.6]
```

Tags: `[EXT:1.0]` Extracted · `[INF:0.0-1.0]` Inferred + score · `[AMB:0.1-0.3]` Ambiguous

### All Edge Label Vocabularies

**Turn edges:** `builds_on`, `refines`, `contradicts`, `clarifies`, `resolves`, `branches_from`, `long_range_influence`
**Concept edges:** `enables`, `requires`, `elaborates`, `replaces`, `conflicts_with`, `bridges`, `generated_from`, `defines`, `comprises`, `complements`
**Emotion edges:** `escalates_to`, `resolves_to`, `sustains`, `triggers`, `suppresses`, `transitions_to`
**File edges:** `created_at`, `referenced_at`, `modified_at`, `enables`, `produces`, `defines`
**Entity edges:** `first_mentioned`, `relates_to`, `created_by`, `used_in`, `conflicts_with`
**Character edges:** `established_at`, `active_through`, `shifted_to`, `triggers`, `reinforces`, `conflicts_with`
**Community edges:** `comprises`, `bridges`, `central_to`
**Hyperedge edges:** shared_pattern label (e.g. `iterative_refinement`, `co_design_turns`, `file_creation_cluster`)

### Sparse6 Rules

- Add new nodes/edges every turn — **never remove** existing nodes or edges
- Max ~12 new edges per turn to control size
- **Complement TRON** — don't duplicate row facts; only add relational meaning TRON can't express
- If a concept recurs across turns, link it — don't duplicate the node
- OPEN:yes turns → add `T<N> -> open_thread : unresolved` in LAYER:TURNS
- INT:decide or BEH:delegating/decisive → mark turn as `T<N>[DEC]` decision anchor
- CHARSHIFT:yes → add `shifted_to` arc in LAYER:CHARACTERS + update `active_through`
- CHG:! → add `conflicts_with` or `replaces` edge in LAYER:CONCEPTS
- GOD: detected → add `central_to` edges in LAYER:COMMUNITIES for that concept
- LAYER:COMMUNITIES updated when 3+ turns share a theme or concept cluster
- LAYER:HYPEREDGES added when 3+ turns or concepts share a non-pairwise pattern

### Sparse6 Example

```sparse6
## LAYER:TURNS
T1 -> T2 : builds_on [EXT:1.0]
T2[DEC] -> two_tier_design : decided [EXT:1.0]
T2 -> T3 : clarifies [EXT:1.0]
T3 -> T4 : branches_from [EXT:1.0]
T4 -> T5 : builds_on [EXT:1.0]
T1 -> T5 : long_range_influence [INF:0.9]

## LAYER:CONCEPTS
graphifychat -> [tron_block, sparse6_block, graph_report] : comprises [EXT:1.0]
tron_block -> [U_field, O_field, EMO_field, CHAR_field, INT_field, THR_field, CHG_field, CONF_field, GOD_field] : fields [EXT:1.0]
sparse6_block -> [LAYER:TURNS, LAYER:CONCEPTS, LAYER:EMOTIONS, LAYER:FILES, LAYER:ENTITIES, LAYER:CHARACTERS, LAYER:COMMUNITIES, LAYER:HYPEREDGES] : layers [EXT:1.0]
tron_block -> sparse6_block : complements [EXT:1.0]
graph_report -> tron_block : generated_from [EXT:1.0]
token_efficiency -> [md_on_demand, tron_per_turn] : enables [EXT:1.0]
emotion_tracking -> [EMO_field, LAYER:EMOTIONS] : distributed_across [EXT:1.0]
char_archetypes -> [CHAR_field, LAYER:CHARACTERS] : distributed_across [EXT:1.0]
god_node_detection -> LAYER:COMMUNITIES : feeds_into [INF:0.85]

## LAYER:EMOTIONS
T1.EMO:visionary -> T2.EMO:decisive : resolves_to [INF:0.9]
T2.EMO:focused -> T3.EMO:determined : escalates_to [INF:0.85]
T4.EMO:analytical -> T5.EMO:visionary : resolves_to [INF:0.8]
SHIFT:T4-T5 : analytical -> visionary

## LAYER:FILES
SKILL.md -> T3 : created_at [EXT:1.0]
SKILL.md -> graphifychat : defines [EXT:1.0]
SKILL.md -> [tron_block, sparse6_block, graph_report] : specifies [EXT:1.0]

## LAYER:ENTITIES
graphify[tool] -> T5 : first_mentioned [EXT:1.0]
graphify[tool] -> [god_node_detection, community_detection, hyperedges] : inspired [INF:0.9]

## LAYER:CHARACTERS
visionary -> T1 : established_at [EXT:1.0]
visionary -> T5 : active_through [EXT:1.0]
perfectionistic -> T1 : established_at [EXT:1.0]
perfectionistic -> T4 : active_through [EXT:1.0]
T4.CHAR:perfectionistic -> T5.CHAR:visionary : shifted_to [EXT:1.0]
visionary+excited -> scope_expansion : triggers [INF:0.85]
perfectionistic+analytical -> deep_refinement : triggers [INF:0.9]

## LAYER:COMMUNITIES
COMMUNITY:memory_format -> [T1, T2, tron_block, sparse6_block, two_tier_design] : comprises [INF:0.9]
COMMUNITY:graph_design -> [T4, T5, sparse6_block, community_detection, hyperedges] : comprises [INF:0.85]
COMMUNITY:memory_format -> COMMUNITY:graph_design : bridges [INF:0.8]
tron_block -> COMMUNITY:memory_format : central_to [EXT:1.0]

## LAYER:HYPEREDGES
HYPER:design_decisions -> [T2, T3, T5] : co_design_turns [INF:0.85]
HYPER:core_concepts -> [tron_block, sparse6_block, token_efficiency] : foundation_cluster [EXT:1.0]
```

---

## GRAPH_REPORT — Specification

Generated fresh from TRON + Sparse6. Never maintained independently. Replaces MD Summary.

### Format

```
### God Nodes
<concept> — <1-line description of why it's central>
<concept> — <1-line description>

### Surprising Connections
<connection> — <1-line why it's unexpected or important>

### Session Summary
- <bullet 1: what was built or decided>
- <bullet 2: key emotion or character arc>
- <bullet 3: open threads or unresolved items>
- <bullet 4: files created or attachments processed>
- <bullet 5: resumability note — what a cold LLM needs to know first>

### Suggested Questions
1. <question the graph is uniquely positioned to answer>
2. <cross-thread bridge question>
```

### Rules
- Summary: exactly 4–5 bullets. No prose paragraphs. Each bullet is 1 line.
- God nodes: only list concepts with 5+ Sparse6 edges or appearing in 3+ TRON turns
- Surprising connections: cross-thread or cross-community bridges a cold LLM wouldn't expect
- Suggested questions: pick ones that cross community boundaries or reveal non-obvious paths
- Include attachment details humanly: `📎 doc.pdf — quarterly sales data, 3 pages`
- Include created files humanly: `📁 SKILL.md — graphifychat skill definition`
- Show archetype if detected: `🧠 User profile: visionary:5 + perfectionistic:4 throughout`

---

## RES: Resumability Score

Computed and shown in file header at every update.

Formula: `RES = 10 - (OPEN_count × 2) - (unresolved_threads) + (DEC_count × 0.5)`
Cap: 1 minimum, 10 maximum. Round to integer.

| Score | Meaning |
|---|---|
| 8–10 | Cold LLM can resume with near-zero context loss |
| 5–7 | Read TRON carefully — a few open threads |
| 1–4 | Export GRAPH_REPORT before switching AI |

---

## Update Protocol

### Auto mode (called at start):
1. Every turn: append one TRON line (all fields)
2. Every turn: append/update Sparse6 edges (all 8 layers)
3. Auto-detect: SHIFT, CHARSHIFT, GOD, decision anchors, unresolved edges
4. Update LAYER:COMMUNITIES when cluster emerges (3+ turns/concepts share a theme)
5. Update LAYER:HYPEREDGES when 3+ items share a non-pairwise pattern
6. Recompute RES score
7. If turn ≤ 3: also generate GRAPH_REPORT
8. Output full file as raw fenced code block

### Manual mode (called mid-conversation):
1. Append all missed turns to TRON (retroactively from last update)
2. Append all missed Sparse6 edges
3. Recompute communities, hyperedges, RES
4. Output full file as raw fenced code block
5. Only generate GRAPH_REPORT if explicitly requested

### On `/graphifychat report`:
Regenerate GRAPH_REPORT fresh from full TRON + Sparse6. Never from cached text.

### Never:
- Remove TRON lines
- Remove Sparse6 nodes or edges
- Output rendered Markdown
- Truncate TRON (all turns T1→TN always present)

---

## Portability Rules

The file must be self-contained for cold AI resumption:
- No local path references
- File descriptions meaningful without the file present
- TRON readable cold by any LLM T1→TN
- Sparse6 self-describing via layer labels and edge vocabulary
- CONF tags tell a cold LLM what was certain vs inferred
- GOD nodes tell a cold LLM where to start reading
- LAYER:COMMUNITIES gives the topic map without reading every turn
- RES score gives immediate sense of how much context would be lost
- CHAR archetypes tell any AI how to interact with this user

---

## Full Example Output (Turn 5, auto mode, GRAPH_REPORT generated)

````
```md
# graphifychat: graphifychat Skill Co-Design
_Turns: 5 | Files: 1 | Open: 0 | Gods: 3 | RES: 9 | Updated: 2026-04-25_

---

## TRON
\```tron
T1|U:portable conv memory,md+tron,track prompts+files+attachments,usable other AIs|O:questions asked,format options,two-tier proposed|INT:explore|THR:a|CHG:+|OPEN:yes|EMO:visionary:4,curious:3,pragmatic:3|BEH:co_designing|CHAR:visionary:4,perfectionistic:3|CONF:EXT
T2|U:tron keywords,md on demand,single file,no rendering|O:two-tier confirmed,tron source of truth|INT:decide|THR:a|CHG:~|OPEN:no|EMO:decisive:4,focused:4,analytical:2|BEH:clarifying|CHAR:visionary:4,perfectionistic:3|CONF:EXT
T3|U:write skill,full spec|O:SKILL.md written,all fields,update protocol|F:SKILL.md|INT:create|THR:a|CHG:+|OPEN:no|EMO:determined:5,satisfied:3,impatient:2|BEH:delegating|CHAR:visionary:4,perfectionistic:3|CONF:EXT|GOD:tron_format
T4|U:suggest improvements,token efficiency,10 ideas|O:diagram shown,6 improvements,tier ranking|INT:explore|THR:a|CHG:~|OPEN:yes|EMO:analytical:5,pragmatic:4,perfectionistic:3|BEH:pressure_testing|CHAR:perfectionistic:5,visionary:3|CONF:EXT|GOD:token_efficiency
T5|U:add sparse6,visible to hidden,emotional+behavioral,layered nodes|O:sparse6 designed,6 layers,adjacency format|INT:create|THR:a|CHG:+|OPEN:no|SHIFT:yes|EMO:visionary:5,ambitious:4,excited:3|BEH:abstracting|CHAR:visionary:5,perfectionistic:3|CHARSHIFT:yes|CONF:EXT|GOD:sparse6_block
\```

---

## Sparse6
\```sparse6
## LAYER:TURNS
T1 -> T2 : builds_on [EXT:1.0]
T2[DEC] -> two_tier_design : decided [EXT:1.0]
T2 -> T3 : clarifies [EXT:1.0]
T3 -> T4 : branches_from [EXT:1.0]
T4 -> T5 : builds_on [EXT:1.0]

## LAYER:CONCEPTS
graphifychat -> [tron_block, sparse6_block, graph_report] : comprises [EXT:1.0]
tron_block -> sparse6_block : complements [EXT:1.0]
token_efficiency -> [md_on_demand, tron_per_turn] : enables [EXT:1.0]
emotion_tracking -> [EMO_field, LAYER:EMOTIONS] : distributed_across [EXT:1.0]

## LAYER:EMOTIONS
T1.EMO:visionary -> T2.EMO:decisive : resolves_to [INF:0.9]
T2.EMO:focused -> T3.EMO:determined : escalates_to [INF:0.85]
T4.EMO:analytical -> T5.EMO:visionary : resolves_to [INF:0.8]
SHIFT:T4-T5 : analytical -> visionary

## LAYER:FILES
SKILL.md -> T3 : created_at [EXT:1.0]
SKILL.md -> graphifychat : defines [EXT:1.0]

## LAYER:ENTITIES
graphify[tool] -> T5 : first_mentioned [EXT:1.0]

## LAYER:CHARACTERS
visionary -> T1 : established_at [EXT:1.0]
visionary -> T5 : active_through [EXT:1.0]
perfectionistic -> T1 : established_at [EXT:1.0]
T4.CHAR:perfectionistic -> T5.CHAR:visionary : shifted_to [EXT:1.0]
visionary+excited -> scope_expansion : triggers [INF:0.85]

## LAYER:COMMUNITIES
COMMUNITY:core_design -> [T1, T2, tron_block, two_tier_design] : comprises [INF:0.9]
COMMUNITY:graph_layer -> [T4, T5, sparse6_block, token_efficiency] : comprises [INF:0.85]
COMMUNITY:core_design -> COMMUNITY:graph_layer : bridges [INF:0.8]
tron_block -> COMMUNITY:core_design : central_to [EXT:1.0]

## LAYER:HYPEREDGES
HYPER:design_decisions -> [T2, T3, T5] : co_design_turns [INF:0.85]
HYPER:core_concepts -> [tron_block, sparse6_block, token_efficiency] : foundation_cluster [EXT:1.0]
\```

---

## GRAPH_REPORT

### God Nodes
tron_block — the central data structure everything connects through; source of truth
sparse6_block — relational layer that gives TRON its context; introduced T5
token_efficiency — the design constraint that shaped every protocol decision

### Surprising Connections
token_efficiency -> community_detection — cost constraints directly shaped graph topology design

### Session Summary
- Built graphifychat skill: TRON (15 fields) + Sparse6 (8 layers) + GRAPH_REPORT format designed
- User arc: visionary→decisive→determined→analytical→visionary — expansive then focused then expanding again
- 0 open threads; 2 decision anchors at T2 (two-tier) and T3 (full spec)
- 📁 SKILL.md — complete graphifychat skill definition
- 🧠 User: visionary:5 + perfectionistic:4 — builds ambitious systems then refines every detail

### Suggested Questions
1. How does LAYER:COMMUNITIES change what a cold LLM can do with this file?
2. What would a LAYER:HYPEREDGES entry look like for this session's design decisions?
```
````
