# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2026-07-12

### Changed
- **Repository Restructure**: Merged all runtime prompt assets, intent detection routing, and parameter configurations into a single, root-level `SKILL.md` to conform to target Claude Skills platform requirements.
- **Removed Obsolete Directories**: Deleted `/skill` folder containing separate configurations, manifests, and changelogs.
- **Documentation Updates**: Updated installation instructions, FAQ, and troubleshooting pages to point directly to the single root-level `SKILL.md`.

## [1.0.0] - 2026-07-12

### Added
- **Core Prompt System**: Initial release of `TokenGuardian` system instructions (`SKILL.md`) supporting:
  - Intent classification (`coding`, `writing`, `debugging`, `research`, `planning`, `explanation`, `editing`, `brainstorming`, `summarization`).
  - Adaptive Verbosity matrix (`minimal`, `balanced`, `detailed`, `comprehensive`).
  - Progressive disclosure engine preventing pre-emptive explanations.
  - Context compression syntax utilizing semantic markers.
  - Conversational redundancy elimination.
- **Skill Metadata & Manifest**: Added `skill/manifest.json` for integration with Claude Desktop and prompt injection boundaries.
- **Documentation Suite**: Added complete documentation for:
  - Architecture overview (`docs/Architecture.md`).
  - Multi-platform installation (`docs/Installation.md`).
  - Custom configuration parameters (`docs/Configuration.md`).
  - Token-saving mechanisms and philosophies (`docs/Optimization.md`).
  - Frequently Asked Questions (`docs/FAQ.md`).
  - Benchmark parameters and specifications (`docs/Benchmarks.md`).
  - Troubleshooting guidelines (`docs/Troubleshooting.md`).
  - Prompt engineering best practices (`docs/BestPractices.md`).
- **Standard Templates**: Added Issue templates (`bug_report.md`, `feature_request.md`), funding configuration (`FUNDING.yml`), pull request templates, and workflow configurations.
- **Visual Assets**: Project logo and comparative banners.

### Changed
- *Initial release of the fully structured workspace.*

---
[1.0.0]: https://github.com/open-source/TokenGuardian/releases/tag/v1.0.0
