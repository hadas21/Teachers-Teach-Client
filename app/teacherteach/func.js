const store = require('../store')

// functions
// gets lesson id by clicking on lesson
const getLessonId = function (event) {
  console.log(event.currentTarget.dataset.id)
  store.lessonId = (event.currentTarget.dataset.id)
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
    <div class="col-6 col-sm-3 col-md-2 mx-auto px-sm-1 my-2">
      <div class="shadow-sm rounded card h-100 text-center">
        <div class="h-100 card-body d-flex flex-column px-1 py-3">
        <a href="${response.url}" class="text-dark text-decoration-none title">
          <h6 class="title card-title">${response.lesson.title}</h6>
        </a>
        <div class="lesson-description px-3 pb-2">
          <p class="d-none d-sm-inline fw-light fs-6 m-0">${response.lesson.description}</p>
        </div>
        <div class="pt-1">
          <p class="d-none d-md-inline card-text">Unit: ${response.lesson.unit}</p>
          <p class="card-subtitle text-muted" >${response.subject}</p>
          </div>
        </div>
         <div class="p-1">

            <button data-id="${response._id}" id="deleteLesson" class="col-6 col-sm-4 btn mb-1 mt-2 hide" data-bs-toggle="modal" data-bs-target="#deleteModal">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>
              <i class="bi bi-trash"></i>
            </button>

            <a href="${response.url}" class="col-4 text-dark text-decoration-none align-self-end d-none d-sm-inline mb-2 mt-2">View</a>

            <button data-id="${response._id}" id="editMdlBtn" type="button" class="col-6 col-sm-4 btn mb-1 mt-2 hide" data-bs-toggle="modal" data-bs-target="#editModal">
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
  store.newLesson = $('.card')
  store.$myLessons.append(lessonHtml)
}
const displayLessons = function (response, location) {
  console.log(response)
  let lessonsHtml = ' '
  response.lessons.forEach(lessons => {
    lessonsHtml += `
        <div class="col-6 col-sm-3 col-md-2 mx-auto px-sm-1 my-2">
  <div class="shadow-sm rounded card h-100 text-center">
  <div class="card-body d-flex flex-column px-1 py-3 h-100">
    <a href="${lessons.url}" class="text-dark text-decoration-none">
      <h6 class="title card-title">${lessons.title}</h6>
    </a>
    <div class="lesson-description px-3 pb-2">
      <p class="d-none d-sm-inline fw-light fs-6 m-0">${lessons.description}</p>
    </div>
    <div class="pt-1">
    <p class="d-none d-md-inline card-text">Unit: ${lessons.unit}</p>
    <p class="card-subtitle text-muted" >${lessons.subject}</p>
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
      <div class="col-6 col-sm-3 col-md-2 mx-auto px-sm-1 my-2">
        <div data-id="${lessons._id}" class="shadow-sm rounded card h-100 text-center">
          <div class="h-100 card-body d-flex flex-column px-1 py-3">
           <a href="${lessons.url}" class="text-dark text-decoration-none">
            <h6 class="title card-title">${lessons.title}</h6>
            </a>
            <div class="lesson-description px-3 pb-2 h-75">
            <p class="d-none d-sm-inline fw-light fs-6 m-0">${lessons.description}</p>
            </div>
            <div class="pt-1">
            <p class="d-none d-md-inline card-text">Unit: ${lessons.unit}</p>
            <p class="card-subtitle text-muted" >${lessons.subject}</p>
</div>
          </div>

          <div class="row p-1">

            <button data-id="${lessons._id}" id="deleteLesson" class="col-6 col-sm-4 btn mb-1 mt-2 hide" data-bs-toggle="modal" data-bs-target="#deleteModal">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>
              <i class="bi bi-trash"></i>
            </button>

            <a href="${lessons.url}" class="col-4 text-dark text-decoration-none title align-self-end d-none d-sm-inline mb-2 mt-2">View</a>

            <button data-id="${lessons._id}" id="editMdlBtn" type="button" class="col-6 col-sm-4 btn mb-1 mt-2 hide" data-bs-toggle="modal" data-bs-target="#editModal">
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
