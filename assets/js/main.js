/**
* Template Name: MyPortfolio - v4.7.0
* Template URL: https://bootstrapmade.com/myportfolio-bootstrap-portfolio-website-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * burgerMenu
   */
  const burgerMenu = select('.burger')
  on('click', '.burger', function(e) {

  })

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('#portfolio-grid');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.item',
      });

      let portfolioFilters = select('#filters a', true);

      on('click', '#filters a', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('active');
        });
        this.classList.add('active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

function nextSlide(num) {
  let es = document.getElementsByClassName("display-image-div");
  // es = document.getElementsByClassName("display-image");
  for (i=0; i<es.length;i++) {
    if(i != es){
      es[i].style.display="none";
    }
  }
  es[num].style.display = "block";
}

function open_iframe(file) {
  // opened_page = file;
  let bod = document.getElementById("index_body");
  bod.setAttribute('scroll','no');
  bod.setAttribute('style','overflow:hidden;');
  let inactive_frames = bod.getElementsByClassName('inactive-frame');
  for(i=0;i<inactive_frames.length;i++) {
    let src_str = inactive_frames[i].src
    let ind = src_str.lastIndexOf("/");
    if(src_str.substring(ind+1)===file) {
      inactive_frames[i].setAttribute('style','display:block;');
      inactive_frames[i].setAttribute('class','active-frame')
    }
  }
 
}

function close_iframe() {
    // burgerMenu.classList.toggle('active');
    let bod = parent.document.getElementById("index_body");
    console.log(bod)
    bod.removeAttribute('scroll');
    bod.setAttribute('style','overflow:auto;');
    let active_frames = parent.document.getElementsByClassName('active-frame');
    active_frames[0].setAttribute('style','display:none;');
    active_frames[0].setAttribute('class','inactive-frame')
}

//Creates the list of images to click
window.onload = function() {
  // console.log("active");
  var imgs = document.getElementsByClassName("display-image");
  // var lis = document.getElementsByClassName("image-selector-li");
  var ol = document.getElementsByClassName("image-selector");
  for(i = 0; i < imgs.length;i++) {
    const li_node = document.createElement("li");
    li_node.setAttribute('class', 'image-selector-li');
    const img_node = document.createElement("img");
    var img_src = imgs[i].src;
    let ind = img_src.lastIndexOf("/");
    var img_new = img_src.substring(0,ind) + "/small-img" + img_src.substring(ind);
    img_node.setAttribute('onload','this.width = this.naturalWidth; this.height = this.naturalHeight');
    img_node.setAttribute('src',img_new);
    img_node.setAttribute('onclick',"nextSlide("+i+")");
    img_node.setAttribute('class','flex-active slide_selector');
    img_node.setAttribute('draggable','false');
    img_node.setAttribute('width','100');
    img_node.setAttribute('height','100');
    li_node.appendChild(img_node)
    ol[0].appendChild(li_node);
  }
}