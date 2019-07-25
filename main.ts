

/**
 * Sonar and ping utilities
 */
//% color="#2c3e50" weight=8
namespace Banbao {
    /**
     * Send a ping and get the echo time (in microseconds) as a result
     * @param trig tigger pin
     * @param echo echo pin
     * @param maxCmDistance maximum distance in centimeters (default is 500)
     */
    //% blockId=sonar_ping block="ping trig %trig|echo %echo"
    export function sonar(trig: DigitalPin, echo: DigitalPin, maxCmDistance = 500): number {
        // send pulse
        pins.setPull(trig, PinPullMode.PullNone);
        pins.digitalWritePin(trig, 0);
        control.waitMicros(2);
        pins.digitalWritePin(trig, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trig, 0);
        // read pulse
        const d = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 58);

        return Math.idiv(d, 58);

        }
    }
}
