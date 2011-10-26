
## Example

<pre>
process-proxy --log-to=log.txt -- ping 127.0.0.1
</pre>

### log.txt
<pre>
[ 0 ms : 2011-10-26T14:22:48.742Z]-------------------command-------------------
"ping"

[ 2 ms : 2011-10-26T14:22:48.744Z]-------------------args-------------------
["127.0.0.1"]

[ 0 ms : 2011-10-26T14:22:48.744Z]-------------------process-proxy parsed args-------------------
{"_":["ping","127.0.0.1"],"$0":"node ../bin/process-proxy","log-to":"log.txt"}

[ 0 ms : 2011-10-26T14:22:48.744Z]-------------------env-------------------
{"rvm_gemsets_path":"/Users/a/.rvm/gemsets",...}

[ 26 ms : 2011-10-26T14:22:48.770Z]-------------------spawned-------------------
{"pid":23323}

[ 7 ms : 2011-10-26T14:22:48.777Z]-------------------OUT-------------------
00000000: 5049 4e47 2031 3237 2e30 2e30 2e31 2028  PING.127.0.0.1.(
00000010: 3132 372e 302e 302e 3129 3a20 3536 2064  127.0.0.1):.56.d
00000020: 6174 6120 6279 7465 730a 3634 2062 7974  ata.bytes.64.byt
00000030: 6573 2066 726f 6d20 3132 372e 302e 302e  es.from.127.0.0.
00000040: 313a 2069 636d 705f 7365 713d 3020 7474  1:.icmp_seq=0.tt
00000050: 6c3d 3634 2074 696d 653d 302e 3035 3420  l=64.time=0.054.
00000060: 6d73 0a                                  ms.


[ 1001 ms : 2011-10-26T14:22:49.778Z]-------------------OUT-------------------
00000000: 3634 2062 7974 6573 2066 726f 6d20 3132  64.bytes.from.12
00000010: 372e 302e 302e 313a 2069 636d 705f 7365  7.0.0.1:.icmp_se
00000020: 713d 3120 7474 6c3d 3634 2074 696d 653d  q=1.ttl=64.time=
00000030: 302e 3037 3220 6d73 0a                   0.072.ms.


[ 1000 ms : 2011-10-26T14:22:50.779Z]-------------------OUT-------------------
00000000: 3634 2062 7974 6573 2066 726f 6d20 3132  64.bytes.from.12
00000010: 372e 302e 302e 313a 2069 636d 705f 7365  7.0.0.1:.icmp_se
00000020: 713d 3220 7474 6c3d 3634 2074 696d 653d  q=2.ttl=64.time=
00000030: 302e 3038 3720 6d73 0a                   0.087.ms.

</pre>
