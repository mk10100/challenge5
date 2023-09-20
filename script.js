$(function () {
  var currentDate = dayjs().format("dddd, MMMM D");
  $("#currentDay").text(currentDate);
  function generateTimeBlocks() {
    var container = $(".container-fluid");
    var currentHour = dayjs().hour();

    for (var hour = 9; hour <= 17; hour++) {
      var timeSuffix = hour > 11 ? "PM" : "AM";
      var writtenTime = hour > 12 ? hour - 12 : hour;
      var timeBlockId = "hour-" + hour;
      var timeBlockClass = "time-block";

      if (hour < currentHour) {
        timeBlockClass += " past";
      } else if (hour === currentHour) {
        timeBlockClass += " present";
      } else {
        timeBlockClass += " future";
      }

      var timeBlockHTML = `
          <div id="${timeBlockId}" class="row ${timeBlockClass}">
            <div class="col-2 col-md-1 hour text-center py-3">${writtenTime}${timeSuffix}</div>
            <textarea class="col-8 col-md-10 description" rows="3"></textarea>
            <button class="btn saveBtn col-2 col-md-1" aria-label="save">
              <i class="fas fa-save" aria-hidden="true"></i>
            </button>
          </div>
        `;

      container.append(timeBlockHTML);
    }
  }
  generateTimeBlocks();
  function updateTimeBlockColors() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }
  function loadEvents() {
    $(".time-block").each(function () {
      var blockHour = $(this).attr("id");
      var savedEvent = localStorage.getItem(blockHour);

      if (savedEvent) {
        $(this).find("textarea").val(savedEvent);
      }
    });
  }

  updateTimeBlockColors();
  loadEvents();

  $(".saveBtn").on("click", function () {
    var blockHour = $(this).closest(".time-block").attr("id");
    var eventText = $(this).siblings("textarea").val();

    localStorage.setItem(blockHour, eventText);
  });
});
