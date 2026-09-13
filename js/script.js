/**

* * MindVault — simple page behaviour*

* * Shared helpers first, then page code.*

* * Data stays in memory (lost on refresh). Easy to switch to localStorage later.*

* */

/* ===== tiny helpers ===== */

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

    if (list[i].id === id) {

      return list[i];

    }

  }

  return null;

}

function removeById(list, id) {

  var out = [];

  for (var i = 0; i < list.length; i++) {

    if (list[i].id !== id) {

      out.push(list[i]);

    }

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

/* ===== modals (all pages) ===== */

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

/* ===== BOOKS (in-memory list) ===== */

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

  setupModals();

  // one click handler for Read More + Delete

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

/* ===== start ===== */

document.addEventListener("DOMContentLoaded", function () {

  setupNav();

  setupBooks();

});