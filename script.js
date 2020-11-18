/////////////////////////////////////////////
// PARSE DATA FROM JSON

function loadJSON(path, success, error) {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        if (success) success(JSON.parse(request.responseText));
      } else {
        if (error) error(request);
      }
    }
  };
  request.open("GET", path, true);
  request.send();
}

/////////////////////////////////////////////
// TABLE WITH DATA FROM JSON

loadJSON(
  "data.json",
  function (customerData) {
    function customerTemplate(customer) {
      return `
              <tr class="row"> 
                <td> <img class="logo" src="${customer.logo}"></td>
                <td class="Company_Name"><p>${customer.name} </p></td>
                <td class="default"> 
                <button class="btn">${customer.type}</button>
                  <div class="dropdown_menu">
                      <a href="#">Options</a>
                      <a href="#">Something</a>
                      <a href="#">Options</a>
                  </div></td>
                <td class="com_id"> <p> ${customer.com_id} </p></td>
                <td class="leg_id"> <p> ${customer.leg_id} </p></td>
                <td class="size"> ${
                  customer.size + " " + customer.size_unit
                }</td>
                <td class="active"> 
                <button class="btn btn__active">${customer.status}</button></td>
              </tr>
               `;
    }

    document.getElementById("app").innerHTML = `
            <div class="table-wrapper">  
              ${
                '<table class="table">' +
                customerData.map(customerTemplate).join("") +
                "</table>"
              }</div>
          `;
  },

  function (xhr) {
    console.error(xhr);
  }
);
