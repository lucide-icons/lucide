---
applyTo: "icons/*.json"
---
# JSON Metadata Descriptor

The schema for the JSON metadata descriptor can be found in `icon.schema.json`. It defines the required and optional properties for the JSON files that accompany each icon. The JSON metadata descriptor should be placed in the same directory as the SVG file of the icon and should have the same name as the SVG file, but with a `.json` extension. For example, if the SVG file is named `home.svg`, the JSON metadata descriptor should be named `home.json`.

## Contributors

The `contributors` property is a required array of GitHub usernames for the people who created or contributed to the icon. It is used to give credit to contributors and to track the icon's history. Add the PR author to the `contributors` array if they are not already listed and they have made a significant contribution to the icon's SVG.

## Tags

The `tags` property is an array of strings that describe the icon and can be used for searching.
Validate the tags against the `icon.schema.json` to ensure they are correctly formatted and adhere to the defined structure.
Provide tag suggestions based on the name of the icon and the use cases provided in the PR description. Use the existing tags in the repository as a reference for consistency and to avoid duplicates. Don't suggest words like: 'icon' and preferably use single words. Tags should always be in lowercase and should not contain spaces. The name of icon should not be included in the tags, as it is already specified.

## Categories

The `categories` property is an array of strings that specify the categories to which the icon belongs, such as "devices", "interface", "media", etc. See the `categories` property in the `icon.schema.json` for more details on the allowed values. The categories should be chosen based on the use cases provided in the PR description and the existing categories in the repository. The categories should be relevant to the icon and should help users find the icon when searching for specific types of icons. The name of icon should not be included in the categories, as it is already specified. Suggest categories based on the name of the icon and the use cases provided in the PR description. Use the existing categories in the repository as a reference for consistency and to avoid duplicates. Categories should always be in lowercase and should not contain spaces.

## Use Cases

The `use-cases` property is an array of strings that describe the specific scenarios in which the icon would be used. Each use case should be concise and clearly convey the context in which the icon is applicable. Use the existing use cases in the repository as a reference for consistency and to avoid duplicates.

### Writing icon use-cases

A use-case tells a reader **where and why an icon would be used in a real interface**. Each entry should let someone who has never seen the icon understand what it's for.

### Format

- Write each use-case as a short phrase, not a sentence. Start with a present participle verb: *Representing…*, *Indicating…*, *Marking…*, *Showing…*, *Confirming…*, *Toggling…*, *Categorizing…*, *Searching…*.
- Keep it to roughly 4–12 words. One clear idea per entry.
- No trailing period. No leading bullet, number, or dash (the surrounding format supplies that).
- Give each icon 1–4 use-cases, ordered most-common first. Prefer fewer strong entries over many weak or repetitive ones.

### Voice

- Write from the interface's perspective, describing the function: "Indicating a low battery charge level" — not the requester's story ("I need an icon that shows…").
- Name the concrete context where useful: *in smart home apps*, *in navigation apps*, *in text editors*, *on maps*. Context is what makes a use-case self-explanatory.
- Be neutral and factual. No first person, no marketing adjectives ("perfect for", "ideal", "beautiful"), no emoji.

### What to exclude

- **The requester's personal narrative.** "I'm building a SvelteKit UI and need…" → drop the framing, keep the function.
- **References to other issues, PRs, or icons by ID.** No "As provided in #1865", "complementary to git-branch-plus", "same as above", "see #2055".
- **Design/implementation chatter.** Bezier offsets, grid alignment, path cuts, "the icon works perfectly" — none of that is a use-case.
- **Restating the icon's name.** For `microchip`, "microchip" is not a use-case; describe what it represents ("Representing processors, chips, or embedded hardware").
- **Links, image tags, emoji, and markdown artifacts.**
- **Meta-commentary.** "Self-explanatory", "lots and lots of use cases", "obvious :)".

### Cross-contamination

When a request covers several icons at once, assign each use-case only to the icon it actually describes. A bullet prefixed with another icon's name belongs to that icon, not this one. Don't let `briefcase-medical`'s meanings leak into `briefcase-business`.

### Variants

Related icons should get **variant-specific** wording, not one shared blurb. `battery-low` → "Indicating a low battery charge level"; `battery-full` → "…full…". `square-arrow-right-enter` → sign in / join; `-exit` → sign out / export. Resist copying the same line across a family.

## Examples

Good:

- `ambulance` → "Directing users to nearby emergency services in navigation apps"
- `calendar-sync` → "Representing recurring events, promotions, or limited-time offers"
- `globe-x` → "Indicating a device or application is offline or unreachable"
- `heading-2` → "Applying a level-2 heading in text editors"

Poor → fixed:

- ~~"I need a firewall icon :-)"~~ → "Representing firewalls and firewall rules on cybersecurity platforms"
- ~~"As above"~~ → "Signifying a deal, agreement, or partnership"
- ~~"microchip"~~ → "Representing processors, chips, or embedded hardware"
- ~~"Same use cases as the other currency symbols, except Turkish lira"~~ → "Displaying prices or amounts in Turkish lira"
