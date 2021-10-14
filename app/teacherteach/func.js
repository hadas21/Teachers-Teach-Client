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
    <div class="col-11 col-sm-6 col-md-4 mx-auto px-sm-1 my-2">
      <div class="card h-100 text-center">
        <div class="card-header">
          <p class="card-subtitle" >${response.subject}</p>
        </div>
        <div class="card-body d-flex flex-column px-1 py-3">
          <h6 class="card-title h-50">${response.lesson.title}</h6>
          <p class="card-text h-100 d-sm-inline m-0">${response.lesson.description}</p>
          <p class="card-text">Unit: ${response.lesson.unit}</p>
        </div>
        <div class="card-footer">
          <a href="${response.lesson.url}" class="btn btn-secondary btn-sm  mb-1 mt-2">View lesson</a>
          <button data-id="${response.lesson._id}" id="deleteLesson" class="btn btn-secondary btn-sm  mb-1 mt-2 hide" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>
          <button data-id="${response.lesson._id}" id="editMdlBtn" type="button" class="btn btn-secondary btn-sm  mb-1 mt-2 hide" data-bs-toggle="modal" data-bs-target="#editModal">
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
        <div class="col-11 col-sm-6 col-md-4 mx-auto px-sm-1 my-2">
  <div class="card h-100 text-center">
  <div class="card-header">
<p class="card-subtitle" >${lessons.subject}</p>
  </div>
  <div class="card-body d-flex flex-column px-1 py-3">
  <h6 class="card-title h-50">${lessons.title}</h6>
    <p class="card-text h-100 d-sm-inline m-0">${lessons.description}</p>
    <p class="card-text">Unit: ${lessons.unit}</p>
    </div>
    <div class="card-footer">
    <a href="${lessons.url}" id="view-lesson-btn" class="btn btn-secondary btn-sm  mb-1 mt-2">View Lesson</a>

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
      <div class="col-11 col-sm-6 col-md-4 mx-auto px-sm-1 my-2">
        <div data-id="${lessons._id}" class="card h-100 text-center">
          <div class="card-header">
            <p class="card-subtitle" >${lessons.subject}</p>
          </div>
          <div class="card-body d-flex flex-column px-1 py-3">
            <h6 class="card-title h-50">${lessons.title}</h6>
            <p class="card-text h-100 d-sm-inline m-0">${lessons.description}</p>
            <p class="card-text">Unit: ${lessons.unit}</p>
          </div>
          <div class="card-footer p-1">

            <button data-id="${lessons._id}" id="deleteLesson" class="btn mb-1 mt-2 hide" data-bs-toggle="modal" data-bs-target="#deleteModal">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>
              <i class="bi bi-trash"></i>
            </button>

            <a href="${lessons.url}" class="btn btn-secondary btn-sm  mb-1 mt-2">View</a>

            <button data-id="${lessons._id}" id="editMdlBtn" type="button" class="btn mb-1 mt-2 hide" data-bs-toggle="modal" data-bs-target="#editModal">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
              </svg>
              <i class="bi bi-pencil-square" style"font-size: 2rem;"></i>
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
