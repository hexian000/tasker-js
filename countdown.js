const data = [
    {
        "name": "元旦",
        "range": [
            "2023-12-30",
            "2024-01-01"
        ],
        "type": "holiday"
    },
    {
        "name": "春节前补班",
        "range": [
            "2024-02-04"
        ],
        "type": "workingday"
    },
    {
        "name": "春节",
        "range": [
            "2024-02-10",
			"2024-02-17"
        ],
        "type": "holiday"
    },
    {
        "name": "春节后补班",
        "range": [
            "2024-02-18"
        ],
        "type": "workingday"
    },
    {
        "name": "清明节",
        "range": [
            "2024-04-04",
			"2024-04-06"
        ],
        "type": "holiday"
    },
    {
        "name": "清明节后补班",
        "range": [
            "2024-04-07"
        ],
        "type": "workingday"
    },
    {
        "name": "劳动节前补班",
        "range": [
            "2024-04-28"
        ],
        "type": "workingday"
    },
    {
        "name": "劳动节",
        "range": [
            "2024-05-01",
			"2024-05-05"
        ],
        "type": "holiday"
    },
    {
        "name": "劳动节后补班",
        "range": [
            "2024-05-11"
        ],
        "type": "workingday"
    },
    {
        "name": "端午节",
        "range": [
            "2024-06-08",
			"2024-06-10"
        ],
        "type": "holiday"
    },
    {
        "name": "中秋节前补班",
        "range": [
            "2024-09-14"
        ],
        "type": "workingday"
    },
    {
        "name": "中秋节",
        "range": [
            "2024-09-15",
			"2024-09-17"
        ],
        "type": "holiday"
    },
    {
        "name": "国庆节前补班",
        "range": [
            "2024-09-29"
        ],
        "type": "workingday"
    },
    {
        "name": "国庆节",
        "range": [
            "2024-10-01",
			"2024-10-07"
        ],
        "type": "holiday"
    },
    {
        "name": "国庆节后补班",
        "range": [
            "2024-10-12"
        ],
        "type": "workingday"
    },
    {
        "name": "元旦",
        "range": [
            "2025-01-01"
        ],
        "type": "holiday"
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
