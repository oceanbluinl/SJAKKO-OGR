/* =====================================================
   SJAKKO GLOBAL
   MAIN JAVASCRIPT
===================================================== */


document.addEventListener("DOMContentLoaded", function () {


  /* =====================================================
     COPYRIGHT YEAR
  ===================================================== */

  const year =
    document.getElementById("year");

  if (year) {
    year.textContent =
      new Date().getFullYear();
  }


  /* =====================================================
     MOBILE NAVIGATION
  ===================================================== */

  const menuButton =
    document.getElementById("menuButton");

  const navLinks =
    document.getElementById("navLinks");


  if (menuButton && navLinks) {

    menuButton.addEventListener(
      "click",
      function () {

        navLinks.classList.toggle("active");

        const open =
          navLinks.classList.contains("active");

        menuButton.textContent =
          open ? "✕" : "☰";

        menuButton.setAttribute(
          "aria-expanded",
          open ? "true" : "false"
        );

      }
    );


    navLinks
      .querySelectorAll("a")
      .forEach(function (link) {

        link.addEventListener(
          "click",
          function () {

            navLinks.classList.remove("active");

            menuButton.textContent = "☰";

            menuButton.setAttribute(
              "aria-expanded",
              "false"
            );

          }
        );

      });

  }


  /* =====================================================
     EXPANDABLE BUSINESS & CAPABILITY CARDS
  ===================================================== */

  const cards =
    document.querySelectorAll(
      ".expandable-card"
    );


  cards.forEach(function (card) {


    function toggleCard() {

      const parentGrid =
        card.closest(
          ".service-grid, .capability-grid"
        );


      /*
        Close another open card within
        the same section.
      */

      if (
        !card.classList.contains("active") &&
        parentGrid
      ) {

        parentGrid
          .querySelectorAll(
            ".expandable-card.active"
          )
          .forEach(function (openCard) {

            openCard.classList.remove(
              "active"
            );

            openCard.setAttribute(
              "aria-expanded",
              "false"
            );

            const openText =
              openCard.querySelector(
                ".card-toggle-text"
              );

            if (openText) {
              openText.textContent =
                "View Details";
            }

          });

      }


      const isOpen =
        card.classList.toggle("active");


      card.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );


      const toggleText =
        card.querySelector(
          ".card-toggle-text"
        );


      if (toggleText) {

        toggleText.textContent =
          isOpen
            ? "Hide Details"
            : "View Details";

      }

    }


    /* Mouse / touch */

    card.addEventListener(
      "click",
      function (event) {

        /*
          Do not open/close card when
          clicking an actual link.
        */

        if (
          event.target.closest("a")
        ) {
          return;
        }

        toggleCard();

      }
    );


    /* Keyboard */

    card.addEventListener(
      "keydown",
      function (event) {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          /*
            Don't trigger the parent card
            when a link has keyboard focus.
          */

          if (
            event.target.closest("a")
          ) {
            return;
          }

          event.preventDefault();

          toggleCard();

        }

      }
    );

  });


  /* =====================================================
     CONTACT FORM STATUS
  ===================================================== */

  const params =
    new URLSearchParams(
      window.location.search
    );

  const status =
    params.get("status");

  const formMessage =
    document.getElementById(
      "formMessage"
    );


  if (
    status &&
    formMessage
  ) {


    if (status === "success") {

      formMessage.className =
        "form-status success";

      formMessage.textContent =
        "✓ Thank you. Your enquiry has been sent successfully. A member of the SJAKKO Global team will respond to you shortly.";

    }


    else if (
      status === "invalid" ||
      status === "missing"
    ) {

      formMessage.className =
        "form-status error";

      formMessage.textContent =
        "Please complete all required fields and enter a valid email address.";

    }


    else if (
      status === "error"
    ) {

      formMessage.className =
        "form-status error";

      formMessage.textContent =
        "We could not send your enquiry at this time. Please email info@sjakkoglobal.com.ng directly.";

    }


    /*
      Remove ?status= from the browser
      address after displaying the message.
    */

    if (
      window.history.replaceState
    ) {

      window.history.replaceState(
        {},
        document.title,
        window.location.pathname +
          "#contact"
      );

    }

  }


});