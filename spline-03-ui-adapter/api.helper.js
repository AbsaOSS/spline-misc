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

const https = require('https')

module.exports = {
    get: function (url) {
        return new Promise((resolve, reject) => {
            const time0 = Date.now()

            https.get(url, (resp) => {
                let data = ''

                resp.on('data', (chunk) => {
                    data += chunk
                })

                resp.on('end', () => {
                    logCall(resp.statusCode)
                    resolve(JSON.parse(data))
                })

            }).on("error", (err) => {
                logCall(500)
                reject(err)
            })

            function logCall(status) {
                const elapsed = Date.now() - time0
                console.debug(`GET ${url} ${status} ${elapsed} ms`)
            }
        })
    }
}
