import pyAesCrypt as crypt
import random
import string

class EncryptionTest:

    def encryption(files):
        file_name = EncryptionTest.passwordGenerator(12)
        file_password = EncryptionTest.passwordGenerator(12)

        crypt.encryptFile(files, "{}.aes".format(file_name), file_password)
        return {"Secret Key" : file_password, "token": file_name}
    
    def passwordGenerator(len):
        letters = string.ascii_letters

        lists = string.digits + letters

        choice = random.sample(lists, len)

        return ''.join(choice)
