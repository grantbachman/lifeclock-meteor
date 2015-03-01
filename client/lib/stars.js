var camera, scene, renderer, geometry, material, particles = [];

init = function() {

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 2, 2000);
  camera.position.z = 500;

  // Need to use CanvasRenderer because you can't draw Sprites using WebGL.
  renderer = new THREE.CanvasRenderer( { alpha: true} );
  renderer.setSize(window.innerWidth, window.innerHeight);
  windowResize(renderer, camera);
  document.getElementById('content').appendChild(renderer.domElement);

  material = new THREE.SpriteCanvasMaterial( {
                  color: 0xffffff,
                  program: function(context) { 
                    context.beginPath();
                    context.arc(0, 0, 1, 0, Math.PI * 2, true);
                    context.fill();
                  }
            });

  max = 1000;
  min = -1000;
  for (var i=0; i < 750; i++) {
    particle = new THREE.Sprite(material); 
    particle.position.x = Math.random() * 1000 - 250;
    particle.position.y = Math.random() * 1000 - 250;
    particle.position.z = Math.floor(Math.random() * (max - min)) + min;
    particles.push(particle)
    scene.add(particle);
  }
  
  animate();
}

animate = function() {
  requestAnimationFrame(animate);
  updatePoints()
}
function updatePoints() {
  for (var i = 0; i < particles.length; i++) {
    particle = particles[i];
    particle.position.z += 0.15;
    if (particle.position.z >= 1000) particle.position.z = -1000;
  }
  renderer.render(scene, camera);
}

/*   HANDLE  WINDOW RESIZING   */
function windowResize(renderer, camera){
	var callback	= function(){
		// notify the renderer of the size change
		renderer.setSize( window.innerWidth, window.innerHeight );
		// update the camera
		camera.aspect	= window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	}
	// bind the resize event
	window.addEventListener('resize', callback, false);
	// return .stop() the function to stop watching window resize
	return {
		/**
		 * Stop watching window resize
		*/
		stop	: function(){
			window.removeEventListener('resize', callback);
		}
	};
}
