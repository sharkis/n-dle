#!/usr/bin/env bash

grep -E "^[a-z]{${1}}$" /usr/share/dict/words | shuf | head -n 1
