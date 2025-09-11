<template>
    <div :class="wrapperClass">
        <input v-bind="$attrs" v-model="inputValue" :type="type" :placeholder="placeholder"
            :class="inputClass" @input="$emit('update:modelValue', inputValue)" @focus="$emit('focus')"
            @blur="$emit('blur')" />
        <!-- Optional slot for button or icon -->
        <slot name="append"></slot>
        <slot name="prepend"></slot>
    </div>
</template>

<script setup>
    import {
        ref,
        watch
    } from 'vue'

    const props = defineProps({
        modelValue: [String, Number],
        type: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default: ''
        },
        inputClass: {
            type: String,
            default: 'flex-1 px-3 py-2 rounded-md focus:outline-none text-gray-900'
        },
        wrapperClass: {
            type: String,
            default: 'flex items-center'
        }
    })

    const emit = defineEmits(['update:modelValue', 'focus', 'blur'])
    const inputValue = ref(props.modelValue)

    watch(
        () => props.modelValue,
        (val) => (inputValue.value = val)
    )
</script>
