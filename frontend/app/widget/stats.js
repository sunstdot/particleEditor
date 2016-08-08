/**
 * fps monitor用于记录帧率
 * Created by sunshitao on 2016/8/8.
 */
import Stats from 'stats'
export const stats = new Stats();

stats.setMode(0); // 0: fps, 1: ms
// Align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.bottom = '0px';

document.body.appendChild( stats.domElement );
