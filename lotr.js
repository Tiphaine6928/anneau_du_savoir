document.addEventListener('DOMContentLoaded', function () {
    var buttons = document.querySelectorAll('.toggle-button');
    
    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            var content = this.nextElementSibling;
            var allContents = document.querySelectorAll('.content');
            
            allContents.forEach(function (el) {
                if (el !== content) {
                    el.style.display = 'none'; // Masquer tous les autres contenus
                }
            });
            
            content.style.display = (content.style.display === 'block') ? 'none' : 'block';
        });
    });
});


