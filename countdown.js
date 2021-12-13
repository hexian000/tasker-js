const data = [
    {
        "name": "元旦",
        "range": ["2022-01-01", "2022-01-03"],
        "type": "holiday"
    },
    {
        "name": "春节",
        "range": ["2022-01-29", "2022-01-30"],
        "type": "workingday"
    },
    {
        "name": "春节",
        "range": ["2022-01-31", "2022-02-06"],
        "type": "holiday"
    },
    {
        "name": "清明节",
        "range": ["2022-04-02"],
        "type": "workingday"
    },
    {
        "name": "清明节",
        "range": ["2022-04-03", "2022-04-05"],
        "type": "holiday"
    },
    {
        "name": "劳动节",
        "range": ["2022-04-24"],
        "type": "workingday"
    },
    {
        "name": "劳动节",
        "range": ["2022-04-30", "2022-05-04"],
        "type": "holiday"
    },
    {
        "name": "劳动节",
        "range": ["2022-05-07"],
        "type": "workingday"
    },
    {
        "name": "端午节",
        "range": ["2022-06-03", "2022-06-05"],
        "type": "holiday"
    },
    {
        "name": "中秋节",
        "range": ["2022-09-10", "2022-09-12"],
        "type": "holiday"
    },
    {
        "name": "国庆节",
        "range": ["2022-10-01", "2022-10-07"],
        "type": "holiday"
    },
    {
        "name": "国庆节",
        "range": ["2022-10-08", "2022-10-09"],
        "type": "workingday"
    }
]
const hour = 3600 * 1000
const day = 24 * hour
const now = new Date()
/* 倒计时到前一天晚上18点 */
const off_time = (24 - 18) * hour;

function as_cst(s) {
    return Date.parse(s + "T00:00:00+0800")
}

function as_off_time(s) {
    return as_cst(s) - off_time
}

const next_holiday = data.filter(i =>
    (i.type == "holiday" && now < as_off_time(i.range[0]))
).reduce((a, b) =>
    as_off_time(a.range[0]) < as_off_time(b.range[0]) ? a : b
)

let result, reason, message
if (next_holiday) {
    reason = next_holiday.name
    let t = as_off_time(next_holiday.range[0]) - now
    cd_day = Math.floor(t / day)
    cd_hour = Math.floor(t / hour) % 24
    message = `离 ${reason} 还有`
    if (cd_day > 0) {
        message += ` ${cd_day} 天`
        if (cd_hour > 0) {
            message += ` ${cd_hour} 小时`
        } else {
            message += `整`
        }
    } else {
        if (cd_hour > 0) {
            message += ` ${cd_hour} 小时`
        } else {
            message += `不到 1 小时`
        }
    }
}

setLocal("message", message)
setLocal("reason", reason)
