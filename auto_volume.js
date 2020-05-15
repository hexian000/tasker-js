{
    const PACTIVE = global("PACTIVE")
    const trigger = local("trigger")

    switch (trigger) {
        case "headset":
            break
        case "~headset":
            volm = 0
            break
    }

    let volm, vola, voln, volr

    if (/Outdoor/.test(PACTIVE)) {
        vola = 7, voln = 7, volr = 7
    } else if (/At Home/.test(PACTIVE)) {
        vola = 5, voln = 5, volr = 5
    } else if (/At Work/.test(PACTIVE)) {
        vola = 5, voln = 0, volr = 5
    }

    if (/Headset/.test(PACTIVE)) {
        if (volm !== undefined) {
            volm = Math.min(volm, 13)
        }
        if (vola !== undefined) {
            vola = Math.min(vola, 4)
        }
        if (voln !== undefined) {
            voln = Math.min(voln, 4)
        }
        if (volr !== undefined) {
            volr = Math.min(volr, 4)
        }
    }

    flash(`volm ${volm}\nvola ${vola}\nvoln ${voln}\nvolr ${volr}`)

    if (volm !== undefined) {
        mediaVol(volm, false, false)
    }
    if (vola !== undefined) {
        alarmVol(vola, false, false)
    }
    if (voln !== undefined) {
        notificationVol(voln, false, false)
    }
    if (volr !== undefined) {
        ringerVol(volr, false, false)
    }
}
