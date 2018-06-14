from flask import Flask
from flask_bootstrap import Bootstrap
from flask_login import LoginManager
from config import BaseConfig
from flask_sqlalchemy import SQLAlchemy, SessionBase
from flask_migrate import Migrate
from sqlalchemy.exc import IntegrityError
import os

app = Flask(__name__)

Bootstrap(app)
app.secret_key = os.getenv('SECRET_KEY')
app.config.from_object(BaseConfig)
login = LoginManager(app)
login.login_view = 'login'
db = SQLAlchemy(app)
migrate = Migrate(app, db)
from app import routes, models
