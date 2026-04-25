# Changelog

All notable changes documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

---

## [v4.0] — 2026-04-25 — graphifychat

### Renamed
- `conv-memory` → `graphifychat`

### Added
- `CHAR:` — top 2 user character archetypes + intensity (18 archetypes from trading psychology model)
- `CHARSHIFT:` — auto-fires when dominant archetype changes
- `CONF:` — confidence tag per TRON turn: EXTRACTED / INFERRED / AMBIGUOUS
- `GOD:` — auto-flags god-node concepts (4+ Sparse6 connections)
- `LAYER:CHARACTERS` — archetype lifecycle, persistence, shifts, interaction patterns
- `LAYER:COMMUNITIES` — Leiden-style topology clustering, no embeddings
- `LAYER:HYPEREDGES` — 3+ node multi-turn patterns beyond pairwise edges
- Edge confidence scores (0.0–1.0) on all Sparse6 edges
- EXTRACTED/INFERRED/AMBIGUOUS tags on all edges
- Decision anchor nodes `T<N>[DEC]` in LAYER:TURNS
- 10 character×emotion interaction patterns
- Mode A (always-on) / Mode B (on-demand) calling rule
- `Gods:` and `Mode:` metadata in file header
- GRAPH_REPORT replaces MD Summary (4-5 bullets, not long prose)

### Changed
- Sparse6: 6 → 8 layers
- Summary renamed GRAPH_REPORT, compressed to 4-5 bullets
- TRON line max expanded to accommodate new fields

---

## [v3.0] — 2026-04-24

### Added
- `INT:` — intent type: create/debug/explain/refine/decide/explore
- `THR:` — topic thread ID (a/b/c)
- `CHG:` — delta flag: +/~/!
- `OPEN:` — unresolved flag
- `SHIFT:` — auto emotion shift detection
- `LAYER:ENTITIES` — 5th Sparse6 layer
- Decision anchor `T<N>[DEC]` in LAYER:TURNS
- RES resumability score (formula-based, 1-10)
- Contradiction tracking via `conflicts_with` edges

---

## [v2.0] — 2026-04-24

### Added
- `EMO:` — top 3 emotions + intensity (171-emotion model)
- `BEH:` — behavioral pattern per turn
- Sparse6 block with 4 layers: TURNS, CONCEPTS, EMOTIONS, FILES
- Adjacency description format
- Emotion arc tracking

---

## [v1.0] — 2026-04-24

### Added
- TRON block — keyword-per-turn tabular format
- GRAPH_REPORT (was: MD Summary) — auto turns 1-3, on-demand after
- `U:`, `O:`, `F:`, `A:`, `IMG:` fields
- Lazy update: TRON every turn, report on demand
- Single `.md` portable file format
- Raw code block output (never rendered)
