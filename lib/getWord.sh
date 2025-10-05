#!/usr/bin/env bash

grep -E "^\w{${1}}$" /usr/share/dict/words | shuf | head -n 1
