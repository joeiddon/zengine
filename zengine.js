/*
 zengine.js - 3D Rendering Software designed to work with the HTML5 Canvas
 Copyright (c) 2018 Joe Iddon. All right reserved.

 This library is free software; you are free to redistribute it and/or
 modify it provided appropriate credit is given to the original author.

 GitHub Repository:
 https://github.com/RoadKillCat/3dSimulationVR/

 Author's website:
 http://joeiddon.me/
*/

'use strict';

let zengine = {
    render: function(world, cam, canvas, wireframe, horizon){
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //unit vector for cam
        let cam_vect = {x: Math.sin(this.to_rad(cam.yaw)) * Math.cos(this.to_rad(cam.pitch)),
                        y: Math.cos(this.to_rad(cam.yaw)) * Math.cos(this.to_rad(cam.pitch)),
                        z: Math.sin(this.to_rad(cam.pitch))}

        //temporary inclusion until all current uses are updated to include unit vects
        let has_vects = world[0].vect != undefined;

        //add a distance to cam attribute to each face for ordering
        //and for removing those faces which are further than the vision horizon
        for (var f = 0; f < world.length; f++){
            world[f].dist = this.distance(cam, this.centroid(world[f].verts));
        }

        //only keep faces that are:
        // - before the horizon
        // - facing the camera
        // - have at least one vertex in front of camera.
        world = world.filter(f =>
            (!horizon || world[f].dist < horizon) &&
            (wireframe || (has_vects && this.dot_prod(cam_vect, f.vect) < 0)) &&
            f.verts.some(c => this.dot_prod({x: c.x-cam.x,
                                             y: c.y-cam.y,
                                             z: c.z-cam.z}, cam_vect) > 0));


        //order the faces in the world (furthest to closest)
        if (!wireframe) world.sort((a, b) => b.dist - a.dist);

        for (let f = 0; f < world.length; f++){
            //align 3d coordinates to camera view angle
            let acs = world[f].verts.map(this.translate(-cam.x, -cam.y, -cam.z))
                                    .map(this.z_axis_rotate(this.to_rad(cam.yaw)))
                                    .map(this.y_axis_rotate(this.to_rad(cam.roll)))
                                    .map(this.x_axis_rotate(this.to_rad(cam.pitch)))
                                    .map(this.translate(cam.x, cam.y, cam.z));

            //convert the 3d coordinates to yaw, pitch angles from cam center line
            let cas = acs.map(c => ({y: this.to_deg(Math.atan2(c.x - cam.x, c.y - cam.y)),
                                     p: this.to_deg(Math.atan2(c.z - cam.z, c.y - cam.y))}));

            //convert angles to 2d canvas coordinates
            let cos = cas.map(a => ({x: canvas.width/2  + (a.y * (canvas.width/cam.fov)),
                                     y: canvas.height/2 - (a.p * (canvas.width/cam.fov))}));

            //draw the face on the canvas
            ctx.strokeStyle = wireframe ? 'white' : 'black';
            ctx.beginPath();
            ctx.moveTo(cos[0].x, cos[0].y);
            for (let i = 1; i < cos.length; i++){
                ctx.lineTo(cos[i].x, cos[i].y);
            }
            ctx.closePath(); ctx.stroke();
            if (!wireframe){
                if (has_vects){
                    let c = world[f].col.split(',');
                    c[2] = (parseInt(c[2]) * -this.dot_prod(cam_vect, world[f].vect)).toString() + '%)';
                    ctx.fillStyle = c.join(',');
                } else {
                    ctx.fillStyle = world[f].col;
                }
                ctx.fill();
            }
        }
    },

    centroid: function(verts){
        let l = verts.length;
        let c = {x: 0, y: 0, z: 0};
        for (let i = 0; i < l; i++)
        for (let k in c) c[k] += verts[i][k];
        return {x: c.x/l, y: c.y/l, z: c.z/l};
    },

    dot_prod: (v1, v2) => v1.x * v2.x + v1.y * v2.y + v1.z * v2.z,
    translate: (x, y, z) => (v => ({x: v.x + x, y: v.y + y, z: v.z + z})),
    to_deg: (r) => r * (180 / Math.PI),
    to_rad: (d) => d * (Math.PI / 180),
    distance: (c1, c2) => Math.sqrt((c2.x - c1.x)**2 + (c2.y - c1.y)**2 + (c2.z - c1.z)**2),
    x_axis_rotate: (r) => (v => ({x:  v.x,
                                  y:  v.y * Math.cos(r) + v.z * Math.sin(r),
                                  z: -v.y * Math.sin(r) + v.z * Math.cos(r)})),
    y_axis_rotate: (r) => (v => ({x:  v.x * Math.cos(r) + v.z * Math.sin(r),
                                  y:  v.y,
                                  z: -v.x * Math.sin(r) + v.z * Math.cos(r)})),
    z_axis_rotate: (r) => (v => ({x:  v.x * Math.cos(r) - v.y * Math.sin(r),
                                  y:  v.x * Math.sin(r) + v.y * Math.cos(r),
                                  z:  v.z}))
};
