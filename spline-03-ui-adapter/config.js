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

module.exports = {
    port: getOptional('SPLINE_PORT', 3000),
    shutdownDelay: getOptional('SPLINE_SHUTDOWN_DELAY', 5000),
    consumerAPIBase: getRequired('SPLINE_CONSUMER_URL'),
    UIBase: getRequired('SPLINE_UI_URL')
}

function getRequired(propName) {
    const value = getOptional(propName)
    if (!value) throw new Error(`Environment variable ${propName} is not specified`)
    return value
}

function getOptional(propName, defaultValue) {
    return process.env[propName] || defaultValue
}
