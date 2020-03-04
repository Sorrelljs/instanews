let urlKey = 'https://api.nytimes.com/svc/topstories/v2/'
let apiKey = '.json?api-key=0hGoPGeduATqFtOZvZb587v8yQsnU7yh';
let sections = [
    'arts',
    'automobiles',
    'books',
    'business',
    'fashion',
    'food',
    'health',
    'home',
    'insider',
    'magazine',
    'movies',
    'national',
    'nyregion',
    'obituaries',
    'opinion',
    'politics',
    'realestate',
    'science',
    'sports',
    'sundayreview',
    'technology',
    'theater',
    'tmagazine',
    'travel',
    'upshot',
    'world'
];
let myList = $('.myList');
$('.loader').hide();
class newsClass {
    constructor(url, img, abstract) {
        this.img = img; // <img>
        this.abstract = abstract; //figcaption
        this.url = url; //a 
    }

    render() {
        // $('.news-feed').append('<li class='card' style='background-image: url(' + this.img + ')'><a href=' + this.url + ' 'target'=_blank></a> <figcaption>' + this.abstract + '</figcaption> </li>')
        $('.news-feed').append(`
                        <li class='card' style='background-image: url("${this.img}")'>
                                <a href="${this.url}" target='_blank'>
                                        <figcaption>${this.abstract}</figcaption>
                                </a>
                        </li>
                `)

    }
};
$(document).ready(function () {

    sections.forEach(element => {
        myList.append('<option value="' + element + '">' + element + '</option>');
    })
    $('select').niceSelect();

    function createNewsCards(jData, news) {
        for (let i = 0; i < 12; i++) {
            let abstract = jData.results[i].abstract,
                urlC = jData.results[i].url,
                imgArr = jData.results[i].multimedia.length
            if (abstract !== '' && urlC !== '' && imgArr > 3) {
                let img = jData.results[i].multimedia[4].url;
                let newCard = new newsClass(urlC, img, abstract);
                newCard.render(news);
            }
        }
    }

    $('select').on('change', function (event) {
        let option = event.target.value;
        $('.loader').show();
        $.ajax({
            method: 'GET',
            url: urlKey + option + apiKey
        }).done(function (data) {
            $('.loader').hide();
            $('.fail').removeClass('fail-show');
            $('.container1').removeClass('container1--empty');
            $('.news-feed').text('');
            $('.logo').addClass('small-logo');
            $('.small-logo').removeClass('logo');
            $('.myList').on('click')
            $('.wrapper').slideUp('slow');
            $('.wrapper').slideDown('slow');
            createNewsCards(data, $('.news-feed'));
        }).fail(function () {
            $('.loader').hide();
            $('.container1').removeClass('container1--empty');
            $('.news-feed').text('');
            $('.logo').addClass('small-logo');
            $('.small-logo').removeClass('logo');
            $('.myList').on('click')
            $('.wrapper').slideUp('slow');
            $('.wrapper').slideDown('slow');
            $('.fail').addClass('fail-show');
        });
    })

}); // document ready ending