from flask import *
from encryptiontest import EncryptionTest


app = Flask(__name__)
#app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

@app.route('/api/encryption', methods=["GET"])
def tester():
    e = EncryptionTest.encryption("testing.txt")
    tk = e["token"]
    return redirect("http://localhost:5000/api/download_file/{}".format(tk + ".aes"))

@app.route('/api/download_file/<token>')
def download(token):
    #send_file(token)
    return send_file(token)


#def delete_entry():
#    return ""

if (__name__ == "__main__"):
    app.run(debug=True)
