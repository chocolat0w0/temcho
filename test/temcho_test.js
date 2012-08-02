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
		assertEquals(TIME_ON, this.timer.getTime());
		assertEquals("start", this.timer.getBtnLabel());
	},
	
	"test clickBtn 'start' shoud change status (stop to work)": function() {
		this.timer.setStatus("stop");
		this.timer.clickBtn();
		
		assertEquals("work", this.timer.getStatus());
		assertEquals("interrupt", this.timer.getBtnLabel());
		// タイマーが開始していることは確認してない
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
				assertEquals("on", this.timer.getMode());
				assertEquals("stop", this.timer.getStatus());
				assertEquals("start", this.timer.getBtnLabel());
				// ウィンドウがアクティブになっているテスト？
			}), 1100); // タイムラグのせいかテストエラー出る場合あり。ブラウザ開きっぱなしだと重くなる？
		});
	},

	//ポップアップのstartボタンを押すとoffモードでタイマースタート
	"test timer=0 and clickBtn should change mode (ON to OFF)": function() {
		this.timer.setMode("on");
		this.timer.setStatus("stop");
		this.timer.setTime(0.0);
		this.timer.clickBtn();
		
		assertEquals("off", this.timer.getMode());
		assertEquals("work", this.timer.getStatus());
		assertEquals("interrupt", this.timer.getBtnLabel());
	},
	
	"test clickBtn 'interrupt' shoud change status (work to interrupt)": function() {
		this.timer.setStatus("work");
		this.timer.clickBtn();
		
		assertEquals("interrupt", this.timer.getStatus());
		assertEquals("restart", this.timer.getBtnLabel());
		// タイマーが停止していることは確認してない
	},
	
	"test clickBtn 'reset' shoud change status (interrupt to stop)": function() {
		this.timer.setMode("on");
		this.timer.setTime(TIME_OFF);
		this.timer.setStatus("interrupt");
		this.timer.clickBtn();
		
		assertEquals("on", this.timer.getMode());
		assertEquals("work", this.timer.getStatus());
		assertEquals(TIME_ON, this.timer.getTime());
		assertEquals("interrupt", this.timer.getBtnLabel());
		// タイマーが停止していることは確認してない
	},
	
	"test clickBtn 'reset' shoud change status (interrupt to stop)": function() {
		this.timer.setMode("off");
		this.timer.setTime(TIME_OFF);
		this.timer.setStatus("interrupt");
		this.timer.clickBtn();
		
		assertEquals("off", this.timer.getMode());
		assertEquals("work", this.timer.getStatus());
		assertEquals(TIME_OFF, this.timer.getTime());
		assertEquals("interrupt", this.timer.getBtnLabel());
		// タイマーが停止していることは確認してない
	},
});
