# V6.2 Reference Audit

- Commands checked: **58**
- Commands with specific references: **58**
- Generic `https://man7.org/linux/man-pages/` fallbacks: **0**
- Missing command mappings: **0**

| Command | Provider | Type | Destination |
|---|---|---|---|
| `pwd` | GNU Coreutils | official | https://www.gnu.org/software/coreutils/manual/html_node/pwd-invocation.html |
| `ls` | GNU Coreutils | official | https://www.gnu.org/software/coreutils/manual/html_node/ls-invocation.html |
| `cd` | GNU Bash | official | https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#index-cd |
| `mkdir` | GNU Coreutils | official | https://www.gnu.org/software/coreutils/manual/html_node/mkdir-invocation.html |
| `touch` | GNU Coreutils | official | https://www.gnu.org/software/coreutils/manual/html_node/touch-invocation.html |
| `cat` | GNU Coreutils | official | https://www.gnu.org/software/coreutils/manual/html_node/cat-invocation.html |
| `grep` | GNU grep | official | https://www.gnu.org/software/grep/manual/grep.html |
| `find` | GNU Findutils | official | https://www.gnu.org/software/findutils/manual/html_mono/find.html |
| `head` | GNU Coreutils | official | https://www.gnu.org/software/coreutils/manual/html_node/head-invocation.html |
| `tail` | GNU Coreutils | official | https://www.gnu.org/software/coreutils/manual/html_node/tail-invocation.html |
| `ps` | procps-ng manual | manual | https://man7.org/linux/man-pages/man1/ps.1.html |
| `top` | procps-ng manual | manual | https://man7.org/linux/man-pages/man1/top.1.html |
| `kill` | util-linux manual | manual | https://man7.org/linux/man-pages/man1/kill.1.html |
| `chmod` | GNU Coreutils | official | https://www.gnu.org/software/coreutils/manual/html_node/chmod-invocation.html |
| `chown` | GNU Coreutils | official | https://www.gnu.org/software/coreutils/manual/html_node/chown-invocation.html |
| `whoami` | GNU Coreutils | official | https://www.gnu.org/software/coreutils/manual/html_node/whoami-invocation.html |
| `id` | GNU Coreutils | official | https://www.gnu.org/software/coreutils/manual/html_node/id-invocation.html |
| `uname` | GNU Coreutils | official | https://www.gnu.org/software/coreutils/manual/html_node/uname-invocation.html |
| `df` | GNU Coreutils | official | https://www.gnu.org/software/coreutils/manual/html_node/df-invocation.html |
| `du` | GNU Coreutils | official | https://www.gnu.org/software/coreutils/manual/html_node/du-invocation.html |
| `lsblk` | util-linux manual | manual | https://man7.org/linux/man-pages/man8/lsblk.8.html |
| `ip` | iproute2 manual | manual | https://man7.org/linux/man-pages/man8/ip.8.html |
| `ping` | iputils manual | manual | https://man7.org/linux/man-pages/man8/ping.8.html |
| `ssh` | OpenSSH manual | manual | https://man.openbsd.org/ssh.1 |
| `tar` | GNU tar | official | https://www.gnu.org/software/tar/manual/tar.html |
| `apt` | Debian APT manual | manual | https://manpages.debian.org/trixie/apt/apt.8.en.html |
| `dnf` | DNF documentation | official | https://dnf.readthedocs.io/en/stable/command_ref.html |
| `pacman` | Arch Linux manual | manual | https://man.archlinux.org/man/pacman.8.en |
| `systemctl` | systemd | official | https://www.freedesktop.org/software/systemd/man/latest/systemctl.html |
| `journalctl` | systemd | official | https://www.freedesktop.org/software/systemd/man/latest/journalctl.html |
| `rm` | GNU Coreutils | official | https://www.gnu.org/software/coreutils/manual/html_node/rm-invocation.html |
| `dd` | GNU Coreutils | official | https://www.gnu.org/software/coreutils/manual/html_node/dd-invocation.html |
| `mkfs` | util-linux manual | manual | https://man7.org/linux/man-pages/man8/mkfs.8.html |
| `fdisk` | util-linux manual | manual | https://man7.org/linux/man-pages/man8/fdisk.8.html |
| `cp` | GNU Coreutils | official | https://www.gnu.org/software/coreutils/manual/html_node/cp-invocation.html |
| `mv` | GNU Coreutils | official | https://www.gnu.org/software/coreutils/manual/html_node/mv-invocation.html |
| `ln` | GNU Coreutils | official | https://www.gnu.org/software/coreutils/manual/html_node/ln-invocation.html |
| `less` | less manual | manual | https://man7.org/linux/man-pages/man1/less.1.html |
| `sort` | GNU Coreutils | official | https://www.gnu.org/software/coreutils/manual/html_node/sort-invocation.html |
| `uniq` | GNU Coreutils | official | https://www.gnu.org/software/coreutils/manual/html_node/uniq-invocation.html |
| `cut` | GNU Coreutils | official | https://www.gnu.org/software/coreutils/manual/html_node/cut-invocation.html |
| `tr` | GNU Coreutils | official | https://www.gnu.org/software/coreutils/manual/html_node/tr-invocation.html |
| `wc` | GNU Coreutils | official | https://www.gnu.org/software/coreutils/manual/html_node/wc-invocation.html |
| `sed` | GNU sed | official | https://www.gnu.org/software/sed/manual/sed.html |
| `awk` | GNU awk | official | https://www.gnu.org/software/gawk/manual/gawk.html |
| `jobs` | GNU Bash | official | https://www.gnu.org/software/bash/manual/html_node/Job-Control-Builtins.html#index-jobs |
| `nice` | GNU Coreutils | official | https://www.gnu.org/software/coreutils/manual/html_node/nice-invocation.html |
| `ss` | iproute2 manual | manual | https://man7.org/linux/man-pages/man8/ss.8.html |
| `curl` | curl project | official | https://curl.se/docs/manpage.html |
| `wget` | GNU Wget | official | https://www.gnu.org/software/wget/manual/wget.html |
| `scp` | OpenSSH manual | manual | https://man.openbsd.org/scp.1 |
| `findmnt` | util-linux manual | manual | https://man7.org/linux/man-pages/man8/findmnt.8.html |
| `mount` | util-linux manual | manual | https://man7.org/linux/man-pages/man8/mount.8.html |
| `umount` | util-linux manual | manual | https://man7.org/linux/man-pages/man8/umount.8.html |
| `dmesg` | util-linux manual | manual | https://man7.org/linux/man-pages/man1/dmesg.1.html |
| `git` | Git | official | https://git-scm.com/docs/git |
| `podman` | Podman | official | https://docs.podman.io/en/latest/markdown/podman.1.html |
| `docker` | Docker | official | https://docs.docker.com/reference/cli/docker/ |

## Policy

- Prefer the upstream project or distribution documentation.
- Use exact manual pages when a manual is the authoritative practical reference.
- `man7.org` is treated as a manual-page renderer/curated manual source, not as the universal official homepage for every command.
- The site never silently falls back to the generic man7 index for a command card.

## Development check

Run:

```bash
python3 tools/check_references.py --offline
```

Run without `--offline` on a networked development machine to check HTTP destinations.