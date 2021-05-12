import { getPerformanceTiming/* , getEntryTiming */ } from './timing';

window.onload = function () {
    console.log('window-loading----------', getPerformanceTiming());
};
