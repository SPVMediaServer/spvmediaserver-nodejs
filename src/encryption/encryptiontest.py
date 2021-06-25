import pyAesCrypt as crypt
import random
import string

class EncryptionTest:

    def encryption(files):
        password = EncryptionTest.passwordGenerator(12);
        temp = files

        crypt.encryptFile(files, "{}.aes".format(files[:-3]), password)
        return {"Secret Key" : password}
    
    def passwordGenerator(len):
        letters = string.ascii_letters
        punctuation = string.punctuation

        lists = string.digits + letters + punctuation

        choice = random.sample(lists, len)

        return ''.join(choice)