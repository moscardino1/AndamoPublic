import { auth } from './firebase-init.js';

// Get the login button and input fields
const loginBtn = document.getElementById('login-btn');
const usernameInput = document.getElementById('username-input');
const passwordInput = document.getElementById('password-input');
const googleBtn = document.getElementById('google-btn');
// Get the login and register buttons and input fields

// Get the error message element
const errorMessage = document.getElementById('error-message');

// Create an instance of the Google provider object
var googleProvider = new firebase.auth.GoogleAuthProvider();


// Add click event listener to the login button
loginBtn.addEventListener('click', function() {
  const email = usernameInput.value;
  const password = passwordInput.value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      // You can redirect to your app's page.
      window.location.href = 'index.html';
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // Display the error message
      showError(errorMessage);
    });
});

// Add click event listener to the Google login button
googleBtn.addEventListener('click', function() {
  firebase.auth().signInWithPopup(googleProvider).then(function(result) {
    // This gives you a Google Access Token.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // You can redirect to your app's page.
    window.location.href = 'index.html';
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // Display the error message
    showError(errorMessage);
  });
});

 

// Function to display the error message
function showError(message) {
    errorMessage.textContent = message;
  }
  
// Get the forgot password and register link elements
const forgotPasswordLink = document.getElementById('forgot-password');
const registerLink = document.getElementById('register-link');

// Add click event listener to the forgot password link
forgotPasswordLink.addEventListener('click', function() {
  console.log('Forgot password link clicked');
});

// Add click event listener to the register link
registerLink.addEventListener('click', function() {
  console.log('Register link clicked');
});

// Add click event listener to the forgot password link
forgotPasswordLink.addEventListener('click', function() {
    const email = prompt('Please enter your email:');
    if (email) {
      firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
          alert('Password reset email sent!');
        })
        .catch((error) => {
          showError(error.message);
        });
    }
  });

// Get references to the register link and the register-modal
// const registerLink = document.getElementById('your-register-link-id');
const registerModal = document.getElementById('register-modal');

// Add click event listener to the register link
registerLink.addEventListener('click', function() {
  // Toggle the display of the registration form
  if (registerModal.style.display === 'block') {
    registerModal.style.display = 'none';
  } else {
    registerModal.style.display = 'block';
  }
});


  // Get the registration button and registration section
const registerBtn = document.getElementById('register-btn');
const registrationSection = document.querySelector('.registration');

// Add click event listener to the registration button
registerBtn.addEventListener('click', function() {
  // Hide the registration section
  registrationSection.style.display = 'none';
});
// Get the registration button and input fields
// const registerBtn = document.getElementById('register-btn');
const registerUsernameInput = document.getElementById('register-username-input');
const registerPasswordInput = document.getElementById('register-password-input');

// Add click event listener to the registration button
registerBtn.addEventListener('click', function() {
  const email = registerUsernameInput.value;
  const password = registerPasswordInput.value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      // You can redirect to your app's page.
      window.location.href = 'index.html';
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // Display the error message
      showError(errorMessage);
    });
});

loginBtn.addEventListener('click', function() {
  const email = usernameInput.value;
  const password = passwordInput.value;

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in 
          var user = userCredential.user;
          // You can redirect to your app's page.
          window.location.href = 'index.html';
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // Display the error message
          showError(errorMessage);
        });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // Display the error message
      showError(errorMessage);
    });
});
 

document.addEventListener('DOMContentLoaded', function() {
    // Get the login button and input fields
    const loginBtn = document.getElementById('login-btn');
    const usernameInput = document.getElementById('username-input');
    const passwordInput = document.getElementById('password-input');
    const googleBtn = document.getElementById('google-btn');
  
    // Get the error message element
    const errorMessage = document.getElementById('error-message');
  
    // Create an instance of the Google provider object
    var googleProvider = new firebase.auth.GoogleAuthProvider();
  
    // Add click event listener to the login button
    loginBtn.addEventListener('click', function() {
      // Your existing code here
    });
  
    // Add click event listener to the Google login button
    googleBtn.addEventListener('click', function() {
      // Your existing code here
    });
  
    // Rest of your code here
  });
// Get a reference to the swiper-wrapper element
const swiperWrapper = document.querySelector('.swiper-wrapper');

// Define an array of image URLs
const imageUrls = [
  'https://i.pinimg.com/originals/ff/a4/e9/ffa4e95875abfc2276d883ea3daf9688.jpg',
  'https://viaggiamoinfamiglia.files.wordpress.com/2016/09/dsc_0125_edited-copia.jpg?w=1024',
  'https://www.argentariolifestyle.it/wp-content/uploads/2020/06/Negozio-2.jpg',
  'https://media-cdn.tripadvisor.com/media/photo-s/16/78/2c/66/photo1jpg.jpg',
  'https://i.pinimg.com/originals/bd/c9/bf/bdc9bfb88f0f921f8a21d98cfb97d99a.jpg',
  'https://media.revistaad.es/photos/60c22b9cb5e4c2d4b65482fe/master/w_1600%2Cc_limit/224132.jpg',
  'https://www.pasticceriamarchesi.com/content/dam/marchesi/images/santa%20maria%20natale%201920x1080.jpg/_jcr_content/renditions/original',
  'https://i.pinimg.com/originals/bd/1e/4b/bd1e4bd97979c717b988d4ab8a16fd57.jpg',
  'https://archjourney.org/wp-content/uploads/2018/04/2-40.jpg'



  // Add more image URLs as needed
];

// Shuffle the image URLs array
const shuffledImageUrls = imageUrls.sort(() => 0.5 - Math.random());

// Iterate over the image URLs and create the carousel slides
shuffledImageUrls.forEach((imageUrl) => {
  const slide = document.createElement('div');
  slide.classList.add('swiper-slide');
  slide.innerHTML = `<img src="${imageUrl}" alt="Slide Image" />`;
  swiperWrapper.appendChild(slide);
});

// Initialize the Swiper carousel
const swiper = new Swiper('.swiper-container', {
  loop: true,
  slidesPerView: 4, // Display 3 slides at a time
  spaceBetween: 10, // Add spacing between slides
  autoplay: {
    delay: 1300, // Adjust the delay as needed (in milliseconds)
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true, // Enable dynamic pagination bullets

  },
});