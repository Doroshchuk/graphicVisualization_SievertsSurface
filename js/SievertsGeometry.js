import {Geometry} from "./core/Geometry.js";
import {BufferGeometry} from "./core/BufferGeometry.js";
import {Float32BufferAttribute} from "./core/BufferAttribute.js";
import {Vector3} from "./math/Vector3.js";

export function SievertsGeometry( c ) {

    Geometry.call( this );

    this.type = 'SievertsGeometry';

    this.parameters = {
        c: c
    };

    this.fromBufferGeometry( new SievertsBufferGeometry( c ) );
    this.mergeVertices();

}

SievertsGeometry.prototype = Object.create( Geometry.prototype );
SievertsGeometry.prototype.constructor = SievertsGeometry;

// SievertsBufferGeometry

function SievertsBufferGeometry( c ) {

    BufferGeometry.call( this );

    this.type = 'SievertsBufferGeometry';

    this.parameters = {
        c: c
    };

    c = c || 1;

    // buffers

    var indices = [];
    var vertices = [];
    var normals = [];
    var uvs = [];

    // helper variables

    var center = new Vector3();
    var vertex = new Vector3();
    var normal = new Vector3();

    var u, v;

    // generate vertices, normals and uvs

    for ( v = 0; v <= Math.PI; v ++ ) {

        for ( u = - Math.PI / 2; u <= Math.PI / 2; u ++ ) {

            // vertex

            var phi = -(u / Math.sqrt(c + 1)) + Math.atan(Math.sqrt(c + 1) * Math.tan(u));
            var a = 2 / (c + 1 - c * Math.pow(Math.sin(v), 2) * Math.pow(Math.cos(u), 2));
            var r = a / Math.sqrt(c) * Math.sqrt((c + 1) * (1 + c * Math.pow(Math.sin(u), 2))) * Math.sin(v);

            vertex.x = r * Math.cos(phi);
            vertex.y = r * Math.sin(phi);
            vertex.z = (Math.log10(Math.tan(v / 2)) + a * (c + 1) * Math.cos(v)) / Math.sqrt(c);

            vertices.push( vertex.x, vertex.y, vertex.z );

            // normal

            center.x = Math.cos( u );
            center.y = Math.sin( u );
            normal.subVectors( vertex, center ).normalize();

            normals.push( normal.x, normal.y, normal.z );

            // uv

            uvs.push( u );
            uvs.push( v );
        }

    }

    // generate indices

    for ( v = 1; v <= 8; v ++ ) {
        for ( u = 1; u <= 6; u ++ ) {

            // indices

            var a = ( 8 + 1 ) * v + u - 1;
            var b = ( 8 + 1 ) * ( v - 1 ) + u - 1;
            var c = ( 8 + 1 ) * ( v - 1 ) + u;
            var d = ( 8 + 1 ) * v + u;

            // faces

            indices.push( a, b, d );
            indices.push( b, c, d );

        }
    }

    // build geometry

    this.setIndex( indices );
    this.addAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
    this.addAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
    this.addAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

}

SievertsBufferGeometry.prototype = Object.create( BufferGeometry.prototype );
SievertsBufferGeometry.prototype.constructor = SievertsBufferGeometry;

