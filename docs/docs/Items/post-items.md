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
- description: String **required**
- category_name: String - existing category_name **required**
- listed_by: Number - user_id of an existing user

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
