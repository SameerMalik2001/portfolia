gsap.registerPlugin(ScrollTrigger);

function loader () {
  
  const pardas = document.querySelector('.parda');
  pardas.setAttribute('width', window.screen.width);

  function injectSVG(pardaElement) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let w = window.screen.width
    let h = window.screen.height + window.screen.height / 3.33
    svg.setAttribute('width', w);
    svg.setAttribute('height', h);


    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    // path.setAttribute('d', 'M 0 20 C 50 0 150 0 200 20 L 200 80 C 150 100 50 100 0 80 Z');
    path.setAttribute('d', `M 0 ${h/10} C ${w/4} 0 ${(w*3)/4} 0 ${w} ${h/10} L ${w} ${h - h/10}
                        C ${(w*3)/4} ${h} ${w/4} ${h} 0 ${h - h/10} Z`);
    path.setAttribute('fill', 'black');
    pardas.style.top = -(window.screen.height / 3.33) / 2 + 'px';

    svg.appendChild(path);

    pardaElement.appendChild(svg);
  }

  injectSVG(pardas)

  setTimeout(()=>{
    pardas.style.top = (-1*(window.screen.height + window.screen.height / 3.33))+"px";
    let body = document.querySelector("body");
    body.style.overflow = "initial";
  }, 3400);

  let lists = ["Hello", "Hola",'Привет' ,"こんにちは", "Ciao", "Hallo", "Bonjour", "नमस्ते", "مرحبا"]
  let container = document.createElement('h1');

  let dot = document.createElement('div');
  dot.classList.add('dot');

  container.classList.add('list');


  function print123() {
    let count = 0;
    const interval = setInterval(() => {
      if (count === 1) {
        clearInterval(interval);
      }
      container.innerText = lists[count];
      container.appendChild(dot)
      pardas.appendChild(container);
      count++;
    }, 1000);
  }

  function print4567() {
    let count = 1;
    const interval = setInterval(() => {
      container.innerText = lists[count];
      container.appendChild(dot)
      pardas.appendChild(container);
      count++;
      if (count > 8) {
        clearInterval(interval);
      }
    }, 200);
  }

  function print8910() {
    let count = 8;
    const interval = setInterval(() => {
      if (count === 9) {
        clearInterval(interval);
      }
      container.innerText = lists[count];
      container.appendChild(dot)
      pardas.appendChild(container);
      count++;
    }, 1000);
  }

  print123();
  setTimeout(print4567, 1200); 
  setTimeout(print8910, 2600);

}

loader()


window.addEventListener('beforeunload', ()=>{
  window.scrollTo(0,0);
})

var hoverMouseForLowerElement = function(els) {
  els.forEach(function(el) {
    var self = el;
    var hover = false;
    var offsetHoverMax = self.getAttribute("offset-hover-max") || 0.23;
    var offsetHoverMin = self.getAttribute("offset-hover-min") || 0.2;

    var attachEventsListener = function() {
      window.addEventListener("mousemove", function(e) {
        var hoverArea = hover ? offsetHoverMax : offsetHoverMin;

        // Cursor
        var cursor = {
          x: e.clientX,
          y: e.clientY
        };
        
        // Size of element
        var width = self.offsetWidth;
        var height = self.offsetHeight;
        
        // Position of centroid of element
        var rect = self.getBoundingClientRect();
        var elPos = {
          x: rect.left + width / 2.5,
          y: rect.top + height / 2
        };

        
        // Comparison || detecting the mouse position that it is hovering over elements or not if x = 0 and y = 0 menas hovering
        var x = cursor.x - elPos.x;
        var y = cursor.y - elPos.y;
        
        
        // Distance btw the mouse position and element position
        var dist = Math.sqrt(x * x + y * y);
        
        // Mutex hover
        var mutHover = false;
        
        // Animation
        if (dist < width * hoverArea) {
          mutHover = true;
          if (!hover) {
            hover = true;
          }
          onHover(x, y);
        }

        // Reset
        if (!mutHover && hover) {
          onLeave();
          hover = false;
        }
      });
    };
    //func end

    var onHover = function(x, y) {
      TweenMax.to(self, 0.4, {
        x: x * 0.8,
        y: y * 0.8,
        //scale: .9,
        rotation: x * 0.05,
        ease: Power2.easeOut
      });
    };

    var onLeave = function() {
      TweenMax.to(self, 0.7, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        ease: Elastic.easeOut.config(1.2, 0.4)
      });
    };

    attachEventsListener();
  });
};

hoverMouseForLowerElement(Array.from(document.querySelectorAll('.magneticL')));


var hoverMouse = function(els) {
  els.forEach(function(el) {
    var self = el;
    var hover = false;
    var offsetHoverMax = self.getAttribute("offset-hover-max") || 0.23;
    var offsetHoverMin = self.getAttribute("offset-hover-min") || 0.2;

    var attachEventsListener = function() {
      window.addEventListener("mousemove", function(e) {
        var hoverArea = hover ? offsetHoverMax : offsetHoverMin;

        // Cursor
        var cursor = {
          x: e.clientX,
          y: e.clientY - window.scrollY
        };
      
        
        // Size of element
        var width = self.offsetWidth;
        var height = self.offsetHeight;
        
        // Position of centroid of element
        var rect = self.getBoundingClientRect();
        var elPos = {
          x: rect.left + width / 2.5,
          y: rect.top + height / 2
        };

        
        // Comparison || detecting the mouse position that it is hovering over elements or not if x = 0 and y = 0 menas hovering
        var x = cursor.x - elPos.x;
        var y = cursor.y - elPos.y;
        
        
        // Distance btw the mouse position and element position
        var dist = Math.sqrt(x * x + y * y);

        // console.log(dist);
        
        // Mutex hover
        var mutHover = false;
        
        // Animation
        if (dist < width * hoverArea) {
          mutHover = true;
          if (!hover) {
            hover = true;
          }
          onHover(x, y);
        }

        // Reset
        if (!mutHover && hover) {
          onLeave();
          hover = false;
        }
      });
    };
    //func end

    var onHover = function(x, y) {
      TweenMax.to(self, 0.4, {
        x: x * 0.8,
        y: y * 0.8,
        //scale: .9,
        rotation: x * 0.05,
        ease: Power2.easeOut
      });
    };

    var onLeave = function() {
      TweenMax.to(self, 0.7, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        ease: Elastic.easeOut.config(1.2, 0.4)
      });
    };

    attachEventsListener();
  });
};

hoverMouse(Array.from(document.querySelectorAll('.magnetic')));


let con = document.querySelectorAll('.con');
for (let i = 0; i < con.length ;i++) {
  con[i].addEventListener('selectstart', function(e) {
    e.preventDefault();
  })
}


function downupGola(gola, btn) {
  let blue = document.querySelector(gola)
  let about_btn = document.querySelector(btn)

  about_btn.addEventListener('mouseover', ()=>{
      blue.style.opacity = 1;
      blue.style.transform = 'translateY(0%)'
  })

  about_btn.addEventListener('mouseleave', ()=>{
    blue.style.transform = 'translateY(-100%)'
    setTimeout(()=>{
      blue.style.opacity = 0;
      blue.style.transform = 'translateY(100%)'
    },200)
  })
}

downupGola('.blue', '.about_container')
downupGola('.blue_gola', '.contact_btn')
downupGola('.oval1', '.mail_btn')
downupGola('.oval2', '.phone_btn')



// -------------------------------- scrolling about textarea --------------------------------
window.addEventListener("load", function () {
  let revealText = document.querySelectorAll(".reveal-text");
  let results = Splitting({ target: revealText, by: "lines" });

  results.forEach((splitResult) => {
    const wrappedLines = splitResult.lines
      .map(
        (wordsArr) => `
        <span class="line">
          <div class="words">
            ${wordsArr
              .map(
                (word) => `${word.outerHTML}<span class="whitespace"></span>`
              ).join(" ")}
          </div>
        </span>`
      )
      .join("");
    splitResult.el.innerHTML = wrappedLines;
  });


  let revealLines = revealText.forEach((element) => {
    const lines = element.querySelectorAll(".line .words");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
	      toggleActions:"restart none none reset",
      }
    });
    tl.set(revealText, { autoAlpha: 1 });
    tl.from(lines, 0.7, {
      yPercent: 100,
      ease: Power3.out,
      stagger: 0.05,
      delay: 0.05
    });
  });
});

// -------------------------------- scrolling my image --------------------------------

setTimeout(()=>{
  gsap.from('.hero4, .hero1',{
    y:150,
    opacity:0,
    duration:.6,
    smooth:true
  })
}, 3450)


function gsapAnimation() {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero_3",
      toggleActions:"restart none none reset",
    }
  });
  tl.from('.skill_heading, .skill_line, .moving_skills',{
    y:70,
    opacity:0,
    stagger:0.05,
    duration:.4,
    smooth:true
  })
  
  let t2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero_4",
      toggleActions:"restart none none reset",
    }
  });

  t2.from('.project_heading, .project_line',{
    y:70,
    opacity:0,
    stagger:0.05,
    duration:.4,
    smooth:true
  })
  
  t2.from('.card1, .card2, .card3',{
    y:70,
    opacity:0,
    stagger:0.05,
    duration:.40,
    smooth:true
  })
  t2.from('.card4, .card5',{
    y:70,
    opacity:0,
    stagger:0.05,
    duration:.40,
    smooth:true
  })

  let t3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero_5",
      toggleActions:"restart none none reset",
    }
  });

  t3.from('.contact_btn',{
    x:-100,
    opacity:0,
    duration:.5,
    smooth:true
  })
}
gsapAnimation()



setInterval(() => {
  const currentTime = new Date().toLocaleTimeString('en-US', {timeZone: 'Asia/Kolkata', hour: '2-digit', minute:'2-digit', hour12: true});
  let time = document.getElementsByClassName('time');
  time[0].innerText= currentTime
  console.log("run")
}, 1000);
