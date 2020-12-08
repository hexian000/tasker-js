const data = [
    {
        "name": "元旦",
        "range": ["2021-01-01"],
        "type": "holiday"
    },
    {
        "name": "春节",
        "range": ["2021-02-07"],
        "type": "workingday"
    },
    {
        "name": "春节",
        "range": ["2021-02-11", "2021-02-17"],
        "type": "holiday"
    },
    {
        "name": "春节",
        "range": ["2021-02-20"],
        "type": "workingday"
    },
    {
        "name": "清明节",
        "range": ["2021-04-05"],
        "type": "holiday"
    },
    {
        "name": "劳动节",
        "range": ["2021-04-25"],
        "type": "workingday"
    },
    {
        "name": "劳动节",
        "range": ["2021-05-01", "2021-05-05"],
        "type": "holiday"
    },
    {
        "name": "劳动节",
        "range": ["2021-05-08"],
        "type": "workingday"
    },
    {
        "name": "端午节",
        "range": ["2021-06-14"],
        "type": "holiday"
    },
    {
        "name": "中秋节",
        "range": ["2021-09-18"],
        "type": "workingday"
    },
    {
        "name": "中秋节",
        "range": ["2021-9-20", "2021-9-21"],
        "type": "holiday"
    },
    {
        "name": "国庆节",
        "range": ["2021-09-26"],
        "type": "workingday"
    },
    {
        "name": "国庆节",
        "range": ["2021-10-01","2021-10-7"],
        "type": "holiday"
    },
    {
        "name": "国庆节",
        "range": ["2021-10-9"],
        "type": "workingday"
    },
      {
        "name": "元旦",
        "range": ["2022-01-01"],
        "type": "holiday"
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
