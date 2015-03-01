if (Meteor.isClient) {
  Template.datePrompt.rendered = function(){
    if (!this.rendered){
      init(); // Start starfield
      this.rendered = true;
    }
  };

  Template.countdown.helpers({
    date: Session.get('date')
  });

  Template.datePrompt.events({
    "submit form":function(event, template) {
      var mm = event.target[0].value;
      var dd = event.target[1].value;
      var yyyy = event.target[2].value;
      var birthdate;
      if (mm >= 1 && mm <= 12 && dd >= 1 && dd <= 31) {
        birthDate = new Date(yyyy, mm, dd);
        Session.set('date', birthDate);
      }
      event.preventDefault();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
