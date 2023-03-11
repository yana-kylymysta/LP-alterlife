const menuIcon = document.querySelector('.menu__icon-mob');
const menuBody = document.querySelector('.menu');
const menuItems = document.querySelectorAll('.menu__item');

if(menuIcon) {
    menuIcon.addEventListener('click', () => {
        document.body.classList.toggle('lock');
        menuIcon.classList.toggle('active');
        menuBody.classList.toggle('active-mob');
    })
}

menuItems.forEach(el => {
    el.addEventListener('click', ({currentTarget}) => {
        console.log(currentTarget);
        console.log(currentTarget.parentNode)
        if(currentTarget.parentNode.matches('.active-mob')) {
            document.body.classList.remove('lock');
            menuIcon.classList.remove('active');
            menuBody.classList.remove('active-mob');
        }
    })
})