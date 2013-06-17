// Ronan Reilly 2013

window.onload = function() {
    // Layout Code -- UNUSED NOW
    // Var viewPortBack;
    // Var viewPort;
    
    // array to hold all images.
    var galleryImages = new Array();
    galleryImages[0] = '<img src ="images/0.jpg">';
    galleryImages[1] = '<img src ="images/1.jpg">';
    galleryImages[2] = '<img src ="images/2.jpg">';
    galleryImages[3] = '<img src ="images/3.jpg">';
    galleryImages[4] = '<img src ="images/4.jpg">';
    galleryImages[5] = '<img src ="images/5.jpg">';
    galleryImages[6] = '<img src ="images/6.jpg">';
    galleryImages[7] = '<img src ="images/7.jpg">';
    galleryImages[8] = '<img src ="images/8.jpg">';
    galleryImages[9] = '<img src ="images/9.jpg">';
    
    // Vars for storing three images.
    var leftDiv;
    var middleDiv;
    var rightDiv;
    
    // Var for storing gallery container.
    var galleryContainer;
    
    // Vars for storing the blind divs.
    var leftBlind;
    var rightBlind;
    
    // Setting the visible image index. will be always zero when page is loaded.
    var currentVisibleImageIndex = galleryImages[0];
    
    // Getting the buttons by id and storing them in variables.
    var btn_next = document.getElementById('next');
    var btn_previous = document.getElementById('prev');
    var btn_play = document.getElementById('play');
	
    // Var for timers on slide functions.    
    var counter = 0;
	
    // Var to store timer function for next and previous functions,
    // this is needed so that it can be stopped when needed.
    var timerFunction;
    
    
    // Var to store initial x position of gallery container div.
    var posOfParent = 106;
    
    // Var to hold the time increment for the timers of slide functions.
    var timeIncrement = 0.1;
    
    // Vars to store timer functions for auto slide show. These are needed
    // so they can be stopped when needed.
    var timerFunctionSliderSI;
    var timerFunctionSliderTO;
    
    // Var to hold the time increment for the timers of slide function for auto slide show.
    var timeIncrementSlider = 0.1;
	
        
    // This function creates the container dive for the gallery, the three divs for 
    // images and the calls the function to append them to the gallery container
    // in their positions.
    
    function loadInitialImages() {
    
        // Layout Code -- UNUSED NOW
        /*
        // Block below:
        // These div's were used for laying out the slider
        // Not needed after layout was finished,
        // being implemented

        viewPortBack = document.createElement('div');
        viewPortBack.style.width = '700px';
        viewPortBack.style.height = '460px';
        viewPortBack.style.background = 'black';
        viewPortBack.style.left = '606px';
        viewPortBack.style.top = '163px';
        viewPortBack.className = 'viewPortBack';
        document.body.appendChild(viewPortBack);

        /*viewPort = document.createElement('div');
        viewPort.style.width = '500px';
        viewPort.style.height = '350px';
        //viewPort.style.background = 'orange';
        viewPort.style.left = '706px';
        viewPort.style.top = '208px';
        viewPort.style.zIndex="1";
        viewPort.className = 'viewPort';
        document.body.appendChild(viewPort);
        */
       
       
        // If the page is refreshed while the next image function, previous image
        // function or slide show function is executing then the buttons became disabled.
        // Here they are made to be enabled when teh page is loaded or refreshed to prevent this bug.
        btn_next.disabled = false;
        btn_previous.disabled = false;
        btn_play.disabled = false;
        
        
        // Setting up the divs, container 
        // and initial image divs.
       
        // creating the left blind div.
        leftBlind = document.createElement('div');
        leftBlind.style.width = '606px';
        leftBlind.style.height = '800px';
        leftBlind.style.background = 'black';
        leftBlind.style.left = '0px';
        leftBlind.style.top = '0px';
        leftBlind.style.zIndex = '1';
        leftBlind.className = 'leftBlind';
        document.body.appendChild(leftBlind);
        
        // creating the right blind div.
        rightBlind = document.createElement('div');
        rightBlind.style.width = '625px';
        rightBlind.style.height = '800px';
        rightBlind.style.background = 'black';
        rightBlind.style.left = '1300px';
        rightBlind.style.top = '0px';
        rightBlind.style.zIndex = '1';
        rightBlind.className = 'rightBlind';
        document.body.appendChild(rightBlind);
        
        // creating the gallery container div.
        galleryContainer = document.createElement('div');  
        galleryContainer.style.width = '1700px';
        galleryContainer.style.height = '350px';
        galleryContainer.style.left = posOfParent + 'px';
        galleryContainer.className = 'galleryContainerClass';
        document.body.appendChild(galleryContainer);
        
        // creating the left image div.
        leftDiv = document.createElement('div');
        leftDiv.style.width = '500px';
        leftDiv.style.height = '350px';
        leftDiv.className = 'images';
        leftDiv.innerHTML = galleryImages[9];
        
        // creating the middle visible image div.
        middleDiv = document.createElement('div');
        middleDiv.style.width = '500px';
        middleDiv.style.height = '350px';
        middleDiv.className = 'images';
        middleDiv.className = 'middle_pos';
        middleDiv.innerHTML = galleryImages[0];
        
        // creating right image div.
        rightDiv = document.createElement('div');
        rightDiv.style.width = '500px';
        rightDiv.style.height = '350px';
        rightDiv.className = 'images';
        rightDiv.innerHTML = galleryImages[1];
        
        // Creating an array to hold the three image divs.
        
        var threeImagesHolder = new Array(leftDiv, middleDiv, rightDiv);
        
        // Calling the function to append the images to the 
        // galleryContainer.
        
        populateGalleryContainer(threeImagesHolder);
    }
    
    // This function takes an arry and populates the container div
    // with the initial three images/div's.
    
    function populateGalleryContainer(arr) {
        for (var i = 0; i != arr.length; i++) {
            galleryContainer.appendChild(arr[i]);
        //console.log(galleryContainer);
        };
    }
        
    // Calls the function to create the gallery container div and  the right, middle and left
    // images div. 
    
    loadInitialImages();

    // This function is called by the user when they click on the next button.
    // The button sets up a time interval and this function moves the container 
    // div's left position until the next image is in the view port. When the container 
    // div's poition reaches 600 the timer interval is cleared and  the 
    // snapDivsBackAndSwapContentNext() function is called where the necassary
    // checks are carried out on the div's to change the visible image.
    
    function moveDivsForNextImage() {
        btn_next.disabled = true;
        counter = counter + 5; // The increment the galleryContainer div will move at each time interval.
        galleryContainer.style.left = posOfParent - counter + 'px';
        //console.log(galleryContainer.style.left);
        if (counter == 600) {
            // Clearing the interval after galleryContainer has move dthe right amount.
            clearInterval(timerFunction);
            counter = 0;
            // re- enabling the next button so it can be used again.
            btn_next.disabled = false;
            // Here the function to snap the galleryContainer back and swap the images accordingly.
            snapDivsBackAndSwapContentNext();
        };
    }
    
    // This function is called when the next button is called.
    // It sets a time interval that will be called until the gallery
    // container div reaches the correct position.
    
    btn_next.onclick = function() {
        timerFunction = setInterval(function() {
            moveDivsForNextImage()
        }, timeIncrement);
    //this.removeEventListener('onClick',arguments.callee,false);
    }
    
    // This fucntion is called by the moveDivsForNextImage() function. It checks the 
    // cuurently visible image and swaps the content of the left, right and middle visible images
    // appropriately.
    
    function snapDivsBackAndSwapContentNext() {		
        galleryContainer.style.left = posOfParent + 'px'; // Snapping galleryContainer back to its original position.
        if (currentVisibleImageIndex == galleryImages[0]) {
            leftDiv.innerHTML = galleryImages[0];
            middleDiv.innerHTML = galleryImages[1];
            rightDiv.innerHTML = galleryImages[2];
            currentVisibleImageIndex = galleryImages[1];
        } else if (currentVisibleImageIndex == galleryImages[1]) {
            leftDiv.innerHTML = galleryImages[1];
            middleDiv.innerHTML = galleryImages[2];
            rightDiv.innerHTML = galleryImages[3];
            currentVisibleImageIndex = galleryImages[2];
        } else if (currentVisibleImageIndex == galleryImages[2]) {
            leftDiv.innerHTML = galleryImages[2];
            middleDiv.innerHTML = galleryImages[3];
            rightDiv.innerHTML = galleryImages[4];
            currentVisibleImageIndex = galleryImages[3];
        } else if (currentVisibleImageIndex == galleryImages[3]) {
            leftDiv.innerHTML = galleryImages[3];
            middleDiv.innerHTML = galleryImages[4];
            rightDiv.innerHTML = galleryImages[5];
            currentVisibleImageIndex = galleryImages[4];
        } else if (currentVisibleImageIndex == galleryImages[4]) {
            leftDiv.innerHTML = galleryImages[4];
            middleDiv.innerHTML = galleryImages[5];
            rightDiv.innerHTML = galleryImages[6];
            currentVisibleImageIndex = galleryImages[5];
        } else if (currentVisibleImageIndex == galleryImages[5]) {
            leftDiv.innerHTML = galleryImages[5];
            middleDiv.innerHTML = galleryImages[6];
            rightDiv.innerHTML = galleryImages[7];
            currentVisibleImageIndex = galleryImages[6];
        } else if (currentVisibleImageIndex == galleryImages[6]) {
            leftDiv.innerHTML = galleryImages[6];
            middleDiv.innerHTML = galleryImages[7];
            rightDiv.innerHTML = galleryImages[8];
            currentVisibleImageIndex = galleryImages[7];
        } else if (currentVisibleImageIndex == galleryImages[7]) {
            leftDiv.innerHTML = galleryImages[7];
            middleDiv.innerHTML = galleryImages[8];
            rightDiv.innerHTML = galleryImages[9];
            currentVisibleImageIndex = galleryImages[8];
        } else if (currentVisibleImageIndex == galleryImages[8]) {
            leftDiv.innerHTML = galleryImages[8];
            middleDiv.innerHTML = galleryImages[9];
            rightDiv.innerHTML = galleryImages[0];
            currentVisibleImageIndex = galleryImages[9];
        } else if (currentVisibleImageIndex == galleryImages[9]) {
            leftDiv.innerHTML = galleryImages[9];
            middleDiv.innerHTML = galleryImages[0];
            rightDiv.innerHTML = galleryImages[1];
            currentVisibleImageIndex = galleryImages[0];
        }
		
    }
    
    // This function works in the same manner as the moveDivsForPrevNext() function.
    // The only difference is that it moves the gallery container div in the opposite 
    // direction than the moveDivsForPrevNext() function.
    
    function moveDivsForPrevImage() {
        btn_previous.disabled = true;
        counter = counter + 5;
        galleryContainer.style.left = posOfParent + counter + 'px';
        if (counter == 600) {
            //alert('hello');
            clearInterval(timerFunction);
            counter = 0;
            btn_previous.disabled = false;
            snapDivsBackAndSwapContentPrev();
        };
    }
    
    // This function is called when the previous button is called.
    // It sets a time interval that will be called until the gallery
    // container div reaches the correct position.
    
    btn_previous.onclick = function() {
        timerFunction = setInterval(function() {
            moveDivsForPrevImage()
        }, timeIncrement);
    //this.removeEventListener('onClick',arguments.callee,false);
    }
    
    // This fucntion is called by the moveDivsForPrevImage() function. It checks the 
    // cuurently visible image and swaps the content of the left, right and middle visible images
    // appropriately.
    
    function snapDivsBackAndSwapContentPrev() {
        galleryContainer.style.left = posOfParent + 'px';
        if (currentVisibleImageIndex == galleryImages[0]) {
            leftDiv.innerHTML = galleryImages[8];
            middleDiv.innerHTML = galleryImages[9];
            rightDiv.innerHTML = galleryImages[0];
            currentVisibleImageIndex = galleryImages[9];
        } else if (currentVisibleImageIndex == galleryImages[1]) {
            leftDiv.innerHTML = galleryImages[9];
            middleDiv.innerHTML = galleryImages[0];
            rightDiv.innerHTML = galleryImages[1];
            currentVisibleImageIndex = galleryImages[0];
        } else if (currentVisibleImageIndex == galleryImages[2]) {
            leftDiv.innerHTML = galleryImages[0];
            middleDiv.innerHTML = galleryImages[1];
            rightDiv.innerHTML = galleryImages[2];
            currentVisibleImageIndex = galleryImages[1];
        } else if (currentVisibleImageIndex == galleryImages[3]) {
            leftDiv.innerHTML = galleryImages[1];
            middleDiv.innerHTML = galleryImages[2];
            rightDiv.innerHTML = galleryImages[3];
            currentVisibleImageIndex = galleryImages[2];
        } else if (currentVisibleImageIndex == galleryImages[4]) {
            leftDiv.innerHTML = galleryImages[2];
            middleDiv.innerHTML = galleryImages[3];
            rightDiv.innerHTML = galleryImages[4];
            currentVisibleImageIndex = galleryImages[3];
        } else if (currentVisibleImageIndex == galleryImages[5]) {
            leftDiv.innerHTML = galleryImages[3];
            middleDiv.innerHTML = galleryImages[4];
            rightDiv.innerHTML = galleryImages[5];
            currentVisibleImageIndex = galleryImages[4];
        } else if (currentVisibleImageIndex == galleryImages[6]) {
            leftDiv.innerHTML = galleryImages[4];
            middleDiv.innerHTML = galleryImages[5];
            rightDiv.innerHTML = galleryImages[6];
            currentVisibleImageIndex = galleryImages[5];
        } else if (currentVisibleImageIndex == galleryImages[7]) {
            leftDiv.innerHTML = galleryImages[5];
            middleDiv.innerHTML = galleryImages[6];
            rightDiv.innerHTML = galleryImages[7];
            currentVisibleImageIndex = galleryImages[6];
        } else if (currentVisibleImageIndex == galleryImages[8]) {
            leftDiv.innerHTML = galleryImages[6];
            middleDiv.innerHTML = galleryImages[7];
            rightDiv.innerHTML = galleryImages[8];
            currentVisibleImageIndex = galleryImages[7];
        } else if (currentVisibleImageIndex == galleryImages[9]) {
            leftDiv.innerHTML = galleryImages[7];
            middleDiv.innerHTML = galleryImages[8];
            rightDiv.innerHTML = galleryImages[9];
            currentVisibleImageIndex = galleryImages[8];
        }
    }
    
    function callSlideShowAgain() {
        timerFunctionSliderSI = setInterval(function() {
            startSlideShow();
        }, timeIncrementSlider);
    }

    // This var is used to store the cuurently visible images index.
    // It is meant is used as a sentinal and when it reaches ten then
    // the slide show finishes.
    var sliderImageIndex = 0;
    
    // 
    // This function should starts a slide show. It moves the container div
    // the same as the movDivsForNextImage(). When the container div has been moved
    // and the images swapped the function calls a timeout that will wait three
    // seconds before calling the function through another function again making the next image visible
    // until the last image is viewed and the timeout is cleared along with the interval.
    // This is currently not working.
    
    function startSlideShow() {
        //alert(counter);
        
        // These buttons are disabled as long as the slideshow is in progress.
        btn_next.disabled= true;
        btn_previous.disabled = true;
        
        // If counter is zero, then the function executes.
        if(counter >= 0)
        {
            if (counter == 600) 
            {
                //alert(sliderImageIndex);
                sliderImageIndex++; // This is incremented everytime the function is called during the slideshow.
                counter = 0; // Counter is re-set to zero so the function can be ran agaoin.
                btn_play.disabled = false;
                //alert(sliderImageIndex);
                clearInterval(timerFunctionSliderSI); // Interval is ceared so function can run again.
                snapDivsBackAndSwapContentNext(); // galleryContainer is snapped back and images are changed accordingly.
                //console.log(sliderImageIndex);
                
                // As long as sliderImageIndex is not equal to ten, this part of the function will be called.
                // This calls a timeout that pauses before it calls this function again with a new set interval.
                
                if(sliderImageIndex != 10){
                    // After this timeout of two seconds this function is called again.
                    timerFunctionSliderTO = timerFunctionSliderTO = setTimeout(function() {
                        callSlideShowAgain();
                    }, 2000); 
                }else{
                    sliderImageIndex = 0;
                    clearTimeout(timerFunctionSliderTO);
                    clearInterval(timerFunctionSliderSI);  
                    btn_next.disabled= false;
                    btn_previous.disabled = false;
                }					
            }
            else
            {   
                btn_play.disabled = true;
                counter = counter + 5;
                galleryContainer.style.left = posOfParent - counter + 'px';            
            }
        }
    }
	
    // This function is called when the slideshow image button is clicked.
    // It sets a time interval and calls the startSlideShow() function
    // until the time interval is cleared.
    
    btn_play.onclick = function() {
        timerFunctionSliderSI = setInterval(function() {
            startSlideShow();
        }, timeIncrementSlider);
    //this.removeEventListener('onClick',arguments.callee,false);
    }
}