const data = [
    {
        "name": "元旦",
        "range": [
            "2022-12-31",
            "2023-01-02"
        ],
        "type": "holiday"
    },
    {
        "name": "春节",
        "range": [
            "2023-01-21",
            "2023-01-27"
        ],
        "type": "holiday"
    },
    {
        "name": "春节",
        "range": [
            "2023-01-28",
            "2023-01-29"
        ],
        "type": "workingday"
    },
    {
        "name": "清明节",
        "range": [
            "2023-04-05"
        ],
        "type": "holiday"
    },
    {
        "name": "劳动节",
        "range": [
            "2023-04-23"
        ],
        "type": "workingday"
    },
    {
        "name": "劳动节",
        "range": [
            "2023-04-29",
            "2023-05-03"
        ],
        "type": "holiday"
    },
    {
        "name": "劳动节",
        "range": [
            "2023-05-06"
        ],
        "type": "workingday"
    },
    {
        "name": "端午节",
        "range": [
            "2023-06-22",
            "2023-06-24"
        ],
        "type": "holiday"
    },
    {
        "name": "端午节",
        "range": [
            "2023-06-25"
        ],
        "type": "workingday"
    },
    {
        "name": "中秋节/国庆节",
        "range": [
            "2023-09-29",
            "2023-10-06"
        ],
        "type": "holiday"
    },
    {
        "name": "中秋节/国庆节",
        "range": [
            "2023-10-07",
            "2023-10-08"
        ],
        "type": "workingday"
    },
    {
        "name": "元旦",
        "range": [
            "2023-12-30",
            "2024-01-01"
        ],
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
