---
applyTo: "docs/*.md"
---
# UX writing guidelines

Follow these guidelines when writing or editing Lucide documentation, especially Markdown files.

Write for people who are trying to understand a concept, follow a specification, or complete a task. Prioritize clarity, precision, and scannability over personality or decorative prose.

## Be direct and concise

State the important information first. Remove words that do not add meaning.

Prefer short sentences and paragraphs, but do not sacrifice precision just to make text shorter.

**Do:**

> Icons must use a 24 × 24 pixel canvas.

**Don't:**

> When creating a new icon, you should make sure that the canvas you're working with has dimensions of 24 × 24 pixels.

Avoid unnecessary introductions such as:

- "It's important to note that…"
- "Keep in mind that…"
- "As you can see…"
- "In order to…"
- "It should be noted that…"

State the information directly instead.

## Put the rule before the explanation

When documenting a requirement or recommendation, state it before explaining why it exists.

**Do:**

> Keep at least 1 pixel of space between unrelated elements. This prevents shapes from visually merging at small sizes.

**Don't:**

> Because shapes can visually merge at small sizes, it's important to make sure that unrelated elements have enough space between them.

This makes documentation easier to scan and makes normative requirements easier to identify.

## Explain the reason when it adds value

Explain *why* a rule exists when the reasoning helps contributors apply it to situations that are not explicitly documented.

Do not merely restate the rule.

**Do:**

> Avoid simulated fills. They don't scale consistently with the rest of the icon set.

**Don't:**

> Avoid simulated fills because simulated fills should not be used.

Reasoning is particularly useful for design rules where contributors may need to evaluate unusual cases.

## Use scannable structure

Assume readers will scan the page before reading it in detail.

Use:

- descriptive headings
- short paragraphs
- lists for sets of related items
- examples for rules that benefit from demonstration
- **bold** for important terms or short emphasis
- code formatting for filenames, properties, commands, values, and identifiers

Avoid long uninterrupted blocks of text.

Headings should communicate the subject or rule without requiring the surrounding text for context.

**Do:**

> ## Keep 1 pixel of safe space

**Don't:**

> ## Spacing

## Use sentence case

Use sentence case for:

- page titles
- headings
- table headings
- labels
- example captions

Capitalize proper nouns and branded terms normally.

**Do:**

> ## Use consistent corner radii

**Don't:**

> ## Use Consistent Corner Radii

## Address the reader directly

Use **you** and **your** when referring to something the reader does.

**Do:**

> If your icon contains overlapping shapes, simplify the hidden geometry.

Avoid referring to the reader as "the user," "the contributor," or other third-person terms when direct language is more natural.

However, prefer an imperative when the subject is obvious.

**Prefer:**

> Keep related elements visually grouped.

**Over:**

> You should keep related elements visually grouped.

## Use "we" only when it means the Lucide project or maintainers

First-person plural is acceptable when describing an intentional project decision, convention, or policy.

**Do:**

> We use `kebab-case` for icon names.

> We generally avoid adding brand logos to Lucide.

Do not use "we" merely to make documentation conversational.

**Prefer:**

> Icons use a 2 pixel stroke.

**Over:**

> We use a 2 pixel stroke for our icons.

## Use normative language consistently

Use specific language to communicate how strictly a rule applies.

- **must** — required; violating this is not acceptable
- **must not** — prohibited
- **should** — recommended; exceptions may be appropriate
- **should not** — discouraged; exceptions may be appropriate
- **can** — possible or permitted
- **may** — optional or dependent on context

Do not use **should** when something is actually required.

**Do:**

> Icons must use a 24 × 24 pixel canvas.

**Don't:**

> Icons should use a 24 × 24 pixel canvas.

Avoid vague substitutes such as "ideally," "normally," or "preferably" when a more precise normative term applies.

## Prefer active voice

Use active voice unless passive voice makes the subject clearer or avoids unnecessary repetition.

**Do:**

> Align nodes to the pixel grid.

**Don't:**

> Nodes should be aligned to the pixel grid.

Passive voice is acceptable when the actor is irrelevant.

> Deprecated icons are removed in major releases.

## Use positive instructions when possible

Tell readers what to do rather than only what not to do.

**Do:**

> Use a single continuous path when the elements form one continuous shape.

**Less useful:**

> Don't split continuous shapes into unnecessary paths.

Use negative instructions when the prohibition itself is important.

> Don't use simulated fills.

## Be precise about consequences

When explaining why something should or should not be done, describe the actual consequence rather than using vague warnings.

**Do:**

> Keep unrelated elements at least 2 pixels apart. Smaller gaps can disappear when the icon is rendered at small sizes.

**Don't:**

> Be careful when placing elements too close together.

Avoid language that exaggerates consequences or attempts to influence a contributor's decision emotionally.

## Prefer concrete language

Use specific terms instead of vague references.

**Do:**

> The two endpoints must remain inside the 1 pixel safe zone.

**Don't:**

> These should stay within the appropriate area.

Avoid ambiguous references such as:

- this
- that
- it
- things
- stuff
- appropriate
- proper
- correct

when the intended subject can be named directly.

## Introduce terminology before relying on it

Define Lucide-specific or technical terms when readers may not already know them.

Once defined, use the same term consistently.

**Do:**

> The **safe zone** is the 1 pixel area between the icon artwork and the canvas boundary.

Do not alternate between different terms for the same concept unless the distinction is intentional.

For example, don't alternate between "safe zone," "padding," and "margin" if they refer to the same rule.

## Use abbreviations sparingly

Spell out uncommon abbreviations on first use.

> Scalable Vector Graphics (SVG)

Common technical abbreviations such as HTML, CSS, SVG, API, and URL do not need to be expanded when the intended audience can reasonably be expected to know them.

Avoid Latin abbreviations such as:

- e.g.
- i.e.
- etc.

Prefer:

- for example
- that is
- and so on

## Use examples deliberately

Use examples when they clarify how to apply a rule.

Keep examples focused on the rule being demonstrated. Avoid introducing unrelated differences that make the comparison harder to understand.

When contrasting examples, use **Do** and **Don't** consistently.

**Do:**

> Use one path for a continuous outline.

**Don't:**

> Split a continuous outline into several overlapping paths.

The explanatory text should describe the principle, not merely narrate what is visible in the example.

## Use links descriptively

Link text should describe the destination or concept.

**Do:**

> See the [Icon Design Specification](./specification) for exact dimensions and spacing requirements.

**Don't:**

> For more information, [click here](./specification).

Avoid generic link text such as:

- click here
- here
- this page
- learn more

when a descriptive label is possible.

## Avoid unnecessary repetition

Do not repeat information already established by a heading, example, or immediately preceding sentence.

**Prefer:**

> ## Keep 1 pixel of safe space
>
> Keep all artwork within the 22 × 22 pixel live area.

**Over:**

> ## Keep 1 pixel of safe space
>
> When designing an icon, you should keep 1 pixel of safe space around the icon.

Cross-reference another section instead of duplicating detailed rules that already have a canonical explanation.

## Use contractions in prose

Use natural contractions such as:

- don't
- can't
- isn't
- it's
- you'll

They make explanatory prose less formal and easier to scan.

Use uncontracted forms when deliberate emphasis is useful.

> Do not change existing icon geometry solely to reduce the number of SVG nodes.

Normative statements using **must not** should not be contracted.

## Use the serial comma

Use the serial (Oxford) comma in lists of three or more items.

**Do:**

> Check the icon's size, stroke width, and spacing.

**Don't:**

> Check the icon's size, stroke width and spacing.

## Use punctuation normally in prose

Use periods for complete sentences.

Periods may be omitted from:

- headings
- short labels
- short list items that are not complete sentences
- captions consisting only of a short phrase

Be consistent within a list.

If list items are complete sentences, end them with periods. If they are fragments, generally omit periods.

## Skip colons in headings

Do not end headings with colons.

**Do:**

> ## Naming conventions

**Don't:**

> ## Naming conventions:

Use a colon normally when introducing a list or explanation in body text.

## Use exclamation points sparingly

Avoid exclamation points in technical documentation unless the context genuinely calls for excitement or celebration.

**Prefer:**

> Your first icon is ready.

**Over:**

> Your first icon is ready!

Do not use exclamation points to make instructions sound friendlier.

## Use ellipses only when they have meaning

Use an ellipsis (`…`) to represent omitted content or an intentionally incomplete statement.

Do not use ellipses decoratively or to make prose sound conversational.

When documenting literal UI text, preserve the punctuation used by the interface.

## Use parentheses for definitions and compact clarification

Use parentheses when they make a definition, abbreviation, or short clarification easier to understand.

> Scalable Vector Graphics (SVG)

Avoid using parentheses for long side notes. Rewrite important information as part of the sentence or as a separate sentence.

## Prefer "and" over ampersands

Use **and** in normal prose.

**Do:**

> Naming and metadata

**Avoid:**

> Naming & metadata

Use an ampersand only when it is part of an official name, literal UI text, code, or another established term.

## Avoid em dashes

Prefer commas, periods, colons, or parentheses when they produce a simpler sentence.

**Prefer:**

> This rule has one exception: existing legacy icons.

**Avoid:**

> This rule has one exception — existing legacy icons.

Use an en dash (`–`) without surrounding spaces for ranges.

> 1–3 pixels

> A–Z

Do not substitute a hyphen for an en dash in prose ranges unless required by a technical syntax.

## Use hyphens correctly

Hyphenate compound modifiers when necessary for clarity.

> 24 × 24 pixel canvas

> 2-pixel-wide gap

> pixel-aligned element

Do not hyphenate a phrase when it functions as a verb.

> Sign off on the design.

> Complete the sign-off.

Do not add hyphens mechanically when the meaning is already clear.

## Use code formatting consistently

Use backticks for literal technical values and identifiers, including:

- filenames and paths
- commands
- package names
- properties and attributes
- icon names
- code values
- SVG elements and attributes

**Do:**

> Add `camera-off` as an alias.

> Set `stroke-width` to `2`.

> Edit `icons/camera.svg`.

Do not use code formatting merely for emphasis.

## Use bold for semantic emphasis

Use **bold** sparingly to highlight a term or distinction that helps readers scan the page.

Do not bold entire sentences or paragraphs.

Prefer bold over italics for general emphasis.

Use *italics* only when conventional, such as when referring to a term as a term or when a specific distinction benefits from it.

## Don't use all caps for emphasis

Do not use blocks of uppercase text for emphasis.

**Don't:**

> NEVER place nodes outside the canvas.

**Do:**

> **Never** place nodes outside the canvas.

Preserve capitalization when documenting literal identifiers or established technical terms.

## Keep lists parallel

Items in the same list should use the same grammatical structure.

**Do:**

- Use a 24 × 24 pixel canvas
- Keep 1 pixel of safe space
- Use a 2 pixel stroke
- Align nodes to the pixel grid

**Don't:**

- Use a 24 × 24 pixel canvas
- Safe space should be 1 pixel
- A 2 pixel stroke
- Nodes are aligned to the pixel grid

Parallel structure makes rules easier to scan and compare.

## Avoid unnecessary filler and enthusiasm

Lucide documentation should sound helpful and confident, not promotional.

Avoid filler such as:

- "Simply…"
- "Just…"
- "Obviously…"
- "Of course…"
- "Easy…"
- "Luckily…"
- "Don't worry…"

These words can be inaccurate or dismissive when the task is not simple for the reader.

Also avoid marketing language such as:

- "powerful"
- "seamless"
- "effortless"
- "amazing"
- "best-in-class"

unless the word communicates a specific, verifiable distinction.

## Prefer timeless documentation

Avoid wording tied unnecessarily to the current state of development.

**Prefer:**

> Lucide supports custom icon aliases.

**Avoid:**

> Lucide now supports custom icon aliases.

Use time-sensitive language only when the timing itself matters, such as migration notes, deprecations, or release documentation.

## Preserve established Lucide terminology

When editing existing documentation, preserve established Lucide terminology and naming conventions unless there is a clear reason to change them.

Do not invent synonyms merely to avoid repetition. Consistency is more important than stylistic variety in technical documentation.

When terminology differs between the Lucide codebase, API, UI, and documentation, prefer the term used by the relevant canonical specification.
