#!/usr/bin/env bash
set -euo pipefail

target="${1:?Pass the storefront document root}"
repo_root="$(cd -- "$(dirname -- "$0")/.." && pwd)"
release="$repo_root/release"
backup_dir="$(dirname -- "$target")/.redpharma-storefront-backups"

test -d "$target"
test -s "$release/index.html"

install -d -m 0755 "$target/assets"
install -m 0644 -t "$target/assets" -- "$release"/assets/*
(umask 077; mkdir -p "$backup_dir")

if [[ -f "$target/index.html" ]]; then
    (umask 077; cp -- "$target/index.html" "$backup_dir/index.previous.html")
fi

next_index="$(mktemp "$target/.redpharma-index.XXXXXXXX")"
trap 'rm -f -- "$next_index"' EXIT
install -m 0644 "$release/index.html" "$next_index"
mv -f -- "$next_index" "$target/index.html"
