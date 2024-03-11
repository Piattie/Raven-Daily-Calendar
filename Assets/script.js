$(function () {
    // Update the date at the top of the calendar
    $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));
  
    // Function to update the class of each time block to reflect past, present, or future
    function updateTimeBlocks() {
      // Get the current hour using Day.js in 24-hour format
      var currentHour = dayjs().hour();
  
      // Iterate over each time block and update its class based on the current time
      $('.time-block').each(function () {
        // Extract the hour from the block's ID (e.g., "hour-9")
        var blockHour = parseInt($(this).attr('id').split('-')[1]);
  
        // Remove any old classes
        $(this).removeClass('past present future');
  
        // Compare block hour to the current hour and add the appropriate class
        if (blockHour < currentHour) {
          $(this).addClass('past');
        } else if (blockHour === currentHour) {
          $(this).addClass('present');
        } else {
          $(this).addClass('future');
        }
      });
    }
  
    // Update the time blocks immediately and then every minute
    updateTimeBlocks();
    setInterval(updateTimeBlocks, 60000);
  
    // Click event for save buttons
    $('.saveBtn').click(function () {
      // Get the ID of the parent time block and the text in the description
      var timeId = $(this).parent().attr('id');
      var eventText = $(this).siblings('.description').val();
  
      // Save the text in local storage
      localStorage.setItem(timeId, eventText);
    });
  
    // Load saved events from local storage and update the description fields
    $('.time-block').each(function () {
      var timeId = $(this).attr('id');
      var savedEvent = localStorage.getItem(timeId);
  
      if (savedEvent) {
        $(this).find('.description').val(savedEvent);
      }
    });
  });
  