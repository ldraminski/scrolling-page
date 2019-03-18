

const scrollingPage = (() => {

    function init() {

        console.log('Scrolling Page');

        replaceSrc();
    }

    function replaceSrc() {

        const imageContainer = document.querySelector('.container-pic');
        const image = document.querySelector('.container-pic__pic');
        let anchors = document.querySelectorAll('.img-anchor');
        let imageSrc = ''

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.intersectionRatio > 0) {
                    imageSrc = require('../images/' + entry.target.getAttribute('data-src'));
                    //image.src = imageSrc;
                    imageContainer.style.cssText = 'background-image: url('+ imageSrc + ')';
                } else {
                    console.log('out of view');
                }
            });
        });

        anchors.forEach(anchor => {
            observer.observe(anchor);
        });
    }

    return {
        init: init
    }

})();

export default { scrollingPage };

