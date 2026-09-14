// ============================================================
// BVH RETARGET - MIKE
// Archivo: mecanicas/bvhRetarget.js
//
// Uso:
// mike.glb + cualquier animación .bvh
// → AnimationClip aplicado al rig de Mike
//
// NO modifica el rig.
// NO hace auto-rig.
// ============================================================

import * as THREE from 'three';
import { BVHLoader } from 'three/addons/loaders/BVHLoader.js';


// ============================================================
// CONFIGURACIÓN
// ============================================================

const BVH_PATH = './animaciones/Walk.bvh';


// ============================================================
// NORMALIZAR NOMBRES
// ============================================================

function normalizeName(name) {

    return name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');
}


// ============================================================
// BUSCAR HUESOS DE MIKE
// ============================================================

function getMikeBones(root) {

    const bones = {};

    root.traverse(object => {

        if (!object.isBone) return;

        const n = normalizeName(object.name);

        // -------------------------
        // CADERA
        // -------------------------

        if (
            n.includes('hips') ||
            n.includes('pelvis') ||
            n === 'hip'
        ) {
            bones.hips = object;
        }

        // -------------------------
        // COLUMNA
        // -------------------------

        else if (
            n === 'spine' ||
            n === 'spine1'
        ) {
            if (!bones.spine) {
                bones.spine = object;
            }
        }

        else if (
            n === 'spine2' ||
            n.includes('chest') ||
            n.includes('upperchest')
        ) {
            bones.chest = object;
        }

        // -------------------------
        // CUELLO / CABEZA
        // -------------------------

        else if (n === 'neck') {
            bones.neck = object;
        }

        else if (n === 'head') {
            bones.head = object;
        }

        // -------------------------
        // BRAZO IZQUIERDO
        // -------------------------

        else if (
            n.includes('leftshoulder') ||
            n.includes('shoulderl') ||
            n.includes('shoulderleft')
        ) {
            bones.leftShoulder = object;
        }

        else if (
            n.includes('leftupperarm') ||
            n.includes('leftarm') ||
            n.includes('upperarml') ||
            n.includes('arml')
        ) {
            bones.leftArm = object;
        }

        else if (
            n.includes('leftforearm') ||
            n.includes('leftlowerarm') ||
            n.includes('forearml') ||
            n.includes('lowerarml')
        ) {
            bones.leftForeArm = object;
        }

        else if (
            n.includes('lefthand') ||
            n.includes('handl')
        ) {
            bones.leftHand = object;
        }

        // -------------------------
        // BRAZO DERECHO
        // -------------------------

        else if (
            n.includes('rightshoulder') ||
            n.includes('shoulderr') ||
            n.includes('shoulderright')
        ) {
            bones.rightShoulder = object;
        }

        else if (
            n.includes('rightupperarm') ||
            n.includes('rightarm') ||
            n.includes('upperarmr') ||
            n.includes('armr')
        ) {
            bones.rightArm = object;
        }

        else if (
            n.includes('rightforearm') ||
            n.includes('rightlowerarm') ||
            n.includes('forearmr') ||
            n.includes('lowerarmr')
        ) {
            bones.rightForeArm = object;
        }

        else if (
            n.includes('righthand') ||
            n.includes('handr')
        ) {
            bones.rightHand = object;
        }

        // -------------------------
        // PIERNA IZQUIERDA
        // -------------------------

        else if (
            n.includes('leftupleg') ||
            n.includes('leftthigh') ||
            n.includes('thighl') ||
            n.includes('uplegl')
        ) {
            bones.leftUpLeg = object;
        }

        else if (
            n === 'leftleg' ||
            n.includes('leftshin') ||
            n.includes('shinl') ||
            n.includes('lowerlegl')
        ) {
            bones.leftLeg = object;
        }

        else if (
            n.includes('leftfoot') ||
            n.includes('footl')
        ) {
            bones.leftFoot = object;
        }

        else if (
            n.includes('lefttoebase') ||
            n.includes('lefttoe') ||
            n.includes('toel')
        ) {
            bones.leftToe = object;
        }

        // -------------------------
        // PIERNA DERECHA
        // -------------------------

        else if (
            n.includes('rightupleg') ||
            n.includes('rightthigh') ||
            n.includes('thighr') ||
            n.includes('uplegr')
        ) {
            bones.rightUpLeg = object;
        }

        else if (
            n === 'rightleg' ||
            n.includes('rightshin') ||
            n.includes('shinr') ||
            n.includes('lowerlegr')
        ) {
            bones.rightLeg = object;
        }

        else if (
            n.includes('rightfoot') ||
            n.includes('footr')
        ) {
            bones.rightFoot = object;
        }

        else if (
            n.includes('righttoebase') ||
            n.includes('righttoe') ||
            n.includes('toer')
        ) {
            bones.rightToe = object;
        }
    });

    return bones;
}


// ============================================================
// ENCONTRAR HUESO DEL BVH
// ============================================================

function findBVHBoneName(name) {

    const n = normalizeName(name);

    if (
        n.includes('hips') ||
        n.includes('pelvis')
    ) {
        return 'hips';
    }

    if (
        n === 'spine' ||
        n === 'spine1'
    ) {
        return 'spine';
    }

    if (
        n === 'spine2' ||
        n.includes('chest')
    ) {
        return 'chest';
    }

    if (n.includes('neck')) {
        return 'neck';
    }

    if (n.includes('head')) {
        return 'head';
    }

    // -------------------------
    // IZQUIERDO
    // -------------------------

    if (
        n.includes('leftshoulder') ||
        n.includes('shoulderl')
    ) {
        return 'leftShoulder';
    }

    if (
        n.includes('leftarm') ||
        n.includes('leftupperarm') ||
        n.includes('upperarml')
    ) {
        return 'leftArm';
    }

    if (
        n.includes('leftforearm') ||
        n.includes('leftlowerarm') ||
        n.includes('forearml')
    ) {
        return 'leftForeArm';
    }

    if (
        n.includes('lefthand') ||
        n.includes('handl')
    ) {
        return 'leftHand';
    }

    if (
        n.includes('leftupleg') ||
        n.includes('leftthigh') ||
        n.includes('thighl')
    ) {
        return 'leftUpLeg';
    }

    if (
        n === 'leftleg' ||
        n.includes('leftshin') ||
        n.includes('shinl')
    ) {
        return 'leftLeg';
    }

    if (
        n.includes('leftfoot') ||
        n.includes('footl')
    ) {
        return 'leftFoot';
    }

    if (
        n.includes('lefttoe') ||
        n.includes('toel')
    ) {
        return 'leftToe';
    }

    // -------------------------
    // DERECHO
    // -------------------------

    if (
        n.includes('rightshoulder') ||
        n.includes('shoulderr')
    ) {
        return 'rightShoulder';
    }

    if (
        n.includes('rightarm') ||
        n.includes('rightupperarm') ||
        n.includes('upperarmr')
    ) {
        return 'rightArm';
    }

    if (
        n.includes('rightforearm') ||
        n.includes('rightlowerarm') ||
        n.includes('forearmr')
    ) {
        return 'rightForeArm';
    }

    if (
        n.includes('righthand') ||
        n.includes('handr')
    ) {
        return 'rightHand';
    }

    if (
        n.includes('rightupleg') ||
        n.includes('rightthigh') ||
        n.includes('thighr')
    ) {
        return 'rightUpLeg';
    }

    if (
        n === 'rightleg' ||
        n.includes('rightshin') ||
        n.includes('shinr')
    ) {
        return 'rightLeg';
    }

    if (
        n.includes('rightfoot') ||
        n.includes('footr')
    ) {
        return 'rightFoot';
    }

    if (
        n.includes('righttoe') ||
        n.includes('toer')
    ) {
        return 'rightToe';
    }

    return null;
}


// ============================================================
// CREAR RETARGET
// ============================================================

function createRetargetClip(bvhClip, mike) {

    const mikeBones = getMikeBones(mike);

    console.log(
        '=== HUESOS ENCONTRADOS EN MIKE ==='
    );

    Object.entries(mikeBones).forEach(
        ([key, bone]) => {

            console.log(
                key,
                '→',
                bone ? bone.name : 'NO ENCONTRADO'
            );

        }
    );


    const tracks = [];


    // --------------------------------------------------------
    // RECORRER TRACKS DEL BVH
    // --------------------------------------------------------

    for (const sourceTrack of bvhClip.tracks) {

        const parts =
            sourceTrack.name.split('.');

        if (parts.length < 2) {
            continue;
        }

        const sourceBoneName =
            parts[0];

        const property =
            parts.slice(1).join('.');


        // ----------------------------------------------------
        // BUSCAR HUESO DESTINO
        // ----------------------------------------------------

        const destinationKey =
            findBVHBoneName(
                sourceBoneName
            );

        if (!destinationKey) {
            continue;
        }

        const destinationBone =
            mikeBones[destinationKey];

        if (!destinationBone) {
            continue;
        }


        // ----------------------------------------------------
        // ROTACIÓN
        // ----------------------------------------------------

        if (
            property === 'quaternion' ||
            sourceTrack.name.endsWith(
                '.quaternion'
            )
        ) {

            const track =
                sourceTrack.clone();

            track.name =
                `${destinationBone.name}.quaternion`;

            tracks.push(track);
        }


        // ----------------------------------------------------
        // POSICIÓN
        // Solo pelvis/cadera
        // ----------------------------------------------------

        else if (
            property === 'position' &&
            destinationKey === 'hips'
        ) {

            const track =
                sourceTrack.clone();

            track.name =
                `${destinationBone.name}.position`;

            tracks.push(track);
        }
    }


    if (tracks.length === 0) {

        console.error(
            '❌ No se pudo crear ningún track.'
        );

        return null;
    }


    console.log(
        `✓ ${tracks.length} tracks retargeteados`
    );


    return new THREE.AnimationClip(
        'Mike_Walk',
        -1,
        tracks
    );
}


// ============================================================
// CARGAR ANIMACIÓN BVH
// ============================================================

export function loadBVHAnimation(
    mike,
    mixer,
    bvhPath = BVH_PATH
) {

    return new Promise(
        (resolve, reject) => {

            const loader =
                new BVHLoader();

            loader.load(

                bvhPath,

                result => {

                    console.log(
                        '✓ BVH cargado:',
                        bvhPath
                    );

                    console.log(
                        'Huesos BVH:',
                        result.skeleton.bones.map(
                            b => b.name
                        )
                    );


                    const clip =
                        createRetargetClip(
                            result.clip,
                            mike
                        );


                    if (!clip) {

                        reject(
                            new Error(
                                'No se pudo retargetear el BVH'
                            )
                        );

                        return;
                    }


                    // ------------------------------------------------
                    // REPRODUCIR
                    // ------------------------------------------------

                    const action =
                        mixer.clipAction(
                            clip
                        );

                    action.reset();

                    action.setLoop(
                        THREE.LoopRepeat,
                        Infinity
                    );

                    action.clampWhenFinished =
                        false;

                    action.play();


                    console.log(
                        '▶ Animación Mike_Walk iniciada'
                    );


                    resolve({
                        clip,
                        action,
                        bvh: result
                    });
                },

                undefined,

                error => {

                    console.error(
                        '❌ Error cargando BVH:',
                        error
                    );

                    reject(error);
                }
            );
        }
    );
}


// ============================================================
// EXPORTAR FUNCIONES
// ============================================================

export {
    getMikeBones,
    createRetargetClip
};
