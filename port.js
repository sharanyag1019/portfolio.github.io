const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach((menuItem, idx) => {
    menuItem.addEventListener("click", () => {
        gsap.to(window, {
            duration: 0.08,
            scrollTo: "#section-" + (idx + 1),
        });
    });
});


const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".split-section",
        start: "top top", 
        end: "+=100%", 
        scrub: true, 
        pin: true 
    }
});


tl.to(".top-half", {
    yPercent: -100,
    duration: 1,
    ease: "none"
}, 0); 

tl.to(".bottom-half", {
    yPercent: 100, 
    duration: 1,
    ease: "none"
}, 0); 


const modal = document.querySelector(".modal");
const modalContent = modal.querySelector(".content");
const modalOverlay = modal.querySelector(".overlay");
const boxes = gsap.utils.toArray(".boxes-container .box");
const boxesContent = gsap.utils.toArray(".box-content");
let boxIndex = undefined;

boxesContent.forEach((box, i) => {
  box.addEventListener("click", () => {
    if (boxIndex !== undefined) {
      const state = Flip.getState(box);
      boxes[boxIndex].appendChild(box);
      boxIndex = undefined;
      gsap.to([modal, modalOverlay], {
        autoAlpha: 0,
        ease: "power1.inOut",
        duration: 0.35
      });
      Flip.from(state, {
        duration: 0.7,
        ease: "power1.inOut",
        absolute: true,
        onComplete: () => gsap.set(box, { zIndex: "auto" })
      });
      gsap.set(box, { zIndex: 1002 });
    } else {
      const state = Flip.getState(box);
      modalContent.appendChild(box);
      boxIndex = i;
      gsap.set(modal, { autoAlpha: 1 });
      Flip.from(state, {
        duration: 0.7,
        ease: "power1.inOut"
      });
      gsap.to(modalOverlay, { autoAlpha: 0.65, duration: 0.35 });
    }
  });
});

document.addEventListener('scroll', () => {
  const toTopButton = document.querySelector('#to-top');

  if (window.scrollY > 1500) {
    toTopButton.classList.add('show')
  } else {
    toTopButton.classList.remove('show');
  }
})


