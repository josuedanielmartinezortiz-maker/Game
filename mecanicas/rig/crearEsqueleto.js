// =====================================================
// 🦴 GAMERPRO GAME — CREAR ESQUELETO DE MICAELA
// =====================================================

import * as THREE from "three";

import {
    ANATOMIA_MICAELA
} from "./principal.js";


// =====================================================
// CREAR HUESO
// =====================================================

function crearHueso(nombre) {

    const hueso =
        new THREE.Bone();

    hueso.name =
        nombre;

    return hueso;
}


// =====================================================
// CREAR TODOS LOS HUESOS DEL CATÁLOGO
// =====================================================

export function crearEsqueletoMicaela() {

    const esqueleto =
        new THREE.Group();

    esqueleto.name =
        "Esqueleto_Micaela";


    // =================================================
    // CONTENEDOR DE HUESOS
    // =================================================

    const huesos = {};


    // =================================================
    // CABEZA
    // =================================================

    for (
        const nombre
        of ANATOMIA_MICAELA.cabeza
    ) {

        huesos[nombre] =
            crearHueso(nombre);

        esqueleto.add(
            huesos[nombre]
        );
    }


    // =================================================
    // CARA / CONTROLES
    // =================================================

    for (
        const nombre
        of ANATOMIA_MICAELA.cara
    ) {

        huesos[nombre] =
            crearHueso(nombre);

        esqueleto.add(
            huesos[nombre]
        );
    }


    // =================================================
    // OÍDO
    // =================================================

    for (
        const nombre
        of ANATOMIA_MICAELA.oido
    ) {

        huesos[nombre] =
            crearHueso(nombre);

        esqueleto.add(
            huesos[nombre]
        );
    }


    // =================================================
    // COLUMNA
    // =================================================

    for (
        const nombre
        of ANATOMIA_MICAELA.columna
    ) {

        huesos[nombre] =
            crearHueso(nombre);

        esqueleto.add(
            huesos[nombre]
        );
    }


    // =================================================
    // TÓRAX
    // =================================================

    for (
        const nombre
        of ANATOMIA_MICAELA.torax
    ) {

        huesos[nombre] =
            crearHueso(nombre);

        esqueleto.add(
            huesos[nombre]
        );
    }


    // =================================================
    // HOMBROS
    // =================================================

    for (
        const nombre
        of ANATOMIA_MICAELA.hombros
    ) {

        huesos[nombre] =
            crearHueso(nombre);

        esqueleto.add(
            huesos[nombre]
        );
    }


    // =================================================
    // BRAZOS
    // =================================================

    for (
        const nombre
        of ANATOMIA_MICAELA.brazos
    ) {

        huesos[nombre] =
            crearHueso(nombre);

        esqueleto.add(
            huesos[nombre]
        );
    }


    // =================================================
    // MANOS
    // =================================================

    for (
        const lado
        of ["izquierda", "derecha"]
    ) {

        for (
            const nombre
            of ANATOMIA_MICAELA.manos[lado]
        ) {

            huesos[nombre] =
                crearHueso(nombre);

            esqueleto.add(
                huesos[nombre]
            );
        }
    }


    // =================================================
    // PELVIS
    // =================================================

    for (
        const nombre
        of ANATOMIA_MICAELA.pelvis
    ) {

        huesos[nombre] =
            crearHueso(nombre);

        esqueleto.add(
            huesos[nombre]
        );
    }


    // =================================================
    // PIERNAS
    // =================================================

    for (
        const nombre
        of ANATOMIA_MICAELA.piernas
    ) {

        huesos[nombre] =
            crearHueso(nombre);

        esqueleto.add(
            huesos[nombre]
        );
    }


    // =================================================
    // PIES
    // =================================================

    for (
        const lado
        of ["izquierdo", "derecho"]
    ) {

        for (
            const nombre
            of ANATOMIA_MICAELA.pies[lado]
        ) {

            huesos[nombre] =
                crearHueso(nombre);

            esqueleto.add(
                huesos[nombre]
            );
        }
    }


    // =================================================
    // RESULTADO
    // =================================================

    return {
        esqueleto,
        huesos
    };
}
