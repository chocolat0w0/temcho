var temcho = {};

temcho.Timer = function() {
	var status;
	var time;
	var btn_label;
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

temcho.Timer.prototype.startUp = function() {
	this.setStatus("stop");
	this.setTime(5.0);
	btn_label = "start";
	
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
		btn_label = "interrupt";
	
		Timer1 = setInterval(function() {
			restTime = maxTime - ((new Date().getTime() - initialTime)/1000);
		
			if ((idTimer = document.getElementById('timer')) != null) {
				idTimer.innerHTML = restTime.toFixed(1);
			}
			if (restTime <= 0) {
				clearInterval(Timer1);
				alert("とまったよ！");
			}		
		}, 100);
	}
	
	
	if ((idBtn = document.getElementById('btn')) != null) {
		idBtn.value = btn_label;
	}
		// debug用
	if ((idStatus = document.getElementById('status')) != null) {
		idStatus.innerHTML = "work";
	}
	// debug用ここまで
	
	
};

