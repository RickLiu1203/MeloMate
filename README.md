
# MeloMate

A Smart Music Recommendation Site 🎵

## Features

**Three Step Process:**  
    1. Search for songs you like  
    2. Set a parameter  
    3. Get your recommendations

**Available Parameters:**   
*Popularity, Energy, Danceability, Acousticness, Instrumentalness*

**Same Song Inputs + Different Parameters = Tailored Recommendations**  

![popular](/public/popular.png)
Above Recommendations are Only Globally Popular Tracks

![unpopular](/public/unpopular.png)
Above Recommendations are Only Lesser Known Tracks

**Dark Mode!!**
![dark](/public/dark.png)

## Run Locally

**To run this project, you will need to add the following environment variables to your .env file**

`CLIENT_ID`

`CLIENT_SECRET`

**These can be found in the Spotify API dashboard after creating a free account**:  
[Link to Spotify Developer Site](https://developer.spotify.com/dashboard)


**Clone the project**

```bash
  git clone https://github.com/RickLiu1203/MeloMate.git
```

**Go to the project directory**

```bash
  cd melomate
```

**Install dependencies**

```bash
  npm install
  pip install python-dotenv requests flask flask-cors
```

**Start the backend**  
Windows
```bash
  python /server/server.py
```
Mac
```bash
  python3 /server/server.py
```

**Start the server**

```bash
  npm run dev
```


## Author

Made with 👂 by [@RickLiu1203](https://www.github.com/RickLiu1203)