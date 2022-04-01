let breweryRepo = (function() {
  let breweryList = [];
  let apiUrl = "https://api.openbrewerydb.org/breweries"
  let breweryDetailsContainer = document.querySelector(".brewery-details-container");
  
  // access brewery data
  function loadData() {
    return fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
      data.forEach(function (item) {
        let brewery = {
          name: item.name,
          type: item.brewery_type,
          city: item.city,
          state: item.state,
          url: item.website_url
        };
        return breweryList.push(brewery);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }

  function getAll() {
    return breweryList;
  }

  function loadList(brewery) {
    let breweryList = document.querySelector(".brewery-list");
    let listItem = document.createElement("li")
    let button = document.createElement("button");
    button.innerText = brewery.name;
    listItem.appendChild(button);
    breweryList.appendChild(listItem);

    //event listners
    button.addEventListener('click', () => showDetails(brewery));
  }

  function showDetails(brewery) {
    breweryDetailsContainer.innerHTML = "";
    let breweryDetails = document.createElement("p");
    breweryDetails.innerText = `${brewery.name} \nType: ${brewery.type}\nWebsite: ${brewery.url}`;
    breweryDetailsContainer.appendChild(breweryDetails);
  }


  return {
    loadData: loadData,
    getAll: getAll,
    loadList: loadList,
    showDetails: showDetails
  };
})();



breweryRepo.loadData().then(function() {
  breweryRepo.getAll().forEach(function(brewery) {
    breweryRepo.loadList(brewery);
  });
});

