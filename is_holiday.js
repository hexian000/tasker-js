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
