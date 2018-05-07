document.addEventListener("DOMContentLoaded", () => {
  let $ = document.querySelector.bind(document);
  let _input = $("#inp-search");
  let _searchWrapper = $(".search-wrapper");
  let _header = $("header");
  let _resultWrapper = $(".result");
  let _loading = $(".loading");
  let _title = $("header");
  
  let api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&' + 
            'generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&' +
            'pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
  let cors = 'https://cors-anywhere.herokuapp.com/';
  let wikiPage = 'https://en.wikipedia.org/?curid=';  

  $("#wiki-search").addEventListener("click", () => {
    let searchText = _input.value;
    if (searchText !== '') search(searchText);
  });

  _title.addEventListener("click", () => {
    console.log("click");
    location.reload();
  });

  _input.addEventListener("search", event => {
    let _target = event.target;
    let searchText = _target.value;
    if (searchText !== '') search(searchText);
    else resetViewResult();
  });

  _input.addEventListener("input", event => {
    let _target = event.target;
    let searchText = _target.value;
    if (searchText === '') resetViewResult();
  });

  function showLoading(show) {
    if (show) _loading.style.visibility = "visible";
    else _loading.style.visibility = "hidden";
  }

  function search(text) {
    showLoading(true);

    fetch(cors + api + text)
    .then(response => response.json())
    .then(json => viewResult(json))
    .catch(error => onSearchError());
  }

  function onSearchError(error) {
    console.log(error);
    showLoading(false);
  }

  function viewResult(result) {
    showLoading(false);
    resetViewResult();

    if (result.query) {
      _searchWrapper.classList.add("view-result");
      _header.classList.add("view-result");

      let pages = result.query.pages;
      
      for (let key in pages) {
        let page = pages[key];
        let html = itemHTMLTemplate(page.title, page.extract, page.pageid);
        let _resultItem = htmlToElement(html);
        _resultWrapper.appendChild(_resultItem);
        _resultItem.addEventListener("click", onResultItemClicked);
      }
    }
  }

  function onResultItemClicked(event) {
    let _resultItem = this;
    let linkTarget = _resultItem.getAttribute("target");
    window.open(linkTarget, '_blank');
  }

  function resetViewResult() {
    _searchWrapper.classList.remove("view-result");
    _header.classList.remove("view-result");
    clearDom(_resultWrapper);
  }

  function clearDom(_domWrapper) {
    while (_domWrapper.firstChild) {
      delete _domWrapper.removeChild(_domWrapper.firstChild);
    }
  }

  function itemHTMLTemplate(title, description, pageid) {
    let linkTarget = `${wikiPage}${pageid}`;

    return `<div class="result-item my-transition" target="${linkTarget}">\n` + 
              `<div class="content">\n` + 
                `<h2><a href="${linkTarget}" target="_blank">${title}</a></h2>\n` + 
                `<p>${description}</p>\n` + 
              `</div>\n` + 
            `</div>\n`;
  } 

  function htmlToElement(html) {
    let template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
  }
});