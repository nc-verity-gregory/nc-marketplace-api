---
id: post-items
title: POST /api/items
sidebar_position: 2
---

Adds a new item.

## Request Body

Accepts the following keys:

- item_name: String **required**
- img_url: String
- price: Integer - Prices are measured in pence. Set to zero for free items **required**
- listed_by - Number **required** - the user_id of the logged in user, must exist in users table
- description: String
- category_name: String - existing category_name


```json
{
  "item_name": "Test item",
  "description": "testy mc test face",
  "img_url": "https://test.com/Test-item.jpg",
  "price": 100,
  "category_name": "Relics",
  "listed_by": 1
}
```

## Example Response

```json
{
  "item": {
    "item_id": 10,
    "item_name": "Test item",
    "description": "testy mc test face",
    "img_url": "https://test.com/Test-item.jpg",
    "price": 100,
    "category_name": "Relics",
    "listed_by": 1
  }
}
```
