from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/members')
def members():
    return {'members': ['1', '2', '3']}

if __name__ == '__main__':
    app.run(host='localhost', port = 5001, debug=True)