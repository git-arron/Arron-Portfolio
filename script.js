    const toggleButton = document.getElementById('toggle-button');
    const navBar = document.getElementById('header-right-nav-bar');
    const navLinks = navBar.querySelectorAll('a');

    // Toggle menu on button click
    toggleButton.addEventListener('click', function () {
        navBar.classList.toggle('show');
    });

    // Hide menu when any link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navBar.classList.remove('show');
        });
    });
