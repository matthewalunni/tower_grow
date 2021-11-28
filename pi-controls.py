from pubnub.pubnub import PubNub, SubscribeListener
from pubnub.pnconfiguration import PNConfiguration
import time
import smbus
import sys
from datetime import datetime
from base64 import b64decode
from Crypto.Cipher import AES
from Crypto.Protocol.KDF import PBKDF2 


DEVICE_BUS = 1
DEVICE_ADDRESS = 0x13 # I2C device address, important that this corresponds to documentation
bus = smbus.SMBus(DEVICE_BUS)
password = "lazydog"
salt = "salt"

def initialize_pubnub(subscribe_key, publish_key, channel) -> PubNub:
    """This method initializes pubnub with the given keys and channel, and connects

    Args:
        subscribe_key (str): [description]
        publish_key (str): [description]
        channel (str): [description]

    Returns:
        Pubnub: pubnub object
        listener: listener object
    """
    pnConfiguration = PNConfiguration()
    pnConfiguration.subscribe_key = subscribe_key
    pnConfiguration.publish_key = publish_key

    pubnub = PubNub(pnConfiguration)
    listener = SubscribeListener() # create listener_object to read the msg from the Broker/Server
    pubnub.add_listener(listener) # add listener_object to pubnub_object to subscribe it
    pubnub.subscribe().channels(channel).execute() # subscribe to the channel
    listener.wait_for_connect() # wait for the connection to be established
    return pubnub, listener
    
def send_pubnub_message(pubnub, channel, data):
    """This method sends a pubnub message to the given channel

    Args:
        pubnub ([type]): pubnub object
        channel ([type]): channel to be published to
        data ([type]): message to be sent
    """
    pubnub.publish().channel(channel).message(data).sync()
    print("Send Message: ", data)

def power_on_relay(relay_pin):
    """This method powers on the relay

    Args:
        relay_pin (int): pin number of the relay
    """
    bus.write_byte_data(DEVICE_ADDRESS, relay_pin, 0xFF)

def power_off_relay(relay_pin):
    """This method powers off the relay

    Args:
        relay_pin (int): pin number of the relay
    """
    bus.write_byte_data(DEVICE_ADDRESS, relay_pin, 0x00)

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


if __name__ == "__main__":

    publish_key = 'pub-c-8bca52f9-3ed6-4c9e-a6f5-0dd08fefa83e'
    subscribe_key = 'sub-c-ef4d649a-440f-11ec-8ee6-ce954cd2c970'
    channel = "MattsChannel"

    pubnub, listener = initialize_pubnub(subscribe_key, publish_key, channel)
    print(f"Connected To Pubnub: {channel}")

    while True:
        now = datetime.now().time()
        print("Waiting for message")
        message = listener.wait_for_message_on(channel)
        message = decrypt(password, salt, message.message)
        print("Received message: " + str(message))

        if message == "LED is off, turning on": power_on_relay(1)
        if message == "LED is on, turning off": power_off_relay(1)
        if message == "Pump is off, turning on": power_on_relay(2)
        if message == "Pump is on, turning off": power_off_relay(2)


        if "Selected On Time:" in message:
            selected_time = message.split(": ")[1]
            on_time = datetime.strptime(selected_time, '%H:%M').time()
            if now > on_time:
                power_on_relay(1)

        if "Selected Off Time:" in message:
            selected_time = message.split(": ")[1]
            off_time = datetime.strptime(selected_time, '%H:%M').time()
            if now > off_time:
                power_off_relay(1)

        time.sleep(1)


    