function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
  	if(i==n) {
  		slides[i].style.display = "block";
  	} else  {
  		slides[i].style.display = "none";

  	}
  }
  // slides[slideIndex-1].style.display = "block";
}