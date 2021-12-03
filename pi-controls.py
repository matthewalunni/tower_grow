from pubnub.pubnub import PubNub, SubscribeListener
from pubnub.pnconfiguration import PNConfiguration
import time
import smbus
import sys
from datetime import datetime, timedelta
from base64 import b64decode
from Crypto.Cipher import AES
from Crypto.Protocol.KDF import PBKDF2 
from threading import Timer


DEVICE_BUS = 1
DEVICE_ADDRESS = 0x13 # I2C device address, important that this corresponds to documentation
bus = smbus.SMBus(DEVICE_BUS)
password = "lazydog"
salt = "salt"
ON_TIME, OFF_TIME = None, None

class RepeatTimer(Timer):
    def run(self):
        while not self.finished.wait(self.interval):
            self.function(*self.args,**self.kwargs)
        print('Done')

def initialize_pubnub(subscribe_key, publish_key, channel) -> PubNub:
    """This method initializes pubnub with the given keys and channel, and connects

    Args:
        subscribe_key (str): pubnub subscribe key
        publish_key (str): pubnub publish key
        channel (str): pubnub channel

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
    bus.write_byte_data(DEVICE_ADDRESS, relay_pin, 0x00)

def power_off_relay(relay_pin):
    """This method powers off the relay

    Args:
        relay_pin (int): pin number of the relay
    """
    bus.write_byte_data(DEVICE_ADDRESS, relay_pin, 0xFF)

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

def handle_pubnub_message(listener, channel):
    """This method handles the pubnub message
    
    Args:
        listener ([type]): listener object
        channel ([type]): channel to be published to
    """

    print("Waiting for Message")
    message = listener.wait_for_message_on(channel)
    message = decrypt(password, salt, message.message)
    print("Received message: " + str(message))

    if message == "LED is off, turning on": power_on_relay(1)
    if message == "LED is on, turning off": power_off_relay(1)
    if message == "Pump is off, turning on": power_on_relay(2)
    if message == "Pump is on, turning off": power_off_relay(2)

    if "Selected On Time:" in message:
        selected_time = message.split(": ")[1]
        global ON_TIME
        ON_TIME = datetime.strptime(selected_time, '%H:%M')
    
    if "Selected Off Time:" in message:
        selected_time = message.split(": ")[1]
        global OFF_TIME
        OFF_TIME = datetime.strptime(selected_time, '%H:%M')

    return message

def handle_schedule():
    """This method handles the schedule"""
    current_time = datetime.now()
    global ON_TIME, OFF_TIME

    print(f"Current time: {current_time}, ON_TIME: {ON_TIME}, OFF_TIME: {OFF_TIME}")

    if ON_TIME is not None:
        on_datetime = datetime.today().replace(hour=ON_TIME.hour, minute=ON_TIME.minute, second=0, microsecond=0)
        try:
            if isNowInTimePeriod(on_datetime, (on_datetime + timedelta(minutes=0.5)), current_time):
                print(f"Turning on LED, {on_datetime}")
                power_on_relay(1)
                time.sleep(3)
        except Exception as e:
            print(f"Error: {str(e)}, on_datetime={on_datetime}")
            time.sleep(3)
    
    if OFF_TIME is not None:
        off_datetime = datetime.today().replace(hour=OFF_TIME.hour, minute=OFF_TIME.minute, second=0, microsecond=0)
        try:
            if isNowInTimePeriod(off_datetime, (off_datetime + timedelta(minutes=0.5)), current_time):
                print(f"Turning off LED, {off_datetime}")
                power_off_relay(1)
                time.sleep(3)
        except Exception as e:
            print(f"Error: {str(e)}, off_datetime={off_datetime}")
            time.sleep(3)
    
def isNowInTimePeriod(startTime, endTime, nowTime): 
    """This method checks if the current time is in the given time period
    
    Args:
        startTime (datetime): start time of the time period
        endTime (datetime): end time of the time period
        nowTime (datetime): current time
    
    Returns:
        bool: True if the current time is in the given time period, False otherwise"""

    print(f"Checking if {nowTime} is in the time period {startTime} - {endTime}")
    if startTime < endTime: 
        return nowTime >= startTime and nowTime <= endTime 
    else: 
        return nowTime >= startTime or nowTime <= endTime 

if __name__ == "__main__":

    publish_key = 'pub-c-8bca52f9-3ed6-4c9e-a6f5-0dd08fefa83e'
    subscribe_key = 'sub-c-ef4d649a-440f-11ec-8ee6-ce954cd2c970'
    channel = "MattsChannel"

    pubnub, listener = initialize_pubnub(subscribe_key, publish_key, channel)
    print(f"Connected To Pubnub: {channel}")

    while True:
        timer = RepeatTimer(1, handle_schedule)
        timer.start()
        handle_pubnub_message(listener, channel)
        time.sleep(2)
        timer.cancel()


    