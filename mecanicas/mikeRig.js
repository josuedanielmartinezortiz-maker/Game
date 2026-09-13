import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js";

export async function iniciarMikeRig(contenedor) {
    contenedor.innerHTML = "";

    const escena = new THREE.Scene();
    escena.background = new THREE.Color(0x101010);

    const camara = new THREE.PerspectiveCamera(
        45, innerWidth / innerHeight, .01, 100
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(innerWidth, innerHeight);
    contenedor.appendChild(renderer.domElement);

    escena.add(new THREE.HemisphereLight(0xffffff, 0x444444, 2.5));

    const luz = new THREE.DirectionalLight(0xffffff, 2);
    luz.position.set(3, 5, 4);
    escena.add(luz);

    // =====================================================
    // MODELO
    // =====================================================

    const gltf = await new GLTFLoader().loadAsync("../3D/mike1.glb");
    const modelo = gltf.scene;

    modelo.updateMatrixWorld(true);

    const caja = new THREE.Box3().setFromObject(modelo);
    const centro = caja.getCenter(new THREE.Vector3());
    const tam = caja.getSize(new THREE.Vector3());
    const H = tam.y;

    modelo.position.set(
        -centro.x,
        -caja.min.y,
        -centro.z
    );

    const personaje = new THREE.Group();
    personaje.name = "Mike_Character";
    personaje.add(modelo);
    escena.add(personaje);

    // =====================================================
    // RIG
    // =====================================================

    const rig = new THREE.Group();
    rig.name = "Mike_Rig";
    personaje.add(rig);

    const bones = [];
    const B = {};

    const bone = (n, p, x, y, z) => {
        const b = new THREE.Bone();
        b.name = n;
        b.position.set(x, y, z);
        p.add(b);
        bones.push(b);
        B[n] = b;
        return b;
    };

    const root = bone("Root", rig, 0, 0, 0);
    const hips = bone("Hips", root, 0, H * .43, 0);

    let p = hips;

    for (let i = 1; i <= 5; i++)
        p = bone(`Spine_${i}`, p, 0, H * .015, 0);

    const chest = bone("Chest", p, 0, H * .055, 0);
    const neck = bone("Neck", chest, 0, H * .065, 0);
    const head = bone("Head", neck, 0, H * .085, 0);

    bone("Skull", head, 0, H * .045, 0);

    function brazo(n, s) {
        const sh = bone(n+"Shoulder", chest, s*H*.105, H*.015, 0);
        const a = bone(n+"Arm", sh, s*H*.085, -H*.005, 0);
        const f = bone(n+"ForeArm", a, s*H*.075, -H*.07, 0);
        bone(n+"Hand", f, s*H*.045, -H*.055, 0);
    }

    brazo("Left", -1);
    brazo("Right", 1);

    function pierna(n, s) {
        const u = bone(n+"UpLeg", hips, s*H*.055, -H*.01, 0);
        const l = bone(n+"Leg", u, 0, -H*.16, 0);
        const a = bone(n+"Ankle", l, 0, -H*.16, 0);
        bone(n+"Foot", a, 0, -H*.035, H*.035);
    }

    pierna("Left", -1);
    pierna("Right", 1);

    rig.updateMatrixWorld(true);

    const skeleton = new THREE.Skeleton(bones);

    // =====================================================
    // SKINNING CORPORAL
    // =====================================================

    const permitidos = [
        "Hips",
        "Spine_1","Spine_2","Spine_3","Spine_4","Spine_5",
        "Chest","Neck","Head",
        "LeftShoulder","LeftArm","LeftForeArm","LeftHand",
        "RightShoulder","RightArm","RightForeArm","RightHand",
        "LeftUpLeg","LeftLeg","LeftAnkle","LeftFoot",
        "RightUpLeg","RightLeg","RightAnkle","RightFoot"
    ];

    const usados = permitidos.map(n => B[n]).filter(Boolean);
    const ids = usados.map(b => bones.indexOf(b));

    modelo.traverse(mesh => {
        if (!mesh.isMesh) return;

        const g = mesh.geometry.clone();
        const pos = g.attributes.position;
        const si = [];
        const sw = [];

        for (let i = 0; i < pos.count; i++) {
            const v = new THREE.Vector3().fromBufferAttribute(pos, i);

            const c = usados.map((b,j) => ({
                id: ids[j],
                d: v.distanceToSquared(b.position)
            })).sort((a,b) => a.d-b.d).slice(0,4);

            let suma = 0;

            c.forEach(x => {
                x.w = 1 / (Math.sqrt(x.d) + .01);
                suma += x.w;
            });

            for (let j = 0; j < 4; j++) {
                si.push(c[j]?.id ?? ids[0]);
                sw.push(c[j] ? c[j].w/suma : 0);
            }
        }

        g.setAttribute(
            "skinIndex",
            new THREE.Uint16BufferAttribute(si,4)
        );

        g.setAttribute(
            "skinWeight",
            new THREE.Float32BufferAttribute(sw,4)
        );

        const skinned = new THREE.SkinnedMesh(
            g,
            mesh.material
        );

        skinned.name = mesh.name + "_Skinned";
        skinned.bind(skeleton, mesh.matrixWorld);

        mesh.parent.add(skinned);
        mesh.visible = false;
    });

    // =====================================================
    // ANIMACIONES
    // =====================================================

    let animacion = "idle";
    let t = 0;

    const base = new Map(
        bones.map(b => [b.name, b.rotation.clone()])
    );

    const reset = () =>
        bones.forEach(b => b.rotation.copy(base.get(b.name)));

    const rot = (n,x=0,y=0,z=0) => {
        if (B[n]) B[n].rotation.set(
            B[n].rotation.x+x,
            B[n].rotation.y+y,
            B[n].rotation.z+z
        );
    };

    function animar(dt) {
        t += dt;
        reset();

        const s = Math.sin(
            t * (
                animacion === "correr" ? 13 :
                animacion === "caminar" ? 8 : 3
            )
        );

        if (animacion === "idle") {
            rot("Spine_3", Math.sin(t*2.5)*.025);
            rot("Head",0,0,Math.sin(t*1.5)*.02);
        }

        if (animacion === "caminar") {
            rot("LeftUpLeg",s*.4);
            rot("RightUpLeg",-s*.4);
            rot("LeftLeg",-Math.max(0,-s)*.2);
            rot("RightLeg",Math.max(0,s)*.2);
            rot("LeftArm",-s*.3);
            rot("RightArm",s*.3);
            rot("Spine_3",s*.025);
        }

        if (animacion === "correr") {
            rot("LeftUpLeg",s*.65);
            rot("RightUpLeg",-s*.65);
            rot("LeftLeg",-Math.max(0,-s)*.4);
            rot("RightLeg",Math.max(0,s)*.4);
            rot("LeftArm",-s*.5);
            rot("RightArm",s*.5);
            rot("Spine_3",-.10);
        }

        if (animacion === "saltar") {
            rot("LeftUpLeg",-.3);
            rot("RightUpLeg",-.3);
            rot("LeftLeg",.2);
            rot("RightLeg",.2);
            rot("LeftArm",-.45);
            rot("RightArm",-.45);
        }

        if (animacion === "recolectar") {
            rot("Spine_3",.15);
            rot("Hips",.08);
            rot("LeftArm",-.65);
            rot("RightArm",-.65);
            rot("Head",.1);
        }

        if (animacion === "cavar") {
            const g = Math.sin(t*9);
            rot("Spine_3",.12);
            rot("LeftArm",-.5-g*.35);
            rot("LeftForeArm",-g*.2);
        }

        if (animacion === "regar") {
            const g = Math.sin(t*5);
            rot("RightArm",-.5);
            rot("RightForeArm",g*.3);
            rot("LeftArm",-0.25);
        }
    }

    personaje.userData.animacion = n => animacion = n;
    personaje.userData.rig = rig;
    personaje.userData.skeleton = skeleton;
    personaje.userData.bones = B;
    personaje.userData.animar = animar;

    camara.position.set(0,H*.52,H*2.2);
    camara.lookAt(0,H*.5,0);

    const reloj = new THREE.Clock();

    function loop() {
        requestAnimationFrame(loop);
        animar(reloj.getDelta());
        renderer.render(escena,camara);
    }

    loop();

    return personaje;
        }
