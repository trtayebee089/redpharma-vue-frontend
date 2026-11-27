#!/usr/bin/env bash
set -euo pipefail

umask 077
export PATH=/usr/local/cpanel/3rdparty/bin:/usr/local/bin:/usr/bin:/bin

remote=https://github.com/trtayebee089/redpharma-vue-frontend.git
source_ref=refs/heads/cpanel-production
release_ref=refs/heads/cpanel-ready
home_dir="$(cd -- "$HOME" && pwd -P)"
target="$home_dir/public_html"
state="$home_dir/.redpharma-frontend-builds"

[[ -d "$target" && ! -L "$target" ]]
mkdir -p -- "$state"
exec 9>"$state/deploy.lock"
flock -n 9 || exit 0

refs="$(git ls-remote --heads "$remote" "$source_ref" "$release_ref")"
source_head=
release_head=
while IFS=$'\t' read -r revision ref; do
    case "$ref" in
        "$source_ref") source_head="$revision" ;;
        "$release_ref") release_head="$revision" ;;
    esac
done <<< "$refs"

[[ -n "$source_head" && -n "$release_head" ]] || exit 0
if [[ -f "$state/deployed" && "$(< "$state/deployed")" == "$release_head" ]]; then
    exit 0
fi

git_dir="$state/release.git"
if [[ ! -d "$git_dir" ]]; then
    git init --bare --quiet "$git_dir"
fi
git --git-dir="$git_dir" fetch --quiet --depth=1 --no-tags "$remote" "$release_ref"
commit="$(git --git-dir="$git_dir" rev-parse FETCH_HEAD)"
[[ "$commit" == "$release_head" ]] || exit 0
[[ "$(git --git-dir="$git_dir" show "$commit:build-revision")" == "$source_head" ]] || exit 0

entries="$(git --git-dir="$git_dir" ls-tree -r "$commit")"
while IFS=$'\t' read -r metadata name; do
    read -r mode type object <<< "$metadata"
    [[ "$mode" == 100644 && "$type" == blob ]]
    case "$name" in
        build-revision|index.html|favicon.png|logo.png|bdt-icon.png) ;;
        assets/*)
            [[ "$name" =~ ^assets/[a-zA-Z0-9._-]+\.(css|js|avif|png|webp|jpe?g|svg|gif|ico|woff2?|ttf|eot)$ ]]
            ;;
        *) exit 1 ;;
    esac
done <<< "$entries"

stage="$(mktemp -d "$state/release.XXXXXXXX")"
next_index=
cleanup() {
    if [[ -n "$next_index" ]]; then rm -f -- "$next_index"; fi
    rm -rf -- "$stage"
}
trap cleanup EXIT
git --git-dir="$git_dir" archive "$commit" | tar -x -C "$stage"
test -s "$stage/index.html"
test -d "$stage/assets"

[[ ! -L "$target/assets" && ! -L "$target/index.html" ]]
install -d -m 0755 "$target/assets"
for file in "$stage"/assets/*; do
    destination="$target/assets/${file##*/}"
    [[ ! -L "$destination" ]]
    install -m 0644 -- "$file" "$destination"
done
for name in favicon.png logo.png bdt-icon.png; do
    if [[ -f "$stage/$name" ]]; then
        [[ ! -L "$target/$name" ]]
        install -m 0644 -- "$stage/$name" "$target/$name"
    fi
done

if [[ -f "$target/index.html" ]]; then
    cp -- "$target/index.html" "$state/index.previous.html"
fi
next_index="$(mktemp "$target/.frontend-index.XXXXXXXX")"
install -m 0644 -- "$stage/index.html" "$next_index"
mv -f -- "$next_index" "$target/index.html"
printf '%s\n' "$commit" > "$state/deployed"
printf '%s deployed %s from %s\n' "$(date -u +%FT%TZ)" "$commit" "$source_head"
