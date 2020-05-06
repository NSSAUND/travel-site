import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class RevealOnScroll {
    constructor(els, thresholdPercent) {
      this.thresholdPercent = thresholdPercent
      this.itemsToReveal = els
      this.browserHeight = window.innerHeight
      this.hideInitially()
      this.scrollThrottle = throttle(this.calcCaller, 200).bind(this)
      /*setting up this.scrollThrottle to use lodash throttle every 200milli sec and calcCaller will run the calculations */
      this.events()
    }
  
    events() {
      window.addEventListener("scroll", this.scrollThrottle)/*everytime the scroll event is detected its going to call this. function  */
      window.addEventListener("resize", debounce(() => {
          console.log("Resize just ran")
          this.browserHeight = window.innerHeight
      }, 333))
    }


    calcCaller(){
        console.log("Scroll Function ran")
          this.itemsToReveal.forEach(el => {
            if(el.isRevealed == false) {
                this.calculatedIfScrolledTo(el)
            }
        })
    }
  
    calculateIfScrolledTo(el) {
      if (window.scrollY + this.browserHeight > el.offsetTop){
        console.log("element was calculated")
        let scrollPercent = (el.getBoundingClientRect().top / this.browserHeight) * 100
        if (scrollPercent < this.thresholdPercent) {
          el.classList.add("reveal-item--is-visible")
          el.isRevealed = true
          if(el.isLastItem){
            window.removeEventListener("scroll", this.scrollThrottle)
          }
      }
    }
}
    hideInitially() {
      this.itemsToReveal.forEach(el => {
      el.classList.add("reveal-item")
      el.isRevealed = false
    })
    this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true
    }
  }
  
  export default RevealOnScroll