{
    const PACTIVE = global("PACTIVE")
    const trigger = local("trigger")

    let volm, vola, voln, volr

    switch (trigger) {
        case "headset":
            break
        case "~headset":
            volm = 0
            break
    }

    if (/Outdoor/.test(PACTIVE)) {
        vola = 7, voln = 7, volr = 7
    } else if (/At Home/.test(PACTIVE)) {
        vola = 5, voln = 5, volr = 5
    } else if (/At Work/.test(PACTIVE)) {
        vola = 5, voln = 0, volr = 5
    }

    if (/Headset/.test(PACTIVE)) {
        if (typeof (volm) == "number") {
            volm = Math.min(volm, 13)
        }
        if (typeof (vola) == "number") {
            vola = Math.min(vola, 4)
        }
        if (typeof (voln) == "number") {
            voln = Math.min(voln, 4)
        }
        if (typeof (volr) == "number") {
            volr = Math.min(volr, 4)
        }
    }

    flash(`volm ${volm}\nvola ${vola}\nvoln ${voln}\nvolr ${volr}`)

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
