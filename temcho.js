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
	this.setStatus("stop");
	this.setTime(5.0);
	this.setBtnLabel("start");
	
	if ((idTimer = document.getElementById('timer')) != null) {
		idTimer.innerHTML = this.getTime();
	}
	
};

temcho.Timer.prototype.clickBtn = function() {
	var initialTime;
	var restTime;
	var maxTime = this.getTime();
	if (this.getStatus() === "stop") {
		initialTime = new Date().getTime();
		this.setStatus("work");
		this.setBtnLabel("interrupt");
		
		// setIntervalの中ではthisがobjectWindowに書き変わるため、一時保存する
		var self = this;	
		Timer1 = setInterval(function() {
			restTime = maxTime - ((new Date().getTime() - initialTime)/1000);
		
			if ((idTimer = document.getElementById('timer')) != null) {
				idTimer.innerHTML = restTime.toFixed(1);
			}
			if (restTime <= 0) {
				clearInterval(Timer1);
				self.setMode("off");
				self.setStatus("stop");
				//ポップアップで休憩時間を知らせる
				//ポップアップのstartボタンを押すとoffモードでタイマースタート
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

