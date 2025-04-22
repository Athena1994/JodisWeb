//Generator = require('@jspm/generator')
import {Generator} from '@jspm/generator';

async function generateImportMap() {

    const generator = new Generator({
        mapUrl: import.meta.url,
        env: ['browser', 'production']
     });

    await generator.install('@angular/core');
    await generator.install('@angular/common');
    await generator.install('@angular/platform-browser');

    const importMap = generator.getMap();

    // Output the import map
    console.log(JSON.stringify(importMap, null, 2));
}

generateImportMap().catch(err => {
  console.error('Error generating import map:', err);
});