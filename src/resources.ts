import {loadImage} from './util/graphics'

export let images = {} as { [name: string]: HTMLImageElement }

export async function loadImages() {
  // this is lazy as hell don't do this
  images['sky'] = await loadImage(require('../assets/images/sky.png'))
  // images['apple'] = await loadImage(require('../assets/images/apple.png'))
  images['banana'] = await loadImage(require('../assets/images/banana.png'))
  images['cake'] = await loadImage(require('../assets/images/cake.png'))
  images['cherry'] = await loadImage(require('../assets/images/cherry.png'))
  images['grape'] = await loadImage(require('../assets/images/grape.png'))
  images['jello'] = await loadImage(require('../assets/images/jello.png'))
  images['lemon'] = await loadImage(require('../assets/images/lemon.png'))
  images['orange'] = await loadImage(require('../assets/images/orange.png'))
  images['pear'] = await loadImage(require('../assets/images/pear.png'))
  images['tomato'] = await loadImage(require('../assets/images/tomato.png'))
}
