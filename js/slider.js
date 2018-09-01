/*creation du diapo contrôlable avec les flèches gauches et droites du clavier
Le diapo se décompose en 3 parties :
- Les images positionnées sur la gauche de l'image au centre (avec class="gauche")
- l'image positionnée au centre avec la class="centre"
- Les images positionnées sur la droite de l'image au centre (avec classe="droite")
Initialisation : (toutes les positions sont exprimées en %) 
1) On initialise la position de l'image centrale (en fonction de la taille de l'écran)
2) Par défaut, les images class="gauche" sont supperposées (même chose pour les images class="droite")
2) On initialise alors la position des images ayant la class="droite" via la fonction moveItems(".droite")  
3) On initialise de la même façon la position des images ayant la class="gauche" via la fonction moveItems(".gauche")
==> Pour chaque image on modifie l'attribut css "left" et on incremente de x% ce qui permet de creer un décalage entre les images. 
Fonctionnement :
Exemple : Si l'on presse la touche Fléche droite du clavier : 
- On ajoute la class="droite" à l'image positionnée au centre puis à cette même image on supprime la class="centre"
- On ajoute la class="centre" à la derniere image class="gauche" puis, sur cette même image, on supprime la class="gauche"
- On appelle les fonctions moveItems(".droite") et moveItems(".gauche") afin de reinitialiser les positions des images
Le raisonnement est le même si l'on presse la touche flèche gauche ou si l'on click directement sur une image
*/
var slider = {
  //position de la premiere image de la partie droite à partir du bord gauche de l'ecran
  positionFromLeftR: null,
  //position de la premiere image de la partie gauche à partir du bord gauche de l'ecran
  positionFromleftL: null,
  zindex: null,
  //position de l'image du centre
  centre: null,
  zindexCentre: null,

  init: function () {
    if ($ (window).width () < 767) {
      this.centre = 30; //30% à partir du bord gauche de l'écran
    } else {
      this.centre = 35;
    }
    this.positionFromLeftR = 65; // 65% à partir du bord gauche de l'écran
    this.positionFromleftL = 8; // 8% à partir du bord gauche de l'écran
    this.zindex = -1;
    this.zindexCentre = 10;
    //On initialise le positionnement des images à droite et à gauche
    slider.moveItems ('.droite');
    slider.moveItems ('.gauche');
    $ ('body').keydown (function (e) {
      if (e.which == 39) {
        slider.arrowPress ('droite');
      } else if (e.which == 37) {
        slider.arrowPress ('gauche');
      }
    });
  },
  //Gère le contrôle du slider avec les flèches. Cette méthode prend en paramètre la chaine de caractères : "droite" ou "gauche"
  arrowPress: function (direction) {
    $ ('.centre').addClass (direction);
    $ ('.centre').removeClass ('centre');
    if (direction === 'droite') {
      $ ('.gauche:last').addClass ('centre');
      $ ('.gauche:last').removeClass ('gauche');
    } else if (direction === 'gauche') {
      $ ('.droite:first').addClass ('centre');
      $ ('.droite:first').removeClass ('droite');
    }
    $ ('.centre:eq(0)')
      .css ('left', this.centre + '%')
      .css ('z-index', this.zindexCentre);
    this.moveItems ('.droite');
    this.moveItems ('.gauche');
  },
  // Permet de creer un décalage entre les images. Cette méthode prend en paramètre une classe en chaine de caractères : ".droite" ou ".gauche"
  moveItems: function (classe) {
    var positionG = this.positionFromLeftR;
    var zindexG = this.zindex;
    var positionD = this.positionFromleftL;
    var zindexD = this.zindex;
    var nbImagesGauche = $ ('.gauche').length;
    $ (classe).each (function (index) {
      if (classe === '.droite') {
        $ ('.droite:eq(' + index + ')')
          .css ('left', positionG + '%')
          .css ('z-index', zindexG);
        positionG = positionG + 4; //on increments de 4% l'attribut left
        zindexG--;
      } else if (classe === '.gauche') {
        $ ('.gauche:eq(' + (nbImagesGauche - index - 1) + ')')
          .css ('left', positionD + '%')
          .css ('z-index', zindexD);
        positionD = positionD - 4;
        zindexD--;
      }
    });
    $ ('.droite').each (function (index) {
      $ ('.droite:eq(' + index + ')').off ();
    });
    $ ('.gauche').each (function (index) {
      $ ('.gauche:eq(' + index + ')').off ();
    });
    this.addClickItems ('.droite');
    this.addClickItems ('.gauche');
  },
  //Ajout du click afin de pouvoir naviguer directement sur une image. Cette méthode prend en paramètre une classe en chaine de caractères : ".droite" ou ".gauche"
  addClickItems: function (classe) {
    $ (classe).each (function (index) {
      $ (classe + ':eq(' + index + ')').click (function () {
        if (classe === '.droite') {
          $ ('.centre').addClass ('gauche');
        } else if (classe === '.gauche') {
          $ ('.centre').addClass ('droite');
        }
        $ ('.centre').removeClass ('centre');
        if (classe === '.droite') {
          $ ('.droite:lt(' + index + ')').addClass ('gauche');
          $ ('.droite:lt(' + index + ')').removeClass ('droite');
          $ ('.droite:eq(0)').addClass ('centre');
          $ ('.droite:eq(0)').removeClass ('droite');
        } else if (classe === '.gauche') {
          $ ('.gauche:gt(' + index + ')').addClass ('droite');
          $ ('.gauche:gt(' + index + ')').removeClass ('gauche');
          $ ('.gauche:last').addClass ('centre');
          $ ('.gauche:last').removeClass ('gauche');
        }
        $ ('.centre')
          .css ('left', slider.centre + '%')
          .css ('z-index', slider.zindexCentre);
        slider.moveItems ('.droite');
        slider.moveItems ('.gauche');
      });
    });
  },
  //gestion de la taille du diapo en fonction de la taille de l'écran (au chargement ou redimensionnement)
  DiaporamaSize: function () {
    if ($ (window).width () > 767) {
      var hauteurDiapo = $ (window).width () * 280 / 900;
      $ ('#diapo').css ('height', hauteurDiapo);
    } else {
      var hauteurDiapo = $ (window).width () * 250 / 500;
      $ ('#diapo').css ('height', hauteurDiapo);
    }

    $ (window).resize (function () {
      if ($ (window).width () > 767) {
        var hauteurDiapo = $ (window).width () * 280 / 900;
        $ ('#diapo').css ('height', hauteurDiapo);
      } else {
        var hauteurDiapo = $ (window).width () * 250 / 500;
        $ ('#diapo').css ('height', hauteurDiapo);
      }
      slider.init ();
    });
  },
};
$ (function () {
  slider.init ();
});

  window.onload = function () {
  mapsResa.initialiser ();
  sessionTemp.controlStorage ();
};
