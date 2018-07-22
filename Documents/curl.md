


Setup
=====

direct ot VLC:
```
export BASE_URL=http://127.0.0.1:8080
```

via `ionic serve` proxy
```
export BASE_URL=http://127.0.0.1:8100
```


browse
======

```
curl -is -u :vlcremote $BASE_URL/requests/browse.json?dir=~/
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


