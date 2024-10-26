$(document).ready(function () {
    $(".gallery").slick({
        dots: true,
        lazyLoad: "ondemand",
        responsive: [{
            breakpoint: 768,
            settings: {
                arrows: false,
                slidesToShow: 1
            }
        }],
        slidesToScroll: 1,
        slidesToShow: 3
    });
});