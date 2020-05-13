{
    const PACTIVE = global("PACTIVE")
    const trigger = local("trigger")

    let volm, vola, voln, volr

    switch (trigger) {
        case "headset":
            volm = global("VOLM")
            vola = global("VOLA")
            voln = global("VOLN")
            volr = global("VOLR")
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
    } else {
        vola = global("VOLA")
        voln = global("VOLN")
        volr = global("VOLR")
    }
    if (/Headset/.test(PACTIVE)) {
        volm = Math.min(volm, 8)
        vola = Math.min(vola, 4)
        voln = Math.min(voln, 4)
        volr = Math.min(volr, 4)
    }

    //flash(`volm ${volm}, vola ${vola}, voln ${voln}, volr ${volr}`)

    if (volm) {
        mediaVol(volm, false, false)
    }
    if (vola) {
        alarmVol(vola, false, false)
    }
    if (voln) {
        notificationVol(voln, false, false)
    }
    if (volr) {
        ringerVol(volr, false, false)
    }
}
