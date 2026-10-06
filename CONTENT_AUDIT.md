# Content Audit — V6.3 Release Candidate

## Scope

This audit covers every lesson and Command Explorer entry shipped in the V6.3 RC data files. It checks catalog structure, bilingual coverage, command/reference provenance, source-label consistency and obvious simulator/documentation boundary issues. It is intentionally conservative: passing this audit does **not** claim that the project is a substitute for upstream manuals or that every Linux distribution behaves identically. Community review is still encouraged.

## Summary

- Lessons reviewed: **65**
- Commands reviewed: **58**
- Commands with specific reference mapping: **58/58**
- Commands flagged as potentially destructive/privileged in this review: **8**
- Known source-label mismatch corrected during RC consolidation: the permissions lesson now identifies **ArchWiki** for its ArchWiki URL.

## Review principles

- Command names and syntax remain untranslated.
- Distribution-specific tooling is described as distribution-specific rather than generic Linux behavior.
- Browser-terminal output is described as simulated when it does not represent a real host execution.
- External links are treated as deeper references, not as a replacement for the academy explanation.
- Commands with destructive or privileged real-world behavior require caution even though the browser simulator cannot modify the host.

## Lessons

| # | Lesson ID | Level | Primary command | Source | Host | Audit |
|---:|---|---|---|---|---|---|
| 1 | `linux-model` | beginner | `uname -a` | Linux Kernel Documentation | `docs.kernel.org` | PASS |
| 2 | `shell-terminal` | beginner | `echo $SHELL` | man7.org · GNU Bash | `man7.org` | PASS |
| 3 | `navigation` | beginner | `pwd` | man7.org · GNU Coreutils | `man7.org` | PASS |
| 4 | `listing` | beginner | `ls -la` | man7.org · GNU Coreutils | `man7.org` | PASS |
| 5 | `files-directories` | beginner | `mkdir linux-lab` | man7.org · GNU Coreutils | `man7.org` | PASS |
| 6 | `filesystem-hierarchy` | beginner | `tree /home/visitor` | Filesystem Hierarchy Standard 3.0 | `refspecs.linuxfoundation.org` | PASS |
| 7 | `permissions` | beginner | `ls -la` | ArchWiki | `wiki.archlinux.org` | PASS |
| 8 | `manuals` | beginner | `man ls` | Linux man-pages | `man7.org` | PASS |
| 9 | `pipes` | intermediate | `cat Projects/demo/app.log | grep ERROR` | man7.org · GNU Bash | `man7.org` | PASS |
| 10 | `redirection` | intermediate | `echo "first note" > Documents/notes.txt` | man7.org · GNU Bash | `man7.org` | PASS |
| 11 | `search-text` | intermediate | `grep ERROR Projects/demo/app.log` | man7.org · GNU grep | `man7.org` | PASS |
| 12 | `find-files` | intermediate | `find . -name "*.txt"` | man7.org · GNU Findutils | `man7.org` | PASS |
| 13 | `processes` | intermediate | `ps aux` | Linux manual pages | `man7.org` | PASS |
| 14 | `packages` | intermediate | `sudo apt update` | Debian Reference | `www.debian.org` | PASS |
| 15 | `services` | intermediate | `systemctl status ssh` | systemd manual | `www.freedesktop.org` | PASS |
| 16 | `networking` | intermediate | `ip addr` | ip(8) manual | `man7.org` | PASS |
| 17 | `bash-scripts` | advanced | `bash script.sh` | man7.org · GNU Bash | `man7.org` | PASS |
| 18 | `shell-exit-status` | advanced | `echo $?` | man7.org · GNU Bash | `man7.org` | PASS |
| 19 | `storage` | advanced | `lsblk` | lsblk(8) manual | `man7.org` | PASS |
| 20 | `mounts` | advanced | `findmnt` | findmnt(8) manual | `man7.org` | PASS |
| 21 | `logs` | advanced | `journalctl -b` | systemd journalctl manual | `www.freedesktop.org` | PASS |
| 22 | `ssh` | advanced | `ssh user@server.example` | OpenSSH manual | `man.openbsd.org` | PASS |
| 23 | `automation` | advanced | `systemctl list-timers` | systemd.timer manual | `www.freedesktop.org` | PASS |
| 24 | `security` | advanced | `id` | id(1) manual | `man7.org` | PASS |
| 25 | `open-source` | beginner | `uname -a` | kernel.org | `www.kernel.org` | PASS |
| 26 | `distribution-model` | beginner | `cat /etc/os-release` | os-release specification | `www.freedesktop.org` | PASS |
| 27 | `paths` | beginner | `cd /home/visitor/Documents` | man7.org · GNU Bash | `man7.org` | PASS |
| 28 | `copy-move` | beginner | `cp README.txt Documents/README-copy.txt` | man7.org · GNU Coreutils | `man7.org` | PASS |
| 29 | `links` | intermediate | `ln -s target shortcut` | man7.org · GNU Coreutils | `man7.org` | PASS |
| 30 | `text-less` | beginner | `less README.txt` | Linux manual pages | `man7.org` | PASS |
| 31 | `sort-uniq` | intermediate | `sort names.txt | uniq` | man7.org · GNU Coreutils | `man7.org` | PASS |
| 32 | `cut-tr-wc` | intermediate | `wc -l README.txt` | man7.org · GNU Coreutils | `man7.org` | PASS |
| 33 | `sed-basics` | intermediate | `sed "s/Linux/GNU\/Linux/" README.txt` | man7.org · GNU sed | `man7.org` | PASS |
| 34 | `awk-basics` | advanced | `awk "{print $1}" data.txt` | man7.org · GNU gawk | `man7.org` | PASS |
| 35 | `groups` | beginner | `id` | Linux man-pages | `man7.org` | PASS |
| 36 | `umask` | intermediate | `umask` | man7.org · GNU Bash | `man7.org` | PASS |
| 37 | `sudo-model` | intermediate | `sudo -l` | sudo manual | `www.sudo.ws` | PASS |
| 38 | `repositories` | intermediate | `apt list --upgradable` | Debian Reference | `www.debian.org` | PASS |
| 39 | `rpm-dpkg` | intermediate | `dpkg -l` | Debian Reference | `www.debian.org` | PASS |
| 40 | `jobs` | intermediate | `jobs` | man7.org · GNU Bash | `man7.org` | PASS |
| 41 | `nice` | advanced | `nice -n 10 command` | Linux man-pages | `man7.org` | PASS |
| 42 | `systemd-units` | intermediate | `systemctl list-units --type=service` | systemd.unit | `www.freedesktop.org` | PASS |
| 43 | `systemd-enable` | advanced | `systemctl is-enabled ssh` | systemctl manual | `www.freedesktop.org` | PASS |
| 44 | `journal-filters` | advanced | `journalctl -u ssh -b` | journalctl manual | `www.freedesktop.org` | PASS |
| 45 | `ip-routes` | intermediate | `ip route` | ip(8) | `man7.org` | PASS |
| 46 | `ss-sockets` | intermediate | `ss -tulpn` | ss(8) | `man7.org` | PASS |
| 47 | `curl-wget` | intermediate | `curl -I https://example.com` | curl documentation | `curl.se` | PASS |
| 48 | `scp` | advanced | `scp notes.txt user@host:/tmp/` | OpenSSH manual | `man.openbsd.org` | PASS |
| 49 | `mount-inspect` | advanced | `df -h` | GNU/Linux manual pages | `man7.org` | PASS |
| 50 | `fstab` | advanced | `cat /etc/fstab` | fstab(5) | `man7.org` | PASS |
| 51 | `bash-variables` | intermediate | `echo "$HOME"` | man7.org · GNU Bash | `man7.org` | PASS |
| 52 | `bash-conditionals` | advanced | `test -f README.txt && echo found` | man7.org · GNU Bash | `man7.org` | PASS |
| 53 | `bash-loops` | advanced | `for f in *.txt; do echo "$f"; done` | man7.org · GNU Bash | `man7.org` | PASS |
| 54 | `dmesg` | advanced | `dmesg | tail` | dmesg(1) | `man7.org` | PASS |
| 55 | `troubleshoot-method` | advanced | `journalctl -b -p warning` | journalctl manual | `www.freedesktop.org` | PASS |
| 56 | `least-privilege` | advanced | `id` | sudo manual | `www.sudo.ws` | PASS |
| 57 | `ssh-hardening` | advanced | `ssh -v user@host` | OpenSSH manual | `man.openbsd.org` | PASS |
| 58 | `firewall-concepts` | advanced | `ss -tulpn` | nftables documentation | `wiki.nftables.org` | PASS |
| 59 | `server-service-model` | advanced | `systemctl status ssh` | systemctl manual | `www.freedesktop.org` | PASS |
| 60 | `containers-concepts` | advanced | `ps aux` | Linux Kernel Documentation | `docs.kernel.org` | PASS |
| 61 | `podman-docker` | advanced | `podman --help` | Podman Documentation | `docs.podman.io` | PASS |
| 62 | `git-dev` | intermediate | `git status` | Git Documentation | `git-scm.com` | PASS |
| 63 | `env-vars` | intermediate | `echo $PATH` | man7.org · GNU Bash | `man7.org` | PASS |
| 64 | `cron-timers` | advanced | `systemctl list-timers` | systemd.timer | `www.freedesktop.org` | PASS |
| 65 | `performance` | advanced | `top` | top(1) | `man7.org` | PASS |

### Lesson review notes

- Multi-command lessons sometimes link one primary reference rather than every tool mentioned. The copy should make clear when a reference is illustrative rather than exhaustive.
- Package-management lessons use Debian examples where the executable example is `apt`/`dpkg`; the surrounding copy explicitly notes that other distro families use different tools.
- The terminal is intentionally not used as evidence that a command behaves identically on a real host. The visible simulator disclosure is part of the acceptance criteria.

## Commands

| # | Command | Level | Category | Reference type | Provider | Audit |
|---:|---|---|---|---|---|---|
| 1 | `pwd` | Beginner | Navigation | manual | man7.org · GNU Coreutils | PASS |
| 2 | `ls` | Beginner | Navigation | manual | man7.org · GNU Coreutils | PASS |
| 3 | `cd` | Beginner | Navigation | manual | man7.org · GNU Bash | PASS |
| 4 | `mkdir` | Beginner | Directories | manual | man7.org · GNU Coreutils | PASS |
| 5 | `touch` | Beginner | Files | manual | man7.org · GNU Coreutils | PASS |
| 6 | `cat` | Beginner | Text | manual | man7.org · GNU Coreutils | PASS |
| 7 | `grep` | Intermediate | Search | manual | man7.org · GNU grep | PASS |
| 8 | `find` | Intermediate | Search | manual | man7.org · GNU Findutils | PASS |
| 9 | `head` | Beginner | Text | manual | man7.org · GNU Coreutils | PASS |
| 10 | `tail` | Beginner | Text | manual | man7.org · GNU Coreutils | PASS |
| 11 | `ps` | Intermediate | Processes | manual | procps-ng manual | PASS |
| 12 | `top` | Intermediate | Processes | manual | procps-ng manual | PASS |
| 13 | `kill` | Intermediate | Processes | manual | util-linux manual | PASS — caution |
| 14 | `chmod` | Intermediate | Permissions | manual | man7.org · GNU Coreutils | PASS — caution |
| 15 | `chown` | Intermediate | Permissions | manual | man7.org · GNU Coreutils | PASS — caution |
| 16 | `whoami` | Beginner | Users | manual | man7.org · GNU Coreutils | PASS |
| 17 | `id` | Beginner | Users | manual | man7.org · GNU Coreutils | PASS |
| 18 | `uname` | Beginner | System | manual | man7.org · GNU Coreutils | PASS |
| 19 | `df` | Intermediate | Storage | manual | man7.org · GNU Coreutils | PASS |
| 20 | `du` | Intermediate | Storage | manual | man7.org · GNU Coreutils | PASS |
| 21 | `lsblk` | Intermediate | Storage | manual | util-linux manual | PASS |
| 22 | `ip` | Intermediate | Network | manual | iproute2 manual | PASS |
| 23 | `ping` | Beginner | Network | manual | iputils manual | PASS |
| 24 | `ssh` | Intermediate | Network | manual | OpenSSH manual | PASS |
| 25 | `tar` | Intermediate | Archives | manual | man7.org · GNU tar | PASS |
| 26 | `apt` | Beginner | Packages | manual | Debian APT manual | PASS |
| 27 | `dnf` | Beginner | Packages | official | DNF documentation | PASS |
| 28 | `pacman` | Intermediate | Packages | manual | Arch Linux manual | PASS |
| 29 | `systemctl` | Intermediate | Administration | official | systemd | PASS |
| 30 | `journalctl` | Advanced | Administration | official | systemd | PASS |
| 31 | `rm` | Beginner | Files | manual | man7.org · GNU Coreutils | PASS — caution |
| 32 | `dd` | Advanced | Storage | manual | man7.org · GNU Coreutils | PASS — caution |
| 33 | `mkfs` | Advanced | Storage | manual | util-linux manual | PASS — caution |
| 34 | `fdisk` | Advanced | Storage | manual | util-linux manual | PASS — caution |
| 35 | `cp` | Beginner | Files | manual | man7.org · GNU Coreutils | PASS |
| 36 | `mv` | Beginner | Files | manual | man7.org · GNU Coreutils | PASS |
| 37 | `ln` | Intermediate | Files | manual | man7.org · GNU Coreutils | PASS |
| 38 | `less` | Beginner | Text | manual | less manual | PASS |
| 39 | `sort` | Intermediate | Text | manual | man7.org · GNU Coreutils | PASS |
| 40 | `uniq` | Intermediate | Text | manual | man7.org · GNU Coreutils | PASS |
| 41 | `cut` | Intermediate | Text | manual | man7.org · GNU Coreutils | PASS |
| 42 | `tr` | Intermediate | Text | manual | man7.org · GNU Coreutils | PASS |
| 43 | `wc` | Beginner | Text | manual | man7.org · GNU Coreutils | PASS |
| 44 | `sed` | Intermediate | Text | manual | man7.org · GNU sed | PASS |
| 45 | `awk` | Advanced | Text | manual | man7.org · GNU gawk | PASS |
| 46 | `jobs` | Intermediate | Processes | manual | man7.org · GNU Bash | PASS |
| 47 | `nice` | Advanced | Processes | manual | man7.org · GNU Coreutils | PASS |
| 48 | `ss` | Intermediate | Network | manual | iproute2 manual | PASS |
| 49 | `curl` | Intermediate | Network | official | curl project | PASS |
| 50 | `wget` | Intermediate | Network | manual | man7.org · GNU Wget | PASS |
| 51 | `scp` | Intermediate | Network | manual | OpenSSH manual | PASS |
| 52 | `findmnt` | Intermediate | Storage | manual | util-linux manual | PASS |
| 53 | `mount` | Advanced | Storage | manual | util-linux manual | PASS — caution |
| 54 | `umount` | Advanced | Storage | manual | util-linux manual | PASS — caution |
| 55 | `dmesg` | Advanced | Administration | manual | util-linux manual | PASS |
| 56 | `git` | Intermediate | Development | official | Git | PASS |
| 57 | `podman` | Advanced | Containers | official | Podman | PASS |
| 58 | `docker` | Advanced | Containers | official | Docker | PASS |

## High-risk / privileged command boundary

The following commands deserve extra care on a real Linux machine even though the browser lab is sandboxed:

`rm`, `dd`, `mkfs`, `fdisk`, `chmod`, `chown`, `mount`, `umount`, and administrative workflows involving `sudo`.

The academy should continue to explain consequences before encouraging users to copy commands to a real system.

## Simulator fidelity

The browser terminal implements an explicit subset of Linux-like behavior in JavaScript. A lesson may document a real command that the simulator does not fully implement. That is acceptable only when the UI does not imply host-level execution or perfect fidelity.

## Peer-review invitation

Technical corrections are welcome through the **Content error** GitHub issue template. Reports should include an upstream/official/manual reference where possible.
