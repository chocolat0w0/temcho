var temcho = {};

temcho.Timer = function() {
	var status;
	var time;
	var btn_label;
};

temcho.Timer.prototype.getStatus = function() {
	return status;
};

temcho.Timer.prototype.setStatus = function(nextStatus) {
	status = nextStatus;
}

temcho.Timer.prototype.getTime = function() {
	return time;
}

temcho.Timer.prototype.startUp = function() {
	status = "stop";
	time = 25.0;
	btn_label = "start";
	
	if ((idTimer = document.getElementById('timer')) != null) {
		idTimer.innerHTML = time;
	}
	
}

temcho.Timer.prototype.clickBtn = function() {
	if (this.getStatus() === "stop") {
		initialTime = new Date().getTime();
		this.setStatus("work");
		btn_label = "interrupt";
		setInterval(function() {
			time = 25 - ((new Date().getTime() - initialTime)/1000);
			if ((timer = document.getElementById('timer')) != null) {
				timer.innerHTML = time.toFixed(1);
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
	
	
}

