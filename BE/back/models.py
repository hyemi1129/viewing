from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
<<<<<<< HEAD
<<<<<<< HEAD
    userid = db.Column(db.String(32))
    passward = db.Column(db.String(128))
=======
    userid = db.Column(db.String(32), unique= True, nullable = False)
    passward = db.Column(db.String(128), nullable = False)
>>>>>>> origin/master
=======
    userid = db.Column(db.String(32))
    passward = db.Column(db.String(128))
>>>>>>> 318f24d9c9bf0b03f51c41c7210ea20e885ff446

    