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
const morgan = require('morgan')

const config = require('./config')
const controllers = require('./controllers')

const app = express()
const server = http.createServer(app)

app.use(morgan('combined'))

app.get('/dataset/lineage/_search', controllers.handleLineageSearchGET)

createTerminus(server, {
    healthChecks: {'/healthcheck': () => Promise.resolve()},
    beforeShutdown: () => {
        console.log(`Shutting down with ${config.shutdownDelay} milliseconds delay`)
        return new Promise(resolve => setTimeout(resolve, config.shutdownDelay))
    }
})

server.listen(config.port)

console.log("Server started")
