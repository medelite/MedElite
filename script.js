function fetchData() {
  // Define the API endpoint and parameters
  var apiUrl = "https://medelite1.emsow.com/data_srv.php";
  var apiParams = {
    request: "get_eom_report",
    EMSOW_INSTANT_LOGIN: "api",
    EMSOW_INSTANT_PASS: "pHSMFpUpL2YRgqrM",
    date_from: "2023-06-01"
  };

  // Build the API URL with query parameters
  var url = apiUrl + "?" + Object.keys(apiParams).map(function(key) {
    return encodeURIComponent(key) + "=" + encodeURIComponent(apiParams[key]);
  }).join("&");

  // Make the API request
  $.getJSON(url, function(data) {
    // Process the received data
    console.log("Data received:", data);
    // Update your data visualization or perform any other actions here
  });
}

// Schedule the API request at 10:30 AM
function scheduleUpdate() {
  var now = new Date();
  var targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 30, 0); // Set the target time to 10:30 AM

  // Calculate the delay until the target time
  var delay = targetTime - now;
  if (delay < 0) {
    // If the target time has already passed today, schedule it for tomorrow
    delay += 24 * 60 * 60 * 1000; // Add 24 hours
  }

  // Schedule the API request to run at the target time
  setTimeout(function() {
    fetchData();
    // Schedule the next update recursively
    scheduleUpdate();
  }, delay);
}

// Start scheduling updates
scheduleUpdate();
