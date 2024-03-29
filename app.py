from flask import (
    Flask,
    url_for,
    render_template,
    jsonify,
    request)
import pandas as pd


app = Flask(__name__, static_folder = "static", static_url_path= "/static")

df = pd.read_csv("Resources/FinalAlcohol.csv")


@app.route("/api/data")
def list_countries():

    countries = []
    for i, result in df.iterrows():
        #print(result, flush = True)
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
            "Abbreviation":result[10],
            "Latitude":result[11],
            "Longitude":result[12]
            

        })
    return jsonify(countries)

@app.route("/scatterplot/data")
def circle_entries():

    countries = []
    for i, result in df.iterrows():
        #print(result, flush = True)
        countries.append({
            "Country": result[1],
            "Region": result[2],
            "Hemisphere": result[3],
            "HappinessScore": result[4],
            "HDI": result[5],
            "GDP_PerCapita": result[6],
            "Beer_PerCapita": result[7],
            "Spirit_PerCapita": result[8],
            "Wine_PerCapita": result[9],
            "Abbreviation":result[10],
            "Latitude":result[11],
            "Longitude":result[12]
            

        })
    return jsonify(countries)


@app.route("/")
def home():
    return render_template("index.html")

@app.route("/map")
def map():
    return render_template("map.html")

@app.route("/bar")
def bar():
    return render_template("bar.html")

@app.route("/scatter")
def scatter():
    return render_template("scatter.html")
if __name__ == "__main__":
    app.run()
