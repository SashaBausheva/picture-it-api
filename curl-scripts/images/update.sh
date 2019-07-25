#!/bin/bash

API="http://localhost:4741"
URL_PATH="/images"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
  "image": {
    "imageUrl": "'"${IMGURL}"'",
    "altDescription": "'"${DESC}"'",
    "userName": "'"${USERNAME}"'",
    "comments": "'"${COMMENTS}"'",
  }
}'

echo
