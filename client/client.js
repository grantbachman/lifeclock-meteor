Router.configure({
  layoutTemplate: 'layout'
})

Router.route('/', function(){
  GAnalytics.pageview('/home');
  this.render('datePrompt');
});

Router.route('/:isoDate', function(){
  GAnalytics.pageview('clock');
  this.render('clock', { data: { date: this.params.isoDate}})
  }
  );

Template.datePrompt.rendered = function(){
  startStars();
};

Template.clock.rendered = function(){
  startStars();
  var lifespan = 78;
  var isoDate = Router.current().params.isoDate;
  var birthYear = parseInt(isoDate.slice(0,4))
  var birthMonth = parseInt(isoDate.slice(4,6)) - 1;
  var birthDay = parseInt(isoDate.slice(6,8))
  var deathDate = new Date(birthYear + lifespan, birthMonth, birthDay)
  window.clock = setInterval(function(){ tick(deathDate)}, 25)
}
function tick(deathDate){
  var msInSec = 1000;
  var msInMin = msInSec * 60;
  var msInHour = msInMin * 60;
  var msInDay = msInHour * 24;
  
  // number of milliseconds between now and most certain death
  var ms = deathDate - new Date();
  var days = addCommas(Math.floor(ms/msInDay));
  ms %= msInDay;
  var hours = Math.floor(ms / msInHour);
  hours = pad(hours, 2);
  ms %= msInHour;
  var minutes = Math.floor(ms / msInMin);
  minutes = pad(minutes, 2);
  ms %= msInMin;
  var seconds = (ms / msInSec).toFixed(2);
  seconds = pad(seconds, 5);
  document.getElementById('days').getElementsByClassName('value')[0].innerHTML = days;
  document.getElementById('description-days').innerHTML = days;   // add days to paragraph
  document.getElementById('hours').getElementsByClassName('value')[0].innerHTML = hours;
  document.getElementById('minutes').getElementsByClassName('value')[0].innerHTML = minutes;
  document.getElementById('seconds').getElementsByClassName('value')[0].innerHTML = seconds;
}

Template.datePrompt.events({
  "submit form":function(event, template) {
    var mm = event.target[0].value;
    var dd = event.target[1].value;
    var yyyy = event.target[2].value;
    var birthdate;
    if (mm >= 1 && mm <= 12 && dd >= 1 && dd <= 31){
      Session.set('date',new Date(yyyy, mm, dd));
      Router.go('/' + pad(yyyy,4) + pad(mm,2) + pad(dd,2));
    }
    event.preventDefault();
  }
});

function startStars(){
  if(!Session.get('star')){
    init(); // Start starfield
    Session.set('star',1)
  }
}

// regex copied from Stack Overflow: http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function addCommas(num){
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function pad(num, size){
  return ("000" + num).substr(-size);
}
