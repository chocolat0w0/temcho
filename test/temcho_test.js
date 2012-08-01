AsyncTestCase("temchoTest", {
	setUp: function () {
		this.timer = new temcho.Timer();
	},
	
	tearDown: function () {
	},
	
	"test startUp should show the initial mode (mode:off/status:stop)": function() {
		this.timer.startUp();
		
		assertEquals("off", this.timer.getMode());
		assertEquals("stop", this.timer.getStatus());
		assertNumber(this.timer.getTime());
		assertEquals(5.0, this.timer.getTime());
		assertEquals("start", this.timer.getBtnLabel());
	},
	
	"test clickBtn 'start' shoud change status (stop to work)": function() {
		this.timer.setStatus("stop");
		this.timer.clickBtn();
		
		assertEquals ("work", this.timer.getStatus());
		assertEquals("interrupt", this.timer.getBtnLabel());
	},
	
	"test timer=0 shoud change status (WORK to STOP)": function(queue) {
		this.timer.setMode("off");
		this.timer.setStatus("stop");
		this.timer.setTime(1.0);
		this.timer.clickBtn();
		
		assertEquals("work", this.timer.getStatus());
		assertEquals(1.0, this.timer.getTime());
		queue.call(function(callbacks) {
			setTimeout(callbacks.add(function() {
				//ポップアップで休憩時間を知らせる
				assertEquals("on", this.timer.getMode());
				assertEquals("stop", this.timer.getStatus());
				assertEquals("start", this.timer.getBtnLabel());
				//close.window(stopWindow);
			}), 1100);
		});
	},

	//ポップアップのstartボタンを押すとoffモードでタイマースタート
	"test timer=0 and clickBtn should change mode (ON to OFF)": function() {
		this.timer.setMode("on");
		this.timer.setStatus("stop");
		this.timer.setTime(0.0);
		this.timer.clickStopWindowBtn();
		
		assertEquals("off", this.timer.getMode());
		assertEquals("work", this.timer.getStatus());
		assertEquals("interrupt", this.timer.getBtnLabel());
		
	}
	
});
