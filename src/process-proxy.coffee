
fs = require 'fs'
hexy = require 'hexy'
assert = require 'assert'
{spawn} = require 'child_process'
{strftimeUTC} = require 'strftime'
{timeoutSet} = require 'moof'


main = () ->
  
  {argv} = require 'optimist'
  
  logTo   = argv['log-to']
  command = argv._[0]
  args    = argv._.slice 1
  
  assert.ok logTo
  assert.ok command
  assert.ok args
  
  out = fs.createWriteStream logTo
  lastTime = null
  log = (title, x) ->
    t = new Date().getTime()
    deltaMs = if lastTime == null then 0 else Math.round(t - lastTime)
    lastTime = t
    left = "[ #{deltaMs} ms : #{strftimeUTC('%Y-%m-%dT%H:%M:%S.%LZ')}]"
    out.write "#{left}-------------------#{title}-------------------\n"
    out.write if x instanceof Buffer
      hexy.hexy x
    else
      JSON.stringify x
    out.write "\n\n"
  
  log 'command', command
  log 'args', args
  log 'env', process.env
  
  p = spawn command, args
  log 'spawned', {pid: p.pid}
  
  # exit
  p.on 'exit', (code, signal) ->
    log 'EXIT', {code:code, signal:signal}
    # TODO: properly ensure all data is written
    timeoutSet 500, () ->
      process.exit code
  
  # in
  process.stdin.resume()
  process.stdin.on 'data', (data) ->
    log 'IN', data
    p.stdin.write data
  
  # out
  p.stdout.on 'data', (data) ->
    log 'OUT', data
    process.stdout.write data
  
  # err
  p.stderr.on 'data', (data) ->
    log 'ERR', data
    process.stderr.write data



module.exports =
  main: main
