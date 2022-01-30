"use strict";

// Application to search for Rick and Morty characters
//    On form submit get input from user through text input element
//    Use this input value to search Rick and Morty API
//    If search does not produce a result, let the user know
//    If it does, get results from API and display -> character name, alive/dead/unknown, last known location, episode first seen in
//    Display results to page

const app = {};

app.getCharacterInfo = function (query) {
  $.ajax({
    url: `https://rickandmortyapi.com/api/character`,
    method: "GET",
    dataType: "JSON",
    data: {
      name: query,
    },
  })
    .then(function (data) {
      const searchResults = data.results;
      $(".results").empty();
      $("#search-input").val("");
      // pass in API results to the displayCharInfo()
      app.displayCharacterInfo(searchResults);
    }) // if API search produces an error (e.g. no characters found), catch the error and notify the user
    .fail(function () {
      const errorHandler = `
      <div class="char-error-box">
        <img src="assets/char-fail.gif" alt="Failed to find Characters Gif">
      </div>
      `;
      $(".results").append(errorHandler);
      $("#search-input").val("");
    });
};
// function that will display user search results to page
app.displayCharacterInfo = function (searchResults) {
  //Loop the data.results array to get the individual objects
  searchResults.forEach((singleResult) => {
    // console.log(singleResult);
    // create the HTML that will display on the page using the data.results object properties
    const characterInfo = `
      <div class="char-box">
          <img class="img-box" src="${singleResult.image}" alt="${singleResult.name}">
          <h3 class="img-title"> <span class="title-style">NAME:</span> ${singleResult.name}</h3>
          <p class="species"> <span class="title-style">SPECIES:</span> ${singleResult.species} - ${singleResult.gender}</p>
          <p class="origin"> <span class="title-style">ORIGIN:</span> ${singleResult.origin.name}</p>
          <p class="status"> <span class="title-style">STATUS:</span> ${singleResult.status}</p>
          <p class="location"> <span class="title-style">LAST KNOWN LOCATION:</span> ${singleResult.location.name}</p>
          <p class="num-of-episodes"> <span class="title-style">NUMBER OF EPISODES:</span> ${singleResult.episode.length}</p>
      </div>`;
    // append html to page
    $(".results").append(characterInfo);
  });
};

// app initializer
app.init = function () {
  $(".rick").on("click", function () {
    $("#wubba-lubba")[0].play();
  });
  // when the user clicks/hits enter to submit form
  $("form").on("submit", function (e) {
    e.preventDefault();
    $(".results").empty();
    // grab the user input value
    const searchTerm = $("#search-input").val();
    if (searchTerm.trim()) {
      // pass this value as an argument to the app.getCharacterInfo if nothing entered into search input, print print a message to let user know
      app.getCharacterInfo(searchTerm);
    } else {
      const errorMessage = `
      <div class="error-box">
        <h3 class="error-message">How's about you put some text in the search field first?</h3>
        <img src="assets/no-input.gif" alt="No Input Gif">
      </div>
      `;
      $(".results").append(errorMessage);
    }
  });
};

$(document).ready(function () {
  app.init();
});
