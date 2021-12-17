precision mediump float;

uniform float uTime;
uniform vec3 color1;
uniform vec3 color2;

varying vec2 vUv;

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define NUM_OCTAVES 5

float fbm(in vec2 strength) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);

     mat2 rot = mat2(cos(0.5), sin(0.5),
                    -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(strength);
        strength = rot * strength * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

void main() {
    vec3 color = vec3(0.0, 0.0, 0.0);
    vec2 strength = vUv;

    vec2 q = vec2(0.0);
    q.x = fbm(strength);
    q.y = fbm(strength + vec2(1.0));

    vec2 r = vec2(0.0);
    r.x = fbm(strength + q + uTime * 0.05);
    r.y = fbm(strength + q + uTime * 0.05);

    float f = fbm(strength + r);

    color = mix(color1,
                color2,
                clamp((f*f)*4.0,0.0,1.0));

    color = mix(color,
                vec3(0.0),
                clamp(length(q),0.0,1.0));

    gl_FragColor = vec4((f*f*f+.6*f*f+.5*f)*color,1.0);
}