/**
 * MindVault — beginner JavaScript
 * Data is stored in memory only (lost when you refresh the page).
 */

/* ---------- small helpers ---------- */

function getById(id) {
  return document.getElementById(id);
}

function openModal(id) {
  getById(id).hidden = false;
}

function closeModal(id) {
  getById(id).hidden = true;
}

function makeId() {
  return "user-" + Date.now();
}

function showError(groupId, message) {
  var group = getById(groupId);
  group.classList.add("error");
  group.querySelector(".error-text").textContent = message;
}

function hideError(groupId) {
  getById(groupId).classList.remove("error");
}

function clearFormErrors(formId) {
  var groups = document.querySelectorAll("#" + formId + " .form-group");
  for (var i = 0; i < groups.length; i++) {
    groups[i].classList.remove("error");
  }
}

// Remove one item from a list by id (returns a new list)
function deleteById(list, id) {
  var result = [];
  for (var i = 0; i < list.length; i++) {
    if (list[i].id !== id) {
      result.push(list[i]);
    }
  }
  return result;
}

/* ---------- mobile menu ---------- */

function setupNav() {
  var button = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".site-nav");
  if (!button || !menu) {
    return;
  }

  button.onclick = function () {
    menu.classList.toggle("open");
  };

  var links = menu.querySelectorAll("a");
  for (var i = 0; i < links.length; i++) {
    links[i].onclick = function () {
      menu.classList.remove("open");
    };
  }
}

/* ---------- modals (Cancel, click outside, Escape) ---------- */

function setupModals() {
  var closeButtons = document.querySelectorAll("[data-close-modal]");
  for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].onclick = function () {
      closeModal(this.getAttribute("data-close-modal"));
    };
  }

  var backdrops = document.querySelectorAll(".modal-backdrop");
  for (var j = 0; j < backdrops.length; j++) {
    backdrops[j].onclick = function (event) {
      if (event.target === this) {
        this.hidden = true;
      }
    };
  }

  document.onkeydown = function (event) {
    if (event.key === "Escape") {
      for (var k = 0; k < backdrops.length; k++) {
        backdrops[k].hidden = true;
      }
    }
  };
}

/* ---------- BOOKS ---------- */

var books = initialBooks.slice();

function renderBooks() {
  var grid = getById("books-grid");
  if (!grid) {
    return;
  }

  var html = "";
  for (var i = 0; i < books.length; i++) {
    var book = books[i];

    var coverHtml = "";
    if (book.cover) {
      coverHtml = '<img class="book-cover" src="' + book.cover + '" alt="">';
    } else {
      coverHtml = '<div class="book-cover placeholder">No cover</div>';
    }

    var deleteHtml = "";
    if (book.source === "user") {
      deleteHtml =
        '<button class="btn btn-outline btn-small" type="button" data-delete="' +
        book.id +
        '">Delete</button>';
    }

    html +=
      '<article class="book-card">' +
      coverHtml +
      '<div class="book-body">' +
      '<span class="tag">' + book.category + "</span>" +
      "<h3>" + book.title + "</h3>" +
      '<p class="muted">' + book.author + "</p>" +
      '<p class="muted clamp">' + book.summary + "</p>" +
      '<div class="card-actions">' +
      '<button class="btn btn-small" type="button" data-more="' + book.id + '">Read More</button>' +
      deleteHtml +
      "</div></div></article>";
  }

  grid.innerHTML = html;
}

function setupBooks() {
  var grid = getById("books-grid");
  if (!grid) {
    return;
  }

  renderBooks();

  grid.onclick = function (event) {
    var moreId = event.target.getAttribute("data-more");
    var deleteId = event.target.getAttribute("data-delete");

    if (moreId) {
      var book = null;
      for (var i = 0; i < books.length; i++) {
        if (books[i].id === moreId) {
          book = books[i];
        }
      }
      getById("book-detail-title").textContent = book.title;
      getById("book-detail-meta").textContent = book.author + " · " + book.category;
      getById("book-detail-summary").textContent = book.summary;
      openModal("book-detail-modal");
    }

    if (deleteId) {
      books = deleteById(books, deleteId);
      renderBooks();
    }
  };

  getById("btn-open-add-book").onclick = function () {
    getById("add-book-form").reset();
    clearFormErrors("add-book-form");
    openModal("add-book-modal");
  };

  getById("add-book-form").onsubmit = function (event) {
    event.preventDefault();

    var title = getById("book-title").value.trim();
    var author = getById("book-author").value.trim();
    var category = getById("book-category").value;
    var summary = getById("book-summary").value.trim();
    var ok = true;

    clearFormErrors("add-book-form");

    if (title.length < 2) {
      showError("book-title-group", "Enter a book name.");
      ok = false;
    }
    if (author.length < 2) {
      showError("book-author-group", "Enter an author.");
      ok = false;
    }
    if (category === "") {
      showError("book-category-group", "Select a category.");
      ok = false;
    }
    if (summary.length < 10) {
      showError("book-summary-group", "Write at least 10 characters.");
      ok = false;
    }
    if (!ok) {
      return;
    }

    books.push({
      id: makeId(),
      title: title,
      author: author,
      category: category,
      summary: summary,
      cover: "",
      source: "user"
    });

    renderBooks();
    closeModal("add-book-modal");
  };
}

/* ---------- RESOURCES ---------- */

var resources = initialResources.slice();
var resourceFilter = "all";
var resourceSearch = "";

function renderResources() {
  var grid = getById("resources-grid");
  if (!grid) {
    return;
  }

  var html = "";
  for (var i = 0; i < resources.length; i++) {
    var item = resources[i];
    var searchText =
      (item.title + " " + item.creator + " " + item.topic + " " + item.summary).toLowerCase();

    var show = true;
    if (resourceFilter !== "all" && item.type !== resourceFilter) {
      show = false;
    }
    if (resourceSearch !== "" && searchText.indexOf(resourceSearch) === -1) {
      show = false;
    }

    if (show) {
      var deleteHtml = "";
      if (item.source === "user") {
        deleteHtml =
          '<button class="btn btn-outline btn-small" type="button" data-delete="' +
          item.id +
          '">Delete</button>';
      }

      html +=
        '<article class="card">' +
        '<span class="tag">' + item.type + "</span>" +
        "<h3>" + item.title + "</h3>" +
        '<p class="muted">' + item.creator + "</p>" +
        "<p><strong>Topic:</strong> " + item.topic + "</p>" +
        '<p class="muted">' + item.summary + "</p>" +
        '<div class="card-actions">' +
        '<a class="btn btn-small" href="' + item.url + '" target="_blank">Open</a>' +
        deleteHtml +
        "</div></article>";
    }
  }

  if (html === "") {
    grid.innerHTML = "<p class='section-desc'>No resources match.</p>";
  } else {
    grid.innerHTML = html;
  }
}

function setupResources() {
  var grid = getById("resources-grid");
  if (!grid) {
    return;
  }

  renderResources();

  var filterButtons = document.querySelectorAll("[data-resource-filter]");
  for (var i = 0; i < filterButtons.length; i++) {
    filterButtons[i].onclick = function () {
      resourceFilter = this.getAttribute("data-resource-filter");
      for (var j = 0; j < filterButtons.length; j++) {
        filterButtons[j].classList.remove("active");
      }
      this.classList.add("active");
      renderResources();
    };
  }

  getById("resource-search").oninput = function () {
    resourceSearch = this.value.trim().toLowerCase();
    renderResources();
  };

  grid.onclick = function (event) {
    var deleteId = event.target.getAttribute("data-delete");
    if (deleteId) {
      resources = deleteById(resources, deleteId);
      renderResources();
    }
  };

  getById("btn-open-add-resource").onclick = function () {
    getById("add-resource-form").reset();
    clearFormErrors("add-resource-form");
    openModal("add-resource-modal");
  };

  getById("add-resource-form").onsubmit = function (event) {
    event.preventDefault();

    var title = getById("res-title").value.trim();
    var type = getById("res-type").value;
    var creator = getById("res-creator").value.trim();
    var url = getById("res-url").value.trim();
    var topic = getById("res-topic").value.trim();
    var summary = getById("res-summary").value.trim();
    var ok = true;

    clearFormErrors("add-resource-form");

    if (title.length < 2) {
      showError("res-title-group", "Enter a title.");
      ok = false;
    }
    if (type === "") {
      showError("res-type-group", "Select a type.");
      ok = false;
    }
    if (creator.length < 2) {
      showError("res-creator-group", "Enter a creator.");
      ok = false;
    }
    if (url.indexOf("http") !== 0) {
      showError("res-url-group", "URL must start with http.");
      ok = false;
    }
    if (topic.length < 2) {
      showError("res-topic-group", "Enter a topic.");
      ok = false;
    }
    if (summary.length < 10) {
      showError("res-summary-group", "Write at least 10 characters.");
      ok = false;
    }
    if (!ok) {
      return;
    }

    resources.push({
      id: makeId(),
      title: title,
      type: type,
      creator: creator,
      url: url,
      topic: topic,
      summary: summary,
      source: "user"
    });

    renderResources();
    closeModal("add-resource-modal");
  };
}

/* ---------- IDEAS ---------- */

var ideas = initialIdeas.slice();
var ideaFilter = "all";
var ideaSearch = "";

function renderIdeas() {
  var grid = getById("ideas-grid");
  if (!grid) {
    return;
  }

  var html = "";
  for (var i = 0; i < ideas.length; i++) {
    var item = ideas[i];
    var searchText = (item.title + " " + item.category + " " + item.description).toLowerCase();

    var show = true;
    if (ideaFilter !== "all" && item.category !== ideaFilter) {
      show = false;
    }
    if (ideaSearch !== "" && searchText.indexOf(ideaSearch) === -1) {
      show = false;
    }

    if (show) {
      var deleteHtml = "";
      if (item.source === "user") {
        deleteHtml =
          '<button class="btn btn-outline btn-small" type="button" data-delete="' +
          item.id +
          '">Delete</button>';
      }

      html +=
        '<article class="card">' +
        '<span class="tag">' + item.category + "</span>" +
        "<h3>" + item.title + "</h3>" +
        '<p class="muted">' + item.description + "</p>" +
        '<div class="card-actions">' + deleteHtml + "</div></article>";
    }
  }

  if (html === "") {
    grid.innerHTML = "<p class='section-desc'>No ideas match.</p>";
  } else {
    grid.innerHTML = html;
  }
}

function setupIdeas() {
  var grid = getById("ideas-grid");
  if (!grid) {
    return;
  }

  renderIdeas();

  var filterButtons = document.querySelectorAll("[data-idea-filter]");
  for (var i = 0; i < filterButtons.length; i++) {
    filterButtons[i].onclick = function () {
      ideaFilter = this.getAttribute("data-idea-filter");
      for (var j = 0; j < filterButtons.length; j++) {
        filterButtons[j].classList.remove("active");
      }
      this.classList.add("active");
      renderIdeas();
    };
  }

  getById("idea-search").oninput = function () {
    ideaSearch = this.value.trim().toLowerCase();
    renderIdeas();
  };

  grid.onclick = function (event) {
    var deleteId = event.target.getAttribute("data-delete");
    if (deleteId) {
      ideas = deleteById(ideas, deleteId);
      renderIdeas();
    }
  };

  getById("btn-open-add-idea").onclick = function () {
    getById("add-idea-form").reset();
    clearFormErrors("add-idea-form");
    openModal("add-idea-modal");
  };

  getById("add-idea-form").onsubmit = function (event) {
    event.preventDefault();

    var title = getById("idea-title").value.trim();
    var category = getById("idea-category").value;
    var description = getById("idea-desc").value.trim();
    var ok = true;

    clearFormErrors("add-idea-form");

    if (title.length < 2) {
      showError("idea-title-group", "Enter a title.");
      ok = false;
    }
    if (category === "") {
      showError("idea-category-group", "Select a category.");
      ok = false;
    }
    if (description.length < 10) {
      showError("idea-desc-group", "Write at least 10 characters.");
      ok = false;
    }
    if (!ok) {
      return;
    }

    ideas.push({
      id: makeId(),
      title: title,
      category: category,
      description: description,
      source: "user"
    });

    renderIdeas();
    closeModal("add-idea-modal");
  };
}

/* ---------- INSIGHTS ---------- */

var insights = initialInsights.slice();
var insightFilter = "all";

function renderInsights() {
  var grid = getById("insights-grid");
  if (!grid) {
    return;
  }

  var html = "";
  for (var i = 0; i < insights.length; i++) {
    var item = insights[i];

    var show = true;
    if (insightFilter !== "all" && item.domain !== insightFilter) {
      show = false;
    }

    if (show) {
      var deleteHtml = "";
      if (item.source === "user") {
        deleteHtml =
          '<button class="btn btn-outline btn-small" type="button" data-delete="' +
          item.id +
          '">Delete</button>';
      }

      html +=
        '<article class="card">' +
        '<span class="tag">' + item.domain + "</span>" +
        "<h3>" + item.title + "</h3>" +
        '<p class="muted">' + item.whatLearned + "</p>" +
        '<div class="card-actions">' + deleteHtml + "</div></article>";
    }
  }

  if (html === "") {
    grid.innerHTML = "<p class='section-desc'>No insights in this domain.</p>";
  } else {
    grid.innerHTML = html;
  }
}

function setupInsights() {
  var grid = getById("insights-grid");
  if (!grid) {
    return;
  }

  renderInsights();

  var filterButtons = document.querySelectorAll("[data-insight-filter]");
  for (var i = 0; i < filterButtons.length; i++) {
    filterButtons[i].onclick = function () {
      insightFilter = this.getAttribute("data-insight-filter");
      for (var j = 0; j < filterButtons.length; j++) {
        filterButtons[j].classList.remove("active");
      }
      this.classList.add("active");
      renderInsights();
    };
  }

  grid.onclick = function (event) {
    var deleteId = event.target.getAttribute("data-delete");
    if (deleteId) {
      insights = deleteById(insights, deleteId);
      renderInsights();
    }
  };

  getById("btn-open-add-insight").onclick = function () {
    getById("add-insight-form").reset();
    clearFormErrors("add-insight-form");
    openModal("add-insight-modal");
  };

  getById("add-insight-form").onsubmit = function (event) {
    event.preventDefault();

    var title = getById("ins-title").value.trim();
    var domain = getById("ins-domain").value;
    var whatLearned = getById("ins-learn").value.trim();
    var ok = true;

    clearFormErrors("add-insight-form");

    if (title.length < 2) {
      showError("ins-title-group", "Enter a title.");
      ok = false;
    }
    if (domain === "") {
      showError("ins-domain-group", "Select a domain.");
      ok = false;
    }
    if (whatLearned.length < 10) {
      showError("ins-learn-group", "Write at least 10 characters.");
      ok = false;
    }
    if (!ok) {
      return;
    }

    insights.push({
      id: makeId(),
      title: title,
      domain: domain,
      whatLearned: whatLearned,
      source: "user"
    });

    renderInsights();
    closeModal("add-insight-modal");
  };
}

/* ---------- MOTIVATION ---------- */

var quotes = initialQuotes.slice();

function renderMotivation() {
  var grid = getById("quotes-grid");
  if (!grid) {
    return;
  }

  var html = "";
  for (var i = 0; i < quotes.length; i++) {
    html +=
      '<article class="quote-card">' +
      "<p>\"" + quotes[i].text + "\"</p>" +
      '<p class="quote-author">— ' + quotes[i].author + "</p>" +
      "</article>";
  }
  grid.innerHTML = html;
}

function inspireMe() {
  var index = Math.floor(Math.random() * quotes.length);
  getById("inspire-text").textContent = '"' + quotes[index].text + '"';
  getById("inspire-author").textContent = "— " + quotes[index].author;
}

function setupMotivation() {
  if (!getById("quotes-grid")) {
    return;
  }
  renderMotivation();
  getById("btn-inspire").onclick = inspireMe;
}

/* ---------- HOME ---------- */

function setupHome() {
  if (!getById("stat-books")) {
    return;
  }

  getById("stat-books").textContent = books.length;
  getById("stat-resources").textContent = resources.length;
  getById("stat-ideas").textContent = ideas.length;
  getById("stat-insights").textContent = insights.length;
  getById("stat-quotes").textContent = quotes.length;

  var lastBook = books[books.length - 1];
  var lastIdea = ideas[ideas.length - 1];
  var lastInsight = insights[insights.length - 1];

  getById("recent-grid").innerHTML =
    '<article class="recent-card"><span class="tag">Book</span><h3>' +
    lastBook.title +
    "</h3><p class='muted'>" +
    lastBook.author +
    "</p></article>" +
    '<article class="recent-card"><span class="tag">Idea</span><h3>' +
    lastIdea.title +
    "</h3><p class='muted'>" +
    lastIdea.description +
    "</p></article>" +
    '<article class="recent-card"><span class="tag">Insight</span><h3>' +
    lastInsight.title +
    "</h3><p class='muted'>" +
    lastInsight.whatLearned +
    "</p></article>";
}

/* ---------- start app ---------- */

document.addEventListener("DOMContentLoaded", function () {
  setupNav();
  setupModals();
  setupBooks();
  setupResources();
  setupIdeas();
  setupInsights();
  setupMotivation();
  setupHome();
});
