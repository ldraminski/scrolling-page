

const scrollingPage = (() => {

    let anchors = document.querySelectorAll('.img-anchor');
    let assignCordsToAnchors = [];
    let currentPic = '';

    function init() {

        console.log('Scrolling Page');

        //replaceSrc();
        getAllAnchors(() => {
            checkWhatImageShouldLoad();
        });

        document.addEventListener('scroll', ()=>{
            getAllAnchors(() => {
                checkWhatImageShouldLoad();
            });
        });
    }

    function checkWhatImageShouldLoad() {

        const imageContainer = document.querySelector('.container-pic');

        let scrollTop = window.pageYOffset + window.innerHeight;
        let imageSrc = '';

        setTimeout(() => {
            for(let i = assignCordsToAnchors.length - 1; i >= 0; i--) {
                if(scrollTop > assignCordsToAnchors[i][0] || scrollTop < assignCordsToAnchors[0][0] ) {
                    if(currentPic !== assignCordsToAnchors[i][0] ) {
                        currentPic = assignCordsToAnchors[i][0];
                        imageSrc = require('../images/' + assignCordsToAnchors[i][1]);
                        imageContainer.style.cssText = 'background-image: url('+ imageSrc  + ')';
                        return;
                    } else {
                        console.log('Było');
                        return
                    }
                }
            }
        }, 200)
    }

    function getAllAnchors(callback) {

        let running = false;

        if(!running){
            running = true;
            setTimeout(()=> {
                assignCordsToAnchors = [];

                [].forEach.call(anchors, (item)=>{
                    let cordsX = item.offsetTop;
                    let imageSrc = item.getAttribute('data-src');
                    assignCordsToAnchors.push([cordsX, imageSrc]);
                });
                running = false;
                callback();
            }, 200)
        }
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

