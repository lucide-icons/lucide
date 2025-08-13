# Our Official Stance on Including Brand Logos in Lucide

## TL;DR

Lucide **does not accept** brand logos, and we do not plan to add them in the future. This is due to a combination of **legal restrictions**, **design consistency concerns**, and **practical maintenance reasons**.

If you need brand icons, we recommend [Simple Icons](https://simpleicons.org/), which provides an extensive, legally safer collection of brand marks in SVG format.

---

## 1. Historical Context

This is not a new debate — other icon sets have gone through the same discussion:

- **Material Design Icons** [deprecated all brand icons](https://github.com/Templarian/MaterialDesign/issues/6602) because they were not stylistically consistent, did not fit within a single-color / 24×24px grid in a recognisable way, and were a poor match for the overall set.
- **Feather Icons** [reached a similar conclusion](https://github.com/feathericons/feather/issues/763): brand marks have their own design language, and trying to “Feather-ify” them inevitably leads to aesthetic compromises.
- We at **Lucide** have learnt from these lessons and choose to focus on what Lucide does best — a cohesive, consistent set of non-brand icons.

---

## 2. Legal Considerations

Most brand logos are:
- **Protected by trademark or copyright**.
- Bound by **strict brand guidelines** (color, proportions, spacing, etc.).
- Explicitly **prohibited from being modified** — even though modification would be required to match Lucide's style.

Because of this, adding brand icons would:

1. Risk violating trademark or copyright.
2. Place legal responsibility on both the **user** and the **Lucide project**.
3. Force maintainers into case-by-case legal vetting for every new brand request — something we cannot realistically do.

> **Note:** Simple Icons sidesteps these issues by keeping logos unmodified, in their official forms, but even they aren't exempt from [occasional legal struggles](https://github.com/simple-icons/simple-icons/issues/11236).

---

## 3. Design & Consistency

Lucide is built around **visual consistency**.

Including brand logos would mean:

- Having to break our own design rules for shape, proportion, and stroke.
- Mixing two fundamentally different categories of graphics (pictograms vs. corporate marks).
- Creating a library where a subset of icons always looks "out of place".

If the logos are not in Lucide's style, why include them in Lucide at all? Better to use them from a dedicated brand icon source.

---

## 4. Maintenance Burden

Even with our current **"no brand icon requests"** rule, people still request them regularly.

Having *any* brand icons in the set:

- Signals that we might accept new ones.
- Creates repeated, unproductive request cycles.
- Wastes maintainer time redirecting people to the deprecation decision.

Removing them entirely solves this problem.

---

## 5. Recommended Alternatives

If you need brand icons:

- [Simple Icons](https://simpleicons.org/) — Covers a huge range of brands, consistent SVG format, 24×24 viewBox.
- Official brand asset pages: most major companies provide downloadable SVGs.

You can mix these with Lucide in your project without bloating our core library.

---

## Final Word

Lucide is an **icon** set, not a **logo** set.

Logos belong in dedicated logo resources.

We're focusing on what Lucide does best: providing a clean, cohesive, and legally safe set of open-source icons.
