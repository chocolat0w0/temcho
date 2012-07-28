TestCase("temchoTest", {
	setUp: function () {
		this.timer = new temcho.Timer();
	},
	
	tearDown: function () {
	},
	
	"test startUp should show the status of stop": function() {
		this.timer.startUp();
		
		assertEquals("stop", this.timer.getStatus());
		assertNumber(time);
		assertEquals(25.0, time);
		assertEquals("start", btn_label)
	},
	
	"test clickBtn shoud change status (stop to work)": function() {
		this.timer.setStatus("stop");
		this.timer.clickBtn();
		
		assertEquals ("work", this.timer.getStatus());
		assertNumber(time);
		assertEquals("interrupt", btn_label);
	}
});
