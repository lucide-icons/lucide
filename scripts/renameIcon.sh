#!/usr/bin/env bash
oldName=$(basename "${1%.*}")
newName=$(basename "${2%.*}")

if [ -z "$newName" ] || [ -z "$oldName" ]; then
  echo "Usage: $0 <oldIcon> <newIcon>"
  exit 1
fi
if [ -e "icons/$newName.svg" ]; then
  echo "ERROR: Icon icons/$newName.svg already exist" >&2
  exit 1
fi
if [ -e "icons/$newName.json" ]; then
  echo "ERROR: Metadata file icons/$newName.json already exist" >&2
  exit 1
fi
if [ ! -e "icons/$oldName.svg" ]; then
  echo "ERROR: Icon icons/$oldName.svg doesn't exist" >&2
  exit 1
fi
if [ ! -e "icons/$oldName.json" ]; then
  echo "ERROR: Metadata file icons/$oldName.json doesn't exist" >&2
  exit 1
fi
if ! [ -x "$(command -v jq)" ]; then
  echo "ERROR: jq is not installed." >&2
  exit 1
fi

git mv icons/"$oldName".svg icons/"$newName".svg
git mv icons/"$oldName".json icons/"$newName".json
json=$(cat icons/"$newName".json)
echo "$json" | jq ".aliases |= if type==\"array\" then .+ [\"$oldName\"] else [\"$oldName\"] end" > icons/"$newName".json
git add icons/"$newName".json

echo "SUCCESS: Next steps:"
echo "git checkout -b rename/$oldName-to-$oldName;"
echo "git commit -m 'Renamed $oldName to $oldName';"
echo "gh pr create --title 'Renamed $oldName to $oldName';"
echo "git checkout main;"
