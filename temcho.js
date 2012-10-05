// C言語のdefineっぽいことをしたいんですが…
// 単位：秒
var TIME_ON = 25*60;
var TIME_OFF = 5*60;

var timerStatus = (function() {
	var status = "stop";
	
	return {
		set: function(next) {
			status = next;
		},
		get: function() {
			return status;
		}
	};
}());

var timerMax = (function() {
	var max = TIME_ON;
	
	return {
		set: function(next) {
			max = next;
		},
		get: function() {
			return max;
		}
	};
}());

var timerBtnLabel = (function() {
	var btnLabel;
	return {
		set: function(next) {
			btnLabel = next;
			if ((idBtn = document.getElementById('btn')) != null) {
				idBtn.value = next;
			}
		},
		get: function() {
			return btnLabel;
		}
	}
}());

var timerMode = (function() {
	var mode;
	return {
		set: function(next) {
			mode = next;
		},
		get: function() {
			return mode;
		},
		change: function() {
			if (mode === "off") {
				mode = "on";
			} else {
				mode = "off";
			}
		}
	}
}());

var startUp = function() {
	timerMode.set("off");
	timerStatus.set("stop");
	timerMax.set(TIME_ON);
	timerBtnLabel.set("start");
	
	if (document.getElementById('timer') != null) {
		putForwardTime('timer', timerMax.get());
	}
};

var clickBtn = function() {
	var initialTime;
	var maxTime = timerMax.get();
	if (timerStatus.get() === "stop") {
		initialTime = new Date().getTime();
		timerMode.change();
		timerStatus.set("work");
		timerBtnLabel.set("interrupt");
		timerCountDown(maxTime, initialTime);
	} else if (timerStatus.get() === "work") {
		timerStatus.set("interrupt");
		timerBtnLabel.set("restart");
		clearInterval(Timer1);
	} else if (timerStatus.get() === "interrupt") {
		initialTime = new Date().getTime();
		timerStatus.set("work");
		timerBtnLabel.set("interrupt");
		timerCountDown(maxTime, initialTime);
	}
		
	
	// debug用
	if ((idStatus = document.getElementById('status')) != null) {
		idStatus.innerHTML = timerMode.get() + ":" + timerStatus.get();
	}
	// debug用ここまで
};

var timerCountDown = function(maxTime, initialTime) {
	var restTime;
	Timer1 = setInterval(function() {
		restTime = calcRestTime(maxTime, initialTime);
	
		if (document.getElementById('timer') != null) {
			putForwardTime('timer', restTime);
		}
		if (restTime <= 0) {
			clearInterval(Timer1);
			timerStatus.set("stop");
			timerBtnLabel.set("start");
			if (timerMode.get() === "off") {
				timerMax.set(TIME_ON);
				if ((document.getElementById('timer')) != null) {
					document.getElementById('timer').innerHTML = "Start!!";
				}
			} else {
				timerMax.set(TIME_OFF);
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
	var minutes = Math.floor(seconds / 60);
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


