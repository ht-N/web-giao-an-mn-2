#!/bin/bash

# Test Gamma API với curl
# Thay YOUR_API_KEY bằng Gamma API key của bạn

GAMMA_API_KEY="YOUR_API_KEY"

echo "=== Step 1: Tạo slide với exportAs: pptx ==="

RESPONSE=$(curl -s -X POST "https://public-api.gamma.app/v1.0/generations" \
  -H "X-API-KEY: $GAMMA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "inputText": "# Test Slide\n\n## Slide 1\nNội dung test slide 1\n\n## Slide 2\nNội dung test slide 2",
    "textMode": "preserve",
    "format": "presentation",
    "exportAs": "pptx",
    "numCards": 3,
    "textOptions": {
      "language": "vi"
    },
    "sharingOptions": {
      "externalAccess": "view"
    }
  }')

echo "Response từ POST:"
echo "$RESPONSE" | jq .

# Lấy generationId
GENERATION_ID=$(echo "$RESPONSE" | jq -r '.generationId')

if [ "$GENERATION_ID" == "null" ] || [ -z "$GENERATION_ID" ]; then
  echo "Lỗi: Không lấy được generationId"
  exit 1
fi

echo ""
echo "=== Step 2: Poll để lấy kết quả (generationId: $GENERATION_ID) ==="

# Poll 10 lần, mỗi lần cách 5 giây
for i in {1..10}; do
  echo "Poll attempt $i..."
  
  POLL_RESPONSE=$(curl -s -X GET "https://public-api.gamma.app/v1.0/generations/$GENERATION_ID" \
    -H "X-API-KEY: $GAMMA_API_KEY" \
    -H "Content-Type: application/json")
  
  echo "$POLL_RESPONSE" | jq .
  
  STATUS=$(echo "$POLL_RESPONSE" | jq -r '.status')
  PPTX_URL=$(echo "$POLL_RESPONSE" | jq -r '.pptxUrl')
  
  echo "Status: $STATUS"
  echo "pptxUrl: $PPTX_URL"
  
  if [ "$STATUS" == "completed" ]; then
    echo ""
    echo "=== KẾT QUẢ CUỐI CÙNG ==="
    echo "$POLL_RESPONSE" | jq .
    break
  fi
  
  sleep 5
done
