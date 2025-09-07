<template>
  <div class="h-screen flex flex-col">
    <header class="border-b border-[var(--ui-border-accented)] flex-shrink-0">
      <NavigationMenu />
    </header>
    <main class="flex-1 flex flex-col overflow-hidden">
      <slot />
    </main>
  </div>
</template>
