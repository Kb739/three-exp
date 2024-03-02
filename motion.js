import * as Three from "three"
class Pole extends Three.Mesh{
  constructor(geometry,material){
    super(geometry,material)
    this.rotationRate=-0.5;
    this.rotation.set(0,0,0.25)
  }
  update(deltaTime){
    this.rotateY(this.rotationRate*deltaTime);
  }
}
export default Pole
