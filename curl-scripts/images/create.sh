#!/bin/bash

API="http://localhost:4741"
URL_PATH="/images"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
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
