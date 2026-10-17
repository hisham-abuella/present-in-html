# Install and log in to the GitHub CLI (gh)

Publishing needs `git`, `gh` and a GitHub account. `scripts/check-gh.sh` checks all of it and points here. Official
instructions: https://github.com/cli/cli#installation (Linux: https://github.com/cli/cli/blob/trunk/docs/install_linux.md).
Installing software and logging in are the user's own steps: give them the command for their system and let them run it
(in Claude Code they can type `! <command>`); don't install anything for them without asking.

## macOS

| Method | Command |
|---|---|
| Homebrew (recommended) | `brew install gh` |
| MacPorts | `sudo port install gh` |
| Installer | download the macOS `.pkg` from https://cli.github.com |

Git usually comes with the Xcode command line tools: `xcode-select --install` (or `brew install git`).

## Windows

| Method | Command (PowerShell) |
|---|---|
| WinGet (recommended) | `winget install --id GitHub.cli` |
| Scoop | `scoop install gh` |
| Chocolatey | `choco install gh` |
| Installer | download the `.msi` from https://cli.github.com |

Git: `winget install --id Git.Git`. Open a **new** terminal after installing so `gh` is on the PATH. The skill's scripts are
bash: run them in Git Bash (installed with Git for Windows) or in WSL.

## Linux

Debian, Ubuntu, Raspberry Pi OS (official apt repository):

```bash
(type -p wget >/dev/null || (sudo apt update && sudo apt install wget -y)) \
	&& sudo mkdir -p -m 755 /etc/apt/keyrings \
	&& out=$(mktemp) && wget -nv -O$out https://cli.github.com/packages/githubcli-archive-keyring.gpg \
	&& cat $out | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null \
	&& sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
	&& sudo mkdir -p -m 755 /etc/apt/sources.list.d \
	&& echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
	&& sudo apt update \
	&& sudo apt install gh -y
```

Fedora, CentOS, RHEL (DNF5):

```bash
sudo dnf install dnf5-plugins
sudo dnf config-manager addrepo --from-repofile=https://cli.github.com/packages/rpm/gh-cli.repo
sudo dnf install gh
```

Fedora, CentOS, RHEL (DNF4):

```bash
sudo dnf install 'dnf-command(config-manager)'
sudo dnf config-manager --add-repo https://cli.github.com/packages/rpm/gh-cli.repo
sudo dnf install gh
```

Amazon Linux 2 and other yum systems:

```bash
type -p yum-config-manager >/dev/null || sudo yum install yum-utils
sudo yum-config-manager --add-repo https://cli.github.com/packages/rpm/gh-cli.repo
sudo yum install gh
```

openSUSE, SUSE:

```bash
sudo zypper addrepo https://cli.github.com/packages/rpm/gh-cli.repo
sudo zypper ref
sudo zypper install gh
```

Arch Linux (community package): `sudo pacman -S github-cli`

Avoid the snap package (the gh team discourages it) and the old community Debian/Ubuntu packages 2.45 and 2.46, which no
longer work with GitHub's API. Homebrew on Linux (`brew install gh`) and the release binaries also work.

## Log in

```bash
gh auth login        # GitHub.com, HTTPS, "Login with a web browser"; say yes to authenticating git with your GitHub credentials
gh auth status       # should say "Logged in to github.com" with token scopes including 'repo'
```

If the login lacks the `repo` scope (the check says it cannot create repositories): `gh auth refresh -h github.com -s repo`.

No GitHub account yet: create a free one at https://github.com/signup. On a free plan, GitHub Pages works only for public
repositories.

Without a browser (a server, a container): `gh auth login --with-token < token.txt`, using a personal access token with
the `repo` scope (classic), or a fine-grained token with Administration, Contents and Pages write access.
