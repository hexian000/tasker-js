const data = [
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

const now = new Date()

function as_cst(s) {
    return Date.parse(s + "T00:00:00+0800")
}

let next_holiday = data.filter(i =>
    (i.type == "holiday" && now < as_cst(i.range[0]))
).reduce((a, b) =>
    as_cst(a.range[0]) < as_cst(b.range[0]) ? a : b
)

let result, reason, message
if (next_holiday) {
    reason = next_holiday.name
    let t = as_cst(next_holiday.range[0]) - now
    const hour = 3600 * 1000
    const day = 24 * hour
    result = Math.ceil(t / day)
    cd_day = Math.floor(t / day)
    cd_hour = Math.floor(t / hour) % 24
    message = `离 ${reason} 还有`
    if (cd_day > 0) {
        message += ` ${cd_day} 天`
    }
    if (cd_hour > 0) {
        message += ` ${cd_hour} 小时`
    } else {
        message += `不到 1 小时`
    }
}

setLocal("countdown", result)
setLocal("message", message)
setLocal("reason", reason)
