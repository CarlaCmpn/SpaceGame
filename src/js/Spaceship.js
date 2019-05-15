import * as THREE from 'three'
import {MTLLoader, OBJLoader} from 'three-obj-mtl-loader' 
import objetSource from '../objets/vaisseau.obj'
import textureSource from '../objets/vaisseau.mtl'
// import audio from '../sounds/gems.mp3'

export default class Spaceship
{
    constructor(_options)
    {
        this.renderer = _options.renderer
        this.scene = _options.scene
        this.camera = _options.camera
        this.posiPlanets = _options.posiPlanets
        this.posiGems = _options.posiGems

        this.container = new THREE.Object3D()

        this.setSpaceship()
        this.setNavigation()
        this.setGame()
    }  

    setSpaceship()
    {
        this.spaceship = {}
        this.spaceship.mtlLoader = new MTLLoader();
        this.spaceship.objLoader = new OBJLoader();
 
        this.spaceship.mtlLoader.load(textureSource, (materials) => 
        {
            materials.preload()
            this.spaceship.objLoader.setMaterials(materials)
            this.spaceship.objLoader.load(objetSource, (object) => 
            {
                this.object = object
                this.container.add(object)
                this.object.rotateX(5)
                this.object.rotateY(10)
                this.object.position.x = 0
                this.object.position.z = 0
                this.object.position.y = 0
            })
        })
    }

    setGame()
    {
        this.game = {}
    
        this.game.container = document.createElement('div')
        this.game.container.classList.add('game')
        document.body.appendChild(this.game.container)

        this.game.title = document.createElement('h1')
        this.game.title.classList.add('title')
        this.game.title.textContent = "bienvenue dans la première course en vaisseau, êtes-vous prêt à relever le défi ?"
        this.game.container.appendChild(this.game.title)

        this.game.instructions = document.createElement('p')
        this.game.instructions.classList.add('instructions')
        this.game.instructions.textContent = "le but du jeu est de finir la course en évitant les planètes. passer dans les cercles verts vous permet d'augmenter votre score. bon courage !"
        this.game.container.appendChild(this.game.instructions)

        this.game.button_start = document.createElement('a')
	    this.game.button_start.classList.add('button-start')
        this.game.container.appendChild(this.game.button_start)
        this.game.button_start.textContent = "start"

        this.game.touch = document.createElement('span')
        this.game.touch.classList.add('touch')
        this.game.touch.textContent = "utiliser les fleches du clavier pour diriger votre vaisseau spatial. le jeu se lance au bout de 3 secondes."
        this.game.container.appendChild(this.game.touch)

        this.game.button_start.addEventListener('click', () =>
        {
            this.game.container.classList.add('translation')
            setTimeout(() => 
            {
                this.setAnimation() 
            }, 3000);
        })
    }

    setNavigation()
    {
        this.directions = {}
        this.directions.left = false,
        this.directions.up = false,
        this.directions.down = false,
        this.directions.up = false

        window.addEventListener('keydown', (_event) =>
        {
            switch (_event.keyCode) 
            {
                case 37:
                    this.directions.left = true;
                break;

                case 38:
                    this.directions.up = true;
                break;

                case 39:
                    this.directions.right = true;
                break;

                case 40:
                    this.directions.down = true;
                break;
            }
        })

        window.addEventListener('keyup', (_event) =>
        {
            switch (_event.keyCode) 
            {
                case 37:
                    this.directions.left = false;
                break;

                case 38:
                    this.directions.up = false;
                break;

                case 39:
                    this.directions.right = false;
                break;

                case 40:
                    this.directions.down = false;
                break;
            }
        })
    }

    navigationSpaceship() 
    {
               
        /**
         * Limites
        */
        
        if(this.object.position.x >= 3.5)
        {
            this.object.position.x = 3.5
        }

        if(this.object.position.x <= -3.5)
        {
            this.object.position.x = -3.5
        }

        if(this.object.position.y >= 2)
        {
            this.object.position.y = 2
        }

        if(this.object.position.y <= -2)
        {
            this.object.position.y = -2
        }

        /**
         * Speed init
         */

        this.camera.position.z += -2
        this.object.position.z += -2

        /**
         * Navigation
         */

        if(this.directions.up === true)
        {
            this.object.position.y += 0.1
        }

        if(this.directions.down === true)
        {
            this.object.position.y += -0.1
        } 

        if(this.directions.left === true)
        {
            this.object.position.x += -0.1
        }

        if(this.directions.right === true)
        {
            this.object.position.x += 0.1
        }   
    }

    setAnimation()
    {
        this.distances = {}
        this.distances.score = 1000
        // this.distances.sound = document.querySelector('.sound')
        // this.distances.sound.setAttribute("src", audio)
        
        const animate = () =>
        {
            window.requestAnimationFrame(animate)

            this.navigationSpaceship()

            for (let i = 0; i < 600; i++)
            {
                this.distances.ecartZ = this.object.position.z - this.posiPlanets[i].z
                this.distances.ecartX = this.object.position.x - this.posiPlanets[i].x
                this.distances.ecartY = this.object.position.y - this.posiPlanets[i].y
            
                if (this.distances.ecartZ <= 2.5 && this.distances.ecartZ >= -2.5 && this.distances.ecartX >= -2.5 && this.distances.ecartX <= 2.5 && this.distances.ecartY >= -2.5 && this.distances.ecartY <= 2.5) 
                {
                    this.setLose()
                    delete this.object.position.z
                    delete this.camera.position.z 
                }
                
                else if(this.object.position.z == -5000)
                {
                    this.setWin()
                    delete this.object.position.z
                    delete this.camera.position.z
                }
            } 

            for (let i = 0; i < 300; i++)
            {
                this.distances.ecartZ_2 = this.object.position.z - this.posiGems[i].z
                this.distances.ecartX_2 = this.object.position.x - this.posiGems[i].x
                this.distances.ecartY_2 = this.object.position.y - this.posiGems[i].y

                if (this.distances.ecartZ_2 <= 3 && this.distances.ecartZ_2 >= -3 && this.distances.ecartX_2 >= -3 && this.distances.ecartX_2 <= 3 && this.distances.ecartY_2 >= -3 && this.distances.ecartY_2 <= 3) 
                {
                    this.distances.score += 50
                    // this.distances.sound.play()
                }
            }
        }      
        animate()
    }

    setWin()
    {
        this.win = {}

        this.win.container = document.createElement('div')
        this.win.container.classList.add('win')
        document.body.appendChild(this.win.container)

        this.win.title_2 = document.createElement('p')
        this.win.title_2.classList.add('title-2')
        this.win.title_2.textContent = "tu as gagné !"
        this.win.container.appendChild(this.win.title_2)

        this.win.score = document.createElement('p')
        this.win.score.classList.add('score')
        this.win.container.appendChild(this.win.score)
        this.win.score.textContent = 'ton score est de '+this.distances.score+' points'

        this.win.button_start = document.createElement('a')
	    this.win.button_start.classList.add('button-start')
        this.win.container.appendChild(this.win.button_start)
        this.win.button_start.textContent = "revenir à l'accueil"

        this.win.button_start.addEventListener('click', () =>
        {
            this.win.container.classList.add('translation')
            {
                document.location.reload(true)
            }
        })
    }

    setLose()
    {
        this.lose = {}

        this.lose.container = document.createElement('div')
        this.lose.container.classList.add('lose')
        document.body.appendChild(this.lose.container)

        this.lose.title_3 = document.createElement('p')
        this.lose.title_3.classList.add('title-3')
        this.lose.title_3.textContent = "tu as perdu, retente ta chance !"
        this.lose.container.appendChild(this.lose.title_3)

        this.lose.button_start = document.createElement('a')
	    this.lose.button_start.classList.add('button-start')
        this.lose.container.appendChild(this.lose.button_start)
        this.lose.button_start.textContent = "revenir à l'accueil"

        this.lose.button_start.addEventListener('click', () =>
        {
            this.lose.container.classList.add('translation')
            {
                document.location.reload(true)
            }
        })
    }
}





