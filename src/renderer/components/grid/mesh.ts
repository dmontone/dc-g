import * as THREE from 'three'
import { Component, Types } from "ecsy"

export class GridMeshComponent extends Component<GridMeshComponent> {
  static schema = {
    mesh: { type: Types.Ref }
  }
  mesh!: THREE.InstancedMesh
}