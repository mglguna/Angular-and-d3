describe("A spec",function(){
var foo,bar=null;
	beforeEach(function(){
		foo={
			setBar:function(value){
				bar=value;
		}};
	});
	spyOn(foo,'setBar');
	foo.setBar(765);
	foo.setBar(123);
	it("is just a function, so it can contain any code",function(){
		expect(foo.setBar).toHaveBeenCalled();
		expect(foo.setBar.calls.length).toEqual(2);
		expect(foo.setBar).toHaveBeenCalledWith(123);
	});
});