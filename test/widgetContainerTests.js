module("Widget Container Test Suite", {
});

test('Container instantiation works', function() {
    var app = new Test1.application();
    var container = new Eiw.Widget.container(app);
    ok("Container instantiated");
});

test('Try to get an unregistered widget throw an exception', function() {
    var app = new Test1.application();
    var container = new Eiw.Widget.container(app);
    throws(
        function() {
            container.get('test');
        },
        "Exception thrown on invalid widget it"
    );
});