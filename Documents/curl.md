


Setup
=====

direct ot VLC:
```
export BASE_URL=http://127.0.0.1:8080
```

via `ionic serve` proxy
```
export BASE_URL=http://127.0.0.1:10000
```

via `nginx` proxy
```
export BASE_URL=http://127.0.0.1:10001
```


browse
======

```
curl -is -u :vlcremote "$BASE_URL/requests/browse.json?dir=%2FUsers%2Flrlong%2FMusic%2FiTunes%2FiTunes%20Music%2FAlanis%20Morissette%2FJagged%20Little%20Pill"
curl -is -u :vlcremote "$BASE_URL/requests/browse.json?dir=%2FUsers%2Flrlong%2FMusic"
curl -is -u :vlcremote $BASE_URL/requests/browse.json?dir=/
```

playlist
========

```
curl -is -u :vlcremote $BASE_URL/requests/playlist.json
```

status
======


```
curl -is -u :vlcremote $BASE_URL/requests/status.json
```


