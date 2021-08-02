# Spline 03 UI Adapter for Menas

A small REST service that mimics an old Spline 0.3 URL that is used by Menas, and redirects to a new Spline 0.6 UI page.

```http request
GET /dataset/lineage/_search?path=$PATH&application_id=$APP_ID
```

returns

```
302 Redirect
Location <NEW_SPLINE_UI_BASE>/ui/app/events/overview/<EVENT_ID>/graph
```

where

- `$PATH` - Data Source URI
- `$APP_ID` - Spark application ID

The `Location` response header contains a new Spline UI execution event overview page URL that displays the lineage for the given `$PATH`
and `$APP_ID`

### Health check

```http request
GET /healthcheck
```

### Environment variables

| Name | Required | Default | Description |
|---|---|---|---|
| SPLINE_PORT | NO | 3000 | Server port |
| SPLINE_SHUTDOWN_DELAY | NO | 5000 | [Shutdown delay](https://github.com/godaddy/terminus#how-to-set-terminus-up-with-kubernetes) applied on SIGTERM|
| SPLINE_CONSUMER_URL | YES | | Spline Consumer REST API URL |
| SPLINE_UI_URL | YES | | Spline UI base URL |

### Build & Run

##### As a Docker image

```shell
docker build -t absaoss/spline-03-ui-adapter .
docker run -e SPLINE_CONSUMER_URL=... -e SPLINE_UI_URL=... -p 3000:3000 absaoss/spline-03-ui-adapter
```

##### As a NodeJS app

```shell
npm ci
npm start
```
