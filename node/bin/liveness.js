#!/usr/bin/env node

const { host, port, timeout } = require('yargs')
    .option('host', {
        alias: 'h',
        describe: 'host to probe',
        type: 'string',
        default: '127.0.0.1'
    })
    .option('port', {
        alias: 'p',
        describe: 'port to probe',
        type: 'number',
        default: 10382
    })
    .option('timeout', {
        alias: 't',
        describe: 'number of miliseconds to wait before failing',
        type: 'number',
        default: 1000
    })
    .help()
    .argv;

setTimeout(() => {
    console.log('Timeout');
    process.exit(-1);
}, timeout);

const { LivenessClient, checkProbe } = require('..');

checkProbe(LivenessClient, `${host}:${port}`).then(
    healthy => {
        process.exit(healthy ? 0 : 1);
    },
    err => {
        console.log(err);
        process.exit(1);
    }
);
