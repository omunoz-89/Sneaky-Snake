const canvas = document.querySelector('#game');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let title = canvas.getContext('2d');

title.font = "100px 'Bebas Neue', cursive" ;
title.fillStyle = 'white'
title.textAlign = 'center';
title.fillText('Sneaky Snake', canvas.width/2, canvas.height/2)

