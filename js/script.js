import '../styles/style.scss'

if (console && console.log) {
  console.log('Oh hi there! 😊')
}

const menuEl = document.querySelector('.menu')
const menuLinkEls = document.querySelectorAll('.menu-link')
const menuButtonEl = document.querySelector('.menu-button input')
const arrowLinkEl = document.querySelector('.arrow-link')
const copyrightEl = document.querySelector('#copyright-year')
const progressBarEls = document.querySelectorAll('.progress-bar span')

menuButtonEl.addEventListener('change', () => menuEl.classList.toggle('menu-open'))

// Hide the menu after clicking on a menu link
menuLinkEls.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault()
    menuEl.classList.remove('menu-open')
    menuButtonEl.checked = false
    const offset = document.querySelector(e.target.hash).offsetTop
    window.scrollTo({ top: offset, left: 0, behavior: 'smooth' })
  })
})

// Make the arrow link smooth
arrowLinkEl.addEventListener('click', (e) => {
  e.preventDefault()
  const offset = document.querySelector(arrowLinkEl.hash).offsetTop
  window.scrollTo({ top: offset, left: 0, behavior: 'smooth' })
})

// Update the year in the footer
copyrightEl.textContent = new Date().getFullYear()

// Animate the progress bars
if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return
      }

      entry.target.style.width = `${entry.target.dataset.width}%`
      observer.unobserve(entry.target)
    })
  }, { threshold: 1.0 })

  progressBarEls.forEach((el) => {
    observer.observe(el)
  })
} else {
  progressBarEls.forEach((el) => {
    el.style.width = `${el.dataset.width}%`
  })
}
