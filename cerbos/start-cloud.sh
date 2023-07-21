#!/usr/bin/env bash

docker run --rm -i -t \
  -p 3592:3592 -p 3593:3593 \
  -v /tmp -v /.cache \
  -e CERBOS_CLOUD_BUNDLE="latest" \
  -e CERBOS_CLOUD_SECRET_KEY="CERBOS-1OJ4XX9NR1KBL-0JL30W6N9FL79UWHCL549UELN6GGLMUKD299ZRDH72PGEDJTVEFST2Q46R" \
  -e CERBOS_CLOUD_CLIENT_ID="OZB7EQKLC3LJ" \
  -e CERBOS_CLOUD_CLIENT_SECRET="cerbos_le46G7gWXtc0dYHjuW64mhozDo7yp+BP9WwqK9TV12g" \
  -e CERBOS_NO_TELEMETRY=1 \
  ghcr.io/cerbos/cerbos:0.28.0 server --set=server.logRequestPayloads=true
