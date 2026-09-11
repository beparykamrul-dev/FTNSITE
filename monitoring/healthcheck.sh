#!/usr/bin/env bash
set -u
check() { if "$@" >/dev/null 2>&1; then echo "OK $*"; else echo "FAIL $*"; fi; }
check command -v snmpget
check command -v snmpwalk
check command -v curl
check command -v ping
check command -v chronyc
check command -v ss
