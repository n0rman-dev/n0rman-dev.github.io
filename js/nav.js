$(function () {
  $.getJSON('pages.json', function (data) {
    const $nav = $('#main-nav');


    $.each(data.pages, function (_, page) {
      if (page.active) {
        const $link = $('<a>')
          .attr('href', page.file)
          .text(page.name)
          .on('click', function (e) {
            e.preventDefault();

            // Remove existing active state
            $nav.find('a').removeClass('active');
            $(this).addClass('active');

            // Load page content
            loadContent(page);
          });

        $nav.append($link);

        // Load home on default
        if (page.name == 'Home') {
          loadContent(page);
        }
      }
    });
  });
});

var current_page = '';
function loadContent(page) {
  if (current_page == page) {
    return;
  } else {
    current_page = page;
  }

  const $content = $('.content');

  $content.stop(true, true).css('left', '-300px');

  // Load HTML content
  $content.hide().load(page.file, function (response, status) {
    if (status === 'error') {
      $content.html('<p>How did we get here? 🤔 <br>Think this is an error? Contact me at normants.dev@gmail.com</p>');
      return;
    }

    // ✅ Load JS after content is successfully loaded
    if (page.js && Array.isArray(page.js)) {
      page.js.forEach(jsPath => {
        // Prevent duplicate loading
        if ($(`script[src="${jsPath}"]`).length === 0) {
          const script = document.createElement('script');
          script.src = jsPath;
          script.defer = true; // ensure it doesn't block rendering
          document.body.appendChild(script);
        }
      });
    } else if (page.js && typeof page.js === 'string') {
      const jsPath = page.js;
      if ($(`script[src="${jsPath}"]`).length === 0) {
        const script = document.createElement('script');
        script.src = jsPath;
        script.defer = true;
        document.body.appendChild(script);
      }
    }
  }).animate({
    opacity: "show",
    left: "0"
  }, 1000);

  // ✅ Load CSS (if provided)
  if (page.css) {
    const cssFiles = Array.isArray(page.css) ? page.css : [page.css];
    cssFiles.forEach(cssPath => {
      if ($(`link[href="${cssPath}"]`).length === 0) {
        $('<link>', {
          rel: 'stylesheet',
          href: cssPath
        }).appendTo('head');
      }
    });
  }
}
