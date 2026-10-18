import * as THREE from "three";

export const AtmosphereShader = {
  uniforms: {
    color: { value: new THREE.Color(0x38bdf8) },
    viewVector: { value: new THREE.Vector3(0, 0, 1) },
    coefficient: { value: 0.6 },
    power: { value: 3.5 },
  },
  vertexShader: `
    uniform vec3 viewVector;
    varying float vIntensity;
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec3 vView = normalize(normalMatrix * viewVector);
      vIntensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.8);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color;
    varying float vIntensity;
    void main() {
      vec3 glow = color * vIntensity;
      gl_FragColor = vec4(glow, vIntensity * 0.85);
    }
  `,
};
