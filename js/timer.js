var compteARebour;

var objTimer = {
    duree: 1200, //Initialisation de la durée en secondes
    initTimer: function () {
        var compteur = document.getElementById('compteur');
        s = this.duree; //Secondes --> On initialise les secondes à 1200s ->20mn
        mn = 0; //Minutes

        if (s <= 0) {
            $("#compteur").text("Votre réservation a expirée");
            $('.buttonAnnul').css('display', 'none');
            //compteur.innerHTML = "Votre réservation a expirée<br />"
            sessionStorage.clear(); //Supprime les données du sessionStorage à la fin du décompte
        } else {
            if (s > 59) {
                mn = Math.floor(s / 60);
                s = s - mn * 60
            }
            if (s < 10) {
                s = "0" + s
            }
            if (mn < 10) {
                mn = "0" + mn
            }
            compteur.innerHTML = "Réservation valable pendant : " + mn + ":" + s;
        }
        this.duree = this.duree - 1;
        compteARebour = window.setTimeout("objTimer.initTimer();", 999);
        return compteur;
    },

    // Fonction pour le reset du timer
    resetTimer: function () {
        clearTimeout(compteARebour);
        this.duree = 1200; //Au reset, on réinitialise le timer à 1200s
    },
    // Calcul de la différence entre l'heure de reservation et l'heure actuelle
    diffTime: function () {
        var timeReserv = sessionStorage.getItem('heure-reservation');
        var timeActuelle = new Date().getTime();
        var diff = Math.round(1200 - ((timeActuelle - timeReserv) / 1000));
        return diff;
    }

}