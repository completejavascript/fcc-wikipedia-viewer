document.addEventListener("DOMContentLoaded", () => {
  let $ = document.querySelector.bind(document);
  let $input = $("#inp-search");
  let api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&' + 
            'generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&' +
            'pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
  let cb = '&callback=JSON_CALLBACK';
  
  $("#wiki-search").addEventListener("click", () => {
    let searchText = $input.value;
    if (searchText !== '') {
      fetch(api + searchText + cb)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
    }
  });
});