import computedBehavior from '@behaviors/computedBehavior';
import relationsBehavior from '@behaviors/relationsBehavior';
import safeAreaBehavior from '@behaviors/safeAreaBehavior';
import safeSetDataBehavior from '@behaviors/safeSetDataBehavior';

type IOptions = WechatMiniprogram.Component.DataOption &
    WechatMiniprogram.Component.PageLifetimes &
    WechatMiniprogram.Component.Lifetimes &
    WechatMiniprogram.Component.ComponentOptions &
    WechatMiniprogram.Component.PropertyOption &
    WechatMiniprogram.Component.MethodOption &
    WechatMiniprogram.Component.RelationOption &
    WechatMiniprogram.Component.TriggerEventOption;

// @ts-nocheck
function baseComponent(options: Partial<IOptions>) {
    // add default externalClasses
    options.externalClasses = ['vx-class', 'vx-hover-class', ...(options.externalClasses = options.externalClasses || [])];

    // add default behaviors
    options.behaviors = [
        relationsBehavior,
        safeSetDataBehavior,
        ...(options.behaviors = options.behaviors || []),
        computedBehavior // make sure it's triggered
    ];

    // use safeArea
    if (options.useSafeArea) {
        options.behaviors = [...options.behaviors, safeAreaBehavior];
        delete options.useSafeArea;
    }

    // use field
    if (options.useField) {
        options.behaviors = [...options.behaviors, 'wx://form-field'];
        delete options.useField;
    }

    // use export
    if (options.useExport) {
        options.behaviors = [...options.behaviors, 'wx://component-export'];
        options.methods = {
            export() {
                return this;
            },
            ...options.methods
        };
        delete options.useExport;
    }

    // add default options
    options.options = {
        multipleSlots: true,
        addGlobalClass: true,
        ...options.options
    };

    return Component(options);
}

export default baseComponent;
