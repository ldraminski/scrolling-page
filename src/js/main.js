

const scrollingPage = (() => {

    let anchors = document.querySelectorAll('.img-anchor');
    let assignCordsToAnchors = [];
    let currentPic = '';
    let running = false;

    function init() {

        console.log('Scrolling Page');

        //replaceSrc();
        checkWhatImageShouldLoad();

        document.addEventListener('scroll', ()=>{
            checkWhatImageShouldLoad();
        });
    }

    async function checkWhatImageShouldLoad() {

        try {
            await getAllAnchors();
            const imageContainer = document.querySelector('.container-pic');

            let scrollTop = window.pageYOffset + window.innerHeight;
            let imageSrc = '';

            for(let i = assignCordsToAnchors.length - 1; i >= 0; i--) {
                if(scrollTop > assignCordsToAnchors[i][0] || scrollTop < assignCordsToAnchors[0][0] ) {
                    if(currentPic !== assignCordsToAnchors[i][0] ) {
                        currentPic = assignCordsToAnchors[i][0];
                        imageSrc = require('../images/' + assignCordsToAnchors[i][1]);
                        imageContainer.style.cssText = 'background-image: url('+ imageSrc  + ')';
                        console.log('ENGAGE');
                        return;
                    } else {
                        console.log('This image is loaded');
                        return
                    }
                }
            }
        } catch(error) {
            //console.log('Message' + error);
        }
    }

    function getAllAnchors() {

        return new Promise((resolve, reject) => {
            if(!running){
                running = true;
                setTimeout(()=> {
                    assignCordsToAnchors = [];
    
                    [].forEach.call(anchors, (item)=>{
                        let cordsX = item.offsetTop;
                        let imageSrc = item.getAttribute('data-src');
                        assignCordsToAnchors.push([cordsX, imageSrc]);
                    });
                    resolve();
                    running = false;
                }, 200)
            } else {
                reject('Function still running');
            }
        });
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

