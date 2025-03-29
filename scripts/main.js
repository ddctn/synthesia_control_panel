"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // слайдеры бодрости, концентрации и мышления
  document.querySelectorAll(".progress-container").forEach((container) => {
    const bar = container.querySelector(".progress-bar");
    let isDragging = false;

    function updateProgress(e) {
      const rect = container.getBoundingClientRect();
      let position = (e.clientX - rect.left) / rect.width;
      position = Math.max(0, Math.min(1, position));

      bar.style.width = `${position * 100}%`;

      const event = new CustomEvent("progress-change", {
        detail: { value: position * 100 },
      });
      container.dispatchEvent(event);
    }

    container.addEventListener("mousedown", (e) => {
      isDragging = true;
      updateProgress(e);
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      updateProgress(e);
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
    });
  });

  document
    .querySelectorAll(".progress-container")
    .forEach((container, index) => {
      container.addEventListener("progress-change", (e) => {
        console.log(`Шкала ${index + 1}: ${e.detail.value.toFixed(1)}%`);
      });
    });

  // слайдер интенсивности
  const dots = document.querySelectorAll(".dot");

  function updateSlider(clickedIndex) {
    dots.forEach((dot, index) => {
      dot.classList.toggle("filled", index <= clickedIndex);
      dot.classList.toggle("active", index === clickedIndex);
    });
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.dataset.index);
      updateSlider(index);
    });
  });

  updateSlider(0);

  // слайдер скорости действия

  const slider = document.querySelector(".stepped-slider");
  const thumb = document.querySelector(".slider-thumb");
  const marks = document.querySelectorAll(".mark");
  let isDragging = false;

  const positions = Array.from(marks).map((mark, index, arr) => {
    const sliderWidth = slider.offsetWidth;
    return (sliderWidth / (arr.length - 1)) * index;
  });

  function setThumbPosition(clientX) {
    const rect = slider.getBoundingClientRect();
    const x = clientX - rect.left;

    const closest = positions.reduce((prev, curr) =>
      Math.abs(curr - x) < Math.abs(prev - x) ? curr : prev
    );

    thumb.style.left = `${closest}px`;

    const value = positions.indexOf(closest);
    const event = new CustomEvent("slider-change", {
      detail: { value: value + 1 },
    });
    slider.dispatchEvent(event);
  }

  slider.addEventListener("click", (e) => {
    setThumbPosition(e.clientX);
  });

  slider.addEventListener("mousedown", () => {
    isDragging = true;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    setThumbPosition(e.clientX);
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  slider.addEventListener("slider-change", (e) => {});
  setThumbPosition(positions[0]);

  // окно ошибки
  const modal = document.getElementById("myModal");
  const closeBtn = document.querySelector(".close");
  const btns = document.querySelectorAll(".modal-btn");

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.style.display = "block";
    });
  });

  closeBtn.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  };

  // кнопка синтеза

  const synthbtn = document.querySelector(".synthesbtn");
  const rotatingDivs = document.querySelectorAll(".rotating-div");

  synthbtn.addEventListener("click", () => {
    rotatingDivs.forEach((div) => {
      const isAnimating = div.style.animationPlayState === "running";

      if (isAnimating) {
        div.style.animation = "none";
        void div.offsetWidth;
        div.style.animation = "synthesise 3s linear infinite";
        div.style.animationPlayState = "paused";
      } else {
        div.style.animationPlayState = "running";
      }
    });
  });

  // кнопка переключения картинки

  const synths = document.querySelectorAll(".synth1, .synth2");
  const changebtn = document.querySelector(".change-btn");
  let currentIndex = 0;

  function showCurrentSection() {
    synths.forEach((img, index) => {
      if (index === currentIndex) {
        img.classList.add("block");
        img.classList.remove("none");
      } else {
        img.classList.remove("block");
        img.classList.add("none");
      }
    });
  }

  changebtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % synths.length;
    showCurrentSection();
  });

  showCurrentSection();
});
