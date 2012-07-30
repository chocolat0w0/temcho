TestCase("temchoTest", {
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
		assertEquals("start", btn_label);
	},
	
	"test clickBtn shoud change status (stop to work)": function() {
		this.timer.setStatus("stop");
		this.timer.clickBtn();
		
		assertEquals ("work", this.timer.getStatus());
		assertEquals("interrupt", btn_label);
	}
});
