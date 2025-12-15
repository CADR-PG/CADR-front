import { Component } from "../Component";

export class Camera implements Component{
    name = 'camera';

    constructor(
        public fov = 50,
        public aspect = 1,
        public near = 0.1,
        public far = 2000
    ){}
}