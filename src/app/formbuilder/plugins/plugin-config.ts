import { ContainerPropertiesComponent } from "./container/container-properties.component";
import { InputPropertiesComponent } from "./input/input-properties.component";
import { FormBuilderPluginInputComponent } from "./input/input.component";
import { LabelPropertiesComponent } from "./label/label-properties.component";
import { FormBuilderPluginLabelComponent } from "./label/label.component";
import { SelectPropertiesComponent } from "./select/select-properties.component";
import { FormBuilderPluginSelectComponent } from "./select/select.component";
import { TextareaPropertiesComponent } from "./textarea/textarea-properties.component";
import { FormBuilderPluginTextareaComponent } from "./textarea/textarea.component";

export const PLUGINS_CONFIG = {
    'container': {class: null, configClass: ContainerPropertiesComponent, defaultConfig: {
        type:'container', direction: 'row', components: [{},{}]}
    },
    'label': {class: FormBuilderPluginLabelComponent, configClass: LabelPropertiesComponent, defaultConfig: {
        type:'label', value: 'Label', style: ''}
    },
    'input': {class: FormBuilderPluginInputComponent, configClass: InputPropertiesComponent, defaultConfig: {
        type:'input', dataType: 'text', required: true, name:'', text: 'Input', value: null, style: 'flex: 1;'}
    },
    'textarea': {class: FormBuilderPluginTextareaComponent, configClass: TextareaPropertiesComponent, defaultConfig: {
        type:'textarea', required: true, name:'', text: 'Textarea', value: null, style: 'flex: 1;'}
    },
    'select': {class: FormBuilderPluginSelectComponent, configClass: SelectPropertiesComponent, defaultConfig: {
        type:'select', required: true, name:'', text: 'Select', value: null, style: 'flex: 1;'}
    },
};
  


export var formMetadata = {
    id: 1,
    name: 'Prueba',
    openPreview: false,
    openPropertiesWhenAddComponent: true,
    components: [
        {
        type: 'container',
        direction: 'column',
        components: [
            PLUGINS_CONFIG['label'].defaultConfig,
            PLUGINS_CONFIG['input'].defaultConfig,
            PLUGINS_CONFIG['textarea'].defaultConfig,
            {
                type:'select', required: true, name:'provincia', text: 'Seleccione Provincia', value: null, style: 'flex: 1;',
                rest: {
                    url: 'https://raw.githubusercontent.com/IagoLast/pselect/master/data/provincias.json', 
                    method: 'GET',
                    dataRoot: null,
                    propertyId: 'id',
                    propertyValue: 'nm',
                    preHook: 'items.sort((a,b)=>a.nm.localeCompare(b.nm))',
                }
            },
            {
                type:'select', required: true, name:'municipio', text: 'Seleccione Municipio', value: null, style: 'flex: 1;',
                dependency: 'provincia',
                rest: {
                    url: 'https://raw.githubusercontent.com/IagoLast/pselect/master/data/municipios.json', 
                    method: 'GET',
                    dataRoot: null,
                    propertyId: 'id',
                    propertyValue: 'nm',
                    preHook: 'items = items.filter(element => element.id.startsWith(this.formData.provincia))',
                }
            },            
            {}
        ]
        }
    ]
};
  