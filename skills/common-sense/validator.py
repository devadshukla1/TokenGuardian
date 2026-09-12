"""Deterministic checks for the Common Sense skill package.

This validator does not attempt to judge LLM reasoning. It checks structural
properties that should remain true for the skill artifact itself.
"""

from __future__ import annotations

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent
SKILL = ROOT / "SKILL.md"
README = ROOT / "README.md"
TESTS = ROOT / "tests" / "test_cases.md"

REQUIRED_SECTIONS = (
    "# Common Sense Skill",
    "## Mission",
    "## 1. Understand the Real Task",
    "## 2. Ask Only High-Value Questions",
    "## 3. Verify Fast: Hypothesize -> Check -> Eliminate -> Select",
    "## 4. Brute Force Is a Tool, Not a Default Solution",
    "## 5. Accuracy Gates",
    "## 8. Never Produce Half-Complete Work",
    "## Software Engineering Mode",
    "## 11. Optimal-Technique Check",
    "## 12. Prevent Overengineering",
    "## 14. Code Quality Rules",
    "## Final Pre-Response Gate",
)


def validate() -> None:
    for path in (SKILL, README, TESTS):
        assert path.is_file(), f"Missing required file: {path}"
        assert path.stat().st_size > 0, f"Empty file: {path}"

    text = SKILL.read_text(encoding="utf-8")

    for section in REQUIRED_SECTIONS:
        assert section in text, f"Missing required section: {section}"

    # YAML front matter must have a name and semantic version.
    assert text.startswith("---\n"), "SKILL.md must start with YAML front matter"
    assert re.search(r"^name:\s*common-sense\s*$", text, re.MULTILINE)
    assert re.search(r"^version:\s*\d+\.\d+\.\d+\s*$", text, re.MULTILINE)

    # The skill must explicitly reject the impossible guarantee of 1000% accuracy.
    assert "cannot honestly guarantee 1000% accuracy" in text

    # Required behavioral safeguards.
    required_terms = (
        "Do not invent",
        "current authoritative source",
        "No placeholders",
        "Avoid overengineering",
        "Stop when the requested goal is complete",
    )
    for term in required_terms:
        assert term in text, f"Missing safeguard: {term}"


if __name__ == "__main__":
    validate()
    print("Common Sense skill validation passed.")
