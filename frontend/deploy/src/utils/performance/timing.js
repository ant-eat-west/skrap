const { keys } = Object;
function getPerformanceTiming() {
    const { performance } = window;
    if (!performance) {
        // 当前浏览器不支持
        console.log('你的浏览器不支持 performance 接口');
        return;
    }

    const t = performance.timing;
    const times = {};

    const TIMING_KEYS = [
        '',
        'fetchStart',
        'domainLookupStart',
        'domainLookupEnd',
        'connectStart',
        'connectEnd',
        'requestStart',
        'responseStart',
        'responseEnd',
        '',
        'domInteractive',
        '',
        'domContentLoadedEventEnd',
        '',
        'loadEventStart',
        '',
        'msFirstPaint',
        'secureConnectionStart'
    ];

    const obj = {
        dns: [3, 2],
        tcp: [5, 4],
        // ssl: [5, 17],
        ttfb: [7, 6],
        trans: [8, 7],
        dom: [10, 8],
        res: [14, 12],
        firstbyte: [7, 2],
        fpt: [8, 1],
        tti: [10, 1],
        ready: [12, 1],
        load: [14, 1]
    };

    for (const i of keys(obj)) {
        // console.log(i, TIMING_KEYS[obj[i][0]], TIMING_KEYS[obj[i][1]]);
        times[i] = t[TIMING_KEYS[obj[i][0]]] - t[TIMING_KEYS[obj[i][1]]];
        // console.log(i, t[TIMING_KEYS[obj[i][0]]], t[TIMING_KEYS[obj[i][1]]]);
    }

    /*

    // domainLookupStart ----- domainLookupEnd
    times.dns = t[TIMING_KEYS[3]] - t[TIMING_KEYS[2]];
    // connectStart ----- connectEnd
    times.tcp = t[TIMING_KEYS[5]] - t[TIMING_KEYS[4]];
    // secureConnectionStart ----- connectEnd
    times.ssl = t[TIMING_KEYS[5]] - t[TIMING_KEYS[17]];
    // requestStart ----- responseStart
    times.ttfb = t[TIMING_KEYS[7]] - t[TIMING_KEYS[6]];
    // responseStart ----- responseEnd
    times.trans = t[TIMING_KEYS[8]] - t[TIMING_KEYS[7]];
    // responseEnd ----- domInteractive
    times.dom = t[TIMING_KEYS[10]] - t[TIMING_KEYS[8]];
    // domContentLoadedEventEnd ----- loadEventStart
    times.res = t[TIMING_KEYS[14]] - t[TIMING_KEYS[12]];
    // domainLookupStart ----- responseStart
    times.firstbyte = t[TIMING_KEYS[7]] - t[TIMING_KEYS[2]];
    // fetchStart ----- responseEnd
    times.fpt = t[TIMING_KEYS[8]] - t[TIMING_KEYS[1]];
    // fetchStart ----- domInteractive
    times.tti = t[TIMING_KEYS[10]] - t[TIMING_KEYS[1]];
    // fetchStart ----- domContentLoadedEventEnd
    times.ready = t[TIMING_KEYS[12]] - t[TIMING_KEYS[1]];
    // fetchStart ----- loadEventStart
    times.load = t[TIMING_KEYS[14]] - t[TIMING_KEYS[1]];
*/

    return times;
}
/*
var entries = window.performance.getEntries();
entries.forEach(function (entry) {
    var times = getEntryTiming(entry);
    console.log(times);
});
*/
function getEntryTiming(entry) {
    const t = entry;
    const times = {};

    // 重定向的时间
    times.redirect = t.redirectEnd - t.redirectStart;

    // DNS 查询时间
    times.lookupDomain = t.domainLookupEnd - t.domainLookupStart;

    // 内容加载完成的时间
    times.request = t.responseEnd - t.requestStart;

    // TCP 建立连接完成握手的时间
    times.connect = t.connectEnd - t.connectStart;

    // 挂载 entry 返回
    times.name = entry.name;

    times.entryType = entry.entryType;

    times.initiatorType = entry.initiatorType;

    times.duration = entry.duration;

    return times;
}

export {
    getPerformanceTiming,
    getEntryTiming
};
