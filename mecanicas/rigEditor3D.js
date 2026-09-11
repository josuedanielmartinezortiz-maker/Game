import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/OrbitControls.js";

export function iniciarRigEditor3D(contenedor) {

    // =====================================================
    // LIMPIAR EDITOR
    // =====================================================

    contenedor.innerHTML = "";

    // =====================================================
    // ESCENA
    // =====================================================

    const escena = new THREE.Scene();

    escena.background =
        new THREE.Color(0x111111);

    // =====================================================
    // CÁMARA
    // =====================================================

    const camara =
        new THREE.PerspectiveCamera(
            45,
            window.innerWidth /
            window.innerHeight,
            0.01,
            100
        );

    camara.position.set(
        0,
        1,
        3
    );

    // =====================================================
    // RENDERER
    // =====================================================

    const renderer =
        new THREE.WebGLRenderer({
            antialias: true
        });

    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    contenedor.appendChild(
        renderer.domElement
    );

    // =====================================================
    // LUZ
    // =====================================================

    escena.add(
        new THREE.HemisphereLight(
            0xffffff,
            0x444444,
            2
        )
    );

    // =====================================================
    // CONTROLES DE CÁMARA
    // =====================================================

    const controles =
        new OrbitControls(
            camara,
            renderer.domElement
        );

    controles.enableDamping = true;

    // =====================================================
    // PANEL
    // =====================================================

    const panel =
        document.createElement("div");

    Object.assign(
        panel.style,
        {
            position: "fixed",
            top: "10px",
            left: "10px",
            zIndex: "10",
            padding: "10px",
            width: "240px",
            background:
                "rgba(0,0,0,.85)",
            color: "white",
            borderRadius: "10px",
            fontFamily: "Arial",
            fontSize: "13px",
            lineHeight: "1.4"
        }
    );

    panel.innerHTML =
        "⏳ Cargando Micaela...";

    contenedor.appendChild(
        panel
    );

    // =====================================================
    // GRUPO PRINCIPAL DEL RIG
    // =====================================================

    const rig =
        new THREE.Group();

    rig.name =
        "Micaela_Rig";

    escena.add(
        rig
    );

    // =====================================================
    // LISTA DE HUESOS
    // =====================================================

    const huesos = [];

    // =====================================================
    // CREAR HUESO
    // =====================================================

    function crearHueso(
        nombre,
        padre,
        x,
        y,
        z
    ) {

        const hueso =
            new THREE.Bone();

        hueso.name =
            nombre;

        hueso.position.set(
            x,
            y,
            z
        );

        if (padre) {

            padre.add(
                hueso
            );

        } else {

            rig.add(
                hueso
            );
        }

        huesos.push(
            hueso
        );

        return hueso;
    }

    // =====================================================
    // MARCADORES ROJOS
    // =====================================================

    const marcadores =
        new THREE.Group();

    marcadores.name =
        "Marcadores_Rig";

    rig.add(
        marcadores
    );

    function crearMarcador(
        hueso,
        radio = 0.025
    ) {

        const geometria =
            new THREE.SphereGeometry(
                radio,
                12,
                12
            );

        const material =
            new THREE.MeshBasicMaterial({
                color: 0xff3333,
                depthTest: false
            });

        const esfera =
            new THREE.Mesh(
                geometria,
                material
            );

        esfera.renderOrder =
            999;

        esfera.userData.hueso =
            hueso;

        marcadores.add(
            esfera
        );
    }

    // =====================================================
    // CONSTRUIR ESQUELETO
    // =====================================================

    function construirColumna(
        altura,
        centroX,
        centroZ
    ) {

        // =================================================
        // PROPORCIONES CHIBI
        // =================================================

        const suelo = 0;

        const alturaCadera =
            altura * 0.42;

        // =================================================
        // HIPS
        // =================================================

        const hips =
            crearHueso(
                "Hips",
                null,
                centroX,
                alturaCadera,
                centroZ
            );

        crearMarcador(
            hips,
            0.035
        );

        // =================================================
        // LUMBAR — 5
        // =================================================

        let padre =
            hips;

        const lumbarPaso =
            (altura * 0.10) / 5;

        for (
            let i = 1;
            i <= 5;
            i++
        ) {

            padre =
                crearHueso(
                    "Lumbar_" + i,
                    padre,
                    0,
                    lumbarPaso,
                    0
                );

            crearMarcador(
                padre
            );
        }

        // =================================================
        // TORÁCICAS — 12
        // =================================================

        const toracicas =
            [];

        const toraxPaso =
            (altura * 0.18) / 12;

        for (
            let i = 1;
            i <= 12;
            i++
        ) {

            padre =
                crearHueso(
                    "Thoracic_" + i,
                    padre,
                    0,
                    toraxPaso,
                    0
                );

            toracicas.push(
                padre
            );

            crearMarcador(
                padre
            );
        }

        // =================================================
        // ESTERNÓN
        // =================================================

        const esternon =
            crearHueso(
                "Sternum",
                toracicas[11],
                0,
                0,
                -0.035
            );

        crearMarcador(
            esternon,
            0.028
        );

        // =================================================
        // COSTILLAS
        // 12 PARES × 3 SEGMENTOS
        // =================================================

        const costillas =
            [];

        for (
            let lado = -1;
            lado <= 1;
            lado += 2
        ) {

            const nombreLado =
                lado < 0
                    ? "Left"
                    : "Right";

            for (
                let i = 1;
                i <= 12;
                i++
            ) {

                const toracica =
                    toracicas[
                        i - 1
                    ];

                // -----------------------------------------
                // FORMA DE LA COSTILLA
                // -----------------------------------------

                const progreso =
                    (i - 1) / 11;

                const ancho =
                    altura *
                    (
                        0.075 -
                        progreso * 0.018
                    );

                const profundidad =
                    altura *
                    (
                        0.018 +
                        progreso * 0.006
                    );

                // -----------------------------------------
                // COSTILLA — SEGMENTO 1
                // -----------------------------------------

                let costilla =
                    crearHueso(
                        `${nombreLado}Rib${i}_1`,
                        toracica,
                        lado * ancho,
                        0,
                        0
                    );

                crearMarcador(
                    costilla,
                    0.018
                );

                // -----------------------------------------
                // COSTILLA — SEGMENTO 2
                // -----------------------------------------

                costilla =
                    crearHueso(
                        `${nombreLado}Rib${i}_2`,
                        costilla,
                        lado * ancho * 0.75,
                        -altura * 0.004,
                        -profundidad
                    );

                crearMarcador(
                    costilla,
                    0.018
                );

                // -----------------------------------------
                // COSTILLA — SEGMENTO 3
                // -----------------------------------------

                costilla =
                    crearHueso(
                        `${nombreLado}Rib${i}_3`,
                        costilla,
                        -lado * ancho * 0.45,
                        0,
                        -profundidad
                    );

                crearMarcador(
                    costilla,
                    0.018
                );

                costillas.push(
                    costilla
                );
            }
        }

        // =================================================
        // CERVICALES — 7
        // =================================================

        padre =
            toracicas[11];

        const cervicalPaso =
            (altura * 0.10) / 7;

        for (
            let i = 1;
            i <= 7;
            i++
        ) {

            padre =
                crearHueso(
                    "Cervical_" + i,
                    padre,
                    0,
                    cervicalPaso,
                    0
                );

            crearMarcador(
                padre
            );
        }

        // =================================================
        // CUELLO
        // =================================================

        const cuello =
            crearHueso(
                "Neck",
                padre,
                0,
                altura * 0.025,
                0
            );

        crearMarcador(
            cuello,
            0.032
        );

        // =================================================
        // CABEZA
        // =================================================

        const head =
            crearHueso(
                "Head",
                cuello,
                0,
                altura * 0.10,
                0
            );

        crearMarcador(
            head,
            0.07
        );

        // =================================================
        // CENTRO DEL CRÁNEO
        // =================================================

        const skull =
            crearHueso(
                "Skull_Center",
                head,
                0,
                altura * 0.045,
                0
            );

        crearMarcador(
            skull,
            0.055
        );

        // =================================================
        // RESULTADO
        // =================================================

        return {
            suelo,
            hips,
            toracicas,
            esternon,
            costillas,
            cuello,
            head,
            skull
        };
    }

    // =====================================================
    // CARGAR MICAELA
    // =====================================================

    const loader =
        new GLTFLoader();

    loader.load(
        "../3D/micaela.glb",

        gltf => {

            const modelo =
                gltf.scene;

            escena.add(
                modelo
            );

            // =============================================
            // CALCULAR CAJA DEL MODELO
            // =============================================

            const caja =
                new THREE.Box3()
                    .setFromObject(
                        modelo
                    );

            const centro =
                new THREE.Vector3();

            caja.getCenter(
                centro
            );

            const tamano =
                new THREE.Vector3();

            caja.getSize(
                tamano
            );

            const altura =
                tamano.y;

            // =============================================
            // COLOCAR EL RIG EN EL SUELO DEL MODELO
            // =============================================

            rig.position.set(
                centro.x,
                caja.min.y,
                centro.z
            );

            // =============================================
            // CONSTRUIR RIG
            // =============================================

            construirColumna(
                altura,
                0,
                0
            );

            // =============================================
            // HELPER VERDE
            // =============================================

            const raizRig =
                huesos[0];

            const helper =
                new THREE.SkeletonHelper(
                    raizRig
                );

            helper.material.color.set(
                0x00ff66
            );

            helper.material.linewidth =
                2;

            escena.add(
                helper
            );

            // =============================================
            // PANEL
            // =============================================

            panel.innerHTML = `
                <b>🦴 GAMERPRO RIG</b>
                <br><br>

                🧍 Micaela: ✅
                <br>
                📏 Altura: ${altura.toFixed(2)}
                <br>
                🦴 Huesos creados: ${huesos.length}
                <br><br>

                <b>ETAPA 2</b>
                <br>
                ✅ Hips
                <br>
                ✅ Lumbar ×5
                <br>
                ✅ Thoracic ×12
                <br>
                ✅ Sternum
                <br>
                ✅ Costillas ×24
                <br>
                ✅ 3 segmentos por costilla
                <br>
                ✅ Cervical ×7
                <br>
                ✅ Neck
                <br>
                ✅ Head
                <br>
                ✅ Skull Center
            `;

            // =============================================
            // CÁMARA
            // =============================================

            controles.target.set(
                centro.x,
                caja.min.y +
                altura * 0.50,
                centro.z
            );

            camara.position.set(
                centro.x,
                caja.min.y +
                altura * 0.52,
                centro.z +
                altura * 1.8
            );

            camara.lookAt(
                controles.target
            );
        },

        undefined,

        error => {

            console.error(
                error
            );

            panel.innerHTML = `
                <b>❌ ERROR</b>
                <br><br>
                No se pudo cargar
                micaela.glb.
            `;
        }
    );

    // =====================================================
    // RESIZE
    // =====================================================

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

    // =====================================================
    // LOOP
    // =====================================================

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
