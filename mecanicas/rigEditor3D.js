import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/OrbitControls.js";

export function iniciarRigEditor3D(contenedor) {

    contenedor.innerHTML = "";

    const escena = new THREE.Scene();
    escena.background = new THREE.Color(0x111111);

    const camara = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.01,
        100
    );

    camara.position.set(0, 1, 3);

    const renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    contenedor.appendChild(
        renderer.domElement
    );


    // LUZ
    escena.add(
        new THREE.HemisphereLight(
            0xffffff,
            0x444444,
            2
        )
    );


    // CONTROLES
    const controles =
        new OrbitControls(
            camara,
            renderer.domElement
        );

    controles.enableDamping = true;

    controles.target.set(
        0,
        0.7,
        0
    );


    // DIAGNÓSTICO
    const panel =
        document.createElement("div");

    Object.assign(panel.style, {
        position: "fixed",
        top: "10px",
        left: "10px",
        zIndex: "10",
        padding: "10px",
        width: "230px",
        background: "rgba(0,0,0,.85)",
        color: "white",
        borderRadius: "10px",
        fontFamily: "Arial",
        fontSize: "13px"
    });

    panel.textContent =
        "⏳ Cargando Micaela...";

    contenedor.appendChild(panel);


    // CARGAR MICAELA
    const loader =
        new GLTFLoader();

    loader.load(

        "../3D/micaela.glb",

        gltf => {

            const modelo =
                gltf.scene;

            modelo.position.set(
                0,
                0,
                0
            );

            escena.add(modelo);


            let meshes = 0;
            let skinned = 0;
            let huesos = [];


            modelo.traverse(
                objeto => {

                    if (objeto.isMesh) {
                        meshes++;
                    }

                    if (
                        objeto.isSkinnedMesh
                    ) {

                        skinned++;

                        if (
                            objeto.skeleton
                        ) {

                            objeto.skeleton.bones
                                .forEach(
                                    bone => {

                                        huesos.push(
                                            bone.name
                                        );
                                    }
                                );
                        }
                    }
                }
            );


            panel.innerHTML = `
                <b>🦴 GAMERPRO RIG</b>
                <br><br>
                🧍 Micaela: ✅
                <br>
                🧩 Meshes: ${meshes}
                <br>
                🦴 SkinnedMesh: ${skinned}
                <br>
                💀 Huesos: ${huesos.length}
            `;

            if (huesos.length > 0) {

                panel.innerHTML +=
                    "<hr><b>Huesos reales:</b><br>" +
                    huesos.slice(0, 15).join("<br>");

                if (huesos.length > 15) {
                    panel.innerHTML +=
                        "<br>...";
                }
            }

        },

        undefined,

        error => {

            panel.innerHTML = `
                <b>❌ ERROR</b>
                <br><br>
                No se pudo cargar
                micaela.glb.
            `;
        }
    );


    // RESIZE
    function ajustar() {

        camara.aspect =
            window.innerWidth /
            window.innerHeight;

        camara.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    }

    window.addEventListener(
        "resize",
        ajustar
    );


    // LOOP
    function animar() {

        requestAnimationFrame(
            animar
        );

        controles.update();

        renderer.render(
            escena,
            camara
        );
    }

    animar();
}
