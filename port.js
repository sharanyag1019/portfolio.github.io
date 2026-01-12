const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach((menuItem, idx) => {
    menuItem.addEventListener("click", () => {
        gsap.to(window, {
            duration: 1,
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


gsap.set(".split", { opacity: 1 });

document.fonts.ready.then(() => {
  let containers = gsap.utils.toArray(".container");

  containers.forEach((container) => {
    let text = container.querySelector(".split");
    let animation;

    SplitText.create(text, {
      type: "words,lines",
      mask: "lines",
      linesClass: "line",
      autoSplit: true,
      onSplit: (instance) => {
        console.log("split")
        return gsap.from(instance.lines, {
          yPercent: 100,
          stagger: 0.01,
          scrollTrigger: {
            trigger: container,
            // markers: true,
            scrub: true,
            start: "clamp(top center)",
            end: "clamp(bottom center)"
          }
        });
      }
    });
  });
});

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
        duration: 0.7
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


