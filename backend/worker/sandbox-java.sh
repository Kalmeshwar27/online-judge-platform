#!/bin/bash
ulimit -t 10
ulimit -u 4096      # generous headroom above your desktop's existing thread usage
ulimit -f 10240
exec "$@"