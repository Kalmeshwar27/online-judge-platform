#!/bin/bash
ulimit -v 1048576
ulimit -t 10
ulimit -u 4096      # same fix, consistent headroom
ulimit -f 10240
exec "$@"