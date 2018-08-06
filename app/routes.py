from flask import render_template, request, flash, redirect, url_for, json, Response
from flask_login import current_user, login_user, logout_user, login_required, LoginManager
from app.models import User
from werkzeug.urls import url_parse
from app import app
from forms import *
import requests, os

@app.route('/')
@app.route('/index')
@login_required
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password')
            return redirect(url_for('login'))
        login_user(user, remember=form.remember_me.data)
        next_page = request.args.get('next')
        if not next_page or url_parse(next_page).netloc != '':
            next_page = url_for('index')
        return redirect(next_page)
    return render_template('login.html', title='Sign In', form=form)

@app.route('/info', methods = ['GET'])
def info():
    data = { 'url': os.getenv('URL'), 'name' : os.getenv('API_NAME'), 'password' : os.getenv('PASS_ENPS'), 'enps': os.getenv('ENPS_NAME'), 'key': os.getenv('API_KEY') }
    js = json.dumps(data)

    resp = Response(js, status=200, mimetype='application/json')
    # resp.headers['Link'] = 'http://luisrei.com'

    return resp

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))
