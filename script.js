async function insertRecord() {
    // Get the input value
    const inputData = document.getElementById("insert-input").value;
  
    // Call your back-end API for inserting the record
    // Replace the URL with your own back-end API
    const response = await fetch("http://localhost:3000/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: inputData }),
    });
  
    // Display the result
    if (response.ok) {
      alert("Insert successful");
    } else {
      alert("Insert failed");
    }
  }
  
  const searchResultsElement = document.getElementById("search-results");

async function searchRecord() {
  // Get the search keyword
  const keyword = document.getElementById("search-input").value;

  // Call your back-end API for searching the records
  // Replace the URL with your own back-end API
  const response = await fetch(`http://localhost:3000/search?keyword=${keyword}`);
  const results = await response.json();

  // Display the results
  searchResultsElement.innerHTML = JSON.stringify(results);
}

async function updateRecord() {
  // Get the ID and new data for the record
  const id = document.getElementById("update-id").value;
  const newData = document.getElementById("update-data").value;

  // Call your back-end API for updating the record
  // Replace the URL with your own back-end API
  const response = await fetch(`http://localhost:3000/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: newData }),
  });

  // Display the result
  if (response.ok) {
    alert("Update successful");
  } else {
    alert("Update failed");
  }
}

async function deleteRecord() {
  // Get the ID of the record to delete
  const id = document.getElementById("delete-input").value;

  // Call your back-end API for deleting the record
  // Replace the URL with your own back-end API
  const response = await fetch(`http://localhost:3000/delete/${id}`, {
    method: "DELETE",
  });

  // Display the result
  if (response.ok) {
    alert("Delete successful");
  } else {
    alert("Delete failed");
  }
}

async function executeAdvancedQuery1() {
  // Call your back-end API for executing the first advanced query
  // Replace the URL with your own back-end API
  const response = await fetch("http://localhost:3000/advanced-query-1");
  const results = await response.json();

  // Display the results
  document.getElementById("advanced-query-results").innerHTML = JSON.stringify(results);
}

async function executeAdvancedQuery2() {
  // Call your back-end API for executing the second advanced query
  // Replace the URL with your own back-end API
  const response = await fetch("http://localhost:3000/advanced-query-2");
  const results = await response.json();

  // Display the results
  document.getElementById("advanced-query-results").innerHTML = JSON.stringify(results);
}