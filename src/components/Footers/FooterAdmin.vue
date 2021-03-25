<template>
  <footer class="block py-4">
    <div class="container mx-auto px-4">
      <hr class="mb-4 border-b-1 border-gray-300" />
      <div
        class="flex flex-wrap items-center md:justify-between justify-center"
      >
        <div class="w-full md:w-4/12 px-4">
          <div
            class="text-sm text-gray-600 font-semibold py-1 text-center md:text-left"
          >
            Copyright © {{ date }}
            <a
              href="https://www.creative-tim.com?ref=vn-footer-admin"
              class="text-gray-600 hover:text-gray-800 text-sm font-semibold py-1"
            >
              IOTuturu
            </a>
          </div>
        </div>
        <div class="w-full md:w-8/12 px-4">
          <ul class="flex flex-wrap list-none md:justify-end justify-center">
            <li>
              <a
                href="https://github.com/iot-catnip"
                class="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://github.com/iot-catnip"
                class="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
              >
                Docs
              </a>
            </li>
            <li>
              <a
                href="https://opensource.org/licenses/mit-license.php"
                class="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
              >
                MIT License
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      date: new Date().getFullYear(),
    };
  },
};
</script>
