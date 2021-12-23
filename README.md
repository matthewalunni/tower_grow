# Tower Grow
## Your Desktop Hydroponic Garden
![drawing](https://github.com/matthewalunni/tower_grow/blob/master/images/splash.png?raw=true)

## Hydroponics
- Hydroponics refers to the art of gardening without soil. 
- Hydroponics can provide a controlled environment supplied with the needed amount of oxygen, water, and nutrient rich solutions.
- Hydroponics can be used to grow flowers, vegetables, and herbs. 

### Benefits of Hydroponics
- A benefit of using hydroponics compared to traditional agriculture is that hydroponics needs 90% less water, and allows us to control how much light needed and for how long, and the pH level of the water can be monitored and adjusted based on the needed environment, which accelerates the plants growth to half the time.
- Plants need the soil to supply them with water and nutrients, but they don’t need it to photosynthesize. Hhydroponics the allows needed nutrients to be dissolved in water and then can be applied directly to the root of the plants either by flooding, misting or immersion. 
- This helps to reduce variability in plant growth due to a controlled environment where no animals, pests or environmental conditions could affect plants growth.

## Design
- Our designed was inspired by different smart garden products, but we were aiming to provide a more durable size of a portable hydroponic garden that can be easily moved and mainly fits anywhere.
- This product could be ideal for a kitchen, office, or basement, focusing on growing as much as we can in a small footprint.
- This product features a modular design that can allow growth all year around in suboptimal light conditions.

## Software
### How It Works
- The mobile application is written in react native, and sends text instructions to a PubNub channel based on user inputs, the deviceitself is programmed using python on a raspberry pi 4b. 
![mockup](https://github.com/matthewalunni/tower_grow/blob/master/images/mockups.png?raw=true)

### Threading and Parallelism
- Parallelism refers to performing multiple computations at the same time. The main execution splits into multiple threads, as illustrated by the image below.
![threading](https://github.com/matthewalunni/tower_grow/blob/master/images/threading.png?raw=true)
- There are two main processes (threads) at work in the program. 
- The first thread is the method handle_pubnub_message (listener, channel). This method will listen for a message on a specified PubNub channel, and then respond to it accordingly.
- The second thread is called handle_schedule(). This handles the scheduling feature by checking if on/off times are set. Following this, if the current time is equal to the specified on/off time, the program will output the correct action, either turning off the led lights, or turning on the led lights.
- Pseudocode follows: If (current time == ON_TIME): turn on led lights

## Hardware
### Components
![ep099](https://github.com/matthewalunni/tower_grow/blob/master/images/ep099.png?raw=true) | ![pi](https://github.com/matthewalunni/tower_grow/blob/master/images/raspberrypi.png?raw=true) | ![pump](https://github.com/matthewalunni/tower_grow/blob/master/images/waterpump.png?raw=true) | ![led strip](https://github.com/matthewalunni/tower_grow/blob/master/images/ledstrip.png?raw=true) |
--- | --- | --- | --- |
EP-0099 4 Channel Relay HAT | Raspberry Pi 4B | 5V USB Water Pump | LED Strip |

### Schematic 
![schematic](https://github.com/matthewalunni/tower_grow/blob/master/images/schematic.png?raw=true)

## Final Design
![final](https://github.com/matthewalunni/tower_grow/blob/master/images/finaldesign.png?raw=true)

## Future Considerations
PH Sensor | Ultrasonic Sensor |
--- | --- | 
![ph](https://github.com/matthewalunni/tower_grow/blob/master/images/phsensor.png?raw=true) | ![ultrasonic](https://github.com/matthewalunni/tower_grow/blob/master/images/ultrasonic.png?raw=true) |
A PH sensor can be implemented for PH value detection and to control and monitor the needed PH value for the plants. | An ultrasonic sensor can be used to detect how much water is in the reservoir and how much water is needed. This information can be used to help the user calculate the quantity of nutrients to be added to the solution.

 
