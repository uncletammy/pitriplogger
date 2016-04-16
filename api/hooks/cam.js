
module.exports = function cam(sails) {
  return {

    initialize: function (done) {
      // sails.after('hook:orm:loaded', function() {
      //   // setupServer(function(){
      //     sails.log('Camera ready!');
      //   // });
      // });
      return done();
    },
    camera: {}
  };
};