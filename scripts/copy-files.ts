#!/usr/bin/env zx

import { $ } from 'zx';

async function main() {
  await $`mkdir -p dist/assets`;
  await $`mkdir -p dist/blueprints`;
  await $`cp -r src/assets/. dist/assets/`;
  await $`cp -r src/blueprints/. dist/blueprints/`;
}

main();
