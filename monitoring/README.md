# FTN Monitoring

Pipeline:

`Device / SNMPD / ICMP / RouterOS / OLT / NetFlow -> Collector -> Prometheus/OpenTelemetry -> Alert rules -> FTNSITE WebSocket/API -> Web UI`

Credentials never belong in Git. Use environment variables or a secret manager.

Drivers: MikroTik, EPON/OLT, Generic SNMP, ICMP.
