from base64 import b64decode
from Crypto.Cipher import AES
from Crypto.Protocol.KDF import PBKDF2 

password = "lazydog"
salt = "salt"

def decrypt(key, salt, ciphertext):
    """This method decrypts a value sent from CryptoJS.

    Args:
        key (str): password used to encrypt the value
        salt (str): salt used to encrypt the value
        ciphertext (str): message to be decrypted

    Returns:
        str: decrypted value
    """
    data = b64decode(ciphertext)
    bytes = PBKDF2(key.encode("utf-8"), salt.encode("utf-8"), 48, 128)
    iv = bytes[0:16]
    key = bytes[16:48]
    cipher = AES.new(key, AES.MODE_CBC, iv)
    text = cipher.decrypt(data)
    text = text[:-text[-1]].decode("utf-8")
    return text

if __name__ == '__main__':
    message = "TREo4kk66uJl6kSfECrtysqtsZ65pHT9w31WUTBkCaE="
    print(decrypt(password, salt, message))