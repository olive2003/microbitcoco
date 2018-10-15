# CooCoo Package for Microsoft PXT

软件包github地址为：https://github.com/alsrobot-microbit-makecode-packages/CooCoo
软件包修改维护人员：https://github.com/bobolx

This library provides a Microsoft PXT package for BitBot, see
https://4tronix.co.uk/bitbot/.
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
