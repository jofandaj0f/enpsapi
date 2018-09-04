# ENPS Open API interaction via Flask

#### Deploying via Docker
```
$ docker-compose build
$ docker-compose up -d 
```


#### Configuring the Web Server post Docker Deployment
Steps sourced from: https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-iv-database Migrating dbs requires viewing this page. 
```
$ docker exec -it enpsapi_web_1 /bin/sh

/app # python

>>> from app import db

>>> from app.models import User

>>> u = User(username='administrator', email='engstaff@rnntv.com')

>>> u.set_password('ENTER PASSWORD')

>>> u.check_password('ENTER PASSWORD') ... should return true

>>> db.session.add(u)

>>> db.session.commit()
```
