const ffbetool = require('ffbetool');

function invokeFFBETool ({ animations, options }) {
  console.log(' -- child worker --', animations, options);
  if (animations !== null) {
    animations.forEach((name) => ffbetool(Object.assign({}, options, { animName: name })));
  } else {
    ffbetool(options);
  }

  process.send('completed');
}

process.on('message', invokeFFBETool);
