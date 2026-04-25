# Contributing to graphifychat

## Ways to contribute

### Share examples
Most valuable. Add a real (anonymised) memory file to `examples/`.
Name it: `examples/[type]-session.md`

### Suggest TRON fields
Open an issue using the "New TRON field" template.
Include: field name, format, trigger logic, example, token cost estimate.

### Build parsers
We need TRON line parsers in Python, JavaScript, and Rust.
See `examples/` for test cases to validate against.

### Build validators
Lint tools for:
- TRON field completeness per turn
- Sparse6 edge consistency (referenced nodes exist)
- CONF tag presence on all edges

### Improve the skill
Edit `SKILL.md`, open a PR with changes + rationale + before/after example.

## PR guidelines
- One change per PR
- Include a working example
- Update `CHANGELOG.md` under `[Unreleased]`
- Anonymise any real conversation data
