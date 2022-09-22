var currentDayElement = $('#currentDay');
var timeblocksElement = $('#Timeblocks');
var today = moment().format("dddd, MMMM Do");
var now = moment();

currentDayElement.text(today);

for (var i = 4; i < 18; ++i) {
    var row = $('<div>');
    row.addClass('row');
    // A div for hour
    var hourDiv = $('<div>');
    hourDiv.addClass('hour');
    timeIndex = moment(`${i}:00`, 'H:mm');
    var rowData = moment(timeIndex, "H:mm").format("hA");
    hourDiv.text(rowData);
    
    // A div for text
    var timeBlockDiv = $('<div>');
    timeBlockDiv.addClass('time-block');
    var textDiv = $('<div>');
    textDiv.addClass('textarea');
    
    if (timeIndex.hour() === now.hour()) {
        textDiv.addClass('present'); // The present highlited in red
    } else if (timeIndex.isBefore(now)) {
        textDiv.addClass('past');
    } else if (timeIndex.isAfter(now)) {
        textDiv.addClass('future'); // The future time highlited
    }

    var textArea = $('<textarea style="width:100%, height:100%"/>');
    textDiv.append(textArea);
    timeBlockDiv.append(textDiv);
    var savedText = localStorage.getItem(rowData);
    if (savedText != null) {
        textArea.val(savedText);
    }

    // A div for the button save
    var save = $('<div>');
    save.addClass('saveBtn');
    save.data("hour", rowData);
    save.html('&#128190;');

    row.append(hourDiv);
    row.append(timeBlockDiv);
    row.append(save);

    timeblocksElement.append(row);
}

// saved appointment
timeblocksElement.on('click', '.saveBtn', function() {
    localStorage.setItem($(this).data("hour"), $(this).parent('div').find('.time-block').children().first().children().first().val());
    var saved = $('<div>');
    saved.html("Appointment Saved &#10004;")
    saved.addClass('saved');
    timeblocksElement.prepend(saved);
    var timer = 0;
    var timeInterval = setInterval(function () {
        ++timer;
        if (timer >= 5) {
            timeblocksElement.children().first().remove();
            clearInterval(timeInterval)
        }
    }, 1000);
});