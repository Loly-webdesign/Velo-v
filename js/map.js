//Création de l'objet objMap
var objMap = {
  lat: 45.763413, //Latitude
  lng: 4.835462, //Longitude
  zoom: 13, //Niveau de zoom de la carte

  //Initialisation de la Map
  initMap: function () {
    map = new google.maps.Map (document.getElementById ('map'), {
      zoom: this.zoom,
      center: {
        lat: this.lat,
        lng: this.lng,
      },
    });
    objMarkers.initJson ();
  },
};
/* actualiser la carte */
$ ('#actual').click (function () {
  location.reload ();
});
/* Affiche et cache le contenu de la légende de la map */
jQuery (document).ready (function () {
  $ ('.more').hide ();
  jQuery ('.button-read-more').click (function () {
    $ (this).closest ('.less').addClass ('active');
    $ (this).closest ('.less').next ().stop (true).slideDown ('1000');
  });
  jQuery ('.button-read-less').click (function () {
    $ (this).closest ('.less').removeClass ('active');
    $ (this).closest ('.less').next ().stop (true).slideUp ('1000');
  });
});
