import './styles/style.scss';
import image from './images/pic.png';


function scrollingPage() {

    function init() {

        console.log('Scrolling Page');
    }

    return {
        init: init
    }
}

scrollingPage.init();