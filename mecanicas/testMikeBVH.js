import * as THREE from 'three';
import {
    loadBVHAnimation
} from './bvhRetarget.js';

export async function activarAnimacionMike(
    mike,
    mixer
) {

    try {

        const resultado =
            await loadBVHAnimation(
                mike,
                mixer,
                './animaciones/Walk.bvh'
            );

        console.log(
            '================================'
        );

        console.log(
            '✓ MIKE + BVH FUNCIONANDO'
        );

        console.log(
            'Animación:',
            resultado.clip.name
        );

        console.log(
            'Duración:',
            resultado.clip.duration
        );

        console.log(
            '================================'
        );

        return resultado;

    } catch (error) {

        console.error(
            '❌ FALLÓ EL RETARGET DE MIKE'
        );

        console.error(error);

        return null;
    }
}
