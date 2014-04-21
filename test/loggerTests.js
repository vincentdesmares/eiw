module("Logger Test Suite", {
});

test('Test that we can log', function() {
    var logger = new Eiw.logger();
    var returned = logger.log('test');
    deepEqual(returned, logger, "Logger is should be returned when calling the log function");
});

test('Test that we can log when console is not available', function() {
    var logger = new Eiw.logger();
    var consoleBackup = window.console;
    window.console = null;
    logger.log('test');
    ok("No error got thrown");
    window.console = consoleBackup;
});

