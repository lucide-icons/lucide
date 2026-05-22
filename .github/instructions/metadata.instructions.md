---
applyTo: "icons/*.json"
---

The schema for the JSON metadata descriptor can be found in `icon.schema.json`. It defines the required and optional properties for the JSON files that accompany each icon. The JSON metadata descriptor should be placed in the same directory as the SVG file of the icon and should have the same name as the SVG file, but with a `.json` extension. For example, if the SVG file is named `home.svg`, the JSON metadata descriptor should be named `home.json`.

# Contributors

The `contributors` property is an array of GitHub usernames of the contributors who created or contributed to the icon. This property is require, it's used to give credit to the contributors and to track the history of the icon. The contributor of the PR should be added to the `contributors` array if they are not already listed. This is only if the contributor has made a significant contribution to the svg of the icon.

## Tags

The `tags` property is an array of strings that describe the icon and can be used for searching.
Validate the tags against the `icon.schema.json` to ensure they are correctly formatted and adhere to the defined structure.
Provide tag suggestions based on the name of the icon and the use cases provided in the PR description. Use the existing tags in the repository as a reference for consistency and to avoid duplicates. Don't suggest words like: 'icon' and preferably use single words. Tags should always be in lowercase and should not contain spaces. The name of icon should not be included in the tags, as it is already specified.

# Categories

The `categories` property is an array of strings that specify the categories to which the icon belongs, such as "devices", "interface", "media", etc. See the `categories` property in the `icon.schema.json` for more details on the allowed values. The categories should be chosen based on the use cases provided in the PR description and the existing categories in the repository. The categories should be relevant to the icon and should help users find the icon when searching for specific types of icons. The name of icon should not be included in the categories, as it is already specified. Suggest categories based on the name of the icon and the use cases provided in the PR description. Use the existing categories in the repository as a reference for consistency and to avoid duplicates. Categories should always be in lowercase and should not contain spaces.
