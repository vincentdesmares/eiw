module("Application Test Suite", {
    setup: function() {
        var f = jasmine.getFixtures();
        var path = 'test/fixtures';
        if (typeof window.__karma__ !== 'undefined') {
            path = 'base/' + path
        }
        f.fixturesPath = path
        loadFixtures('templates/app-test1.html')
    },
    teardown: function() {
        var f = jasmine.getFixtures();
        f.cleanUp();
        f.clearCache();
    }
});
test('Simple application test', function() {
    ok($('#app-test1').length);
    var app = new Test1.application();
    app.start();
});
