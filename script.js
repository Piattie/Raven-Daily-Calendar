$(document).ready(function() {
    const updateCurrentDay = () => {
        $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));
    };

    const createTimeBlock = (hour) => {
        const timeBlock = $('<div>').addClass('time-block');
        const timeLabel = $('<label>').text(`${hour > 12 ? hour - 12 : hour} ${hour >= 12 ? 'PM' : 'AM'}`);
        const inputField = $('<input>').attr('type', 'text').attr('id', `event-${hour}`);
        const saveButton = $('<button>').addClass('saveBtn').html('&#x1f4be;').attr('data-hour', hour);

        saveButton.on('click', function() {
            const eventHour = $(this).data('hour');
            const eventText = $(`#event-${eventHour}`).val();
            localStorage.setItem(`event-${eventHour}`, eventText);
        });

        timeBlock.append(timeLabel, inputField, saveButton);

        if (dayjs().hour() > hour) {
            timeBlock.addClass('past');
        } else if (dayjs().hour() === hour) {
            timeBlock.addClass('present');
        } else {
            timeBlock.addClass('future');
        }

        inputField.val(localStorage.getItem(`event-${hour}`));
        return timeBlock;
    };

    const setupTimeBlocks = () => {
        for (let hour = 9; hour <= 17; hour++) {
            $('#timeBlocks').append(createTimeBlock(hour));
        }
    };

    updateCurrentDay();
    setupTimeBlocks();
});
