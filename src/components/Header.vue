<script setup>

    import { useUserStore } from '@/stores/useUserStore'

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
            colorScheme === 'blue' && (userStore.colorScheme === 'light' ? 'bg-[#006FEE] text-[#FFFFFF]' : 'bg-[#001731] text-[#338EF7]'),
            colorScheme === 'dark_blue' && (userStore.colorScheme === 'light' ? 'bg-[#006FEE] text-[#FFFFFF]' : 'bg-[#007AFF] text-[#FFFFFF]'),
            colorScheme === 'green' && (userStore.colorScheme === 'light' ? 'bg-[#17C964] text-[#FFFFFF]' : 'bg-[#052814] text-[#45D483]'),
            colorScheme === 'dark_green' && (userStore.colorScheme === 'light' ? 'bg-[#7DC240] text-[#FFFFFF]' : 'bg-[#7DC240] text-[#FFFFFF]'),
            colorScheme === 'hint' &&  (userStore.colorScheme === 'light' ? 'bg-[#A1A1AA] text-[#FAFAFA]' : 'bg-[#3F3F46] text-[#FAFAFA]'),
            'font-medium text-center cursor-pointer text-xl flex justify-center items-center h-[52px] rounded-[17px] w-full max-w-lg px-2 active:opacity-75'
        ]"
    >
        {{ title }}
    </a>
</template>