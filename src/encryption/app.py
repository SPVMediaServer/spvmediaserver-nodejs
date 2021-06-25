from flask import Flask, jsonify, flash
from encryptiontest import EncryptionTest


app = Flask(__name__)
#app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
e = EncryptionTest.encryption("testing.txt")

@app.route('/api/encryption', methods=["GET"])
def tester():
    e = EncryptionTest.encryption("testing.txt")
    return jsonify(e)

def delete_entry():
    return ""

if (__name__ == "__main__"):
    app.run(debug=True)
