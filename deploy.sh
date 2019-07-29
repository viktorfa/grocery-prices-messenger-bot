#!/bin/bash

yarn --production
sls deploy --aws-profile serverless-grocery-admin
