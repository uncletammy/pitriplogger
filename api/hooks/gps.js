var Bancroft = require('bancroft');
var gps;


var savePoint = function(point){
  var coordinates = point&&point.geometries&&point.geometries.coordinates;
  sails.log('saving point:',coordinates);
  return;
};

var setupGps = function(callback){

  sails.log('setting up GPS');

  gps = new Bancroft();

  gps.on('satellite', function (satellite) {
    sails.log('New Satellite:',satellite);
  });

  gps.on('disconnect', function (err) {
    sails.log('Disconnected:',arguments);
  });

  gps.on('location',savePoint);
  gps.on('connect', callback);

};


module.exports = function gps(sails) {
  return {
    initialize: function (done) {
      sails.log('GPS hook starting');

      sails.after('hook:orm:loaded', function() {
        setupGps(function(){
          sails.log('GPS ready!');
          sails.log(arguments);
        });
      });
      return done();
    },
    gpsObject: gps
  };
};