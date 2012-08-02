// C言語のdefineっぽいことをしたいんですが…
// 単位：秒
var TIME_ON = 10;
var TIME_OFF = 3;

var temcho = {};

// カプセル化っぽいことをしたかったけどJSではすぐできずに中途半端。とりあえずこのまま実装して後で考える。
temcho.Timer = function() {
	this.status = "stop";
	this.time = TIME_ON;
	this.btn_label = "start";
	this.mode = "off";
};

temcho.Timer.prototype.getStatus = function() {
	return this.status;
};
temcho.Timer.prototype.setStatus = function(nextStatus) {
	this.status = nextStatus;
};
temcho.Timer.prototype.getTime = function() {
	return this.time;
};
temcho.Timer.prototype.setTime = function(nextTime) {
	this.time = parseInt(nextTime);
};
temcho.Timer.prototype.getBtnLabel = function() {
	return this.btn_label;
};
temcho.Timer.prototype.setBtnLabel = function(nextLabel) {
	this.btn_label = nextLabel;
	if ((idBtn = document.getElementById('btn')) != null) {
		idBtn.value = this.btn_label;
	}
};
temcho.Timer.prototype.getMode = function() {
	return this.mode;
};
temcho.Timer.prototype.setMode = function(nextMode) {
	this.mode = nextMode;
};
temcho.Timer.prototype.changeMode = function() {
	if (this.getMode() === "off") {
		this.setMode("on");
	} else {
		this.setMode("off");
	}
};

temcho.Timer.prototype.startUp = function() {
	this.setMode("off");
	this.setStatus("stop");
	this.setTime(TIME_ON);
	this.setBtnLabel("start");
	
	if (document.getElementById('timer') != null) {
		putForwardTime('timer', this.getTime());
	}
};

temcho.Timer.prototype.clickBtn = function() {
	var initialTime;
	var maxTime = this.getTime();
	if (this.getStatus() === "stop") {
		initialTime = new Date().getTime();
		this.changeMode();
		this.setStatus("work");
		this.setBtnLabel("interrupt");
		this.timerCountDown(maxTime, initialTime);
	} else if (this.getStatus() === "work") {
		this.setStatus("interrupt");
		this.setBtnLabel("restart");
		clearInterval(Timer1);
	} else if (this.getStatus() === "interrupt") {
		initialTime = new Date().getTime();
		this.setStatus("work");
		this.setBtnLabel("interrupt");
		this.timerCountDown(maxTime, initialTime);
	}
		
	
	// debug用
	if ((idStatus = document.getElementById('status')) != null) {
		idStatus.innerHTML = this.getMode() + ":" + this.getStatus();
	}
	// debug用ここまで
};

temcho.Timer.prototype.timerCountDown = function(maxTime, initialTime) {
	// thisが書き変わるため、一時保存する
	var self = this;
	var restTime;
	Timer1 = setInterval(function() {
		restTime = calcRestTime(maxTime, initialTime);
	
		if (document.getElementById('timer') != null) {
			putForwardTime('timer', restTime);
		}
		if (restTime <= 0) {
			clearInterval(Timer1);
			self.setStatus("stop");
			self.setBtnLabel("start");
			if (self.getMode() === "off") {
				self.setTime(TIME_ON);
				if ((document.getElementById('timer')) != null) {
					document.getElementById('timer').innerHTML = "Start!!";
				}
			} else {
				self.setTime(TIME_OFF);
				if ((document.getElementById('timer')) != null) {
					document.getElementById('timer').innerHTML = "Let's break♪";
				}
			}
			window.air.NativeApplication.nativeApplication.activate(nativeWindow);
			// 別ウィンドウ開きたいが、テストが停止してしまうため同ウィンドウ内でやりくりする
		}		
	}, 100);
};

var calcRestTime = function(maxTime, initialTime) {
	var now = new Date();
	return (maxTime - ((now.getTime() - initialTime)/1000));
};

var  putForwardTime = function(id, time) {
	var seconds = Math.round(time);
	var minutes = Math.round(seconds / 60);
	seconds = toPaddingZeroString(seconds % 60);
	minutes = toPaddingZeroString(minutes % 60);
	document.getElementById(id).innerHTML = minutes + ":" + seconds;
};

var toPaddingZeroString = function(num) {
	if (num < 10) {
		return "0" + num;
	} else {
		return String(num);
	}
};


