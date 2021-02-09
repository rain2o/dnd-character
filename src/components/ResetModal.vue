<template>
  <div v-if="show" class="reset-modal">
    <div
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none
             justify-center items-center flex"
    >
      <div class="relative w-auto my-6 mx-auto max-w-6xl">
        <!--content-->
        <div
          class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none
                 focus:outline-none"
        >
          <!--header-->
          <div
            class="flex items-start justify-between p-5 border-b border-solid border-gray-300
                   rounded-t"
          >
            <h3 class="text-3xl font-semibold">
              Confirm Reset
            </h3>
            <button
              class="p-1 ml-auto bg-transparent border-0 text-secondary float-right
                    text-3xl leading-none font-semibold outline-none focus:outline-none"
              v-on:click="$emit('cancel')"
            >
              <span class="bg-transparent text-secondary h-6 w-6 text-2xl block
                    outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <p class="my-4 text-gray-600 text-lg leading-relaxed">
              Are you sure you want to reset your answers? All questions you have answered,
              and any results you have seen will be removed.
            </p>
          </div>
          <!--footer-->
          <div class="flex items-center justify-evenly p-6 border-t border-solid border-gray-300
              rounded-b">
            <button
              class="text-background bg-primary border border-solid border-primary hover:text-white
                     active:bg-red-600 font-bold uppercase text-sm
                     px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1"
              type="button"
              style="transition: all .15s ease"
              v-on:click="$emit('confirm')"
            >
              Confirm
            </button>
            <button
              class="text-primary background-transparent font-bold uppercase px-6 py-3 text-sm
                     border-primary border-solid border outline-none focus:outline-none mr-1 mb-1"
              type="button"
              style="transition: all .15s ease"
              v-on:click="$emit('cancel')"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="opacity-25 fixed inset-0 z-40 bg-secondary"></div>
  </div>
</template>

<script>
export default {
  name: 'ResetModal',
  props: {
    show: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
};
</script>
