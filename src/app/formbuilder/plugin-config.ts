import { ContainerPropertiesComponent } from "./plugins/container/container-properties.component";
import { FormBuilderPluginDividerComponent } from "./plugins/divider/divider.component";
import { InputPropertiesComponent } from "./plugins/input/input-properties.component";
import { FormBuilderPluginInputComponent } from "./plugins/input/input.component";
import { LabelPropertiesComponent } from "./plugins/label/label-properties.component";
import { FormBuilderPluginLabelComponent } from "./plugins/label/label.component";
import { SelectPropertiesComponent } from "./plugins/select/select-properties.component";
import { FormBuilderPluginSelectComponent } from "./plugins/select/select.component";
import { TextareaPropertiesComponent } from "./plugins/textarea/textarea-properties.component";
import { FormBuilderPluginTextareaComponent } from "./plugins/textarea/textarea.component";

export const PLUGINS_CONFIG = {
    'container': {class: null, configClass: ContainerPropertiesComponent, defaultConfig: {
        type:'container', direction: 'row', components: [{},{}]}
    },
    'divider': {class: FormBuilderPluginDividerComponent, defaultConfig: {
        type:'divider'}
    },
    'label': {class: FormBuilderPluginLabelComponent, configClass: LabelPropertiesComponent, defaultConfig: {
        type:'label', value: 'Label', style: ''}
    },
    'input': {class: FormBuilderPluginInputComponent, configClass: InputPropertiesComponent, defaultConfig: {
        type:'input', dataType: 'text', required: true, name:'', text: 'Input', value: null, style: 'flex: 1;'}
    },
    'textarea': {class: FormBuilderPluginTextareaComponent, configClass: TextareaPropertiesComponent, defaultConfig: {
        type:'textarea', required: true, name:'', text: 'Textarea', value: null, style: 'flex: 1;', rows: 5}
    },
    'select': {class: FormBuilderPluginSelectComponent, configClass: SelectPropertiesComponent, defaultConfig: {
        type:'select', required: true, name:'', text: 'Select', value: null, style: 'flex: 1;'}
    },
};
  


export var formMetadata = {
    id: 1,
    name: 'Formulario de prueba en desarrollo',
    openPreview: false,
    components: [
        {
        type: 'container',
        direction: 'column',
        components: [
            cloneConfig('label', {value:'Este formulario sirve para ... Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', style: ''}),
            cloneConfig('label', {value:'Datos del alumno', style: 'font-size:20px; font-weight: bold; color: #838383;'}),
            {type:'divider'},
            {
                type: 'container',
                direction: 'row',
                components: [
                    cloneConfig('input', {text:'Nombre', name: 'nombre', value:'Nombre de prueba'}),
                    cloneConfig('input', {text:'Apellido 1', name: 'apellido1'}),
                    cloneConfig('input', {text:'Apellido 2', name: 'apellido2'}),
                ]
            },            
            cloneConfig('textarea', {text: 'Dirección Postal', name: 'direccion', value: 'Dirección de prueba'}),
            {
                type: 'container',
                direction: 'row',
                components: [
                    cloneConfig('select', {name:'provincia', text: 'Seleccione Provincia', rest: {
                        url: 'https://raw.githubusercontent.com/IagoLast/pselect/master/data/provincias.json', 
                        method: 'GET',
                        dataRoot: null,
                        propertyId: 'id',
                        propertyValue: 'nm',
                        preHook: 'items.sort((a,b)=>a.nm.localeCompare(b.nm))',
                    }}),
                    cloneConfig('select', {name:'municipio', text: 'Seleccione Municipio', dependency: 'provincia', rest: {
                        url: 'https://raw.githubusercontent.com/IagoLast/pselect/master/data/municipios.json', 
                        method: 'GET',
                        dataRoot: null,
                        propertyId: 'id',
                        propertyValue: 'nm',
                        preHook: 'items = items.filter(element => element.id.startsWith(this.formData.provincia))',
                    }}),
                ]
            },
            {},
            cloneConfig('label', {value:'Datos de la solicitud', style: 'font-size:20px; font-weight: bold; color: #838383;'}),
            {type:'divider'},
            {
                type: 'container',
                direction: 'row',
                components: [
                    cloneConfig('input', {text:'Fecha solicitud', name: 'fecha', dataType:'date'}),
                    cloneConfig('input', {text:'Departamento', name: 'departamento'}),
                ]
            },
            {}
        ]
        }
    ]
};

function cloneConfig(key, objectValue) {
    let newObject = Object.assign({}, PLUGINS_CONFIG[key].defaultConfig);
    return Object.assign(newObject, objectValue);
}
  