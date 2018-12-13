var config = {
  apiKey: "AIzaSyAGMsxDEhzcMKvgkDz-yMicw7W445Avjl8",
    authDomain: "educapp-32f89.firebaseapp.com",
    databaseURL: "https://educapp-32f89.firebaseio.com",
    projectId: "educapp-32f89",
    storageBucket: "educapp-32f89.appspot.com",
    messagingSenderId: "819038087337"

  };
  firebase.initializeApp(config);
  var db = firebase.database();

  var ref = db.ref("class");

  ref.orderByKey().on('child_added', function(snapshot){
    $("select[name='class']").append("<option>" + snapshot.key + "</option>");
  });

  setTimeout(function(){
    setEvents($("#class option:selected").text());
    $( "#class" ).change(function() {
      $('#calendar').fullCalendar('removeEvents');
      setEvents($("#class option:selected").text());
    });
  }, 4000);



  function setEvents(turma){
    db.ref('event/' + turma).on('child_added', function(snapshot){
      $('#calendar').fullCalendar( 'addEventSource', {
        events    : [
        {
          title          : snapshot.val().name,
          start          : new Date(snapshot.val().date + snapshot.val().start + ':00'),
          end            : new Date(snapshot.val().date + snapshot.val().end + ':00'),
          backgroundColor: '#f39c12', //yellow
          borderColor    : '#f39c12' //yellow
        }
      ]
      });
    });
  }

  $(function () {

    /* initialize the external events
     -----------------------------------------------------------------*/
    function init_events(ele) {
      ele.each(function () {
        // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
        // it doesn't need to have a start or end
        var eventObject = {
          title: $.trim($(this).text()) // use the element's text as the event title
        }

        // store the Event Object in the DOM element so we can get to it later
        $(this).data('eventObject', eventObject)

        // make the event draggable using jQuery UI
        $(this).draggable({
          zIndex        : 1070,
          revert        : true, // will cause the event to go back to its
          revertDuration: 0  //  original position after the drag
        })

      })
    }

    init_events($('#external-events div.external-event'))

    /* initialize the calendar
     -----------------------------------------------------------------*/
    //Date for the calendar events (dummy data)
    var date = new Date()
    var d    = date.getDate(),
        m    = date.getMonth(),
        y    = date.getFullYear()
    $('#calendar').fullCalendar({
      header    : {
        left  : 'prev,next today',
        center: 'title',
        right : 'month,agendaWeek,agendaDay'
      },
      buttonText: {
        today: 'today',
        month: 'month',
        week : 'week',
        day  : 'day'
      },
      //Random default events
      editable  : false,
      droppable : true, // this allows things to be dropped onto the calendar !!!
      drop      : function (date, allDay) { // this function is called when something is dropped
        // retrieve the dropped element's stored Event Object
        var originalEventObject = $(this).data('eventObject')

        // we need to copy it, so that multiple events don't have a reference to the same object
        var copiedEventObject = $.extend({}, originalEventObject)

        var day = date.date();
        var month = date.month() + 1;
        var hour = date.hour();
        var minute = date.minute();

        if (day < 10) day = '0' + day;
        if (month < 10) month = '0' + month;
        if (hour < 10) hour = '0' + hour;
        if (minute < 10) minute = '0' + minute;

        db.ref('event/' + $("#class option:selected").text()).push({
          name: copiedEventObject.title,
          date: date.year() + '-' + month + '-' + day + 'T',
          start: hour + ':' + minute
        });

        // assign it the date that was reported
        copiedEventObject.start           = date
        copiedEventObject.allDay          = false
        copiedEventObject.backgroundColor = $(this).css('background-color')
        copiedEventObject.borderColor     = $(this).css('border-color')

        // render the event on the calendar
        // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
        $('#calendar').fullCalendar('renderEvent', copiedEventObject, true)

        // is the "remove after drop" checkbox checked?
        if ($('#drop-remove').is(':checked')) {
          // if so, remove the element from the "Draggable Events" list
          $(this).remove()
        }

      },
      eventRender: function(event, element) {
        element.bind('dblclick', function() {
          $('#calendar').fullCalendar('removeEvents',event._id);
          db.ref('event/' + $("#class option:selected").text()).orderByChild('name').equalTo(event.title).once('child_added', function(snapshot){
            db.ref('event/' + $("#class option:selected").text() + '/' + snapshot.key).remove();
          });
        });
      }
    })

    /* ADDING EVENTS */
    var currColor = '#3c8dbc' //Red by default
    //Color chooser button
    var colorChooser = $('#color-chooser-btn')
    $('#color-chooser > li > a').click(function (e) {
      e.preventDefault()
      //Save color
      currColor = $(this).css('color')
      //Add color effect to button
      $('#add-new-event').css({ 'background-color': currColor, 'border-color': currColor })
    })
    $('#add-new-event').click(function (e) {
      e.preventDefault()
      //Get value and make sure it is not null
      var val = $('#new-event').val()
      if (val.length == 0) {
        return
      }

      //Create events
      var event = $('<div />')
      event.css({
        'background-color': currColor,
        'border-color'    : currColor,
        'color'           : '#fff'
      }).addClass('external-event')
      event.html(val)
      $('#external-events').prepend(event)

      //Add draggable funtionality
      init_events(event)

      //Remove event from text input
      $('#new-event').val('')
    })
  })
