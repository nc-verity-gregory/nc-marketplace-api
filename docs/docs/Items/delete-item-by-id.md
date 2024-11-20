---
id: delete-item-by-id
title: DELETE /api/items/:item_id/:username
sidebar_position: 4
---

Deletes the requested item if the request is being made by the username that corresponds to the listed_by key of the item. If the item is currently in any user's basket it is also removed from their basket.

## Example Response

Status 204 - No Content

No body is returned by this endpoint.
