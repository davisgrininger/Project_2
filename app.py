from flask import (
    Flask,
    render_template,
    jsonify,
    request)
import pandas as pd


app = Flask(__name__)




df = pd.read_csv("Resources/FinalAlcohol.csv")






@app.route("/api/data")
def list_countries():

    countries = []
    for i, result in df.iterrows():
        print(result, flush = True)
        countries.append({
            "Country": result[1],
            "Region": result[2],
            "Hemisphere": result[3],
            "Happiness Score": result[4],
            "HDI": result[5],
            "GDP per Capita": result[6],
            "Beer per Capita": result[7],
            "Spirits per Capita": result[8],
            "Wine per capita": result[9],
            "Abbreviation":result[10]
            

        })
    return jsonify(countries)


@app.route("/")
def home():
    return "Welcome!"


if __name__ == "__main__":
    app.run()
