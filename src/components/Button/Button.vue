<script setup>

    import { useUserStore } from '../../stores/useUserStore'

    const userStore = useUserStore()

    const emit = defineEmits(['submit'])

    const props = defineProps({
        colorScheme: String,
        title: String,
        a: String
    })

    const click = (e) => {
        if (!props.a) {
            e.preventDefault()
            emit('submit')
        }
    }

</script>

<template>
    <a
        :href="a"
        target="_blank"
        @click="(e) => click(e)"
        :class="[
            colorScheme === 'light' &&  (userStore.colorScheme === 'light' ? 'bg-[#D0D9FA] text-[#1B1C37]' : 'bg-[#262744] text-[#FFFFFF]'),
            'font-medium text-center cursor-pointer text-[16px] flex justify-center items-center h-[50px] rounded-[6px] w-full max-w-lg px-2 active:opacity-75'
        ]"
    >
        {{ title }}
    </a>
</template>