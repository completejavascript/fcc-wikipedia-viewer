document.addEventListener("DOMContentLoaded", () => {
  let $ = document.querySelector.bind(document);
  let $input = $("#inp-search");
  let $searchWrapper = $(".search-wrapper");
  let $header = $("header");
  let api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&' + 
            'generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&' +
            'pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
  let cors = 'https://cors-anywhere.herokuapp.com/';
  
  $("#wiki-search").addEventListener("click", () => {
    let searchText = $input.value;
    if (searchText !== '') {
      fetch(cors + api + searchText)
      .then(response => response.json())
      .then(json => viewResult(json.query.pages))
      .catch(error => console.log(error));
    }
  });

  function viewResult(pages) {
    $searchWrapper.classList.add("view-result");
    $header.classList.add("view-result");
    for (let key in pages) {
      console.log(pages[key]);
    }
  }
});