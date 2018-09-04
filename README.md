# enpsapi
ENPS Open API interaction via Flask


$ docker exec -it enpsapi_web_1 /bin/sh

/app # python

from app import db

from app.models import User

u = User(username='administrator', email='engstaff@rnntv.com')

https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-iv-database


5: $ u.set_password('ENTER PASSWORD')

6: $ u.check_password('ENTER PASSWORD') ... should return true

7: $ db.session.add(u)

8: $ db.session.commit()
