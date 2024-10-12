document.addEventListener('DOMContentLoaded', () => {
    const signOutButton = document.getElementById('sign-out-btn');

    if (signOutButton) {
        console.log("Sign Out button found!");

        signOutButton.addEventListener('click', () => {
            console.log("Sign Out button clicked!");

            // Clear local storage
            localStorage.removeItem('loggedInUserId');
            localStorage.removeItem('userToken');

            alert('You have been successfully signed out.');

            // Debugging before redirection
            console.log("Redirecting to login page...");

            // Redirect to the login page
            window.location.replace('index.html');
        });
    } else {
        console.error("Sign Out button not found!");
    }
});


// form repeater
$(document).ready(function(){
    $('.repeater').repeater({
        initEmpty: false,
        defaultValues: {
            'text-input': ''
        },
        show:function(){
            $(this).slideDown();
        },
        hide: function(deleteElement){
            $(this).slideUp(deleteElement);
            setTimeout(() => {
                generateCV();
            }, 500);
        },
        isFirstItemUndeletable: true
    })
})