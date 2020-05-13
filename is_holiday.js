var data = [
    {
        "name": "元旦",
        "range": ["2020-01-01"],
        "type": "holiday"
    },
    {
        "name": "春节",
        "range": ["2020-01-19"],
        "type": "workingday"
    },
    {
        "name": "春节",
        "range": ["2020-01-24", "2020-01-30"],
        "type": "holiday"
    },
    {
        "name": "春节",
        "range": ["2020-02-01"],
        "type": "workingday"
    },
    {
        "name": "清明节",
        "range": ["2020-04-04", "2020-04-06"],
        "type": "holiday"
    },
    {
        "name": "劳动节",
        "range": ["2020-04-26"],
        "type": "workingday"
    },
    {
        "name": "劳动节",
        "range": ["2020-05-01", "2020-05-05"],
        "type": "holiday"
    },
    {
        "name": "劳动节",
        "range": ["2020-05-09"],
        "type": "workingday"
    },
    {
        "name": "端午节",
        "range": ["2020-06-25", "2020-06-27"],
        "type": "holiday"
    },
    {
        "name": "端午节",
        "range": ["2020-06-28"],
        "type": "workingday"
    },
    {
        "name": "中秋节/国庆节",
        "range": ["2020-09-27"],
        "type": "workingday"
    },
    {
        "name": "中秋节/国庆节",
        "range": ["2020-10-01", "2020-10-08"],
        "type": "holiday"
    },
    {
        "name": "中秋节/国庆节",
        "range": ["2020-10-10"],
        "type": "workingday"
    }
]

var date = new Date();

function as_cst(s) {
    return Date.parse(s + "T00:00:00+0800");
}

var match = function () {
    for (var i = 0; i < data.length; i++) {
        const day = 24 * 3600 * 1000;
        var start = as_cst(data[i].range[0]);
        var end = as_cst(data[i].range[1]);
        if (end) {
            end += day;
        } else {
            end = start + day;
        }
        if (date >= start && date < end) {
            return data[i];
        }
    }
}();

var weekday = date.getDay();
var result = "workingday", reason = "平日";
if ((weekday === 6) || (weekday === 0)) {
    result = "holiday";
    reason = "周末";
}
if (match) {
    result = match.type;
    reason = match.name;
}

setLocal("is_holiday", result == "holiday" ? 1 : 0);
setLocal("reason", reason);
