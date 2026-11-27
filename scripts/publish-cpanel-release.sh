#!/usr/bin/env bash
set -euo pipefail

workspace="$GITHUB_WORKSPACE"
source_ref=refs/heads/cpanel-production
release_ref=refs/heads/cpanel-ready

source_head="$(git -C "$workspace" ls-remote origin "$source_ref")"
if [[ "$source_head" != "$GITHUB_SHA"$'\t'"$source_ref" ]]; then
    echo "A newer production commit is available."
    exit 0
fi

stage="$(mktemp -d "$RUNNER_TEMP/cpanel-release.XXXXXXXX")"
cp -- "$workspace/dist/index.html" "$stage/index.html"
cp -R -- "$workspace/dist/assets" "$stage/assets"
for file in favicon.png logo.png bdt-icon.png; do
    if [[ -f "$workspace/dist/$file" ]]; then
        cp -- "$workspace/dist/$file" "$stage/$file"
    fi
done
printf '%s\n' "$GITHUB_SHA" > "$stage/build-revision"

export GIT_INDEX_FILE="$RUNNER_TEMP/cpanel-release.index"
git_dir="$workspace/.git"
git -C "$stage" --git-dir="$git_dir" --work-tree="$stage" add --all
tree="$(git --git-dir="$git_dir" write-tree)"

parent=()
old="$(git --git-dir="$git_dir" ls-remote origin "$release_ref")"
if [[ -n "$old" ]]; then
    git --git-dir="$git_dir" fetch --no-tags --depth=1 origin "$release_ref"
    parent=(-p "$(git --git-dir="$git_dir" rev-parse FETCH_HEAD)")
fi

commit="$(git --git-dir="$git_dir" -c user.name='github-actions[bot]' \
    -c user.email='41898282+github-actions[bot]@users.noreply.github.com' \
    commit-tree "$tree" ${parent[@]+"${parent[@]}"} -m "Build $GITHUB_SHA for cPanel")"
git --git-dir="$git_dir" push origin "$commit:$release_ref"
