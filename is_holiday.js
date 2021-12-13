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
