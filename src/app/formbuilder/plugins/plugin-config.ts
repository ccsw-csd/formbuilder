import { ContainerPropertiesComponent } from "./container/container-properties.component";
import { ContainerComponent } from "./container/container.component";
import { InputPropertiesComponent } from "./input/input-properties.component";
import { InputComponent } from "./input/input.component";
import { LabelPropertiesComponent } from "./label/label-properties.component";
import { LabelComponent } from "./label/label.component";

export const PLUGINS_CONFIG = {
    'container': {class: null, configClass: ContainerPropertiesComponent, defaultConfig: {
        type:'container', direction: 'row', components: [{},{}]}
    },
    'label': {class: LabelComponent, configClass: LabelPropertiesComponent, defaultConfig: {
        type:'label', value: 'Texto de prueba', style: ''}
    },
    'input': {class: InputComponent, configClass: InputPropertiesComponent, defaultConfig: {
        type:'input', dataType: 'text', required: true, name:'', text: 'Nombre por defecto', value: '', style: 'flex: 1;'}
    },
};
  


export var formMetadata = {
    id: 1,
    name: 'Prueba',
    components: [
        {
        type: 'container',
        direction: 'column',
        components: [
            PLUGINS_CONFIG['label'].defaultConfig,
            PLUGINS_CONFIG['input'].defaultConfig,
            {}
        ]
        }
    ]
};
  