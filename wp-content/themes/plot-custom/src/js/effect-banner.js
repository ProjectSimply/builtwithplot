// Import necessary libraries
import ogl from './libs/ogl.js';

// Define the size of the image
const imgSize = [1700, 1133]; 

let started = false

// Get the canvas wrapper element
const wraps = document.querySelectorAll('.plotEffectBanner'); 

wraps.forEach(wrap => {


    let assetsToLoad = 1


    // Check if the device is touch-capable
    const isTouchCapable = "ontouchstart" in window;

    // Vertex shader code for rendering
    const vertex = `
        attribute vec2 uv;
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = vec4(position, 0, 1);
        }
    `;

    // Fragment shader code for rendering
    const fragment = `
        precision highp float;
        precision highp int;
        uniform sampler2D tBackground; 
        uniform sampler2D tBackground2; 
        uniform sampler2D tLogo; 
        uniform sampler2D tFlow;
        varying vec2 vUv;
        uniform vec4 res; 
        uniform float mouseX;


        void main() {
            // Get the flow values from the flowmap texture
            vec3 flow = texture2D(tFlow, vUv).rgb;

            // Calculate the UV coordinates and apply flow offsets
            vec2 uv = 0.5 * gl_FragCoord.xy / res.xy;
            vec2 myUV = (uv - vec2(0.5)) * res.zw + vec2(0.5);

            myUV -= flow.xy * (0.6 * 0.7);

            // Calculate two more UV coordinates for the gree & blue channels
            vec2 myUV2 = (uv - vec2(0.5)) * res.zw + vec2(0.5);
            myUV2 -= flow.xy * (-0.2 * 0.7);
            vec2 myUV3 = (uv - vec2(0.5)) * res.zw + vec2(0.5);
            myUV3 -= flow.xy * (0.8 * 0.7);


            vec2 myUV21 = (uv - vec2(0.5)) * res.zw + vec2(0.5);
            myUV21 -= flow.xy * (0.6 * 0.3);

            // Calculate two more UV coordinates for the gree & blue channels
            vec2 myUV22 = (uv - vec2(0.5)) * res.zw + vec2(0.5);
            myUV22 -= flow.xy * (-0.4 * 0.9);
            vec2 myUV23 = (uv - vec2(0.5)) * res.zw + vec2(0.5);
            myUV23 -= flow.xy * (0.4 * 0.2);

            // Get color values from the background texture for each UV coordinate
            vec3 tex = texture2D(tBackground, myUV).rgb;
            vec3 tex2 = texture2D(tBackground, myUV2).rgb;
            vec3 tex3 = texture2D(tBackground, myUV3).rgb;

            // Get color values from the background texture for each UV coordinate
            vec3 tex21 = texture2D(tBackground2, myUV21).rgb;
            vec3 tex22 = texture2D(tBackground2, myUV22).rgb;
            vec3 tex23 = texture2D(tBackground2, myUV23).rgb;

            // Combine tBackground2 (with flow applied) with tBackground (with flow applied)
            vec4 blendedColor = mix(vec4(tex.r, tex2.g, tex3.b, 1.0), vec4(tex21.r, tex22.g, tex23.b, 1.0), 0.5);
        
            gl_FragColor = blendedColor;
            
            
        }
    `;

    // Initialize the rendering process
    const init = () => {
        // Create a WebGL renderer
        const renderer = new ogl.Renderer({ dpr: 2 });
        const gl = renderer.gl;

        // Append the canvas to the wrapper element
        wrap.appendChild(gl.canvas);

        // Initialize height and flag for updating style
        let h = wrap.clientHeight * 1;

        // Aspect ratio variable
        let aspect = 2;

        // Mouse position and velocity vectors
        const mouse = new ogl.Vec2(-1);
        const velocity = new ogl.Vec2();

        // Function to resize the canvas and update the aspect ratio
        function resize() {
            let a1, a2;
            const imageAspect = imgSize[1] / imgSize[0];

            if (h / wrap.clientWidth < imageAspect) {
                a1 = 1;
                a2 = h / wrap.clientWidth / imageAspect;
            } else {
                a1 = (wrap.clientWidth / h) * imageAspect;
                a2 = 1;
            }

            h = wrap.clientHeight * 1;
            
            mesh.program.uniforms.res.value = new ogl.Vec4(wrap.clientWidth, h, a1, a2);

        
            renderer.setSize(wrap.clientWidth, h);
            aspect = wrap.clientWidth / h;
        }

        // Create a flowmap for fluid simulation
        const flowmap =new ogl.Flowmap(gl, { size: 512, falloff: 0.4, dissipation: 0.99 });

        // Define the geometry of a triangle for rendering
        const geometry = new ogl.Geometry(gl, {
            position: {
                size: 2,
                data: new Float32Array([-1, -1, 3, -1, -1, 3]),
            },
            uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
        });

        // Create a texture for the background image
        const texture = new ogl.Texture(gl, {
            minFilter: gl.LINEAR,
            magFilter: gl.LINEAR,
        });

        // Load the image and set it as the texture
        const img = new Image();
        let loaded = 0;


        img.onload = () => {
            texture.image = img;
            loaded++;
            console.log(loaded,assetsToLoad)
            if(loaded == assetsToLoad) {
                begin()
                

            }
        };
        img.crossOrigin = "Anonymous";
        img.src = wrap.dataset.bg;

        // Load the image 2 and set it as the texture
        const img2 = new Image();

        const texture2 = new ogl.Texture(gl, {
            minFilter: gl.LINEAR,
            magFilter: gl.LINEAR,
        });

        img2.onload = () => {
            texture2.image = img2;
            loaded++;
            if(loaded == assetsToLoad) {
                begin()

            }
        };
        img2.crossOrigin = "Anonymous";
        img2.src = wrap.dataset.bgAlt;
        
        let mouseX = 0.5;

        // Calculate aspect ratio for the image
        let a1, a2;
        const imageAspect = imgSize[1] / imgSize[0];
        if (h / wrap.clientWidth < imageAspect) {
            a1 = 1;
            a2 = h / wrap.clientWidth / imageAspect;
        } else {
            a1 = (wrap.clientWidth / h) * imageAspect;
            a2 = 1;
        }




        // Create a rendering program with shaders and uniforms
        const program = new ogl.Program(gl, {
            vertex,
            fragment,
            uniforms: {
                uTime: { value: 0 },
                tBackground: { value: texture },
                tBackground2: { value: texture2 },
                mouseX : {value : mouseX},
                res: { value: new ogl.Vec4(wrap.clientWidth, h, a1, a2) },
                img: { value: new ogl.Vec2(imgSize[0], imgSize[1]) },
                tFlow: flowmap.uniform,
            },
        });

        // Create a mesh for rendering the triangle
        const mesh = new ogl.Mesh(gl, { geometry, program });

    
        function begin() {

            // Add event listener for window resize
            window.addEventListener("resize", resize, false);

            setTimeout(()=>{
                // Call resize function initially
                resize();
                // document.body.classList.remove('hideBanner');
            }, 100)

            // Add mouse movement event listener if not touch-capable
            if (!isTouchCapable) {
                window.addEventListener("mousemove", updateMouse, false);
            }

            // Track the scroll position and handle banner visibility
            let scrollPosition = window.scrollY;

            window.addEventListener('wheel', () => {
                scrollPosition = window.scrollY;

                if (scrollPosition < h && disabled == true) {
                    disabled = false;
                    
                    requestAnimationFrame(update);
                }
            });

            // Variables for tracking time and whether the animation is disabled
            let lastTime;
            let disabled = false;
            const lastMouse = new ogl.Vec2();

            // Function to handle mouse movement and velocity calculation
            function updateMouse(e) {
                if (scrollPosition <= h) {
                    if (e.changedTouches && e.changedTouches.length) {
                        e.x = e.changedTouches[0].pageX;
                        e.y = e.changedTouches[0].pageY;
                    }

                    if (e.x === undefined) {
                        e.x = e.pageX;
                        e.y = e.pageY;
                    }
                    // Calculate the adjusted mouse position considering the scroll position
                    const adjustedY = e.y + scrollPosition;

                    // Set mouse position in 0 to 1 range
                    mouse.set(e.x / gl.renderer.width, 1.0 - adjustedY / gl.renderer.height);

                    // Calculate mouse velocity
                    if (!lastTime) {
                        lastTime = performance.now();
                        lastMouse.set(e.x, adjustedY);
                    }

                    const deltaX = e.x - lastMouse.x;
                    const deltaY = adjustedY - lastMouse.y;

                    if (deltaX != 0 && deltaY != 0) {
                        lastMouse.set(e.x, adjustedY);

                        let time = performance.now();
                        let delta = Math.max(10.4, time - lastTime);
                        lastTime = time;
                        velocity.x = (deltaX / delta);
                        velocity.y = (deltaY / delta);
                        velocity.needsUpdate = true;
                    }
                }
            }

            // Handle mobile devices with touch support
            if (isTouchCapable) {
                const src = wrap.dataset.bg;
                wrap.classList.add('mobileFadeIn');
                wrap.style.backgroundImage = `url(${src})`;
            } else {
                // Start the animation loop
                requestAnimationFrame(update);
            }

            function customLerp(current, target, speed) {
                // Calculate the difference between the current and target values
                const diff = target - current;
            
                // Use the absolute value of the velocity to determine if it's increasing or decreasing
                const absVelocity = Math.abs(diff);
            
                // Define a threshold to distinguish between speeding up and slowing down
                const threshold = 0.001;
            
                // Use a different lerp speed depending on the velocity direction
                if (absVelocity > threshold) {
                    // Speed up when the velocity is increasing
                    return current + diff * speed;
                } else {
                    // Slow down when the velocity is decreasing or close to zero
                    return current + diff * (speed / 10);
                }
            }

            // Animation loop function
            function update(t) {
                if (scrollPosition <= h) {

                    // Reset velocity when mouse is not moving
                    if (!velocity.needsUpdate) {
                        velocity.set(0);
                    }
                    velocity.needsUpdate = false;

                    // Update the flowmap inputs
                    flowmap.aspect = aspect;
                    flowmap.mouse.copy(mouse); 
                    
                    if(mesh.program.uniforms.mouseX != mouse.x)
                        mesh.program.uniforms.mouseX.value = mouse.x >= 0 ? mouse.x : 0.5
                    flowmap.velocity.x = customLerp(flowmap.velocity.x, velocity.x, 0.05);
                    flowmap.velocity.y = customLerp(flowmap.velocity.y, velocity.y, 0.02);
                    flowmap.update();

                    // Render the mesh
                    renderer.render({ scene: mesh });

                    // Continue the animation loop
                    requestAnimationFrame(update);


                    if(started === false) {
                        started = true;
                        document.body.classList.add('canvasLoaded');
                    }

                } else {
                    // Hide the banner and disable animation
                    if (disabled == false) {
                        disabled = true;
                        document.body.classList.add('hideBanner');
                    }
                }
            }
        }
    };
    

    init()

    console.log(wrap)

    
})

