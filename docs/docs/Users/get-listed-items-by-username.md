---
id: get-listed-items-by-username
title: GET /api/users/:username/listed_items
sidebar_position: 5
---

Responds with the requested username's listed items in an array.

## Example Response

```json
{
  "items": [
    {
      "item_id": 1,
      "item_name": "The Holy Grail",
      "description": "Defo the real deal and not a prop from Indiana Jones",
      "img_url": "https://test.com/The Holy Grail.jpg",
      "price": 5000,
      "category_name": "Relics",
      "listed_by": 1
    },
    {
      "item_id": 2,
      "item_name": "The sword of 1000 truths",
      "description": "Not to be entrusted to a noob",
      "img_url": "https://test.com/1000-truths.jpg",
      "price": 2999,
      "category_name": "Relics",
      "listed_by": 1
    },
    {
      "item_id": 6,
      "item_name": "Antique Bookshelf",
      "description": "Makes your apartment smell like rich mahogany",
      "img_url": "https://test.com/Antique Bookshelf.jpg",
      "price": 7999,
      "category_name": "Household",
      "listed_by": 1
    }
  ]
}
```
