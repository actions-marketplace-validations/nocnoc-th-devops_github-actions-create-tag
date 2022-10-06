#!/bin/bash
version=`cat package.json | grep version | cut -d':' -f 2 | sed 's/[\", ]*//g'`
git tag -a -m "Release $version" "v$version"
git push --follow-tags
