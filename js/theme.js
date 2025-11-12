$(document).ready(function () {
    // Get saved theme (fallback: light)
    const savedTheme = localStorage.getItem('theme') || 'light';
    $('html').attr('data-theme', savedTheme);
    $('#theme-select').val(savedTheme);

    // Change theme on select
    $('#theme-select').on('change', function () {
        const theme = $(this).val();
        $('html').attr('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
});
