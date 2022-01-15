{
    const PACTIVE = global("PACTIVE")
    const trigger = local("trigger")

    let volm, vola, volr

    switch (trigger) {
        case "headset":
            volm = parseInt(global("VOLM"))
            break
        case "~headset":
            volm = 0
            break
    }

    if (/Outdoor/.test(PACTIVE)) {
        vola = 7, volr = 7, voln = 7
    } else if (/At Home/.test(PACTIVE)) {
        vola = 3, volr = 3, voln = 3
    } else if (/At Work/.test(PACTIVE)) {
        vola = 3, volr = 3, voln = 0
    }

    if (/Headset/.test(PACTIVE)) {
        if (typeof (volm) == "number") {
            volm = Math.min(volm, 10)
        }
        if (typeof (vola) == "number") {
            vola = Math.min(vola, 4)
        }
        if (typeof (volr) == "number") {
            volr = Math.min(volr, 4)
        }
        if (typeof (voln) == "number") {
            voln = Math.min(voln, 4)
        }
    }

    flash(`volm ${volm}\nvola ${vola}\nvolr ${volr}\nvoln ${voln}`)

    if (typeof (volm) == "number") {
        mediaVol(volm, false, false)
    }
    if (typeof (vola) == "number") {
        alarmVol(vola, false, false)
    }
    if (typeof (voln) == "number") {
        notificationVol(voln, false, false)
    }
    if (typeof (volr) == "number") {
        ringerVol(volr, false, false)
    }
}
