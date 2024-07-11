from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
<<<<<<< HEAD
    userid = db.Column(db.String(32))
    passward = db.Column(db.String(128))
=======
    userid = db.Column(db.String(32), unique= True, nullable = False)
    passward = db.Column(db.String(128), nullable = False)
>>>>>>> origin/master

    