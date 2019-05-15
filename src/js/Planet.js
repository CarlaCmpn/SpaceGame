import * as THREE from 'three'

export default class Planet
{
    constructor(_options)
    {
        this.container = new THREE.Object3D()
        this.setPlanets()
        this.setStars()
        this.setGems()
    }  

    setPlanets()
    {
        this.Group = {}
        this.Group = new THREE.Group();
        this.container.add(this.Group)

        this.planets = {}
        this.planets.tableau = []
        this.planets.colors = [0xe15f41, 0xc44569, 0x574b90, 0xf5cd79];
        this.rings = {}

        for(let i = 0; i < 600; i++)
        {
            this.Group.choice = Math.floor(Math.random() * 4);

            this.planets.geometry = new THREE.IcosahedronGeometry(3, 1);
            this.planets.material = new THREE.MeshPhongMaterial({
                color: this.planets.colors[Math.floor(Math.random() * this.planets.colors.length)],
                flatShading: THREE.FlatShading
            });
            this.planets.castShadow = true;
            this.planets.receiveShadow = true;
            this.planets.mesh = new THREE.Mesh(this.planets.geometry, this.planets.material)
            this.planets.mesh.position.x =  (Math.random() - 0.5) * 40
            this.planets.mesh.position.y = (Math.random() - 0.5) * 80
            this.planets.mesh.position.z = (Math.random() - 0.5) * 10000

            this.planets.tableau.push({
                x: this.planets.mesh.position.x,
                y: this.planets.mesh.position.y,
                z: this.planets.mesh.position.z,
            })
            this.Group.add(this.planets.mesh)
            
            if (this.Group.choice == 1) 
            {
                this.rings.geometry = new THREE.TorusGeometry(5, 0.5, 16, 6.3);
                this.rings.material = new THREE.MeshStandardMaterial({
                color: this.planets.colors[Math.floor(Math.random() * this.planets.colors.length)],
                    flatShading: THREE.FlatShading
                });
                this.rings.mesh = new THREE.Mesh(this.rings.geometry, this.rings.material);
                this.rings.mesh.position.x = this.planets.mesh.position.x
                this.rings.mesh.position.y = this.planets.mesh.position.y
                this.rings.mesh.position.z = this.planets.mesh.position.z
                this.rings.mesh.rotateX(80);
                this.rings.castShadow = true;
                this.rings.receiveShadow = true;
                
                this.Group.add(this.rings.mesh)
            }  
        }   
    }

    setStars()
    {
        this.stars = {}

        for(let i = 0; i < 2000; i++)
        {
            this.stars.geometry = new THREE.CircleGeometry( 0.1, 32 )
            this.stars.material = new THREE.MeshBasicMaterial({ 
                color: 0xffffff
            });
            this.stars.mesh = new THREE.Mesh(this.stars.geometry, this.stars.material);
            this.stars.mesh.position.x = (Math.random() - 0.5) * 80
            this.stars.mesh.position.y = (Math.random() - 0.5) * 80
            this.stars.mesh.position.z = (Math.random() - 0.5) * 10000
            this.Group.add(this.stars.mesh)
        }
    }

    setGems()
    {
        this.gems = {}
        this.gems.tableau = []

        for(let i = 0; i < 300; i++)
        {
            this.gems.geometry = new THREE.TorusBufferGeometry( 3, 0.5, 22, 200, 6.3);
            this.gems.material = new THREE.MeshBasicMaterial({ 
                color: 0x7bed9f,
                flatShading: THREE.FlatShading
            });
            this.gems.mesh = new THREE.Mesh(this.gems.geometry, this.gems.material);
            this.gems.mesh.rotateX(30);
            this.gems.mesh.position.x = (Math.random() - 0.5) * 80
            this.gems.mesh.position.y = (Math.random() - 0.5) * 80
            this.gems.mesh.position.z = (Math.random() - 0.5) * 10000
            this.gems.mesh.rotateX(30);
            this.gems.tableau.push({
                x: this.gems.mesh.position.x,
                y: this.gems.mesh.position.y,
                z: this.gems.mesh.position.z,
            })
            this.Group.add(this.gems.mesh)
        }
    }
}