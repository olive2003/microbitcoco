//BANBAO

enum IOPORT { 
    A = 1,
    B = 2,
    C = 3,
    D = 4,
    E = 5
}

enum  White_Black_Line {
    //% block="黑线"
    Black = 1,
    //% block="白线"
    White = 0
}

enum NeoPixelMode {
    //% block="RGB (GRB format)"
    RGB = 0,
    //% block="RGB+W"
    RGBW = 1,
    //% block="RGB (RGB format)"
    RGB_RGB = 2
}

enum NeoPixelColors {
    //% block=red
    Red = 0xFF0000,
    //% block=orange
    Orange = 0xFFA500,
    //% block=yellow
    Yellow = 0xFFFF00,
    //% block=green
    Green = 0x00FF00,
    //% block=blue
    Blue = 0x0000FF,
    //% block=indigo
    Indigo = 0x4b0082,
    //% block=violet
    Violet = 0x8a2be2,
    //% block=purple
    Purple = 0xFF00FF,
    //% block=white
    White = 0xFFFFFF,
    //% block=black
    Black = 0x000000
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
    //% blockId=sonar_ping block="超声波 端口 %io|最大距离 %maxCmDistance"
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
