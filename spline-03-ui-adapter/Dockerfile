#
# Copyright 2021 ABSA Group Limited
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

# This Dockerfile folows some reccomendations described here:
# https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/

FROM node:14-alpine3.14

ENV NODE_ENV production

LABEL name="Spline 03 UI Adapter"
LABEL vendor="ABSA"
LABEL copyright="2021 ABSA Group Limited"
LABEL license="Apache License, version 2.0"

WORKDIR /usr/src/app

COPY --chown=node:node package*.json *.js ./
RUN npm ci --only=production
RUN apk add dumb-init

EXPOSE 3000

USER node
CMD ["dumb-init", "node", "app.js"]
