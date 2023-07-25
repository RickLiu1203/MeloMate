from dotenv import load_dotenv
import os
import base64
from requests import post, get
import json
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

load_dotenv()

client_id = os.getenv('CLIENT_ID')
client_secret = os.getenv('CLIENT_SECRET')

@app.route('/token')
def get_token():
    auth_string = client_id + ':' + client_secret
    auth_bytes = auth_string.encode('utf-8')
    auth_base64 = str(base64.b64encode(auth_bytes), 'utf-8')

    url = 'https://accounts.spotify.com/api/token'
    headers = {
        'Authorization': 'Basic ' + auth_base64,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    data = {'grant_type': 'client_credentials'}
    result = post(url, headers=headers, data=data)
    json_result = json.loads(result.content)
    token = json_result['access_token']
    return token

@app.route('/search')
def search_for_tracks():
    token = request.args.get('token')
    track_name = request.args.get('track_name')
    url = 'https://api.spotify.com/v1/search?'
    query = f'q={track_name}&type=track&limit=10&market=US'
    headers = {'Authorization': 'Bearer ' + token}

    query_url = url + query
    result = get(query_url, headers=headers)
    json_result = json.loads(result.content)['tracks']['items']
    if len(json_result) == 0:
        print('none found')
        return 0
    
    return json_result

@app.route('/tracks')
def display_seeds():
    token = request.args.get('token')
    tracks = request.args.get('tracks')
    url = 'https://api.spotify.com/v1/tracks?'
    query = f'ids={tracks}&market=US'
    headers = {'Authorization': 'Bearer ' + token}

    query_url = url + query
    result = get(query_url, headers=headers)
    json_result = json.loads(result.content)
    if len(json_result) == 0:
        print('none found')
        return 0
    
    return json_result

@app.route('/recommendations')
def recommendations():
    token = request.args.get('token')
    seeds = request.args.get('tracks')
    params = request.args.get('params')
    url = 'https://api.spotify.com/v1/recommendations?'
    query = f'market=US&limit=10&seed_tracks={seeds}{params}'
    headers = {'Authorization': 'Bearer ' + token}

    query_url = url + query
    result = get(query_url, headers=headers)
    json_result = json.loads(result.content)
    if len(json_result) == 0:
        print('none found')
        return 0
    
    return json_result

