/*
 * Copyright 2017 ABSA Group Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

const express = require('express')
const http = require('http')
const {createTerminus} = require('@godaddy/terminus')
const apiHelper = require('./api.helper')
const configHelper = require('./config.helper')

const app = express()

const config = {
    port: configHelper.getProp('SPLINE_PORT', 3000),
    shutdownDelay: configHelper.getProp('SPLINE_SHUTDOWN_DELAY', 5000),
    consumerAPIBase: configHelper.getProp('SPLINE_CONSUMER_URL'),
    UIBase: configHelper.getProp('SPLINE_UI_URL')
}

function handleLineageSearchGET(req, res) {
    const path = req.query['path']
    const appId = req.query['application_id']

    const eventSearchUrl = `${config.consumerAPIBase}/execution-events?dataSourceUri=${path}&applicationId=${appId}`

    apiHelper.get(eventSearchUrl)
        .then(response => {
            const foundEvents = response['items'] || []
            if (foundEvents.length > 0) {
                const eventId = foundEvents[0]['executionEventId']
                const eventUIUrl = `${config.UIBase}/app/events/overview/${eventId}/graph`
                res.redirect(eventUIUrl)
            } else {
                res.status(404)
                res.send(`Execution event not found`)
            }
        })
        .catch(error => {
            res.status(500)
            res.send(error.message)
        })
}

app.get('/dataset/lineage/_search', handleLineageSearchGET)

const server = http.createServer(app)

createTerminus(server, {
    healthChecks: {'/healthcheck': () => Promise.resolve()},
    beforeShutdown: () => {
        console.log(`Shutting down with ${config.shutdownDelay} milliseconds delay`)
        return new Promise(resolve => setTimeout(resolve, config.shutdownDelay))
    }
})

server.listen(config.port)

console.log("Server started")
