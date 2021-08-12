const store = require('../store')

// functions
// gets lesson id by clicking on lesson
const getLessonId = function (event) {
  store.lessonId = $(event.target).data('id')
  store.event = event
}

// scroll to chosen element
const scroll = function (scrollTo) {
  store.$body.animate({
    scrollTop: scrollTo.offset().top
  },
  'slow')
}

// display lessons in html

const addNewLesson = function (response) {
  let lessonHtml = ' '
  lessonHtml += `
    <div class="col-4">
    <div class="card h-100 text-center">
        <img src="https://image.shutterstock.com/image-photo/lesson-1-white-chalk-text-260nw-535576588.jpg" class="card-img-top" alt="...">

        <div class="card-body">
          <h5 class="card-title">${response.lesson.title}</h5>
          <p class="card-subtitle mb-2 text-muted">${response.lesson.subject}</p>
          <p class="card-text">${response.lesson.description}</p>
          <p class="card-text">Unit: ${response.lesson.unit}</p>
          <a href="${response.lesson.url}" class="btn btn-primary">Open lesson</a>
       <button data-id="${response.lesson._id}" id="deleteLesson" class="btn hide" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>
  <button data-id="${response.lesson._id}" id="editMdlBtn" type="button" class="btn btn-primary hide" data-bs-toggle="modal" data-bs-target="#editModal">
Edit
</button>
        </div>
      </div>
      </div>
  `
  store.newLesson = $('.card')
  store.$myLessons.append(lessonHtml)
}
const displayLessons = function (response, location) {
  let lessonsHtml = ' '
  response.lessons.forEach(lessons => {
    lessonsHtml += `
        <div class="col-6 col-md-4">
  <div class="card h-100 text-center">
  <img src="https://image.shutterstock.com/image-photo/lesson-1-white-chalk-text-260nw-535576588.jpg" class="card-img-top" alt="...">

  <div class="card-body d-flex flex-column">
    <h5 class="card-title">${lessons.title}</h5>
    <p class="card-subtitle mb-2 text-muted" >${lessons.subject}</p>
    <p class="card-text d-none d-sm-inline">${lessons.description}</p>
    <p class="card-text">Unit: ${lessons.unit}</p>
    <div>
    <a href="${lessons.url}" class="btn btn-primary align-self-end">Open</a>
  </div>
  </div>
</div>
</div>
`
  })
  location.append(lessonsHtml)
}
const displayMyLessons = function (response, location) {
  let lessonsHtml = ' '
  response.lessons.forEach(lessons => {
    lessonsHtml += `
        <div class="col-4">
<div data-id="${lessons._id}" class="card h-100 text-center">
<img src="https://image.shutterstock.com/image-photo/lesson-1-white-chalk-text-260nw-535576588.jpg" class="card-img-top" alt="...">

<div class="card-body">
  <h5 class="card-title">${lessons.title}</h5>
  <p class="card-subtitle mb-2 text-muted">${lessons.subject}</p>
  <p class="card-text">${lessons.description}</p>
  <p class="card-text">Unit: ${lessons.unit}</p>

  <a href="${lessons.url}" class="btn btn-primary">Open lesson</a>
  <button data-id="${lessons._id}" id="deleteLesson" class="btn hide" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>
  <button data-id="${lessons._id}" id="editMdlBtn" type="button" class="btn btn-primary hide" data-bs-toggle="modal" data-bs-target="#editModal">
Edit
</button>

</div>
</div>
</div>
`
  })
  location.append(lessonsHtml)
}
module.exports = {
  getLessonId,
  scroll,
  addNewLesson,
  displayLessons,
  displayMyLessons
}
