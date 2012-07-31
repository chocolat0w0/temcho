AsyncTestCase("temchoTest", {
	setUp: function () {
		this.timer = new temcho.Timer();
	},
	
	tearDown: function () {
	},
	
	"test startUp should show the status of stop": function() {
		this.timer.startUp();
		
		assertEquals("stop", this.timer.getStatus());
		assertNumber(this.timer.getTime());
		assertEquals(5.0, this.timer.getTime());
		assertEquals("start", this.timer.getBtnLabel());
	},
	
	"test clickBtn shoud change status (stop to work)": function() {
		this.timer.setStatus("stop");
		this.timer.clickBtn();
		
		assertEquals ("work", this.timer.getStatus());
		assertEquals("interrupt", this.timer.getBtnLabel());
	},
	
	"test timer=0 shoud change mode (ON to OFF)": function(queue) {
		this.timer.setMode("on");
		this.timer.setStatus("stop");
		this.timer.setTime(1.0);
		this.timer.clickBtn();
		
		queue.call(function(callbacks) {
			setTimeout(callbacks.add(function() {
				
			}), 1000);
		});
		
		assertEquals("off", this.timer.getMode());
		assertEquals("stop", this.timer.getStatus());
	},
	
});
