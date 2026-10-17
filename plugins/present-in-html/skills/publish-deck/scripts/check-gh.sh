#!/bin/bash
# Checks that this machine can publish to GitHub Pages: git, the GitHub CLI (gh), a GitHub login, and permission to
# create public repositories. Prints what is missing and how to fix it for this operating system. Changes nothing.
#   bash check-gh.sh         exit 0 = ready to publish, 1 = something to fix first
# On Windows run it in Git Bash (it comes with Git for Windows), or follow references/install-gh.md in PowerShell.

ok=1
say() { printf '%s\n' "$*"; }
os="$(uname -s 2>/dev/null || echo unknown)"
case "$os" in
  Darwin) plat=macOS ;;
  Linux) plat=Linux ;;
  MINGW*|MSYS*|CYGWIN*) plat=Windows ;;
  *) plat="$os" ;;
esac

install_hint() {
  case "$plat" in
    macOS) say "  install:  brew install gh      (no Homebrew? download the macOS installer from https://cli.github.com)" ;;
    Windows) say "  install:  winget install --id GitHub.cli      (then open a new terminal)" ;;
    Linux)
      if command -v apt >/dev/null; then say "  install:  the official apt repository (Debian, Ubuntu, Raspberry Pi OS): see references/install-gh.md"
      elif command -v dnf >/dev/null; then say "  install:  sudo dnf config-manager --add-repo https://cli.github.com/packages/rpm/gh-cli.repo && sudo dnf install gh   (DNF5: see references/install-gh.md)"
      elif command -v yum >/dev/null; then say "  install:  sudo yum-config-manager --add-repo https://cli.github.com/packages/rpm/gh-cli.repo && sudo yum install gh"
      elif command -v zypper >/dev/null; then say "  install:  sudo zypper addrepo https://cli.github.com/packages/rpm/gh-cli.repo && sudo zypper ref && sudo zypper install gh"
      elif command -v pacman >/dev/null; then say "  install:  sudo pacman -S github-cli"
      else say "  install:  see https://github.com/cli/cli#installation (avoid the snap package)"; fi ;;
    *) say "  install:  see https://github.com/cli/cli#installation" ;;
  esac
}

# 1. git
if command -v git >/dev/null; then say "ok    git $(git --version | awk '{print $3}')"
else ok=0; say "MISS  git is not installed"
  case "$plat" in
    macOS) say "  install:  xcode-select --install   (or: brew install git)" ;;
    Windows) say "  install:  winget install --id Git.Git" ;;
    *) say "  install:  your package manager, e.g. sudo apt install git / sudo dnf install git" ;;
  esac
fi

# 2. gh
if ! command -v gh >/dev/null; then
  ok=0; say "MISS  the GitHub CLI (gh) is not installed"; install_hint
  say "  then:     gh auth login"
  exit 1
fi
say "ok    gh $(gh --version | head -1 | awk '{print $3}')"

# 3. logged in to github.com
status="$(gh auth status --hostname github.com 2>&1)"
if ! printf '%s' "$status" | grep -qiE 'Logged in to github.com'; then
  say "MISS  gh is not logged in to github.com"
  say "  fix:      gh auth login     (choose GitHub.com, HTTPS, and log in with a web browser)"
  say "            in Claude Code, type:  ! gh auth login"
  exit 1
fi
login="$(gh api user --jq .login 2>/dev/null)"
if [ -z "$login" ]; then
  say "MISS  logged in, but the GitHub API does not answer (network, or an expired token)"
  say "  fix:      gh auth refresh   or   gh auth login"
  exit 1
fi
say "ok    logged in as $login"

# 4. permission to create a repository and push to it
scopes="$(printf '%s' "$status" | grep -i 'Token scopes' | head -1)"
if [ -n "$scopes" ] && ! printf '%s' "$scopes" | grep -qE "'(repo|public_repo)'"; then
  ok=0; say "MISS  the login cannot create repositories ($scopes)"
  say "  fix:      gh auth refresh -h github.com -s repo"
elif [ -z "$scopes" ]; then
  say "note  token scopes not shown (a fine-grained token or GH_TOKEN): it needs repository Administration and Contents"
  say "      write access, and Pages write access, or creating the repository or turning on Pages will fail"
else
  say "ok    can create repositories ($(printf '%s' "$scopes" | sed 's/.*Token scopes: //'))"
fi

# 5. git can push over HTTPS with the gh login
if gh auth status 2>&1 | grep -qi 'Git operations protocol: ssh'; then
  say "note  git uses SSH for GitHub: make sure your SSH key is added (ssh -T git@github.com)"
fi

[ $ok = 1 ] && { say "ready to publish"; exit 0; } || exit 1
