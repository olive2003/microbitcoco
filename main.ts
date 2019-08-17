//BANBAO

enum IOPORT { 
    A = 1,
    B = 2,
    C = 3,
    D = 4,
    E = 5
}

enum MOTORPORT { 
    D = 4,
    E = 5
}

enum  Brake_Type {
    //% block="制动刹车"
    brake = 1,
    //% block="惯性滑行"
    skid = 0
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
    //% blockId=sonar_ping block="超声波 端口 %io|最大距离 %maxCmDistance  厘米"
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
 
    /**
     * 吃葡萄不吐葡萄皮
     * @param io 在此处描述参数, eg: "D"
     * @param speed 在此处描述参数, eg: "50"
     */
    //% block="电机 端口 %io 速度 %speed"
    //% speed.min=-1023 speed.max=1023
    export function motor(io: MOTORPORT, speed: number) {
        let io1: DigitalPin;   //pin8 pin16
        let io2: AnalogPin;    //pin1 pin2
        switch (io) { 
            case 4: io1 = DigitalPin.P8; io2=AnalogPin.P1; break;
            case 5: io1 = DigitalPin.P16; io2=AnalogPin.P2; break;
        }       
        if(speed>=0)
        {
            pins.digitalWritePin(io1,0);
            pins.analogWritePin(io2,speed);
        }
        else
        {
            pins.digitalWritePin(io1,1);
            pins.analogWritePin(io2,1023-speed);           
        }
    }

    /**
     * 红鲤鱼与绿鲤鱼与驴
     */
    //% block="电机 端口 %io %Bratype"
    export function MotorStop(io: MOTORPORT, Bratype: Brake_Type) {
        let io1: DigitalPin;   //pin8 pin16
        let io2: DigitalPin;    //pin1 pin2
        switch (io) { 
            case 4: io1 = DigitalPin.P8; io2=DigitalPin.P1; break;
            case 5: io1 = DigitalPin.P16; io2=DigitalPin.P2; break;
        }     
        pins.digitalWritePin(io1,Bratype);
        pins.digitalWritePin(io2,Bratype);  

    }


  /**
     * A NeoPixel strip
     */


    export class Strip {
        buf: Buffer;
        pin: DigitalPin;
        // TODO: encode as bytes instead of 32bit
        brightness: number;
        start: number; // start offset in LED strip
        _length: number; // number of LEDs
        _mode: NeoPixelMode;
        _matrixWidth: number; // number of leds in a matrix - if any

        /**
         * Shows all LEDs to a given color (range 0-255 for r, g, b). 
         * @param rgb RGB color of the LED
         */
        //% blockId="neopixel_set_strip_color" block="%strip|show color %rgb=neopixel_colors" 
        //% weight=85 blockGap=8

        showColor(rgb: number) {
            rgb = rgb >> 0;
            this.setAllRGB(rgb);
            this.show();
        }
    
        show() {
            ws2812b.sendBuffer(this.buf, this.pin);
        }
   /**
         * Set the brightness of the strip. This flag only applies to future operation.
         * @param brightness a measure of LED brightness in 0-255. eg: 255
         */
        //% blockId="neopixel_set_brightness" block="%strip|set brightness %brightness" blockGap=8
        //% weight=59
 
        setBrightness(brightness: number): void {
            this.brightness = brightness & 0xff;
        }


        /** 
         * Create a range of LEDs.
         * @param start offset in the LED strip to start the range
         * @param length number of LEDs in the range. eg: 4
         */
        //% weight=89
        //% blockId="neopixel_range" block="%strip|range from %start|with %length|leds"

        //% blockSetVariable=range
        range(start: number, length: number): Strip {
            start = start >> 0;
            length = length >> 0;
            let strip = new Strip();
            strip.buf = this.buf;
            strip.pin = this.pin;
            strip.brightness = this.brightness;
            strip.start = this.start + Math.clamp(0, this._length - 1, start);
            strip._length = Math.clamp(0, this._length - (strip.start - this.start), length);
            strip._matrixWidth = 0;
            strip._mode = this._mode;
            return strip;
        }


        /**
         * Set the pin where the neopixel is connected, defaults to P0.
         */
        //% weight=10

        setPin(pin: DigitalPin): void {
            this.pin = pin;
            pins.digitalWritePin(this.pin, 0);
            // don't yield to avoid races on initialization
        }
        private setBufferRGB(offset: number, red: number, green: number, blue: number): void {
            if (this._mode === NeoPixelMode.RGB_RGB) {
                this.buf[offset + 0] = red;
                this.buf[offset + 1] = green;
            } else {
                this.buf[offset + 0] = green;
                this.buf[offset + 1] = red;
            }
            this.buf[offset + 2] = blue;
        }

        private setAllRGB(rgb: number) {
            let red = unpackR(rgb);
            let green = unpackG(rgb);
            let blue = unpackB(rgb);

            const br = this.brightness;
            if (br < 255) {
                red = (red * br) >> 8;
                green = (green * br) >> 8;
                blue = (blue * br) >> 8;
            }
            const end = this.start + this._length;
            const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
            for (let i = this.start; i < end; ++i) {
                this.setBufferRGB(i * stride, red, green, blue)
            }
        }
        private setAllW(white: number) {
            if (this._mode !== NeoPixelMode.RGBW)
                return;

            let br = this.brightness;
            if (br < 255) {
                white = (white * br) >> 8;
            }
            let buf = this.buf;
            let end = this.start + this._length;
            for (let i = this.start; i < end; ++i) {
                let ledoffset = i * 4;
                buf[ledoffset + 3] = white;
            }
        }
        private setPixelRGB(pixeloffset: number, rgb: number): void {
            if (pixeloffset < 0
                || pixeloffset >= this._length)
                return;

            let stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
            pixeloffset = (pixeloffset + this.start) * stride;

            let red = unpackR(rgb);
            let green = unpackG(rgb);
            let blue = unpackB(rgb);

            let br = this.brightness;
            if (br < 255) {
                red = (red * br) >> 8;
                green = (green * br) >> 8;
                blue = (blue * br) >> 8;
            }
            this.setBufferRGB(pixeloffset, red, green, blue)
        }
        private setPixelW(pixeloffset: number, white: number): void {
            if (this._mode !== NeoPixelMode.RGBW)
                return;

            if (pixeloffset < 0
                || pixeloffset >= this._length)
                return;

            pixeloffset = (pixeloffset + this.start) * 4;

            let br = this.brightness;
            if (br < 255) {
                white = (white * br) >> 8;
            }
            let buf = this.buf;
            buf[pixeloffset + 3] = white;
        }
    }

   /*  
    export function ping(io: IOPORT,  maxCmDistance = 500): number {
        // send pulse
        let trig: DigitalPin;
        let echo: DigitalPin;
        switch (io) { 
            case 3: trig = DigitalPin.P5; echo = DigitalPin.P11; break;
            case 5: trig = DigitalPin.P14; echo = DigitalPin.P15; break;
        }
    */

    /**
     * Create a new NeoPixel driver for LEDs.
     * @param io the pin where the neopixel is connected.
     
    //% blockId="neopixel_create" block="NeoPixel at io %io|with 3leds as RGB"
    //% weight=90 blockGap=8
    //% trackArgs=0,2
    //% blockSetVariable=strip
    export function create(io: IOPORT): Strip {
        let strip = new Strip();

        strip.start = 0;
        strip._length = 3;
        strip._mode = NeoPixelMode.RGB;
        strip._matrixWidth = 0;
        strip.setBrightness(128);
  
        return strip;
    }*/

    /**
     * Converts red, green, blue channels into a RGB color
     * @param red value of the red channel between 0 and 255. eg: 255
     * @param green value of the green channel between 0 and 255. eg: 255
     * @param blue value of the blue channel between 0 and 255. eg: 255
     */
    //% weight=1
    //% blockId="neopixel_rgb" block="red %red|green %green|blue %blue"

    export function rgb(red: number, green: number, blue: number): number {
        return packRGB(red, green, blue);
    }

    /**
     * Gets the RGB value of a known color
    */
    //% weight=2 blockGap=8
    //% blockId="neopixel_colors" block="%color"

    export function colors(color: NeoPixelColors): number {
        return color;
    }

    function packRGB(a: number, b: number, c: number): number {
        return ((a & 0xFF) << 16) | ((b & 0xFF) << 8) | (c & 0xFF);
    }
    function unpackR(rgb: number): number {
        let r = (rgb >> 16) & 0xFF;
        return r;
    }
    function unpackG(rgb: number): number {
        let g = (rgb >> 8) & 0xFF;
        return g;
    }
    function unpackB(rgb: number): number {
        let b = (rgb) & 0xFF;
        return b;
    }
}   
