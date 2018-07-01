$(document).ready(function() {
    $("#addnewform").submit(function() {
        insettogoogle();
        $.ajax({
            type: 'POST',
            url: "/add ",
            success: function(response) {
                //

                //window.location.reload();
            },
        });
    });
    document.getElementById("hideme").style.display = "none";
    $('.addnewentery').on('click', function(e) {
        if (document.getElementById("hideme").style.display == "block") {
            document.getElementById("hideme").style.display = "none";
        } else {
            document.getElementById("hideme").style.display = "block"
        }
    });
    $('.delete-item').on('click', function(e) {

        $target = $(e.target);
        const id = $target.attr('data-id');
        const id22 = $target.attr('data2-id');
        var abc = id22.trim();
        //var id2 = abc[1];
        deletefromgoogle(abc);
        $.ajax({
            type: 'DELETE',
            url: '/delete/' + id,
            success: function(response) {
                document.getElementById(id + "-li").style.display = "none";
            },
            error: function(err) {
                alert(err);
            }
        });

    });
    $("#editform").submit(function() {
        updateingoogle();
        $.ajax({
            type: 'POST',
            url: "/",
            success: function(response) {
                alert('successfully Edited');
                window.location.reload();
            },
            error: function(err) {
                alert(err);
            }
        });

    });

    function updateingoogle() {

        var summery2 = $('#titleedit').val();
        var descrip2 = $('#descriptinedit').val();
        var date2 = $('#dateedit').val();
        var time2 = $('#timeedit').val();
        var google1ID = $('#GOID').val();
        var googleID = google1ID.trim();
        // alert(summery+descrip+date+time);
        //var event  = { summary: summery, description:descrip ,start:{dateTime:date+"T"+time}};
        var st = date2 + "T" + time2;
        var dt = new Date(st);
        var event = {
            'summary': summery2,
            'description': descrip2,
            'start': {
                'dateTime': dt,
                'timeZone': 'GMT'
            },
            'end': {
                'dateTime': dt,
                'timeZone': 'GMT'
            },
        };

        var request = gapi.client.calendar.events.patch({
            'calendarId': 'primary',
            'eventId': googleID, // Event ID stored in database
            'resource': event
        });

        request.execute(function(event) {

        });
    }

    function deletefromgoogle(id) {

        var params = {
            calendarId: 'primary',
            eventId: id,
        };
        var request = gapi.client.calendar.events.delete(params);

        request.execute(function(event) {

        });




    }

    function insettogoogle() {

        var summery = $('#title').val();
        var descrip = $('#descriptin').val();
        var date = $('#date').val();
        var time = $('#time').val();
        //var event  = { summary: summery, description:descrip ,start:{dateTime:date+"T"+time}};
        var st = date + "T" + time;
        var dt = new Date(st);
        var event = {
            'summary': summery,
            'description': descrip,
            'start': {
                'dateTime': dt,
                'timeZone': 'GMT'
            },
            'end': {
                'dateTime': dt,
                'timeZone': 'GMT'
            },

            'recurrence': [
                'RRULE:FREQ=DAILY;COUNT=1'
            ],
            'reminders': {
                'useDefault': false,
                'overrides': [{
                        'method': 'email',
                        'minutes': 24 * 60
                    },
                    {
                        'method': 'popup',
                        'minutes': 10
                    }
                ]
            }
        };

        var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event
        });
        request.execute(function(event) {
            updatedatabasefromgoogle();
        });

    }

    function updatedatabasefromgoogle() {
        gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        }).then(function(response) {
            var events = response.result.items;
            if (events.length > 0) {

                alert('Connected Successfully To GOOGLE Calender -' + events.length + '- events found.');
                var mtdatalist = "";
                testnum = (events.length) - 1;
                for (i = 0; i < events.length; i++) {
                    var event = events[i];
                    var when = event.start.dateTime;
                    var dateandtime = when.split("T");
                    var longtime = dateandtime[1];
                    var timesplit = longtime.split("+");
                    mtdatalist = mtdatalist + "{title ??eventsdata&& " + event.summary + " ??events2data&&  DATE ??eventsdata&&" + dateandtime[0] + "??events2data&& Time ??eventsdata&&" + timesplit[0] + "??events2data&& ID ??eventsdata&& " + event.id + " ??events2data&& DESC ??eventsdata&& " + event.description + "}??eventssplit&&";
                    if (i == testnum) {
                        var myJsonString = JSON.stringify(mtdatalist);

                        var mydata = ({
                            "data": myJsonString,
                            "maxnumber": i
                        });
                        $.ajax({
                            type: 'POST',
                            url: "/addfromapi",
                            data: mydata,
                            success: function(response) {
                                alert('successfully synced from google calender');
                                window.location.reload();
                            },
                            error: function(err) {
                                alert(err);
                            }
                        });
                    }
                }



            } else {
                alert('Connected Successfully To GOOGLE Calender - No upcoming events found.');
            }
        });


    }
    $('#send-button').on('click', function(e) {
        alert("send")
    });
    $('#get-button').on('click', function(e) {
        gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        }).then(function(response) {
            var events = response.result.items;
            if (events.length > 0) {

                alert('Connected Successfully To GOOGLE Calender -' + events.length + '- events found.');
                var mtdatalist = "";
                testnum = (events.length) - 1;
                for (i = 0; i < events.length; i++) {
                    var event = events[i];
                    var when = event.start.dateTime;
                    var dateandtime = when.split("T");
                    var longtime = dateandtime[1];
                    var timesplit = longtime.split("+");
                    mtdatalist = mtdatalist + "{title ??eventsdata&& " + event.summary + " ??events2data&&  DATE ??eventsdata&&" + dateandtime[0] + "??events2data&& Time ??eventsdata&&" + timesplit[0] + "??events2data&& ID ??eventsdata&& " + event.id + " ??events2data&& DESC ??eventsdata&& " + event.description + " }??eventssplit&&";
                    if (i == testnum) {
                        var myJsonString = JSON.stringify(mtdatalist);

                        var mydata = ({
                            "data": myJsonString,
                            "maxnumber": i
                        });
                        $.ajax({
                            type: 'POST',
                            url: "/addfromapi",
                            data: mydata,
                            success: function(response) {
                                alert('successfully synced from google calender');
                                window.location.reload();
                            },
                            error: function(err) {
                                alert(err);
                            }
                        });
                    }
                }



            } else {
                alert('Connected Successfully To GOOGLE Calender - No upcoming events found.');
            }
        });


    });
});
