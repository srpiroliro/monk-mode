const countdown = 30;

const cssStyle = `
.monkmode--fullscreen-div {
    display: none;

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 1);
    z-index: 10000;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 2em;
    font-family: 'Courier New', 'Monaco', monospace;
    text-align: center;
  }

  .monkmode--close-button, .monkmode--confirm-button {
    text-transform: uppercase;
    font-size: 1em;
    font-weight: bold;  
    
    text-decoration: none;
    padding: 10px 20px;
    margin-top: 20px;
    cursor: pointer;
    background-color: transparent;
    color: white;
    border-radius: 5px;
    border: 4px solid white;
  }

  .monkmode--countdown-holder {
    display: none;
    margin-top: 20px;
  }

  .monkmode--countdown-title, .monkmode--countdown-element {
    text-align: center;
    color: white;
    font-weight: normal;
  }

  .monkmode--countdown-title {
    /* Additional styles if needed */
  }

  .monkmode--countdown-element {
    font-size: 1.5em;
  }

  a.monkmode--link {
    color: #FFD700;
  }

  #monkmode--link-holder {
    display: none;
  }

  .disabled {
    opacity: 0.4;
    pointer-events: none;
  }


`;

const MESSAGES = {
    default: "Don't get distracted, keep grinding.",
    close: "Close",
    q_sure: "Are you sure?",
    a_sure: "I am sure"
}


function generate_block_page() {


    // Create the fullscreen div
    var fullscreenDiv = document.createElement('div');
    fullscreenDiv.className = 'monkmode--fullscreen-div';
    fullscreenDiv.id = 'monkmode--fullscreen-div';

    // Create the message container
    var messageContainer = document.createElement('div');
    messageContainer.innerHTML = `
        <h1>BLOCKED</h1>
        <b>[ MONK MODE ]</b>
        <br>
        <br>
        <p id='monkmode--message'>${MESSAGES.default}</p>
        <br>
        <p id='monkmode--link-holder'>Go to <a id='monkmode--link' href='#'></a></p>`

    // Create the close button
    var closeButton = document.createElement('button');
    closeButton.textContent = MESSAGES.close;
    closeButton.className = 'monkmode--close-button';


    // Create the countdown holder
    var countdownHolder = document.createElement('div');
    countdownHolder.className = 'monkmode--countdown-holder';

    var countdownTitle = document.createElement('h2');
    countdownTitle.textContent = MESSAGES.q_sure;
    countdownTitle.className = 'monkmode--countdown-title';

    var countdownElement = document.createElement('h3');
    countdownElement.className = 'monkmode--countdown-element';

    var confirmButton = document.createElement('button');
    confirmButton.textContent = MESSAGES.a_sure;
    confirmButton.disabled = true; // Start as disabled
    confirmButton.className = 'monkmode--confirm-button disabled';

    // Mount everything
    countdownHolder.appendChild(countdownTitle);
    countdownHolder.appendChild(countdownElement);
    countdownHolder.appendChild(confirmButton);


    // Add an event listener to the initial close button
    closeButton.addEventListener('click', function() {
        closeButton.style.display = 'none'; // Hide the initial close button
        countdownHolder.style.display = 'block';

        // Start the countdown
        countdownElement.textContent = `${countdown}s`;
        let tmpCountdown = countdown;
        let intervalId = setInterval(() => {
            tmpCountdown--;
            countdownElement.textContent = `${tmpCountdown}s`;

            if (tmpCountdown <= 0) {
                clearInterval(intervalId);
                confirmButton.className='monkmode--confirm-button'; // Remove the disabled class
                confirmButton.disabled = false; // Enable the button after the countdown
            }
        }, 1000);
    });



    // Add an event listener to the "Are you sure?" button
    confirmButton.addEventListener('click', function() {
        unblock_page();
    });

    // Append elements to the fullscreen div
    messageContainer.appendChild(closeButton);
    messageContainer.appendChild(countdownHolder);
    fullscreenDiv.appendChild(messageContainer);

    // Create the style tag
    var styleTag = document.createElement('style');
    styleTag.innerHTML = cssStyle;
    document.head.appendChild(styleTag);

    // Append the fullscreen div to the body (making it visible)
    document.body.appendChild(fullscreenDiv);
}

function block_page(msg="", go_to="") {
    console.log("blocking page");

    // Mute and pause all media
    stop_video();
    window.addEventListener('load', function() {
        console.log("loaded");
        stop_video(); // In case the first didn't work because the video wasn't loaded yet
    });

    if(msg && document.querySelector('#monkmode--message'))
        document.querySelector('#monkmode--message').textContent = msg;

    if(go_to!=="" && document.querySelector('#monkmode--link-holder')){
        document.querySelector('#monkmode--link-holder').style.display = 'block';

        document.querySelector('#monkmode--link').href = go_to;
        document.querySelector('#monkmode--link').textContent = go_to.split("?")[0];
    } 

    document.querySelector('.monkmode--fullscreen-div').style.display = 'flex';
}

function unblock_page() {
    document.querySelector('.monkmode--fullscreen-div').style.display = 'none';

    document.querySelector('.monkmode--countdown-holder').style.display = 'none'; // Hide the countdown holder
    document.querySelector('.monkmode--close-button').style.display = 'initial'; // Show the initial close button

    // Unmute and play previously playing media
    document.querySelectorAll('audio, video').forEach(media => {
        media.muted = false;
        if (media.dataset.wasPlaying === 'true') {
            media.play();
            delete media.dataset.wasPlaying;
        }
    });
}

function stop_video() {
    document.querySelectorAll('audio, video').forEach(media => {
        if (!media.paused) {
            media.pause();
            media.dataset.wasPlaying = 'true';
        }
        media.muted = true;
    });
}