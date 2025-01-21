const data = [
    {
        "name": "元旦",
        "range": ["2025-01-01"],
        "type": "holiday"
    },
    {
        "name": "春节",
        "range": ["2025-01-26"],
        "type": "workingday"
    },
    {
        "name": "春节",
        "range": ["2025-01-28", "2025-02-04"],
        "type": "holiday"
    },
    {
        "name": "春节",
        "range": ["2025-02-08"],
        "type": "workingday"
    },
    {
        "name": "清明节",
        "range": ["2025-04-04", "2025-04-06"],
        "type": "holiday"
    },
    {
        "name": "劳动节",
        "range": ["2025-04-27"],
        "type": "workingday"
    },
    {
        "name": "劳动节",
        "range": ["2025-05-01", "2025-05-05"],
        "type": "holiday"
    },
    {
        "name": "端午节",
        "range": ["2025-05-31", "2025-06-02"],
        "type": "holiday"
    },
    {
        "name": "国庆节、中秋节",
        "range": ["2025-09-28"],
        "type": "workingday"
    },
    {
        "name": "国庆节、中秋节",
        "range": ["2025-10-01", "2025-10-08"],
        "type": "holiday"
    },
    {
        "name": "国庆节、中秋节",
        "range": ["2025-10-11"],
        "type": "workingday"
    }
]

const now = new Date()

function as_cst(s) {
    return Date.parse(s + "T00:00:00+0800")
}

const match = function () {
    for (let item of data) {
        const day = 24 * 3600 * 1000
        let start = as_cst(item.range[0])
        let end = as_cst(item.range[1])
        if (end) {
            end += day
        } else {
            end = start + day
        }
        if (now >= start && now < end) {
            return item
        }
    }
}()

const weekday = now.getDay()
let result = "workingday", reason = "平日"
if ((weekday === 6) || (weekday === 0)) {
    result = "holiday"
    reason = "周末"
}
if (match) {
    result = match.type
    reason = match.name
}

setLocal("is_holiday", result == "holiday" ? 1 : 0)
setLocal("reason", reason)
