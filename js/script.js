/**
 * MindVault — simple page behaviour
 * Shared helpers first, then each page.
 * Data is in memory only (lost on refresh).
 */

/* ===== helpers ===== */
function $(id) {
  return document.getElementById(id);
}

function openModal(id) {
  $(id).hidden = false;
}

function closeModal(id) {
  $(id).hidden = true;
}

function newId() {
  return "user-" + Date.now();
}

function copyList(list) {
  var out = [];
  for (var i = 0; i < list.length; i++) {
    out.push(list[i]);
  }
  return out;
}

function findById(list, id) {
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === id) return list[i];
  }
  return null;
}

function removeById(list, id) {
  var out = [];
  for (var i = 0; i < list.length; i++) {
    if (list[i].id !== id) out.push(list[i]);
  }
  return out;
}

function setError(groupId, msg) {
  var group = $(groupId);
  group.classList.add("error");
  group.querySelector(".error-text").textContent = msg;
}

function clearError(groupId) {
  $(groupId).classList.remove("error");
}

/* ===== nav ===== */
function setupNav() {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;

  toggle.onclick = function () {
    nav.classList.toggle("open");
  };

  var links = nav.querySelectorAll("a");
  for (var i = 0; i < links.length; i++) {
    links[i].onclick = function () {
      nav.classList.remove("open");
    };
  }
}

/* ===== modals ===== */
function setupModals() {
  var closes = document.querySelectorAll("[data-close-modal]");
  for (var i = 0; i < closes.length; i++) {
    closes[i].onclick = function () {
      closeModal(this.getAttribute("data-close-modal"));
    };
  }

  var backs = document.querySelectorAll(".modal-backdrop");
  for (var j = 0; j < backs.length; j++) {
    backs[j].onclick = function (e) {
      if (e.target === this) this.hidden = true;
    };
  }

  document.onkeydown = function (e) {
    if (e.key !== "Escape") return;
    for (var k = 0; k < backs.length; k++) {
      backs[k].hidden = true;
    }
  };
}

/* ===== BOOKS ===== */
var books = copyList(initialBooks);

function renderBooks() {
  var grid = $("books-grid");
  if (!grid) return;

  var html = "";
  for (var i = 0; i < books.length; i++) {
    var b = books[i];
    var cover = b.cover
      ? '<img class="book-cover" src="' + b.cover + '" alt="">'
      : '<div class="book-cover placeholder">No cover</div>';
    var del =
      b.source === "user"
        ? '<button class="btn btn-outline btn-small" type="button" data-delete="' + b.id + '">Delete</button>'
        : "";

    html +=
      '<article class="book-card">' +
      cover +
      '<div class="book-body">' +
      '<span class="card-tag">' + b.category + "</span>" +
      "<h3>" + b.title + "</h3>" +
      '<p class="book-author">' + b.author + "</p>" +
      '<p class="book-summary">' + b.summary + "</p>" +
      '<div class="card-actions">' +
      '<button class="btn btn-small" type="button" data-more="' + b.id + '">Read More</button>' +
      del +
      "</div></div></article>";
  }
  grid.innerHTML = html;
}

function setupBooks() {
  var grid = $("books-grid");
  if (!grid) return;

  renderBooks();

  grid.onclick = function (e) {
    var moreId = e.target.getAttribute("data-more");
    var delId = e.target.getAttribute("data-delete");

    if (moreId) {
      var book = findById(books, moreId);
      $("book-detail-title").textContent = book.title;
      $("book-detail-meta").textContent = book.author + " · " + book.category;
      $("book-detail-summary").textContent = book.summary;
      openModal("book-detail-modal");
    }

    if (delId) {
      books = removeById(books, delId);
      renderBooks();
    }
  };

  $("btn-open-add-book").onclick = function () {
    $("add-book-form").reset();
    clearError("book-title-group");
    clearError("book-author-group");
    clearError("book-category-group");
    clearError("book-summary-group");
    openModal("add-book-modal");
  };

  $("add-book-form").onsubmit = function (e) {
    e.preventDefault();

    var title = $("book-title").value.trim();
    var author = $("book-author").value.trim();
    var category = $("book-category").value;
    var summary = $("book-summary").value.trim();
    var ok = true;

    clearError("book-title-group");
    clearError("book-author-group");
    clearError("book-category-group");
    clearError("book-summary-group");

    if (title.length < 2) {
      setError("book-title-group", "Enter a book name.");
      ok = false;
    }
    if (author.length < 2) {
      setError("book-author-group", "Enter an author.");
      ok = false;
    }
    if (!category) {
      setError("book-category-group", "Select a category.");
      ok = false;
    }
    if (summary.length < 10) {
      setError("book-summary-group", "Write at least 10 characters.");
      ok = false;
    }
    if (!ok) return;

    books.push({
      id: newId(),
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

/* ===== RESOURCES ===== */
var resources = copyList(initialResources);
var resourceFilter = "all";
var resourceSearch = "";

function renderResources() {
  var grid = $("resources-grid");
  if (!grid) return;

  var html = "";
  for (var i = 0; i < resources.length; i++) {
    var r = resources[i];
    var text = (r.title + " " + r.creator + " " + r.topic + " " + r.summary).toLowerCase();

    if (resourceFilter !== "all" && r.type !== resourceFilter) continue;
    if (resourceSearch && text.indexOf(resourceSearch) === -1) continue;

    var del =
      r.source === "user"
        ? '<button class="btn btn-outline btn-small" type="button" data-delete="' + r.id + '">Delete</button>'
        : "";

    html +=
      '<article class="resource-card">' +
      '<span class="card-tag">' + r.type + "</span>" +
      "<h3>" + r.title + "</h3>" +
      '<p class="book-author">' + r.creator + "</p>" +
      "<p><strong>Topic:</strong> " + r.topic + "</p>" +
      '<p class="book-summary">' + r.summary + "</p>" +
      '<div class="card-actions">' +
      '<a class="btn btn-small" href="' + r.url + '" target="_blank" rel="noopener">Open Resource</a>' +
      del +
      "</div></article>";
  }

  grid.innerHTML = html || "<p class='section-desc'>No resources match your filter.</p>";
}

function setupResources() {
  var grid = $("resources-grid");
  if (!grid) return;

  renderResources();

  // filter buttons
  var filters = document.querySelectorAll("[data-resource-filter]");
  for (var i = 0; i < filters.length; i++) {
    filters[i].onclick = function () {
      resourceFilter = this.getAttribute("data-resource-filter");
      for (var j = 0; j < filters.length; j++) {
        filters[j].classList.remove("active");
      }
      this.classList.add("active");
      renderResources();
    };
  }

  // search
  $("resource-search").oninput = function () {
    resourceSearch = this.value.trim().toLowerCase();
    renderResources();
  };

  // delete user item
  grid.onclick = function (e) {
    var delId = e.target.getAttribute("data-delete");
    if (!delId) return;
    resources = removeById(resources, delId);
    renderResources();
  };

  $("btn-open-add-resource").onclick = function () {
    $("add-resource-form").reset();
    clearError("res-title-group");
    clearError("res-type-group");
    clearError("res-creator-group");
    clearError("res-url-group");
    clearError("res-topic-group");
    clearError("res-summary-group");
    openModal("add-resource-modal");
  };

  $("add-resource-form").onsubmit = function (e) {
    e.preventDefault();

    var title = $("res-title").value.trim();
    var type = $("res-type").value;
    var creator = $("res-creator").value.trim();
    var url = $("res-url").value.trim();
    var topic = $("res-topic").value.trim();
    var summary = $("res-summary").value.trim();
    var ok = true;

    clearError("res-title-group");
    clearError("res-type-group");
    clearError("res-creator-group");
    clearError("res-url-group");
    clearError("res-topic-group");
    clearError("res-summary-group");

    if (title.length < 2) {
      setError("res-title-group", "Enter a title.");
      ok = false;
    }
    if (!type) {
      setError("res-type-group", "Select a type.");
      ok = false;
    }
    if (creator.length < 2) {
      setError("res-creator-group", "Enter a creator.");
      ok = false;
    }
    if (url.indexOf("http") !== 0) {
      setError("res-url-group", "URL must start with http.");
      ok = false;
    }
    if (topic.length < 2) {
      setError("res-topic-group", "Enter a topic.");
      ok = false;
    }
    if (summary.length < 10) {
      setError("res-summary-group", "Write at least 10 characters.");
      ok = false;
    }
    if (!ok) return;

    resources.push({
      id: newId(),
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

/* ===== IDEAS ===== */
var ideas = copyList(initialIdeas);
var ideaFilter = "all";
var ideaSearch = "";

function renderIdeas() {
  var grid = $("ideas-grid");
  if (!grid) return;

  var html = "";
  for (var i = 0; i < ideas.length; i++) {
    var item = ideas[i];
    var text = (item.title + " " + item.category + " " + item.description).toLowerCase();

    if (ideaFilter !== "all" && item.category !== ideaFilter) continue;
    if (ideaSearch && text.indexOf(ideaSearch) === -1) continue;

    var del =
      item.source === "user"
        ? '<button class="btn btn-outline btn-small" type="button" data-delete="' + item.id + '">Delete</button>'
        : "";

    html +=
      '<article class="resource-card">' +
      '<span class="card-tag">' + item.category + "</span>" +
      "<h3>" + item.title + "</h3>" +
      '<p class="book-summary">' + item.description + "</p>" +
      '<div class="card-actions">' + del + "</div></article>";
  }

  grid.innerHTML = html || "<p class='section-desc'>No ideas match your filter.</p>";
}

function setupIdeas() {
  var grid = $("ideas-grid");
  if (!grid) return;

  renderIdeas();

  var filters = document.querySelectorAll("[data-idea-filter]");
  for (var i = 0; i < filters.length; i++) {
    filters[i].onclick = function () {
      ideaFilter = this.getAttribute("data-idea-filter");
      for (var j = 0; j < filters.length; j++) {
        filters[j].classList.remove("active");
      }
      this.classList.add("active");
      renderIdeas();
    };
  }

  $("idea-search").oninput = function () {
    ideaSearch = this.value.trim().toLowerCase();
    renderIdeas();
  };

  grid.onclick = function (e) {
    var delId = e.target.getAttribute("data-delete");
    if (!delId) return;
    ideas = removeById(ideas, delId);
    renderIdeas();
  };

  $("btn-open-add-idea").onclick = function () {
    $("add-idea-form").reset();
    clearError("idea-title-group");
    clearError("idea-category-group");
    clearError("idea-desc-group");
    openModal("add-idea-modal");
  };

  $("add-idea-form").onsubmit = function (e) {
    e.preventDefault();

    var title = $("idea-title").value.trim();
    var category = $("idea-category").value;
    var description = $("idea-desc").value.trim();
    var ok = true;

    clearError("idea-title-group");
    clearError("idea-category-group");
    clearError("idea-desc-group");

    if (title.length < 2) {
      setError("idea-title-group", "Enter a title.");
      ok = false;
    }
    if (!category) {
      setError("idea-category-group", "Select a category.");
      ok = false;
    }
    if (description.length < 10) {
      setError("idea-desc-group", "Write at least 10 characters.");
      ok = false;
    }
    if (!ok) return;

    ideas.push({
      id: newId(),
      title: title,
      category: category,
      description: description,
      source: "user"
    });

    renderIdeas();
    closeModal("add-idea-modal");
  };
}

/* ===== INSIGHTS ===== */
var insights = copyList(initialInsights);
var insightFilter = "all";

function renderInsights() {
  var grid = $("insights-grid");
  if (!grid) return;

  var html = "";
  for (var i = 0; i < insights.length; i++) {
    var item = insights[i];
    if (insightFilter !== "all" && item.domain !== insightFilter) continue;

    var del =
      item.source === "user"
        ? '<button class="btn btn-outline btn-small" type="button" data-delete="' + item.id + '">Delete</button>'
        : "";

    html +=
      '<article class="resource-card">' +
      '<span class="card-tag">' + item.domain + "</span>" +
      "<h3>" + item.title + "</h3>" +
      '<p class="book-summary">' + item.whatLearned + "</p>" +
      '<div class="card-actions">' + del + "</div></article>";
  }

  grid.innerHTML = html || "<p class='section-desc'>No insights in this domain.</p>";
}

function setupInsights() {
  var grid = $("insights-grid");
  if (!grid) return;

  renderInsights();

  var filters = document.querySelectorAll("[data-insight-filter]");
  for (var i = 0; i < filters.length; i++) {
    filters[i].onclick = function () {
      insightFilter = this.getAttribute("data-insight-filter");
      for (var j = 0; j < filters.length; j++) {
        filters[j].classList.remove("active");
      }
      this.classList.add("active");
      renderInsights();
    };
  }

  grid.onclick = function (e) {
    var delId = e.target.getAttribute("data-delete");
    if (!delId) return;
    insights = removeById(insights, delId);
    renderInsights();
  };

  $("btn-open-add-insight").onclick = function () {
    $("add-insight-form").reset();
    clearError("ins-title-group");
    clearError("ins-domain-group");
    clearError("ins-learn-group");
    openModal("add-insight-modal");
  };

  $("add-insight-form").onsubmit = function (e) {
    e.preventDefault();

    var title = $("ins-title").value.trim();
    var domain = $("ins-domain").value;
    var whatLearned = $("ins-learn").value.trim();
    var ok = true;

    clearError("ins-title-group");
    clearError("ins-domain-group");
    clearError("ins-learn-group");

    if (title.length < 2) {
      setError("ins-title-group", "Enter a title.");
      ok = false;
    }
    if (!domain) {
      setError("ins-domain-group", "Select a domain.");
      ok = false;
    }
    if (whatLearned.length < 10) {
      setError("ins-learn-group", "Write at least 10 characters.");
      ok = false;
    }
    if (!ok) return;

    insights.push({
      id: newId(),
      title: title,
      domain: domain,
      whatLearned: whatLearned,
      source: "user"
    });

    renderInsights();
    closeModal("add-insight-modal");
  };
}

/* ===== MOTIVATION ===== */
var quotes = copyList(initialQuotes);

function renderMotivation() {
  var grid = $("quotes-grid");
  if (!grid) return;

  var html = "";
  for (var i = 0; i < quotes.length; i++) {
    var q = quotes[i];
    html +=
      '<article class="quote-card">' +
      "<p>\"" + q.text + "\"</p>" +
      '<p class="inspire-author">— ' + q.author + "</p>" +
      "</article>";
  }
  grid.innerHTML = html;
}

function inspireMe() {
  var i = Math.floor(Math.random() * quotes.length);
  var q = quotes[i];
  $("inspire-text").textContent = '"' + q.text + '"';
  $("inspire-author").textContent = "— " + q.author;
}

function setupMotivation() {
  if (!$("quotes-grid")) return;
  renderMotivation();
  $("btn-inspire").onclick = inspireMe;
}

/* ===== HOME ===== */
function setupHome() {
  if (!$("stat-books")) return;

  $("stat-books").textContent = books.length;
  $("stat-resources").textContent = resources.length;
  $("stat-ideas").textContent = ideas.length;
  $("stat-insights").textContent = insights.length;
  $("stat-quotes").textContent = quotes.length;

  var grid = $("recent-grid");
  var html = "";

  if (books.length) {
    var b = books[books.length - 1];
    html +=
      '<article class="recent-card"><span class="recent-type">Book</span><h3>' +
      b.title +
      "</h3><p>" +
      b.author +
      "</p></article>";
  }
  if (ideas.length) {
    var idea = ideas[ideas.length - 1];
    html +=
      '<article class="recent-card"><span class="recent-type">Idea</span><h3>' +
      idea.title +
      "</h3><p>" +
      idea.description +
      "</p></article>";
  }
  if (insights.length) {
    var ins = insights[insights.length - 1];
    html +=
      '<article class="recent-card"><span class="recent-type">Insight</span><h3>' +
      ins.title +
      "</h3><p>" +
      ins.whatLearned +
      "</p></article>";
  }

  grid.innerHTML = html;
}

/* ===== start ===== */
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
