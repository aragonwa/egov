//Delay on nav dropdown menu
$('ul.nav li.dropdown').hover(
function () {
    var $this = $(this).children('ul.dropdown-menu');
    var timer = $this.data('timer') || 0;
    clearTimeout(timer);
    timer = setTimeout(function () {
        $this.addClass('show');
    }, 250); // 2000 is in mil sec eq to 2 sec.
    $this.data('timer', timer);
},
function () {
    var $this = $(this).children('ul.dropdown-menu');
    var timer = $this.data('timer') || 0;
    clearTimeout(timer);
    timer = setTimeout(function () {
        $this.removeClass('show');
    }, 250);
    $this.data('timer', timer);
});