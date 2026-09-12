import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/controls/OrbitControls.js";

export function iniciarRigEditor3D(contenedor) {

    // =====================================================
    // LIMPIAR
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
    // CONTROLES
    // =====================================================

    const controles =
        new OrbitControls(
            camara,
            renderer.domElement
        );

    controles.enableDamping = true;

    // =====================================================
    // PANEL PRINCIPAL
    // =====================================================

    const panel =
        document.createElement("div");

    Object.assign(
        panel.style,
        {
            position: "fixed",
            top: "10px",
            left: "10px",
            zIndex: "20",
            padding: "10px",
            width: "240px",
            background:
                "rgba(0,0,0,.88)",
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
    // RIG PRINCIPAL
    // =====================================================

    const rig =
        new THREE.Group();

    rig.name =
        "Micaela_Rig";

    escena.add(
        rig
    );

    // =====================================================
    // CONTROLADOR EXCLUSIVO DEL TÓRAX
    // =====================================================

    const toraxControl =
        new THREE.Group();

    toraxControl.name =
        "Thorax_Control";

    rig.add(
        toraxControl
    );

    // =====================================================
    // HUESOS
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
    // MARCADORES
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
    // CONSTRUIR COLUMNA + COSTILLAS
    // =====================================================

    function construirColumna(
        altura,
        centroX,
        centroZ
    ) {

        const suelo = 0;

        // =================================================
        // HIPS
        // =================================================

        const alturaCadera =
            altura * 0.42;

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
        // LUMBAR ×5
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
        // THORACIC ×12
        // =================================================

        const toracicas = [];

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
        // COSTILLAS ×24 ×3
        // =================================================

        const costillas = [];

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
                    toracicas[i - 1];

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
                // SEGMENTO 1
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
                // SEGMENTO 2
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
                // SEGMENTO 3
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
        // MOVER COSTILLAS A SU CONTROLADOR
        // =================================================
        //
        // attach() mantiene la posición mundial actual.
        // Así podemos mover todo el tórax sin mover Hips,
        // lumbar, cuello ni cabeza.
        // =================================================

        toraxControl.updateWorldMatrix(
            true,
            true
        );

        costillas.forEach(
            costilla => {

                toraxControl.attach(
                    costilla
                );
            }
        );

        toraxControl.attach(
            esternon
        );

        // =================================================
        // CERVICALES ×7
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
        // NECK
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
        // HEAD
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
        // SKULL CENTER
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

        return {
            suelo,
            hips,
            toracicas,
            esternon,
            costillas,
            toraxControl,
            cuello,
            head,
            skull
        };
    }

    // =====================================================
    // PANEL DE ARRASTRE DEL TÓRAX
    // =====================================================

    const panelCostillas =
        document.createElement("div");

    Object.assign(
        panelCostillas.style,
        {
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: "30",
            width: "250px",
            padding: "12px",
            background:
                "rgba(0,0,0,.92)",
            color: "white",
            borderRadius: "12px",
            fontFamily: "Arial",
            fontSize: "13px"
        }
    );

    panelCostillas.innerHTML = `
        <b>🦴 POSICIÓN DEL TÓRAX</b>

        <br>
        <small>
        Mueve todas las costillas juntas.
        </small>

        <br><br>

        <b>X</b>
        <br>

        <input
            id="toraxX"
            type="range"
            min="-0.5"
            max="0.5"
            step="0.001"
            value="0"
            style="width:170px"
        >

        <span id="toraxXValor">
            0.000
        </span>

        <br><br>

        <b>Y</b>
        <br>

        <input
            id="toraxY"
            type="range"
            min="-0.5"
            max="0.5"
            step="0.001"
            value="0"
            style="width:170px"
        >

        <span id="toraxYValor">
            0.000
        </span>

        <br><br>

        <b>Z</b>
        <br>

        <input
            id="toraxZ"
            type="range"
            min="-0.5"
            max="0.5"
            step="0.001"
            value="0"
            style="width:170px"
        >

        <span id="toraxZValor">
            0.000
        </span>

        <br><br>

        <button id="guardarTorax">
            💾 Guardar
        </button>

        <button id="cargarTorax">
            🔄 Cargar
        </button>

        <button id="resetTorax">
            ↩️ Reset
        </button>
    `;

    contenedor.appendChild(
        panelCostillas
    );

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
            // CAJA DEL MODELO
            // =============================================

            modelo.updateWorldMatrix(
                true,
                false
            );

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
            // POSICIÓN DEL RIG
            // =============================================

            rig.position.set(
                centro.x,
                caja.min.y,
                centro.z
            );

            // =============================================
            // CONSTRUIR ESQUELETO
            // =============================================

            const resultado =
                construirColumna(
                    altura,
                    0,
                    0
                );

            // =============================================
            // HELPER
            // =============================================

            const helper =
                new THREE.SkeletonHelper(
                    resultado.hips
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
            // GUARDAR REFERENCIA
            // =============================================

            escena.userData.toraxControl =
                resultado.toraxControl;

            // =============================================
            // CONTROLES DEL PANEL
            // =============================================

            const inputX =
                document.getElementById(
                    "toraxX"
                );

            const inputY =
                document.getElementById(
                    "toraxY"
                );

            const inputZ =
                document.getElementById(
                    "toraxZ"
                );

            const valorX =
                document.getElementById(
                    "toraxXValor"
                );

            const valorY =
                document.getElementById(
                    "toraxYValor"
                );

            const valorZ =
                document.getElementById(
                    "toraxZValor"
                );

            function actualizarPanel() {

                valorX.textContent =
                    Number(
                        inputX.value
                    ).toFixed(3);

                valorY.textContent =
                    Number(
                        inputY.value
                    ).toFixed(3);

                valorZ.textContent =
                    Number(
                        inputZ.value
                    ).toFixed(3);
            }

            function moverTorax() {

                resultado.toraxControl
                    .position.set(
                        Number(
                            inputX.value
                        ),
                        Number(
                            inputY.value
                        ),
                        Number(
                            inputZ.value
                        )
                    );

                actualizarPanel();
            }

            inputX.addEventListener(
                "input",
                moverTorax
            );

            inputY.addEventListener(
                "input",
                moverTorax
            );

            inputZ.addEventListener(
                "input",
                moverTorax
            );

              =============================================
            // GUARDAR POSICIÓN
            // =============================================

            document
                .getElementById(
                    "guardarTorax"
                )
                .addEventListener(
                    "click",
                    () => {

                        const posicion = {
                            x:
                                resultado
                                    .toraxControl
                                    .position.x,

                            y:
                                resultado
                                    .toraxControl
                                    .position.y,

                            z:
                                resultado
                                    .toraxControl
                                    .position.z
                        };

                        localStorage.setItem(
                            "GAMERPRO_TORAX_POSITION",
                            JSON.stringify(
                                posicion
                            )
                        );
                    }
                );

            // =============================================
            // CARGAR POSICIÓN
            // =============================================

            document
                .getElementById(
                    "cargarTorax"
                )
                .addEventListener(
                    "click",
                    () => {

                        const guardado =
                            localStorage.getItem(
                                "GAMERPRO_TORAX_POSITION"
                            );

                        if (!guardado) {
                            return;
                        }

                        const posicion =
                            JSON.parse(
                                guardado
                            );

                        resultado
                            .toraxControl
                            .position.set(
                                posicion.x,
                                posicion.y,
                                posicion.z
                            );

                        inputX.value =
                            posicion.x;

                        inputY.value =
                            posicion.y;

                        inputZ.value =
                            posicion.z;

                        actualizarPanel();
                    }
                );

            // =============================================
            // RESET
            // =============================================

            document
                .getElementById(
                    "resetTorax"
                )
                .addEventListener(
                    "click",
                    () => {

                        resultado
                            .toraxControl
                            .position.set(
                                0,
                                0,
                                0
                            );

                        inputX.value =
                            0;

                        inputY.value =
                            0;

                        inputZ.value =
                            0;

                        actualizarPanel();
                    }
                );

            // =============================================
            // PANEL PRINCIPAL
            // =============================================

            panel.innerHTML = `
                <b>🦴 GAMERPRO RIG</b>

                <br><br>

                🧍 Micaela: ✅
                <br>

                📏 Altura:
                ${altura.toFixed(2)}

                <br>

                🦴 Huesos creados:
                ${huesos.length}

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
