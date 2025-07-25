Функціональність:
GET /posts — читання з:

фільтрацією ?title=...

сортуванням ?sort=field1:asc,field2:desc

пагінацією ?\_page=2&\_limit=10

GET /posts/:id — отримання одного поста

POST /posts — створення нового поста

PUT /posts/:id — оновлення поста

DELETE /posts/:id — видалення поста

POST /posts/:id/like — +1 лайк

POST /posts/:id/dislike — +1 дизлайк
