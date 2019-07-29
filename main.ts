enum IOPORT { 
    A = 1,
    B = 2,
    C = 3,
    D = 4,
    E = 5
}

enum  White_Black_Line {
    Black = 1,
    White = 0
}


/**
 * Sonar and ping utilities
 */
//% color="#2c3e50" weight=10
namespace Banbao {
    /**
     * Send a ping and get the echo time (in microseconds) as a result
     * @param io 在此处描述参数, eg: "C"
     * @param maxCmDistance 在此处描述参数, eg: "500"
     */
    //% blockId=sonar_ping block="ping 端口 %io|距离 %maxCmDistance"
    export function ping(io: IOPORT,  maxCmDistance = 500): number {
        // send pulse
        let trig: DigitalPin;
        let echo: DigitalPin;
        switch (io) { 
            case 3: trig = DigitalPin.P5; echo = DigitalPin.P11; break;
            case 5: trig = DigitalPin.P14; echo = DigitalPin.P15; break;
        }
        pins.setPull(trig, PinPullMode.PullNone);
        pins.digitalWritePin(trig, 0);
        control.waitMicros(2);
        pins.digitalWritePin(trig, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trig, 0);
        // read pulse
        const d = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 58);
        return Math.idiv(d,58);
    }

    /**
       检查巡线传感器测定的是白线还是黑线

     */
    //% blockId=octopus_adkeyboard weight=90 blockGap=30
    //% block="巡线传感器 端口 %io 是否 %state"

    /** 

       *@param io 在此处描述参数, eg: "C"
        *@param state 在此处描述参数, eg: "White"
       
       */
    export function Rpatrol(io: IOPORT, state: White_Black_Line): boolean {
        let p: DigitalPin;
        switch (io) { 
            case 1: p = DigitalPin.P3; break;
            case 2: p = DigitalPin.P11; break;
            case 3: p = DigitalPin.P5; break;
        }
        
        if (pins.digitalReadPin(p) == state)
            return true;
        else
            return false;
    }
}   
