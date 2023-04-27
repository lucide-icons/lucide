#!/bin/bash
delimiter="$(openssl rand -hex 8)"
echo "body<<$delimiter" >> $GITHUB_OUTPUT
for file in "$@"; do
  echo "![$file](https://raw.githubusercontent.com/$GITHUB_EVENT_PULL_REQUEST_HEAD_REPO_FULL_NAME/$GITHUB_EVENT_PULL_REQUEST_HEAD_REF/icons/$file) "
  tr '\n' ' ' < "$file" # remove line breaks from file content
  sed -e 's/<svg[^>]*>/<svg>/g' | # remove attributes from svg element
  base64 -w 0 | # encode svg
  sed "s|.*|<img width=\"400\" title=\"$file\" alt=\"$file\" src=\"https://lucide.dev/api/gh-icon/&.svg\"/> |"
done | tr '\n' ' ' >> $GITHUB_OUTPUT
echo >> $GITHUB_OUTPUT
echo "$delimiter" >> $GITHUB_OUTPUT
