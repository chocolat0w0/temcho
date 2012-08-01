var temcho = {};

temcho.Timer = function() {
	var status;
	var time;
	var btn_label;
	var mode;
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
	this.time = nextTime;
};
temcho.Timer.prototype.getBtnLabel = function() {
	return this.btn_label;
};
temcho.Timer.prototype.setBtnLabel = function(nextLabel) {
	this.btn_label = nextLabel;
};
temcho.Timer.prototype.getMode = function() {
	return this.mode;
};
temcho.Timer.prototype.setMode = function(nextMode) {
	this.mode = nextMode;
};

temcho.Timer.prototype.startUp = function() {
	this.setMode("off");
	this.setStatus("stop");
	this.setTime(5.0);
	this.setBtnLabel("start");
	
	if (document.getElementById('timer') != null) {
		putForwardTime('timer', this.getTime());
	}
	
};

temcho.Timer.prototype.clickBtn = function() {
	var initialTime;
	var restTime;
	var maxTime = this.getTime();
	if (this.getStatus() === "stop") {
		initialTime = new Date().getTime();
		if (this.getMode() === "off") {
			this.setMode("on");
		} else {
			//startボタンを押すとoffモードでタイマースタート			
			this.setMode("off");
		}
		this.setStatus("work");
		this.setBtnLabel("interrupt");
		
		// thisがobjectWindowに書き変わるため、一時保存する
		var self = this;	
		Timer1 = setInterval(function() {
			restTime = calcRestTime(maxTime, initialTime);
		
			if (document.getElementById('timer') != null) {
				putForwardTime('timer', restTime);
			}
			if (restTime <= 0) {
				clearInterval(Timer1);
				self.setStatus("stop");
				self.setBtnLabel("start");
				//ポップアップで休憩時間を知らせる
				//window.open("./timer_stop.html", "", "width=200,height=100");
			}		
		}, 100);
	}
	
	
	if ((idBtn = document.getElementById('btn')) != null) {
		idBtn.value = this.getBtnLabel();
	}
	
	// debug用
	if ((idStatus = document.getElementById('status')) != null) {
		idStatus.innerHTML = this.getMode() + ":" + this.getStatus();
	}
	// debug用ここまで
};

temcho.Timer.prototype.clickStopWindowBtn = function() {
	window.close();
	this.clickBtn();
};

// 残り時間を計算する
function calcRestTime(maxTime, initialTime) {
	var now = new Date();
	return restTime = (maxTime - ((now.getTime() - initialTime)/1000));
}

// 時間を表示形式に成形して表示する（分：秒）
function putForwardTime(id, time) {
	var seconds = Math.round(time);
	var minutes = Math.round(seconds / 60);
	seconds = toPaddingZeroString(seconds % 60);
	minutes = toPaddingZeroString(minutes % 60);
	document.getElementById(id).innerHTML = minutes + ":" + seconds;
}

function toPaddingZeroString(num) {
	if (num < 10) {
		return "0" + num;
	} else {
		return String(num);
	}
}


