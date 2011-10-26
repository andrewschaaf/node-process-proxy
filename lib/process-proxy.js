(function() {
  var assert, fs, hexy, main, spawn, strftimeUTC, timeoutSet;
  fs = require('fs');
  hexy = require('hexy');
  assert = require('assert');
  spawn = require('child_process').spawn;
  strftimeUTC = require('strftime').strftimeUTC;
  timeoutSet = require('moof').timeoutSet;
  main = function() {
    var args, argv, command, lastTime, log, logTo, out, p;
    argv = require('optimist').argv;
    logTo = argv['log-to'];
    command = argv._[0];
    args = argv._.slice(1);
    assert.ok(logTo);
    assert.ok(command);
    assert.ok(args);
    out = fs.createWriteStream(logTo);
    lastTime = null;
    log = function(title, x) {
      var deltaMs, left, t;
      t = new Date().getTime();
      deltaMs = lastTime === null ? 0 : Math.round(t - lastTime);
      lastTime = t;
      left = "[ " + deltaMs + " ms : " + (strftimeUTC('%Y-%m-%dT%H:%M:%S.%LZ')) + "]";
      out.write("" + left + "-------------------" + title + "-------------------\n");
      out.write(x instanceof Buffer ? hexy.hexy(x) : JSON.stringify(x));
      return out.write("\n\n");
    };
    log('command', command);
    log('args', args);
    log('process-proxy parsed args', argv);
    log('env', process.env);
    p = spawn(command, args);
    log('spawned', {
      pid: p.pid
    });
    p.on('exit', function(code, signal) {
      log('EXIT', {
        code: code,
        signal: signal
      });
      return timeoutSet(500, function() {
        return process.exit(code);
      });
    });
    process.stdin.resume();
    process.stdin.on('data', function(data) {
      log('IN', data);
      return p.stdin.write(data);
    });
    p.stdout.on('data', function(data) {
      log('OUT', data);
      return process.stdout.write(data);
    });
    return p.stderr.on('data', function(data) {
      log('ERR', data);
      return process.stderr.write(data);
    });
  };
  module.exports = {
    main: main
  };
}).call(this);
