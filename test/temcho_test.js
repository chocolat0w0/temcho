AsyncTestCase("temchoTest", {
	setUp: function () {
	},
	
	tearDown: function () {
	},
	
	"test startUp should show the initial mode (mode:off/status:stop)": function() {
		startUp();
		
		assertEquals("off", timerMode.get());
		assertEquals("stop", timerStatus.get());
		assertNumber(timerMax.get());
		assertEquals(TIME_ON, timerMax.get());
		assertEquals("start", timerBtnLabel.get());
	},
	
	"test clickBtn 'start' shoud change status (stop to work)": function() {
		timerStatus.set("stop");
		clickBtn();
		
		assertEquals("work", timerStatus.get());
		assertEquals("interrupt", timerBtnLabel.get());
		// タイマーが開始していることは確認してない
	},
	
	"test timer=0 shoud change status (WORK to STOP)": function(queue) {
		timerMode.set("off");
		timerStatus.set("stop");
		timerMax.set(1.0);
		clickBtn();
		
		assertEquals("work", timerStatus.get());
		assertEquals(1.0, timerMax.get());
		queue.call(function(callbacks) {
			setTimeout(callbacks.add(function() {
				assertEquals("on", timerMode.get());
				assertEquals("stop", timerStatus.get());
				assertEquals("start", timerBtnLabel.get());
				// ウィンドウがアクティブになっているテスト？
			}), 2000); // タイムラグのせいかテストエラー出る場合あり。ブラウザ開きっぱなしだと重くなる？
		});
	},

	//ポップアップのstartボタンを押すとoffモードでタイマースタート
	"test timer=0 and clickBtn should change mode (ON to OFF)": function() {
		timerMode.set("on");
		timerStatus.set("stop");
		timerMax.set(0.0);
		clickBtn();
		
		assertEquals("off", timerMode.get());
		assertEquals("work", timerStatus.get());
		assertEquals("interrupt", timerBtnLabel.get());
	},
	
	"test clickBtn 'interrupt' shoud change status (work to interrupt)": function() {
		timerStatus.set("work");
		clickBtn();
		
		assertEquals("interrupt", timerStatus.get());
		assertEquals("restart", timerBtnLabel.get());
		// タイマーが停止していることは確認してない
	},
	
	"test clickBtn 'reset' shoud change status (interrupt to work), when on mode": function() {
		timerMode.set("on");
		timerMax.set(TIME_ON);
		timerStatus.set("interrupt");
		clickBtn();
		
		assertEquals("on", timerMode.get());
		assertEquals("work", timerStatus.get());
		assertEquals(TIME_ON, timerMax.get());
		assertEquals("interrupt", timerBtnLabel.get());
		// タイマーが停止していることは確認してない
	},
	
	"test clickBtn 'reset' shoud change status (interrupt to work), when off mode": function() {
		timerMode.set("off");
		timerMax.set(TIME_OFF);
		timerStatus.set("interrupt");
		clickBtn();
		
		assertEquals("off", timerMode.get());
		assertEquals("work", timerStatus.get());
		assertEquals(TIME_OFF, timerMax.get());
		assertEquals("interrupt", timerBtnLabel.get());
		// タイマーが停止していることは確認してない
	},
});
