# CooCoo Package for Banbao

The github address of the package is https://github.com/alsrobot-microbit-makecode-packages/CooCoo
The maintenance staff of the package is https://github.com/lzl525898

This package is specially developed for the micro:bit version of the CooCoo intelligent programming robot. For detailed information on the controller, please visit:http://www.alsrobot.cn/goods-874.html

## Drive CooCoo  
Use the motorRun() method to set the speed value of the CooCoo motor to drive, the speed value range is -1023~1023, the speed value is positive motor forward rotation, and the speed value is negative motor reversal.

// Drive forward
CooCoo.motorRun(1023, 1023)

// Driving backwards
CooCoo.motorRun(-1023, -1023)

// Drive left
CooCoo.motorRun(-1023, 1023)

// Drive right
CooCoo.motorRun(1023, -1023)

// Stop left motor
CooCoo.motorStop(MotorDirection.left)

// Stop right motor
CooCoo.motorStop(MotorDirection.right)

//Stop the motor on both sides
CooCoo.motorStopAll()

## Let CooCoo make a sound

Use the myPlayTone() method to let CooCoo emit tones, including: do, re, mi, fa, sol, la, si, and the beat includes: 1/8, 1/4, 1/2, 1, 2, 4

// Play tone do, beat is a whole shot
CooCoo.myPlayTone(ToneHzTable.do, BeatList.whole_beat)

//Play Happy Birthday Songs
CooCoo.MyPlayMusic(SongList.birthday)

## Line of inspection

Use the readPatrol() method to implement the line inspection function.

// When both line sensors are on the black runway
CooCoo.readPatrol(Patrol.black_black)

## Ultrasonic measurement of obstacle distance

Use the sensorDistance () method to achieve the function of ultrasonic testing obstacle distance, the unit can choose μs or cm

//Obtain obstacle distance (in cm)
CooCoo.sensorDistance(PingUnit.Centimeters)

## Support

* for PXT/microbit

## License

MIT


# 奥松CooCoo智能编程机器人microbit软件包

软件包github地址为：https://github.com/alsrobot-microbit-makecode-packages/CooCoo
软件包修改维护人员：https://github.com/lzl525898

该软件包专门为micro:bit版CooCoo智能编程机器人开发，控制器详细信息请访问：http://www.alsrobot.cn/goods-874.html

## 让CooCoo行驶    
使用motorRun()方法设置，CooCoo左右电机的速度数值，是其行驶，速度值得范围是-1023~1023，速度值为正电机正转，速度值为负电机反转

// 向前行驶
CooCoo.motorRun(1023, 1023)

// 向后行驶
CooCoo.motorRun(-1023, -1023)

// 向左行驶
CooCoo.motorRun(-1023, 1023)

// 向右行驶
CooCoo.motorRun(1023, -1023)

// 停止左电机
CooCoo.motorStop(MotorDirection.left)

// 停止右电机
CooCoo.motorStop(MotorDirection.right)

//停止两侧电机
CooCoo.motorStopAll()

## 让CooCoo发出声音

使用myPlayTone()方法，让CooCoo发出音调，音调包括：do、re、mi、fa、sol、la、si，节拍包括：1/8、1/4、1/2、1、2、4

// 播放音调do节拍为整拍
CooCoo.myPlayTone(ToneHzTable.do, BeatList.whole_beat)

//播放生日快乐歌
CooCoo.MyPlayMusic(SongList.birthday)

## 巡线

使用readPatrol()方法实现巡线功能

// 当两个巡线传感器均在黑色跑道上时
CooCoo.readPatrol(Patrol.black_black)

## 超声波测障碍物距离

使用sensorDistance()方法实现超声波测试障碍物距离的功能，单位可选择μs或cm

//获得障碍物距离（单位为cm）
CooCoo.sensorDistance(PingUnit.Centimeters)

## 支持

* for PXT/microbit

## License

MIT
