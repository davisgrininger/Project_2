from flask import (
    Flask,
    render_template,
    jsonify,
    request)
import pandas as pd

# from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db/.sqlite"

# db = SQLAlchemy(app)


# class country(db.Model):
#     __tablename__ = 'countries'

#     id = db.Column(db.Integer, primary_key=True)
#     Country = db.Column(db.String(64))
#     Region = db.Column(db.String(64))
#     Hemisphere = db.Column(db.String(64))
#     HappinessScore = db.Column(db.Float)
#     HDI = db.Column(db.Float)
#     GDP_PerCapita = db.Column(db.Float)
#     Beer_PerCapita = db.Column(db.Float)
#     Spirits_PerCapita = db.Column(db.Float)
#     Wine_PerCapita = db.Column(db.Float)

#     def __repr__(self):
#         return '<Country %r>' % (self.country)


df = pd.read_csv("Resources/HappinessAlcoholConsumption.csv")

# @app.before_first_request
# def setup():
#     # Recreate database each time for demo
#     db.drop_all()
#     db.create_all()




@app.route("/api/data")
def list_countries():
    #results = db.session.query(country.Country, country.HappinessScore, country.HDI, country.GDP_PerCapita, country.Beer_PerCapita, country.Spirits_PerCapita, country.Wine_PerCapita).all()

    countries = []
    for i, result in df.iterrows():
        print(result, flush = True)
        countries.append({
            "Country": result[0],
            "Happiness Score": result[1],
            "HDI": result[2],
            "GDP per Capita": result[3],
            "Beer per Capita": result[4],
            "Spirits per Capita": result[5],
            "Wine per capita": result[6]
        })
    return jsonify(countries)


@app.route("/")
def home():
    return "Welcome!"


if __name__ == "__main__":
    app.run()
